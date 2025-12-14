"use client";

import { MousePointer, Edit, Send } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MousePointer,
    title: "Choisissez un template",
    description:
      "Selectionnez parmi nos modeles professionnels celui qui correspond le mieux a votre activite.",
  },
  {
    number: "02",
    icon: Edit,
    title: "Personnalisez votre facture",
    description:
      "Ajoutez vos informations, logo, lignes de facturation et personnalisez les couleurs.",
  },
  {
    number: "03",
    icon: Send,
    title: "Exportez et envoyez",
    description:
      "Telechargez votre facture en PDF et envoyez-la directement a vos clients.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment ca marche
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Creez votre premiere facture en moins de 5 minutes
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-120px)] h-0.5 bg-gray-200">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rotate-45"></div>
                </div>
              )}

              <div className="text-center">
                {/* Step Number & Icon */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-white border-2 border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-lg">
                    <step.icon className="w-10 h-10 text-gray-600 transition-colors group-hover:text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
