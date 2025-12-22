"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  const plans = [
    {
      id: "standard",
      name: t("pricing.standardName"),
      price: "3.99",
      period: t("pricing.perMonth"),
      description: t("pricing.standardDesc"),
      features: [
        { name: t("pricing.unlimitedInvoices"), included: true },
        { name: t("pricing.allTemplates"), included: true },
        { name: t("pricing.pdfExport"), included: true },
        { name: t("pricing.noWatermark"), included: true },
        { name: t("pricing.customLogo"), included: true },
        { name: t("pricing.emailSupport"), included: true },
        { name: t("pricing.dynamicInvoices"), included: false },
        { name: t("pricing.prioritySupport"), included: false },
      ],
      cta: t("pricing.chooseStandard"),
      popular: true,
    },
    {
      id: "premium",
      name: t("pricing.premiumName"),
      price: "6.99",
      period: t("pricing.perMonth"),
      description: t("pricing.premiumDesc"),
      features: [
        { name: t("pricing.includesStandard"), included: true },
        { name: t("pricing.dynamicInvoices"), included: true },
        { name: t("pricing.prioritySupport"), included: true },
        { name: t("pricing.apiAccess"), included: true },
        { name: t("pricing.multiUsers"), included: true },
        { name: t("pricing.advancedStats"), included: true },
        { name: t("pricing.multiFormat"), included: true },
        { name: t("pricing.recurringInvoices"), included: true },
      ],
      cta: t("pricing.choosePremium"),
      popular: false,
    },
  ];

  const faqs = [
    {
      question: t("pricing.faq1Q"),
      answer: t("pricing.faq1A"),
    },
    {
      question: t("pricing.faq2Q"),
      answer: t("pricing.faq2A"),
    },
    {
      question: t("pricing.faq3Q"),
      answer: t("pricing.faq3A"),
    },
    {
      question: t("pricing.faq4Q"),
      answer: t("pricing.faq4A"),
    },
    {
      question: t("pricing.faq5Q"),
      answer: t("pricing.faq5A"),
    },
    {
      question: t("pricing.faq6Q"),
      answer: t("pricing.faq6A"),
    },
  ];

  const handlePlanClick = () => {
    if (user) {
      // User is logged in - redirect to dashboard pricing section
      router.push("/dashboard?section=pricing");
    } else {
      // User is not logged in - redirect to signup
      router.push("/auth/signup?redirect=/dashboard");
    }
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              {t("pricing.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
              {t("pricing.subtitle")}
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 -mt-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {plans.map((plan, index) => (
                <Card
                  key={plan.id}
                  className={`relative opacity-0 animate-fade-in-up flex flex-col ${plan.popular
                    ? "border-2 border-blue-500 shadow-xl scale-105 z-10"
                    : "border border-gray-200"
                    }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                  padding="none"
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-blue-600 text-white text-sm font-semibold">
                      {t("pricing.popular")}
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-6">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-xl text-gray-500 ml-1">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Minus className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${feature.included ? "text-gray-700" : "text-gray-400"
                              }`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      variant={plan.popular ? "primary" : "outline"}
                      className="w-full mt-auto"
                      size="lg"
                      onClick={handlePlanClick}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("pricing.faqTitle")}
              </h2>
              <p className="text-gray-600">
                {t("pricing.faqSubtitle")}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 overflow-hidden transition-shadow duration-200 hover:shadow-md"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <span
                      className={`ml-4 flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-300 transition-transform duration-200 ${openFaq === index ? "rotate-45" : ""
                        }`}
                    >
                      <span className="text-gray-600">+</span>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-48" : "max-h-0"
                      }`}
                  >
                    <p className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}



