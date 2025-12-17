import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization to avoid build errors when env vars not set
const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || '');

const getSupabaseAdmin = () => createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

    if (!signature) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleCheckoutCompleted(session, supabaseAdmin);
                break;
            }
            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                await handleSubscriptionUpdated(subscription, supabaseAdmin);
                break;
            }
            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                await handleSubscriptionDeleted(subscription, supabaseAdmin);
                break;
            }
            case 'invoice.payment_succeeded': {
                const invoice = event.data.object;
                await handlePaymentSucceeded(invoice, supabaseAdmin);
                break;
            }
            case 'invoice.payment_failed': {
                const invoice = event.data.object;
                await handlePaymentFailed(invoice, supabaseAdmin);
                break;
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook handler error:', error);
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCheckoutCompleted(session: Stripe.Checkout.Session, supabase: any) {
    const userId = session.metadata?.user_id;
    const plan = session.metadata?.plan;

    if (!userId || !plan) {
        console.error('Missing user_id or plan in session metadata');
        return;
    }

    // Update user profile with subscription info
    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            subscription_plan: plan,
            stripe_customer_id: session.customer as string,
            subscription_status: 'active',
        })
        .eq('id', userId);

    if (profileError) {
        console.error('Error updating profile:', profileError);
        throw profileError;
    }

    // Create transaction record
    const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
            user_id: userId,
            stripe_payment_intent_id: session.payment_intent as string,
            stripe_subscription_id: session.subscription as string,
            stripe_customer_id: session.customer as string,
            amount: session.amount_total || 0,
            currency: session.currency || 'eur',
            status: 'completed',
            plan: plan,
        });

    if (transactionError) {
        console.error('Error creating transaction:', transactionError);
        throw transactionError;
    }

    console.log(`Checkout completed for user ${userId} with plan ${plan}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionUpdated(subscription: any, supabase: any) {
    const customerId = subscription.customer as string;

    // Find user by stripe_customer_id
    const { data: profile, error: findError } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

    if (findError || !profile) {
        console.error('Could not find user for customer:', customerId);
        return;
    }

    // Determine plan from price ID
    const priceId = subscription.items?.data?.[0]?.price?.id;
    let plan = 'free';

    if (priceId === process.env.STRIPE_PRICE_STANDARD) {
        plan = 'standard';
    } else if (priceId === process.env.STRIPE_PRICE_PREMIUM) {
        plan = 'premium';
    }

    const status = subscription.status === 'active' ? 'active' : 'inactive';
    const periodEnd = subscription.current_period_end;

    const { error } = await supabase
        .from('profiles')
        .update({
            subscription_plan: plan,
            subscription_status: status,
            subscription_end_date: periodEnd
                ? new Date(periodEnd * 1000).toISOString()
                : null,
        })
        .eq('id', profile.id);

    if (error) {
        console.error('Error updating subscription:', error);
        throw error;
    }

    console.log(`Subscription updated for user ${profile.id}: ${plan} (${status})`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionDeleted(subscription: any, supabase: any) {
    const customerId = subscription.customer as string;

    const { data: profile, error: findError } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

    if (findError || !profile) {
        console.error('Could not find user for customer:', customerId);
        return;
    }

    // Reset to free plan
    const { error } = await supabase
        .from('profiles')
        .update({
            subscription_plan: 'free',
            subscription_status: 'cancelled',
        })
        .eq('id', profile.id);

    if (error) {
        console.error('Error cancelling subscription:', error);
        throw error;
    }

    console.log(`Subscription cancelled for user ${profile.id}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentSucceeded(invoice: any, supabase: any) {
    const customerId = invoice.customer as string;
    const subscriptionId = invoice.subscription as string;

    const { data: profile } = await supabase
        .from('profiles')
        .select('id, subscription_plan')
        .eq('stripe_customer_id', customerId)
        .single();

    if (!profile) return;

    // Record recurring payment transaction
    await supabase.from('transactions').insert({
        user_id: profile.id,
        stripe_payment_intent_id: invoice.payment_intent as string,
        stripe_subscription_id: subscriptionId,
        stripe_customer_id: customerId,
        amount: invoice.amount_paid,
        currency: invoice.currency,
        status: 'completed',
        plan: profile.subscription_plan,
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentFailed(invoice: any, supabase: any) {
    const customerId = invoice.customer as string;

    const { data: profile } = await supabase
        .from('profiles')
        .select('id, subscription_plan')
        .eq('stripe_customer_id', customerId)
        .single();

    if (!profile) return;

    // Record failed payment
    await supabase.from('transactions').insert({
        user_id: profile.id,
        stripe_payment_intent_id: invoice.payment_intent as string,
        stripe_subscription_id: invoice.subscription as string,
        stripe_customer_id: customerId,
        amount: invoice.amount_due,
        currency: invoice.currency,
        status: 'failed',
        plan: profile.subscription_plan,
    });

    // Update subscription status
    await supabase
        .from('profiles')
        .update({ subscription_status: 'past_due' })
        .eq('id', profile.id);
}
