"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Template traditionnel et professionnel",
    color: "#2563eb",
    previewStyle: "modern", // Blue header style
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Design epure et minimaliste",
    color: "#000000",
    previewStyle: "minimal", // Black/white minimal style
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
                {/* Template Preview */}
                <div className="aspect-[3/4] bg-gray-100 mb-4 relative overflow-hidden group">
                  {/* Mini Invoice Preview */}
                  <div className="absolute inset-4 bg-white shadow-md p-4 transition-transform duration-300 group-hover:scale-[1.02]">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className="w-8 h-8"
                        style={{ backgroundColor: template.color }}
                      ></div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-gray-900">FACTURE</div>
                        <div className="text-[10px] text-gray-500">N 2024-001</div>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div>
                        <div className="w-12 h-1 bg-gray-200 mb-1"></div>
                        <div className="w-16 h-1 bg-gray-200"></div>
                      </div>
                      <div>
                        <div className="w-12 h-1 bg-gray-200 mb-1"></div>
                        <div className="w-16 h-1 bg-gray-200"></div>
                      </div>
                    </div>

                    {/* Table Lines */}
                    <div className="space-y-2 mb-4">
                      <div
                        className="h-1"
                        style={{ backgroundColor: template.color, opacity: 0.3 }}
                      ></div>
                      <div className="flex justify-between">
                        <div className="w-20 h-1 bg-gray-200"></div>
                        <div className="w-8 h-1 bg-gray-200"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="w-16 h-1 bg-gray-200"></div>
                        <div className="w-8 h-1 bg-gray-200"></div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between items-center">
                        <div className="w-12 h-1 bg-gray-300"></div>
                        <div
                          className="w-10 h-3"
                          style={{ backgroundColor: template.color }}
                        ></div>
                      </div>
                    </div>
                  </div>

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
