"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FAQSchema, Breadcrumbs } from "@/components/seo";
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";

export default function FAQPage() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      titleKey: "faq.categoryGeneral",
      faqs: [
        { questionKey: "faq.q1", answerKey: "faq.a1" },
        { questionKey: "faq.q2", answerKey: "faq.a2" },
        { questionKey: "faq.q3", answerKey: "faq.a3" },
      ],
    },
    {
      titleKey: "faq.categoryPricing",
      faqs: [
        { questionKey: "pricing.faq1Q", answerKey: "pricing.faq1A" },
        { questionKey: "pricing.faq2Q", answerKey: "pricing.faq2A" },
        { questionKey: "pricing.faq3Q", answerKey: "pricing.faq3A" },
      ],
    },
    {
      titleKey: "faq.categoryFeatures",
      faqs: [
        { questionKey: "pricing.faq4Q", answerKey: "pricing.faq4A" },
        { questionKey: "faq.q4", answerKey: "faq.a4" },
        { questionKey: "faq.q5", answerKey: "faq.a5" },
      ],
    },
    {
      titleKey: "faq.categorySecurity",
      faqs: [
        { questionKey: "pricing.faq5Q", answerKey: "pricing.faq5A" },
        { questionKey: "pricing.faq6Q", answerKey: "pricing.faq6A" },
        { questionKey: "faq.q6", answerKey: "faq.a6" },
      ],
    },
  ];

  // Flatten all FAQs for accordion
  const allFaqs = faqCategories.flatMap((cat) => cat.faqs);

  // Données pour le schema FAQ (textes traduits)
  const faqSchemaData = allFaqs.map((faq) => ({
    question: t(faq.questionKey),
    answer: t(faq.answerKey),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* FAQ Schema JSON-LD pour SEO */}
      <FAQSchema faqs={faqSchemaData} />
      
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[{ label: language === "fr" ? "FAQ" : "FAQ", href: "/faq" }]}
            className="mb-8"
          />

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full text-purple-600 text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              {t("faq.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("faq.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("faq.subtitle")}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-16">
            {allFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {t(faq.questionKey)}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-600">
                    {t(faq.answerKey)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("faq.contactTitle")}
            </h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              {t("faq.contactSubtitle")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {t("faq.contactButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
