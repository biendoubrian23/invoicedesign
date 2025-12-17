"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { User, Mail, Key, Save, Loader2, CreditCard, ExternalLink } from 'lucide-react';
import { getSupabase } from '@/lib/supabase/client';

interface SubscriptionInfo {
    subscription_plan: 'free' | 'standard' | 'premium';
    subscription_status: string;
    subscription_end_date: string | null;
    stripe_customer_id: string | null;
}

const SettingsPanel = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [portalLoading, setPortalLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);

    useEffect(() => {
        if (user) {
            setFullName(user.user_metadata?.full_name || '');
            loadSubscriptionInfo();
        }
    }, [user]);

    const loadSubscriptionInfo = async () => {
        if (!user) return;

        const supabase = getSupabase();
        const { data } = await supabase
            .from('profiles')
            .select('subscription_plan, subscription_status, subscription_end_date, stripe_customer_id')
            .eq('id', user.id)
            .single();

        if (data) {
            setSubscriptionInfo(data);
        }
    };

    const handleSave = async () => {
        if (!user) return;

        setLoading(true);
        setMessage(null);

        const supabase = getSupabase();

        const { error } = await supabase.auth.updateUser({
            data: { full_name: fullName }
        });

        if (error) {
            setMessage({ type: 'error', text: t('settings.saveError') });
        } else {
            setMessage({ type: 'success', text: t('settings.saveSuccess') });
            await supabase
                .from('profiles')
                .update({ full_name: fullName })
                .eq('id', user.id);
        }

        setLoading(false);
    };

    const handleManageSubscription = async () => {
        if (!user) return;

        setPortalLoading(true);

        try {
            const response = await fetch('/api/create-portal-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                setMessage({ type: 'error', text: t('settings.noSubscription') });
            }
        } catch (error) {
            console.error('Error opening portal:', error);
            setMessage({ type: 'error', text: t('settings.portalError') });
        } finally {
            setPortalLoading(false);
        }
    };

    const getPlanBadgeColor = (plan: string) => {
        switch (plan) {
            case 'premium':
                return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'standard':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getPlanName = (plan: string) => {
        switch (plan) {
            case 'premium':
                return 'Premium';
            case 'standard':
                return 'Standard';
            default:
                return t('settings.freePlan');
        }
    };

    if (!user) {
        return (
            <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    {t('settings.title')}
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                        {t('settings.loginRequired')}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 overflow-y-auto h-full">
            {/* Header */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {t('settings.title')}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    {t('settings.subtitle')}
                </p>
            </div>

            {/* Message */}
            {message && (
                <div className={`p-3 rounded-lg text-sm ${message.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Subscription Section */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    {t('settings.subscription')}
                </h4>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {/* Current Plan */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{t('settings.currentPlan')}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getPlanBadgeColor(subscriptionInfo?.subscription_plan || 'free')}`}>
                            {getPlanName(subscriptionInfo?.subscription_plan || 'free')}
                        </span>
                    </div>

                    {/* Subscription Status */}
                    {subscriptionInfo?.subscription_status && subscriptionInfo.subscription_plan !== 'free' && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{t('settings.status')}</span>
                            <span className={`text-sm font-medium ${subscriptionInfo.subscription_status === 'active' ? 'text-green-600' : 'text-yellow-600'
                                }`}>
                                {subscriptionInfo.subscription_status === 'active' ? t('settings.active') : subscriptionInfo.subscription_status}
                            </span>
                        </div>
                    )}

                    {/* Next Billing Date */}
                    {subscriptionInfo?.subscription_end_date && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{t('settings.nextBilling')}</span>
                            <span className="text-sm text-gray-700">
                                {new Date(subscriptionInfo.subscription_end_date).toLocaleDateString('fr-FR')}
                            </span>
                        </div>
                    )}
                </div>

                {/* Manage Subscription Button */}
                {subscriptionInfo?.stripe_customer_id ? (
                    <button
                        onClick={handleManageSubscription}
                        disabled={portalLoading}
                        className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {portalLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <ExternalLink className="w-4 h-4" />
                        )}
                        {t('settings.manageSubscription')}
                    </button>
                ) : (
                    <a
                        href="/dashboard"
                        onClick={() => {
                            // Navigate to pricing section
                            const event = new CustomEvent('navigate-to-section', { detail: 'pricing' });
                            window.dispatchEvent(event);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                    >
                        {t('settings.upgradePlan')}
                    </a>
                )}
            </div>

            {/* Profile Section */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('settings.profile')}
                </h4>

                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t('settings.fullName')}
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                        placeholder={t('settings.yourName')}
                    />
                </div>

                {/* Email (read-only) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                    </label>
                    <input
                        type="email"
                        value={user.email || ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-400 mt-1">{t('settings.emailReadOnly')}</p>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {loading ? t('settings.saving') : t('settings.save')}
                </button>
            </div>

            {/* Security Section */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    {t('settings.security')}
                </h4>

                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                        {t('settings.passwordHint')}
                    </p>
                </div>
            </div>

            {/* Account Info */}
            <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                    {t('settings.accountInfo')}
                </h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">{t('settings.userId')}</span>
                        <span className="text-gray-700 font-mono text-xs">{user.id.slice(0, 8)}...</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">{t('settings.registrationDate')}</span>
                        <span className="text-gray-700">
                            {new Date(user.created_at).toLocaleDateString('fr-FR')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;

