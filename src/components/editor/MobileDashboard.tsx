"use client";

import { forwardRef } from "react";
import MobileEditPanel from "./MobileEditPanel";
import { InvoicePreview } from "@/components/editor";
import { useInvoiceStore } from "@/store";
import { ArrowLeft, Eye, Download, Image as ImageIcon, Loader2 } from "lucide-react";

interface MobileDashboardProps {
  showPreview: boolean;
  onTogglePreview: () => void;
  onExportPDF: () => void;
  onExportImage: () => void;
  isExporting: boolean;
}

const MobileDashboard = forwardRef<HTMLDivElement, MobileDashboardProps>(
  ({ showPreview, onTogglePreview, onExportPDF, onExportImage, isExporting }, ref) => {
    const { invoice, calculateTotals } = useInvoiceStore();
    const { total } = calculateTotals();

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
              Retour
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={onExportImage}
                disabled={isExporting}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <button
                onClick={onExportPDF}
                disabled={isExporting}
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
            <h1 className="font-semibold text-gray-800">Éditeur de facture</h1>
            <span className="text-sm font-semibold text-blue-600">{total.toFixed(2)} {invoice.currency}</span>
          </div>
          <p className="text-xs text-gray-500">
            Facture : {invoice.invoiceNumber}
          </p>
        </div>

        {/* Contenu avec accordéons */}
        <div className="flex-1 overflow-hidden">
          <MobileEditPanel />
        </div>

        {/* Barre d'actions en bas */}
        <div className="bg-white border-t border-gray-200 p-3 sticky bottom-0 z-10 shadow-lg">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onExportImage}
              disabled={isExporting}
              className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onExportPDF}
              disabled={isExporting}
              className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {isExporting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onTogglePreview}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-100 text-cyan-600 font-medium hover:bg-cyan-200 transition-colors"
            >
              <Eye className="w-5 h-5" />
              PRÉVISUALISER
            </button>
          </div>
        </div>
      </div>
    );
  }
);

MobileDashboard.displayName = "MobileDashboard";

export default MobileDashboard;
