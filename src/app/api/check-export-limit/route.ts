import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const FREE_EXPORT_LIMIT = 3;

// Get Supabase client
const getSupabase = () => createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            // Non-authenticated users can't export
            return NextResponse.json({
                canExport: false,
                reason: 'not_authenticated',
                exportsRemaining: 0,
            });
        }

        const supabase = getSupabase();

        // Get user profile
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('subscription_plan, export_count')
            .eq('id', userId)
            .single();

        if (error || !profile) {
            return NextResponse.json({
                canExport: false,
                reason: 'profile_not_found',
                exportsRemaining: 0,
            });
        }

        const { subscription_plan, export_count = 0 } = profile;

        // Paid users have unlimited exports
        if (subscription_plan === 'standard' || subscription_plan === 'premium') {
            return NextResponse.json({
                canExport: true,
                reason: 'paid_user',
                exportsRemaining: -1, // -1 = unlimited
                subscriptionPlan: subscription_plan,
            });
        }

        // Free users check export limit
        if (export_count >= FREE_EXPORT_LIMIT) {
            return NextResponse.json({
                canExport: false,
                reason: 'limit_reached',
                exportsRemaining: 0,
                subscriptionPlan: 'free',
            });
        }

        return NextResponse.json({
            canExport: true,
            reason: 'free_user',
            exportsRemaining: FREE_EXPORT_LIMIT - export_count,
            subscriptionPlan: 'free',
        });
    } catch (error) {
        console.error('Error checking export limit:', error);
        return NextResponse.json(
            { error: 'Failed to check export limit' },
            { status: 500 }
        );
    }
}

// Increment export count after successful export
export async function PUT(request: NextRequest) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json({ success: false });
        }

        const supabase = getSupabase();

        // Get current count
        const { data: profile } = await supabase
            .from('profiles')
            .select('subscription_plan, export_count')
            .eq('id', userId)
            .single();

        // Only increment for free users
        if (profile?.subscription_plan === 'free') {
            await supabase
                .from('profiles')
                .update({ export_count: (profile.export_count || 0) + 1 })
                .eq('id', userId);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error incrementing export count:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
