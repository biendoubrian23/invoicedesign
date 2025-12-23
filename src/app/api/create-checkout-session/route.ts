import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization to avoid build errors
const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { priceId, plan, userId, userEmail, billingPeriod } = await request.json();

        if (!priceId || !plan || !userId || !userEmail) {
            return NextResponse.json(
                { error: 'Missing required fields. User must be logged in to subscribe.' },
                { status: 400 }
            );
        }

        const stripe = getStripe();

        // Determine billing period from priceId if not provided
        const period = billingPeriod || (
            priceId.includes('ShRP') || priceId.includes('ShRR') ? 'yearly' : 'monthly'
        );

        // Create or retrieve Stripe customer
        let customerId: string;

        // Check if user already has a Stripe customer ID
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL || '',
            process.env.SUPABASE_SERVICE_ROLE_KEY || ''
        );

        const { data: profile } = await supabase
            .from('profiles')
            .select('stripe_customer_id')
            .eq('id', userId)
            .single();

        if (profile?.stripe_customer_id) {
            customerId = profile.stripe_customer_id;
            
            // Update customer email if it has changed
            await stripe.customers.update(customerId, {
                email: userEmail,
            });
        } else {
            // Create new Stripe customer
            const customer = await stripe.customers.create({
                email: userEmail,
                metadata: {
                    supabase_user_id: userId,
                },
            });
            customerId = customer.id;

            // Save customer ID to profile
            await supabase
                .from('profiles')
                .update({ stripe_customer_id: customerId })
                .eq('id', userId);
        }

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true&plan=${plan}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?canceled=true`,
            metadata: {
                user_id: userId,
                plan: plan,
                billing_period: period,
            },
            subscription_data: {
                metadata: {
                    user_id: userId,
                    plan: plan,
                    billing_period: period,
                },
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
