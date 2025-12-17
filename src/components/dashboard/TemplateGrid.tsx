"use client";

import { useInvoiceStore } from "@/store";
import Card from "@/components/ui/Card";
import { useLanguage } from "@/context/LanguageContext";

const TemplateGrid = () => {
  const { templates, selectedTemplate, selectTemplate, setActiveSection } =
    useInvoiceStore();
  const { t } = useLanguage();

  const handleSelectTemplate = (templateId: string) => {
    selectTemplate(templateId);
    setActiveSection("info");
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {t("templateGrid.title")}
        </h2>
        <p className="text-sm text-gray-600">
          {t("templateGrid.subtitle")}
        </p>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
        {templates.map((template, index) => (
          <div
            key={template.id}
            onClick={() => handleSelectTemplate(template.id)}
            className={`cursor-pointer opacity-0 animate-fade-in-up ${selectedTemplate === template.id
              ? "ring-2 ring-blue-500 ring-offset-2"
              : ""
              }`}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "forwards",
            }}
          >
            <Card hover className="overflow-hidden p-3">
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gray-50 mb-3 relative overflow-hidden group border border-gray-200">
                <div className="absolute inset-4 bg-white shadow-md p-4 transition-transform duration-300 group-hover:scale-[1.02]">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="w-8 h-8"
                      style={{ backgroundColor: template.color }}
                    ></div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-900">
                        {t("common.invoice").toUpperCase()}
                      </div>
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

                {/* Selected Badge */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white text-xs font-medium">
                    {t("templateGrid.selected")}
                  </div>
                )}

                {/* Default Model Badge */}
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-emerald-600 text-white text-xs font-medium">
                    {t("templateGrid.default")}
                  </div>
                )}
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
  );
};

export default TemplateGrid;

