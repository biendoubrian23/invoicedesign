"use client";

import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Scale } from "lucide-react";

export default function MentionsLegalesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-6">
              <Scale className="w-4 h-4" />
              {t("legal.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("legal.mentionsTitle")}
            </h1>
            <p className="text-gray-500">
              {t("legal.lastUpdate")}: 22 décembre 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-gray max-w-none">
            <h2>{t("legal.editorTitle")}</h2>
            <p>{t("legal.editorContent")}</p>
            <ul>
              <li><strong>{t("legal.companyName")}:</strong> InvoiceDesign</li>
              <li><strong>{t("legal.address")}:</strong> Paris, France</li>
              <li><strong>{t("legal.email")}:</strong> contact@invoicedesign.com</li>
            </ul>

            <h2>{t("legal.intellectualPropertyTitle")}</h2>
            <p>{t("legal.intellectualPropertyContent")}</p>

            <h2>{t("legal.responsibilityTitle")}</h2>
            <p>{t("legal.responsibilityContent")}</p>

            <h2>{t("legal.linksTitle")}</h2>
            <p>{t("legal.linksContent")}</p>

            <h2>{t("legal.disputesTitle")}</h2>
            <p>{t("legal.disputesContent")}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
