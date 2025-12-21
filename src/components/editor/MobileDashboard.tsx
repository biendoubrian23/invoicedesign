"use client";

import { forwardRef } from "react";
import MobileEditPanel from "./MobileEditPanel";
import { InvoicePreview } from "@/components/editor";
import { useInvoiceStore } from "@/store";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, Eye, Download, Image as ImageIcon, Loader2, Send } from "lucide-react";

interface MobileDashboardProps {
  showPreview: boolean;
  onTogglePreview: () => void;
  onExportPDF: () => void;
  onExportImage: () => void;
  onSendEmail: () => void;
  isExporting: boolean;
  isSendingEmail: boolean;
  exportsRemaining?: number;
  isFreeUser?: boolean;
  canExport?: boolean;
  isLoggedIn?: boolean;
}

const MobileDashboard = forwardRef<HTMLDivElement, MobileDashboardProps>(
  ({ showPreview, onTogglePreview, onExportPDF, onExportImage, onSendEmail, isExporting, isSendingEmail, exportsRemaining = 3, isFreeUser = false, canExport = true, isLoggedIn = false }, ref) => {
    const { invoice, calculateTotals } = useInvoiceStore();
    const { total } = calculateTotals();
    const { t } = useLanguage();

    if (showPreview) {
      return (
        <div className="h-full flex flex-col bg-gray-100">
          {/* Header avec bouton retour */}
          <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
            <button
              onClick={onTogglePreview}
              className="flex items-center gap-2 text-blue-600 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              {t("common.back") || "Retour"}
            </button>
            <div className="flex items-center gap-2">
              {/* Export counter for logged-in free users */}
              {isLoggedIn && isFreeUser && (
                <span className={`text-xs px-2 py-1 rounded-full ${exportsRemaining > 0 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                  {exportsRemaining}/3
                </span>
              )}
              <button
                onClick={onExportImage}
                disabled={isExporting || isSendingEmail}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <button
                onClick={onSendEmail}
                disabled={isExporting || isSendingEmail}
                className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors disabled:opacity-50"
              >
                {isSendingEmail ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={onExportPDF}
                disabled={isExporting || isSendingEmail}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                PDF
              </button>
            </div>
          </div>

          {/* Prévisualisation - s'adapte automatiquement à l'espace disponible */}
          <div className="flex-1 overflow-auto">
            <InvoicePreview ref={ref} isMobile={true} />
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col bg-gray-50">
        {/* Header mobile */}
        <div className="bg-white border-b border-gray-200 p-3 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-semibold text-gray-800">{t("common.invoiceEditor") || "Éditeur de facture"}</h1>
            <span className="text-sm font-semibold text-blue-600">{total.toFixed(2)} {invoice.currency}</span>
          </div>
          <p className="text-xs text-gray-500">
            {t("common.invoice") || "Facture"} : {invoice.invoiceNumber}
          </p>
        </div>

        {/* Contenu avec accordéons */}
        <div className="flex-1 overflow-hidden">
          <MobileEditPanel />
        </div>

        {/* Barre d'actions en bas */}
        <div className="bg-white border-t border-gray-200 p-3 sticky bottom-0 z-10 shadow-lg">
          <div className="flex items-center justify-center">
            <button
              onClick={onTogglePreview}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-100 text-cyan-600 font-medium hover:bg-cyan-200 transition-colors"
            >
              <Eye className="w-5 h-5" />
              {t("common.preview") || "PRÉVISUALISER"}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

MobileDashboard.displayName = "MobileDashboard";

export default MobileDashboard;
