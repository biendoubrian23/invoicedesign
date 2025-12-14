"use client";

import { useRef, useState, useCallback } from "react";
import { DashboardHeader, Sidebar } from "@/components/dashboard";
import { EditPanel, InvoicePreview } from "@/components/editor";
import { useInvoiceStore } from "@/store";
import { useExport } from "@/hooks/useExport";
import Button from "@/components/ui/Button";
import { Download, Image, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { invoice, calculateTotals } = useInvoiceStore();
  const { total } = calculateTotals();
  
  const previewRef = useRef<HTMLDivElement>(null);
  const { isExporting, exportPDF, exportImage, error } = useExport(previewRef, {
    filename: `facture-${invoice.invoiceNumber}`,
    format: 'A4',
  });

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

  return (
    <div 
      className="h-screen flex flex-col bg-gray-50"
      onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <DashboardHeader title="Editeur de facture" />

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
                Facture : <span className="font-medium text-gray-900">{invoice.invoiceNumber}</span>
              </span>
              <span className="text-sm text-gray-600">
                Total : <span className="font-semibold text-blue-600">{total.toFixed(2)} EUR</span>
              </span>
              {error && (
                <span className="text-sm text-red-600">{error}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportImage}
                disabled={isExporting}
              >
                <Image className="w-4 h-4 mr-2" />
                Exporter PNG
              </Button>
              <Button 
                size="sm" 
                onClick={exportPDF}
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                {isExporting ? 'Export en cours...' : 'Telecharger PDF'}
              </Button>
            </div>
          </div>

          {/* Split View */}
          <div className="flex-1 flex overflow-hidden">
            {/* Edit Panel */}
            <div style={{ width: editPanelWidth }} className="overflow-hidden flex-shrink-0">
              <EditPanel />
            </div>

            {/* Edit Panel Splitter */}
            <div
              onMouseDown={handleEditMouseDown}
              className={`w-1 cursor-col-resize bg-gray-200 hover:bg-blue-400 transition-colors flex-shrink-0 ${isEditDragging ? 'bg-blue-500' : ''}`}
            />

            {/* Preview Panel */}
            <div className="flex-1 overflow-hidden">
              <InvoicePreview ref={previewRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
