"use client";

import { FileText, Palette, Zap, Download } from "lucide-react";
import Card from "@/components/ui/Card";

const features = [
  {
    icon: FileText,
    title: "Templates professionnels",
    description:
      "Choisissez parmi plusieurs modeles de factures concus pour impressionner vos clients.",
  },
  {
    icon: Palette,
    title: "Personnalisation complete",
    description:
      "Modifiez les couleurs, polices, logo et disposition pour correspondre a votre marque.",
  },
  {
    icon: Zap,
    title: "Calculs automatiques",
    description:
      "Les totaux, taxes et sous-totaux sont calcules automatiquement en temps reel.",
  },
  {
    icon: Download,
    title: "Export PDF instantane",
    description:
      "Telechargez vos factures en PDF haute qualite pret a envoyer a vos clients.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des outils puissants pour creer des factures professionnelles sans
            effort
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
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
