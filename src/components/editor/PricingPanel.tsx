"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Check, Sparkles, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PricingPanel = () => {
    const { t } = useLanguage();

    const plans = [
        {
            name: t("pricing.standardName"),
            price: "3.99",
            period: t("pricing.perMonth"),
            description: t("pricing.standardDesc"),
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
            stripeLink: "https://buy.stripe.com/test_xxx",
        },
        {
            name: t("pricing.premiumName"),
            price: "6.99",
            period: t("pricing.perMonth"),
            description: t("pricing.premiumDesc"),
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
            stripeLink: "https://buy.stripe.com/test_yyy",
        },
    ];

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
                                {plan.price}
                            </span>
                            <span className="text-gray-500 text-sm">{plan.period}</span>
                        </div>

                        <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <a
                            href={plan.stripeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <Button
                                className="w-full"
                                variant={plan.popular ? "primary" : "outline"}
                            >
                                {plan.cta}
                            </Button>
                        </a>
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

