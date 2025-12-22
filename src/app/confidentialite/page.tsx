"use client";

import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield } from "lucide-react";

export default function ConfidentialitePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-600 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              {t("privacy.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("privacy.title")}
            </h1>
            <p className="text-gray-500">
              {t("legal.lastUpdate")}: 22 décembre 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-gray max-w-none">
            <h2>{t("privacy.introTitle")}</h2>
            <p>{t("privacy.introContent")}</p>

            <h2>{t("privacy.dataCollectedTitle")}</h2>
            <p>{t("privacy.dataCollectedContent")}</p>
            <ul>
              <li><strong>{t("privacy.accountData")}:</strong> {t("privacy.accountDataDesc")}</li>
              <li><strong>{t("privacy.invoiceData")}:</strong> {t("privacy.invoiceDataDesc")}</li>
              <li><strong>{t("privacy.usageData")}:</strong> {t("privacy.usageDataDesc")}</li>
            </ul>

            <h2>{t("privacy.dataUseTitle")}</h2>
            <p>{t("privacy.dataUseContent")}</p>
            <ul>
              <li>{t("privacy.dataUse1")}</li>
              <li>{t("privacy.dataUse2")}</li>
              <li>{t("privacy.dataUse3")}</li>
              <li>{t("privacy.dataUse4")}</li>
            </ul>

            <h2>{t("privacy.dataStorageTitle")}</h2>
            <p>{t("privacy.dataStorageContent")}</p>

            <h2>{t("privacy.dataShareTitle")}</h2>
            <p>{t("privacy.dataShareContent")}</p>

            <h2>{t("privacy.cookiesTitle")}</h2>
            <p>{t("privacy.cookiesContent")}</p>

            <h2>{t("privacy.rightsTitle")}</h2>
            <p>{t("privacy.rightsContent")}</p>
            <ul>
              <li>{t("privacy.rights1")}</li>
              <li>{t("privacy.rights2")}</li>
              <li>{t("privacy.rights3")}</li>
              <li>{t("privacy.rights4")}</li>
            </ul>

            <h2>{t("privacy.contactTitle")}</h2>
            <p>{t("privacy.contactContent")}</p>
            <p><strong>Email:</strong> contact@invoicedesign.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
