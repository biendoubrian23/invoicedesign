"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Check, Sparkles, Zap, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const STRIPE_PRICES = {
    standard: process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD || "price_1SfH9SFFkQ3ldtDToy3sdoLw",
    premium: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM || "price_1SfH9tFFkQ3ldtDTCd41zSyu",
    standardYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD_YEARLY || "",
    premiumYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_YEARLY || "",
};

const PricingPanel = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);
    const [isYearly, setIsYearly] = useState(true);

    const plans = [
        {
            id: "standard",
            name: t("pricing.standardName"),
            priceMonthly: "3.99",
            priceYearly: "39.99",
            period: isYearly ? t("pricing.perYear") : t("pricing.perMonth"),
            description: t("pricing.standardDesc"),
            savings: isYearly ? "2 mois gratuits" : null,
            features: [
                t("pricing.unlimitedInvoices"),
                t("pricing.allTemplates"),
                t("pricing.noWatermark"),
                t("pricing.customLogo"),
                t("pricing.emailSupport"),
                t("pricing.pdfExport"),
            ],
            cta: t("pricing.chooseStandard"),
            popular: true,
            icon: Sparkles,
            priceId: isYearly ? STRIPE_PRICES.standardYearly : STRIPE_PRICES.standard,
        },
        {
            id: "premium",
            name: t("pricing.premiumName"),
            priceMonthly: "6.99",
            priceYearly: "69.99",
            period: isYearly ? t("pricing.perYear") : t("pricing.perMonth"),
            description: t("pricing.premiumDesc"),
            savings: isYearly ? "2 mois gratuits" : null,
            features: [
                t("pricing.includesStandard"),
                t("pricing.dynamicInvoices"),
                t("pricing.prioritySupport"),
                t("pricing.apiAccess"),
                t("pricing.multiUsers"),
                t("pricing.advancedStats"),
                t("pricing.multiFormat"),
            ],
            cta: t("pricing.choosePremium"),
            popular: false,
            icon: Zap,
            priceId: isYearly ? STRIPE_PRICES.premiumYearly : STRIPE_PRICES.premium,
        },
    ];

    const handleSubscribe = async (plan: typeof plans[0]) => {
        if (!user) {
            router.push("/auth/login?redirect=/dashboard");
            return;
        }

        setLoading(plan.id);

        try {
            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priceId: plan.priceId,
                    plan: plan.id,
                    userId: user.id,
                    userEmail: user.email,
                    billingPeriod: isYearly ? 'yearly' : 'monthly',
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("No checkout URL returned");
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="p-6 space-y-6 overflow-y-auto h-full">
            {/* Header */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {t("pricingPanel.title")}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    {t("pricingPanel.subtitle")}
                </p>
            </div>

            {/* Toggle Mensuel/Annuel */}
            <div className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                    Mensuel
                </span>
                <button
                    onClick={() => setIsYearly(!isYearly)}
                    className={`toggle-switch ${isYearly ? 'active' : ''}`}
                >
                    <span className="toggle-switch-knob" />
                </button>
                <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                    Annuel
                </span>
                {isYearly && (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                        -17%
                    </span>
                )}
            </div>

            {/* Pricing Cards */}
            <div className="space-y-4">
                {plans.map((plan, index) => (
                    <Card
                        key={index}
                        className={`relative overflow-hidden ${plan.popular ? "ring-2 ring-blue-500" : ""
                            }`}
                        padding="md"
                    >
                        {plan.popular && (
                            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                                {t("pricing.popular")}
                            </div>
                        )}

                        <div className="flex items-start gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${plan.popular ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                <plan.icon className={`w-5 h-5 ${plan.popular ? 'text-blue-600' : 'text-gray-600'}`} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                                <p className="text-xs text-gray-500">{plan.description}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <span className="text-3xl font-bold text-gray-900">
                                {isYearly ? plan.priceYearly : plan.priceMonthly}€
                            </span>
                            <span className="text-gray-500 text-sm">{plan.period}</span>
                            {plan.savings && (
                                <p className="text-xs text-green-600 font-medium mt-1">
                                    {plan.savings}
                                </p>
                            )}
                        </div>

                        <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            className="w-full"
                            variant={plan.popular ? "primary" : "outline"}
                            onClick={() => handleSubscribe(plan)}
                            disabled={loading !== null}
                        >
                            {loading === plan.id ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    {t("common.loading")}
                                </>
                            ) : (
                                plan.cta
                            )}
                        </Button>
                    </Card>
                ))}
            </div>

            {/* Free Plan Note */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">
                    <span className="font-medium">{t("pricingPanel.freePlan")}</span> {t("pricingPanel.freePlanDesc")}
                </p>
            </div>

            {/* FAQ Link */}
            <div className="text-center">
                <a
                    href="/pricing#faq"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    {t("pricingPanel.faqLink")}
                </a>
            </div>
        </div>
    );
};

export default PricingPanel;


