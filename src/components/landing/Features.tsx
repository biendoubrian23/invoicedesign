"use client";

import { FileText, Palette, Zap, Download } from "lucide-react";
import Card from "@/components/ui/Card";
import { useLanguage } from "@/context/LanguageContext";

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: FileText,
      title: t("features.proTemplates"),
      description: t("features.proTemplatesDesc"),
    },
    {
      icon: Palette,
      title: t("features.fullCustom"),
      description: t("features.fullCustomDesc"),
    },
    {
      icon: Zap,
      title: t("features.autoCalc"),
      description: t("features.autoCalcDesc"),
    },
    {
      icon: Download,
      title: t("features.pdfExport"),
      description: t("features.pdfExportDesc"),
    },
  ];

  return (
    <section id="features" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("features.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              hover
              className="group opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-100">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

