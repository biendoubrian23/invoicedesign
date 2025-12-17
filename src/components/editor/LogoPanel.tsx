"use client";

import { useCallback } from "react";
import { useInvoiceStore } from "@/store";
import Button from "@/components/ui/Button";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const LogoPanel = () => {
  const { invoice, setLogo, setLogoPosition, setLogoSize } = useInvoiceStore();
  const { t } = useLanguage();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogo(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [setLogo]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogo(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [setLogo]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 space-y-8 overflow-y-auto h-full">
      {/* Upload Section */}
      <section className="animate-fade-in">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          {t("logoPanel.title")}
        </h3>

        {!invoice.logo ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="logo-upload"
            />
            <label htmlFor="logo-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                {t("logoPanel.dragDrop")}
              </p>
              <p className="text-xs text-gray-500">{t("logoPanel.orClick")}</p>
              <p className="text-xs text-gray-400 mt-2">{t("logoPanel.formats")}</p>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Preview */}
            <div className="relative bg-gray-100 p-4 flex items-center justify-center">
              <img
                src={invoice.logo}
                alt="Logo"
                className="max-h-32 max-w-full object-contain"
              />
              <button
                onClick={() => setLogo(undefined)}
                className="absolute top-2 right-2 p-2 bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors"
                title={t("common.delete")}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Change Logo */}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="logo-change"
              />
              <label
                htmlFor="logo-change"
                className="inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-semibold border-2 border-gray-300 bg-transparent text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                {t("logoPanel.changeLogo")}
              </label>
            </div>
          </div>
        )}
      </section>

      {/* Position */}
      {invoice.logo && (
        <>
          <section className="animate-fade-in stagger-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t("logoPanel.position")}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {(["left", "center", "right"] as const).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setLogoPosition(pos)}
                  className={`py-3 text-sm font-medium transition-all duration-200 ${invoice.logoPosition === pos
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {pos === "left" && t("logoPanel.left")}
                  {pos === "center" && t("logoPanel.center")}
                  {pos === "right" && t("logoPanel.right")}
                </button>
              ))}
            </div>
          </section>

          <section className="animate-fade-in stagger-2">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t("logoPanel.size")}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {(["small", "medium", "large"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setLogoSize(size)}
                  className={`py-3 text-sm font-medium transition-all duration-200 ${invoice.logoSize === size
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {size === "small" && t("logoPanel.small")}
                  {size === "medium" && t("logoPanel.medium")}
                  {size === "large" && t("logoPanel.large")}
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default LogoPanel;

