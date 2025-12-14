"use client";

import { useInvoiceStore } from "@/store";
import Input from "@/components/ui/Input";

const fonts = [
  { id: "Inter", name: "Inter" },
  { id: "Arial", name: "Arial" },
  { id: "Georgia", name: "Georgia" },
];

const OptionsPanel = () => {
  const { invoice, setStyling } = useInvoiceStore();
  const { styling } = invoice;

  return (
    <div className="p-6 space-y-8 overflow-y-auto h-full">
      {/* Colors */}
      <section className="animate-fade-in">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Couleurs
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur principale
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
              Couleur secondaire
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
        </div>
      </section>

      {/* Font */}
      <section className="animate-fade-in stagger-1">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Typographie
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Police
            </label>
            <select
              value={styling.fontFamily}
              onChange={(e) => setStyling({ fontFamily: e.target.value })}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {fonts.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="animate-fade-in stagger-2">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Apercu des couleurs
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="w-16 h-16 border border-gray-200"
              style={{ backgroundColor: styling.primaryColor }}
            ></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Principale</p>
              <p className="text-xs text-gray-500">{styling.primaryColor}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-16 h-16 border border-gray-200"
              style={{ backgroundColor: styling.secondaryColor }}
            ></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Secondaire</p>
              <p className="text-xs text-gray-500">{styling.secondaryColor}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OptionsPanel;
