"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, Palette, Download, Users, Settings, Zap, ArrowRight, Book } from "lucide-react";

export default function DocumentationPage() {
  const { t } = useLanguage();

  const sections = [
    {
      icon: FileText,
      titleKey: "documentation.gettingStarted",
      descKey: "documentation.gettingStartedDesc",
      href: "/guide",
    },
    {
      icon: Palette,
      titleKey: "documentation.templates",
      descKey: "documentation.templatesDesc",
      href: "/documentation#templates",
    },
    {
      icon: Settings,
      titleKey: "documentation.customization",
      descKey: "documentation.customizationDesc",
      href: "/documentation#customization",
    },
    {
      icon: Download,
      titleKey: "documentation.export",
      descKey: "documentation.exportDesc",
      href: "/documentation#export",
    },
    {
      icon: Users,
      titleKey: "documentation.clients",
      descKey: "documentation.clientsDesc",
      href: "/documentation#clients",
    },
    {
      icon: Zap,
      titleKey: "documentation.advanced",
      descKey: "documentation.advancedDesc",
      href: "/documentation#advanced",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
              <Book className="w-4 h-4" />
              {t("documentation.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("documentation.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("documentation.subtitle")}
            </p>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {sections.map((section, index) => (
              <Link
                key={index}
                href={section.href}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <section.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {t(section.titleKey)}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t(section.descKey)}
                </p>
                <span className="inline-flex items-center text-blue-600 text-sm font-medium">
                  {t("common.learnMore")}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          {/* Templates Section */}
          <section id="templates" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("documentation.templatesTitle")}
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-6">
                {t("documentation.templatesContent")}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-600">{t("documentation.templatesStep1")}</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-600">{t("documentation.templatesStep2")}</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-600">{t("documentation.templatesStep3")}</p>
                </li>
              </ul>
            </div>
          </section>

          {/* Customization Section */}
          <section id="customization" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("documentation.customizationTitle")}
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-6">
                {t("documentation.customizationContent")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{t("documentation.colors")}</h4>
                  <p className="text-gray-600 text-sm">{t("documentation.colorsDesc")}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{t("documentation.logo")}</h4>
                  <p className="text-gray-600 text-sm">{t("documentation.logoDesc")}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{t("documentation.blocks")}</h4>
                  <p className="text-gray-600 text-sm">{t("documentation.blocksDesc")}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{t("documentation.fonts")}</h4>
                  <p className="text-gray-600 text-sm">{t("documentation.fontsDesc")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Export Section */}
          <section id="export" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("documentation.exportTitle")}
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-6">
                {t("documentation.exportContent")}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg">
                  <Download className="w-4 h-4" />
                  PDF
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg">
                  <Download className="w-4 h-4" />
                  PNG
                </div>
              </div>
            </div>
          </section>

          {/* Clients Section */}
          <section id="clients" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("documentation.clientsTitle")}
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-6">
                {t("documentation.clientsContent")}
              </p>
            </div>
          </section>

          {/* Advanced Section */}
          <section id="advanced" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("documentation.advancedTitle")}
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-6">
                {t("documentation.advancedContent")}
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t("documentation.ctaTitle")}
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                {t("documentation.ctaSubtitle")}
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                {t("common.createInvoice")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
