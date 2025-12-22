"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle, ArrowRight, Play, Clock, Star } from "lucide-react";

export default function GuidePage() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      titleKey: "guide.step1Title",
      descKey: "guide.step1Desc",
      tips: ["guide.step1Tip1", "guide.step1Tip2"],
    },
    {
      number: "02",
      titleKey: "guide.step2Title",
      descKey: "guide.step2Desc",
      tips: ["guide.step2Tip1", "guide.step2Tip2"],
    },
    {
      number: "03",
      titleKey: "guide.step3Title",
      descKey: "guide.step3Desc",
      tips: ["guide.step3Tip1", "guide.step3Tip2"],
    },
    {
      number: "04",
      titleKey: "guide.step4Title",
      descKey: "guide.step4Desc",
      tips: ["guide.step4Tip1", "guide.step4Tip2"],
    },
    {
      number: "05",
      titleKey: "guide.step5Title",
      descKey: "guide.step5Desc",
      tips: ["guide.step5Tip1", "guide.step5Tip2"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-600 text-sm font-medium mb-6">
              <Play className="w-4 h-4" />
              {t("guide.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("guide.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {t("guide.subtitle")}
            </p>
            <div className="inline-flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t("guide.readTime")}
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                {t("guide.difficulty")}
              </span>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {t(step.titleKey)}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {t(step.descKey)}
                    </p>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-blue-900 mb-3">
                        💡 {t("guide.tips")}
                      </h4>
                      <ul className="space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-sm text-blue-800">
                            <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            {t(tip)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t("guide.nextStepsTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/documentation"
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  {t("guide.docLink")}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t("guide.docLinkDesc")}
                </p>
                <span className="inline-flex items-center text-blue-600 text-sm font-medium">
                  {t("common.learnMore")}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/faq"
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  {t("guide.faqLink")}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t("guide.faqLinkDesc")}
                </p>
                <span className="inline-flex items-center text-blue-600 text-sm font-medium">
                  {t("common.learnMore")}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              {t("guide.ctaButton")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
