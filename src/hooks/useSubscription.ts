'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

interface SubscriptionStatus {
    plan: 'free' | 'standard' | 'premium';
    exportsRemaining: number;
    canExport: boolean;
    isLoading: boolean;
}

export function useSubscription() {
    const { user } = useAuth();
    const [status, setStatus] = useState<SubscriptionStatus>({
        plan: 'free',
        exportsRemaining: 3,
        canExport: true,
        isLoading: true,
    });

    const checkExportLimit = useCallback(async () => {
        if (!user) {
            setStatus({
                plan: 'free',
                exportsRemaining: 0,
                canExport: false,
                isLoading: false,
            });
            return;
        }

        try {
            const response = await fetch('/api/check-export-limit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
            });
            const data = await response.json();

            setStatus({
                plan: data.subscriptionPlan || 'free',
                exportsRemaining: data.exportsRemaining,
                canExport: data.canExport,
                isLoading: false,
            });
        } catch (error) {
            console.error('Error checking subscription:', error);
            setStatus({
                plan: 'free',
                exportsRemaining: 0,
                canExport: false,
                isLoading: false,
            });
        }
    }, [user]);

    // Check on mount and when user changes
    useEffect(() => {
        checkExportLimit();
    }, [checkExportLimit]);

    // Refresh status
    const refresh = useCallback(() => {
        checkExportLimit();
    }, [checkExportLimit]);

    return {
        ...status,
        isFreeUser: status.plan === 'free',
        isPaidUser: status.plan === 'standard' || status.plan === 'premium',
        refresh,
    };
}
