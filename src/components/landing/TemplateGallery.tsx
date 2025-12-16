"use client";

import { useState } from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Template traditionnel et professionnel",
    color: "#2563eb",
    image: "/model1.png",
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Design epure et minimaliste",
    color: "#000000",
    image: "/model2.jpeg",
  },
];

const TemplateGallery = () => {
  const [activeTemplate, setActiveTemplate] = useState("classic");

  return (
    <section id="templates" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Templates de factures
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choisissez le modele qui correspond a votre style et personnalisez-le
          </p>
        </div>

        {/* Templates Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className={`cursor-pointer opacity-0 animate-fade-in-up ${activeTemplate === template.id ? "ring-2 ring-blue-500 ring-offset-4" : ""
                }`}
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
              onClick={() => setActiveTemplate(template.id)}
            >
              <Card hover className="overflow-hidden">
                {/* Template Preview Image */}
                <div className="aspect-[3/4] bg-gray-100 mb-4 relative overflow-hidden group">
                  <Image
                    src={template.image}
                    alt={`Aperçu du template ${template.name}`}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>

                {/* Template Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-500">{template.description}</p>
                  </div>
                  <div
                    className="w-4 h-4"
                    style={{ backgroundColor: template.color }}
                  ></div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateGallery;

