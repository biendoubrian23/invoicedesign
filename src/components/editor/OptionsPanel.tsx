"use client";

import { useInvoiceStore } from "@/store";
import { useLanguage } from "@/context/LanguageContext";
import Input from "@/components/ui/Input";
import { DOCUMENT_FONTS } from "@/types/invoice";

const OptionsPanel = () => {
  const { invoice, setStyling } = useInvoiceStore();
  const { styling } = invoice;
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-8 overflow-y-auto h-full">
      {/* Colors */}
      <section className="animate-fade-in">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          {t("optionsPanel.colors")}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("optionsPanel.primaryColor")}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={styling.primaryColor}
                onChange={(e) => setStyling({ primaryColor: e.target.value })}
                className="w-12 h-12 border border-gray-300 cursor-pointer"
              />
              <Input
                value={styling.primaryColor}
                onChange={(e) => setStyling({ primaryColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("optionsPanel.textColor")}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={styling.secondaryColor}
                onChange={(e) => setStyling({ secondaryColor: e.target.value })}
                className="w-12 h-12 border border-gray-300 cursor-pointer"
              />
              <Input
                value={styling.secondaryColor}
                onChange={(e) => setStyling({ secondaryColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("optionsPanel.backgroundColor")}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={styling.backgroundColor}
                onChange={(e) => setStyling({ backgroundColor: e.target.value })}
                className="w-12 h-12 border border-gray-300 cursor-pointer"
              />
              <Input
                value={styling.backgroundColor}
                onChange={(e) => setStyling({ backgroundColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Font */}
      <section className="animate-fade-in stagger-1">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          {t("optionsPanel.typography")}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("optionsPanel.documentFont")}
            </label>
            <select
              value={styling.fontFamily}
              onChange={(e) => setStyling({ fontFamily: e.target.value })}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg"
            >
              {DOCUMENT_FONTS.map((font) => (
                <option key={font.name} value={font.value} style={{ fontFamily: font.value }}>
                  {font.name}
                </option>
              ))}
            </select>

            {/* Preview de la police */}
            <div
              className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg"
              style={{ fontFamily: styling.fontFamily }}
            >
              <p className="text-sm text-gray-600 mb-1">{t("optionsPanel.preview")}</p>
              <p className="text-lg">Votre Societe - Facture N° 2025-001</p>
              <p className="text-sm text-gray-500">1 234,56 EUR</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="animate-fade-in stagger-2">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          {t("optionsPanel.colorPreview")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="w-16 h-16 border border-gray-200"
              style={{ backgroundColor: styling.primaryColor }}
            ></div>
            <div>
              <p className="text-sm font-medium text-gray-900">{t("optionsPanel.primary")}</p>
              <p className="text-xs text-gray-500">{styling.primaryColor}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-16 h-16 border border-gray-200 flex items-center justify-center"
              style={{ backgroundColor: styling.backgroundColor }}
            >
              <span style={{ color: styling.secondaryColor, fontSize: '20px', fontWeight: 'bold' }}>Aa</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{t("optionsPanel.text")}</p>
              <p className="text-xs text-gray-500">{styling.secondaryColor}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-16 h-16 border border-gray-200"
              style={{ backgroundColor: styling.backgroundColor }}
            ></div>
            <div>
              <p className="text-sm font-medium text-gray-900">{t("optionsPanel.background")}</p>
              <p className="text-xs text-gray-500">{styling.backgroundColor}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptionsPanel;
