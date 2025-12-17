"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader, Sidebar } from "@/components/dashboard";
import { EditPanel, InvoicePreview, MobileDashboard } from "@/components/editor";
import { useInvoiceStore } from "@/store";
import { useExport } from "@/hooks/useExport";
import { useSubscription } from "@/hooks/useSubscription";
import { useAutoSaveClientState } from "@/hooks/useAutoSave";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/ui/Button";
import { Download, Image, Loader2, X } from "lucide-react";

interface PreviewFile {
  url: string;
  name: string;
  type: 'pdf' | 'image';
}

export default function DashboardPage() {
  const { invoice, calculateTotals, activeSection, setActiveSection } = useInvoiceStore();
  const { total } = calculateTotals();
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const { isFreeUser, exportsRemaining, canExport, refresh: refreshSubscription } = useSubscription();

  // Hydrate store on mount to prevent hydration mismatch
  useEffect(() => {
    useInvoiceStore.persist.rehydrate();
  }, []);

  // Auto-save client state when changes occur
  useAutoSaveClientState();

  // File preview state
  const [previewFile, setPreviewFile] = useState<PreviewFile | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);
  const { isExporting, exportPDF, exportImage, error } = useExport(previewRef, {
    filename: `facture-${invoice.invoiceNumber}`,
    format: 'A4',
  });

  // Auth-protected export handlers
  const handleExportPDF = useCallback(() => {
    if (!user) {
      router.push('/auth/login?redirect=/dashboard');
      return;
    }
    if (!canExport) {
      setActiveSection('pricing');
      return;
    }
    exportPDF().then(() => refreshSubscription());
  }, [user, router, exportPDF, canExport, setActiveSection, refreshSubscription]);

  const handleExportImage = useCallback(() => {
    if (!user) {
      router.push('/auth/login?redirect=/dashboard');
      return;
    }
    if (!canExport) {
      setActiveSection('pricing');
      return;
    }
    exportImage().then(() => refreshSubscription());
  }, [user, router, exportImage, canExport, setActiveSection, refreshSubscription]);

  // Handle file preview from Stockage
  const handlePreviewFile = useCallback((file: PreviewFile | null) => {
    setPreviewFile(file);
  }, []);

  // Clear preview when changing sections
  useEffect(() => {
    if (activeSection !== 'stockage') {
      setPreviewFile(null);
    }
  }, [activeSection]);

  // Détection mobile/tablette - mode mobile si écran < 1024px (pas assez d'espace pour la prévisualisation)
  const [isMobile, setIsMobile] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Passer en mode mobile si largeur < 1024px pour éviter que la prévisualisation soit coupée
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Splitter states
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [editPanelWidth, setEditPanelWidth] = useState(420);

  // Sidebar splitter
  const [isSidebarDragging, setIsSidebarDragging] = useState(false);
  const sidebarStartX = useRef(0);
  const sidebarStartWidth = useRef(0);

  // Edit panel splitter
  const [isEditDragging, setIsEditDragging] = useState(false);
  const editStartX = useRef(0);
  const editStartWidth = useRef(0);

  const handleSidebarMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsSidebarDragging(true);
    sidebarStartX.current = e.clientX;
    sidebarStartWidth.current = sidebarWidth;
  }, [sidebarWidth]);

  const handleEditMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditDragging(true);
    editStartX.current = e.clientX;
    editStartWidth.current = editPanelWidth;
  }, [editPanelWidth]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isSidebarDragging) {
      const delta = e.clientX - sidebarStartX.current;
      const newWidth = Math.max(180, Math.min(320, sidebarStartWidth.current + delta));
      setSidebarWidth(newWidth);
    }
    if (isEditDragging) {
      const delta = e.clientX - editStartX.current;
      const newWidth = Math.max(320, Math.min(600, editStartWidth.current + delta));
      setEditPanelWidth(newWidth);
    }
  }, [isSidebarDragging, isEditDragging]);

  const handleMouseUp = useCallback(() => {
    setIsSidebarDragging(false);
    setIsEditDragging(false);
  }, []);

  // Global mouse event listeners
  if (typeof window !== 'undefined') {
    if (isSidebarDragging || isEditDragging) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
  }

  // Affichage mobile
  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        <MobileDashboard
          ref={previewRef}
          showPreview={showMobilePreview}
          onTogglePreview={() => setShowMobilePreview(!showMobilePreview)}
          onExportPDF={handleExportPDF}
          onExportImage={handleExportImage}
          isExporting={isExporting}
          exportsRemaining={exportsRemaining}
          isFreeUser={isFreeUser}
          canExport={canExport}
          isLoggedIn={!!user}
        />
      </div>
    );
  }

  return (
    <div
      className="h-screen flex flex-col bg-gray-50"
      onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <DashboardHeader title={t("common.invoiceEditor")} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div style={{ width: sidebarWidth }} className="flex-shrink-0">
          <Sidebar />
        </div>

        {/* Sidebar Splitter */}
        <div
          onMouseDown={handleSidebarMouseDown}
          className={`w-1 cursor-col-resize bg-gray-200 hover:bg-blue-400 transition-colors flex-shrink-0 ${isSidebarDragging ? 'bg-blue-500' : ''}`}
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {t("common.invoice")} : <span className="font-medium text-gray-900">{invoice.invoiceNumber}</span>
              </span>
              <span className="text-sm text-gray-600">
                {t("common.total")} : <span className="font-semibold text-blue-600">{total.toFixed(2)} {invoice.currency}</span>
              </span>
              {error && (
                <span className="text-sm text-red-600">{error}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Export counter for logged-in free users only */}
              {user && isFreeUser && exportsRemaining >= 0 && (
                <span className={`text-xs px-2 py-1 rounded-full ${exportsRemaining > 0 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                  {exportsRemaining > 0 ? `${exportsRemaining}/3 ${t("common.exportsLeft")}` : t("common.noExportsLeft")}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportImage}
                disabled={isExporting}
              >
                <Image className="w-4 h-4 mr-2" />
                {t("common.exportPNG")}
              </Button>
              <Button
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                {isExporting ? t("common.exporting") : t("common.downloadPDF")}
              </Button>
            </div>
          </div>

          {/* Split View */}
          <div className="flex-1 flex overflow-hidden">
            {/* Edit Panel */}
            <div style={{ width: editPanelWidth }} className="overflow-hidden flex-shrink-0">
              <EditPanel onPreviewFile={handlePreviewFile} />
            </div>

            {/* Edit Panel Splitter */}
            <div
              onMouseDown={handleEditMouseDown}
              className={`w-1 cursor-col-resize bg-gray-200 hover:bg-blue-400 transition-colors flex-shrink-0 ${isEditDragging ? 'bg-blue-500' : ''}`}
            />

            {/* Preview Panel */}
            <div className="flex-1 overflow-hidden relative">
              {previewFile ? (
                /* File Preview Mode */
                <div className="h-full flex flex-col bg-gray-100">
                  {/* Preview Header */}
                  <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {previewFile.name}
                    </span>
                    <button
                      onClick={() => setPreviewFile(null)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title={t("common.closePreview")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {/* File Display */}
                  <div className="flex-1 overflow-auto p-4">
                    {previewFile.type === 'pdf' ? (
                      <iframe
                        src={previewFile.url}
                        className="w-full h-full min-h-[800px] bg-white rounded-lg shadow-lg"
                        title={previewFile.name}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <img
                          src={previewFile.url}
                          alt={previewFile.name}
                          className="max-w-full max-h-full object-contain bg-white rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Normal Invoice Preview */
                <InvoicePreview ref={previewRef} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
