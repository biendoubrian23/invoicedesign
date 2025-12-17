"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Edit3, Settings, Download, Puzzle, Move, Layers, Sparkles } from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden">
      {/* Elegant Wave Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top wave - very subtle */}
        <svg
          className="absolute top-0 left-0 w-full h-[600px] opacity-60"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMin slice"
        >
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#bfdbfe" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* First wave layer */}
          <path
            d="M0,100 C200,180 400,50 600,120 C800,190 1000,80 1200,150 C1400,220 1440,160 1440,160 L1440,0 L0,0 Z"
            fill="url(#wave-gradient-1)"
          />

          {/* Second wave layer */}
          <path
            d="M0,200 C150,120 350,220 550,160 C750,100 950,200 1150,140 C1350,80 1440,120 1440,120 L1440,0 L0,0 Z"
            fill="url(#wave-gradient-2)"
          />
        </svg>

        {/* Bottom decorative waves - behind content */}
        <svg
          className="absolute top-0 left-0 w-full h-[1200px]"
          viewBox="0 0 1440 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="wave-bottom-bg-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#bfdbfe" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="wave-bottom-bg-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="wave-bottom-bg-3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#bfdbfe" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Back wave - thickest */}
          <path
            d="M0,650 C200,450 400,850 600,600 C800,350 1000,650 1200,400 C1400,150 1440,400 1440,400 L1440,1200 L0,1200 Z"
            fill="url(#wave-bottom-bg-1)"
          />

          {/* Middle wave */}
          <path
            d="M0,600 C150,800 350,400 550,640 C750,880 950,480 1150,720 C1350,960 1440,640 1440,640 L1440,1200 L0,1200 Z"
            fill="url(#wave-bottom-bg-2)"
          />

          {/* Front wave - most visible */}
          <path
            d="M0,800 C240,560 480,1000 720,720 C960,440 1200,880 1440,600 L1440,1200 L0,1200 Z"
            fill="url(#wave-bottom-bg-3)"
          />
        </svg>

        {/* Floating decorative circles */}
        <div className="absolute top-20 right-[15%] w-64 h-64 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute top-40 left-[10%] w-48 h-48 bg-indigo-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-[25%] w-32 h-32 bg-blue-50/40 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-left flex flex-col">
            {/* Badge - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6 animate-fade-in w-fit">
              <span className="w-2 h-2 bg-blue-500 animate-pulse"></span>
              {t("hero.badge")}
            </div>

            {/* Main Heading - Order 1 on mobile */}
            <h1 className="order-1 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              {t("hero.title1")}
              <br />
              <span className="text-blue-600">{t("hero.title2")}</span> {t("hero.title3")}
            </h1>

            {/* Mobile Image - Order 2, hidden on desktop */}
            <div className="order-2 lg:hidden mb-4 animate-fade-in-up stagger-1 max-w-xs mx-auto">
              <Image
                src="/herosections2.png"
                alt="InvoiceDesign - Éditeur de factures intuitif"
                width={600}
                height={450}
                quality={90}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* CTA Buttons - Order 3 on mobile (before description) */}
            <div className="order-3 lg:order-4 flex flex-row items-center gap-2 mb-4 lg:mb-0 animate-fade-in-up stagger-2">
              <Link href="/dashboard">
                <Button size="sm" className="group text-sm py-2 px-4 lg:py-3 lg:px-6 lg:text-base">
                  {t("common.tryFree")}
                  <ArrowRight className="ml-1 w-3 h-3 lg:ml-2 lg:w-4 lg:h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/#features">
                <Button variant="outline" size="sm" className="text-sm py-2 px-3 lg:py-3 lg:px-6 lg:text-base bg-white/80 backdrop-blur-sm border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300">
                  <svg className="w-3 h-3 mr-1 lg:w-4 lg:h-4 lg:mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {t("common.viewDemo")}
                </Button>
              </Link>
            </div>

            {/* Subheading - Order 4 on mobile (after buttons) */}
            <p className="order-4 lg:order-3 text-lg md:text-xl text-gray-600 font-medium mb-8 lg:mb-8 animate-fade-in-up stagger-1">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Right Side - Hero Image (Desktop only) */}
          <div className="relative animate-fade-in-up stagger-3 hidden lg:block">
            <Image
              src="/herosections2.png"
              alt="InvoiceDesign - Éditeur de factures intuitif"
              width={1200}
              height={900}
              quality={100}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>




      {/* Section Modularité - Blocs personnalisables */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Interactive Preview */}
          <div className="relative order-2 lg:order-1">
            {/* Floating modular blocks - Left side */}
            <div className="absolute -left-4 top-8 z-10 hidden lg:block animate-fade-in-up animate-float">
              <div className="bg-white border border-blue-200 shadow-lg px-3 py-2 flex items-center gap-2 text-sm font-medium text-blue-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {t("hero.parameters")}
              </div>
            </div>
            <div className="absolute -left-8 top-32 z-10 hidden lg:block animate-fade-in-up stagger-1 animate-float-alt">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg px-3 py-2 flex items-center gap-2 text-sm font-medium text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                {t("hero.signature")}
              </div>
            </div>
            <div className="absolute -left-2 bottom-24 z-10 hidden lg:block animate-fade-in-up stagger-2 animate-float-slow">
              <div className="bg-white border border-green-200 shadow-lg px-3 py-2 flex items-center gap-2 text-sm font-medium text-green-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                {t("hero.qrCode")}
              </div>
            </div>

            {/* Floating modular blocks - Right side */}
            <div className="absolute -right-6 top-16 z-10 hidden lg:block animate-fade-in-up stagger-1 animate-float-alt">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg px-3 py-2 flex items-center gap-2 text-sm font-medium text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Logo
              </div>
            </div>
            <div className="absolute -right-4 top-40 z-10 hidden lg:block animate-fade-in-up stagger-2 animate-float">
              <div className="bg-white border border-orange-200 shadow-lg px-3 py-2 flex items-center gap-2 text-sm font-medium text-orange-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t("hero.conditions")}
              </div>
            </div>
            <div className="absolute -right-8 bottom-20 z-10 hidden lg:block animate-fade-in-up stagger-3 animate-float-slow">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg px-3 py-2 flex items-center gap-2 text-sm font-medium text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {t("hero.tables")}
              </div>
            </div>

            <div className="bg-white border border-gray-200 shadow-2xl overflow-hidden rounded-lg">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-500 text-center">
                    invoicedesign.com/dashboard
                  </div>
                </div>
              </div>

              {/* Split View Preview */}
              <div className="flex flex-col md:flex-row min-h-[400px]">
                {/* Editor Side */}
                <div className="flex-1 p-6 bg-gray-50 border-r border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                      <Edit3 className="w-4 h-4" />
                      {t("hero.editZone")}
                    </div>

                    {/* Form Preview */}
                    <div className="space-y-3">
                      <div className="bg-white border border-gray-200 p-3 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <span className="text-xs text-gray-500 block mb-1">{t("hero.companyName")}</span>
                        <span className="text-sm font-medium text-gray-900">{t("hero.yourCompany")}</span>
                      </div>
                      <div className="bg-white border border-gray-200 p-3 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <span className="text-xs text-gray-500 block mb-1">{t("hero.client")}</span>
                        <span className="text-sm font-medium text-gray-900">Client XYZ</span>
                      </div>
                      <div className="bg-white border border-gray-200 p-3 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <span className="text-xs text-gray-500 block mb-1">{t("hero.totalAmount")}</span>
                        <span className="text-lg font-bold text-blue-600">1 200,00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Side */}
                <div className="flex-1 p-6 flex items-center justify-center bg-gray-100">
                  <div className="w-full max-w-xs bg-white shadow-lg rounded-lg p-6 transform hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-blue-600 rounded"></div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{t("hero.invoice")}</div>
                        <div className="text-xs text-gray-500">N° 2024-001</div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="font-medium text-gray-900">{t("hero.from")}</div>
                          <div className="text-gray-600">{t("hero.yourCompany")}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{t("hero.to")}</div>
                          <div className="text-gray-600">Client XYZ</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-600">{t("hero.service")}</span>
                        <span className="font-medium">1 000,00</span>
                      </div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-600">{t("hero.vat")} (20%)</span>
                        <span className="font-medium">200,00</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200 mt-2">
                        <span>{t("hero.totalInc")}</span>
                        <span className="text-blue-600">1 200,00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Text Content about Modularity */}
          <div className="order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 text-sm font-medium rounded-full mb-6">
              <Puzzle className="w-4 h-4" />
              {t("hero.modularBadge")}
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("hero.modularTitle1")}
              <br />
              <span className="text-blue-600">{t("hero.modularTitle2")}</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("hero.modularDesc")}
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Move className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t("hero.dragDrop")}</h3>
                  <p className="text-sm text-gray-600">{t("hero.dragDropDesc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t("hero.customBlocks")}</h3>
                  <p className="text-sm text-gray-600">{t("hero.customBlocksDesc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t("hero.zeroLearning")}</h3>
                  <p className="text-sm text-gray-600">{t("hero.zeroLearningDesc")}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link href="/dashboard">
              <Button size="lg" className="group">
                {t("common.tryNow")}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Hero;
