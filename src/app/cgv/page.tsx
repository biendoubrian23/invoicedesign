"use client";

import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText } from "lucide-react";

export default function CGVPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              {t("terms.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("terms.title")}
            </h1>
            <p className="text-gray-500">
              {t("legal.lastUpdate")}: 22 décembre 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-gray max-w-none">
            <h2>{t("terms.objectTitle")}</h2>
            <p>{t("terms.objectContent")}</p>

            <h2>{t("terms.servicesTitle")}</h2>
            <p>{t("terms.servicesContent")}</p>
            <ul>
              <li>{t("terms.service1")}</li>
              <li>{t("terms.service2")}</li>
              <li>{t("terms.service3")}</li>
              <li>{t("terms.service4")}</li>
            </ul>

            <h2>{t("terms.subscriptionTitle")}</h2>
            <p>{t("terms.subscriptionContent")}</p>

            <h2>{t("terms.pricingTitle")}</h2>
            <p>{t("terms.pricingContent")}</p>
            <ul>
              <li><strong>{t("terms.freePlan")}:</strong> {t("terms.freePlanDesc")}</li>
              <li><strong>{t("terms.standardPlan")}:</strong> {t("terms.standardPlanDesc")}</li>
              <li><strong>{t("terms.premiumPlan")}:</strong> {t("terms.premiumPlanDesc")}</li>
            </ul>

            <h2>{t("terms.paymentTitle")}</h2>
            <p>{t("terms.paymentContent")}</p>

            <h2>{t("terms.cancellationTitle")}</h2>
            <p>{t("terms.cancellationContent")}</p>

            <h2>{t("terms.refundTitle")}</h2>
            <p>{t("terms.refundContent")}</p>

            <h2>{t("terms.obligationsTitle")}</h2>
            <p>{t("terms.obligationsContent")}</p>
            <ul>
              <li>{t("terms.obligation1")}</li>
              <li>{t("terms.obligation2")}</li>
              <li>{t("terms.obligation3")}</li>
            </ul>

            <h2>{t("terms.limitationTitle")}</h2>
            <p>{t("terms.limitationContent")}</p>

            <h2>{t("terms.modificationTitle")}</h2>
            <p>{t("terms.modificationContent")}</p>

            <h2>{t("terms.lawTitle")}</h2>
            <p>{t("terms.lawContent")}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
