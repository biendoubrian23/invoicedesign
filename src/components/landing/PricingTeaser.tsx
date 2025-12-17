"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Check, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PricingTeaser = () => {
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
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("pricingTeaser.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("pricingTeaser.subtitle")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative opacity-0 animate-fade-in-up ${plan.popular
                ? "border-2 border-blue-500 shadow-lg"
                : "border border-gray-200"
                }`}
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
              padding="lg"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-medium">
                  {t("pricing.popular")}
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "primary" : "outline"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* Link to Full Pricing */}
        <div className="text-center mt-12">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors group"
          >
            {t("pricingTeaser.viewPricing")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;

