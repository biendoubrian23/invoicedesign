"use client";

import { forwardRef, useState, useCallback, useEffect, useRef, memo } from "react";
import dynamic from "next/dynamic";
import { useInvoiceStore } from "@/store";
import { useSubscription } from "@/hooks/useSubscription";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  InvoiceBlock,
  FreeTextBlock,
  DetailedTableBlock,
  SignatureBlock,
  QRCodeBlock,
  ConditionsBlock,
  InvoiceItemsBlock,
  TotalsBlock,
  PaymentTermsBlock,
} from "@/types/invoice";
// Direct imports for renderers (avoid barrel imports)
import FreeTextRenderer from "./blocks/renderers/FreeTextRenderer";
import DetailedTableRenderer from "./blocks/renderers/DetailedTableRenderer";
import SignatureRenderer from "./blocks/renderers/SignatureRenderer";
import QRCodeRenderer from "./blocks/renderers/QRCodeRenderer";
import ConditionsRenderer from "./blocks/renderers/ConditionsRenderer";
import TotalsRenderer from "./blocks/renderers/TotalsRenderer";
import PaymentTermsRenderer from "./blocks/renderers/PaymentTermsRenderer";
import InvoiceItemsRenderer from "./blocks/renderers/InvoiceItemsRenderer";
import ClickableZone from "./ClickableZone";
import { GripVertical, ZoomIn, ZoomOut } from "lucide-react";

// Lazy load ElegantTemplate for better initial load time
const ElegantTemplate = dynamic(() => import("./ElegantTemplate"), {
  loading: () => <div className="animate-pulse bg-gray-100 h-full w-full" />,
});

// Dimensions A4 en pixels (à 96 DPI: 210mm = 793.7px, 297mm = 1122.5px)
const A4_WIDTH_PX = 794;
const A4_MIN_HEIGHT_PX = 1123;

interface InvoicePreviewProps {
  isMobile?: boolean;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ isMobile = false }, ref) => {
  const { invoice, calculateTotals, blocks, reorderBlocks, selectBlock, selectedBlockId, navigateFromPreview, selectedTemplate, setActiveSection } = useInvoiceStore();
  const { subtotal, tax, total } = calculateTotals();
  const { styling } = invoice;
  const { isFreeUser } = useSubscription();
  const { t } = useLanguage();
  const { user } = useAuth();

  // Container ref pour mesurer l'espace disponible
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100); // Zoom manuel en pourcentage (50-200%)

  // Scale final = autoScale * zoomLevel
  const finalScale = autoScale * (zoomLevel / 100);

  // Calculer le scale automatique en fonction de l'espace disponible
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const availableWidth = container.clientWidth - 48; // 48px = padding (24px * 2)
      const availableHeight = container.clientHeight - 48;

      // Calculer le scale pour que le document rentre en largeur ET en hauteur
      const scaleX = availableWidth / A4_WIDTH_PX;
      const scaleY = availableHeight / A4_MIN_HEIGHT_PX;

      // Prendre le plus petit des deux pour s'assurer que tout rentre
      // Mais ne pas dépasser 1 (pas d'agrandissement)
      const newScale = Math.min(scaleX, scaleY, 1);

      // Minimum scale de 0.3 pour rester lisible
      setAutoScale(Math.max(newScale, 0.3));
    };

    calculateScale();

    // Observer les changements de taille du conteneur
    const resizeObserver = new ResizeObserver(calculateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', calculateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateScale);
    };
  }, []);

  // Drag and Drop state
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const [dragOverBlockId, setDragOverBlockId] = useState<string | null>(null);

  // Fixed pixel sizes for consistent PDF export
  const logoSizes = {
    small: { height: 40, maxWidth: 120 },
    medium: { height: 56, maxWidth: 160 },
    large: { height: 80, maxWidth: 200 },
  };

  const logoAlignments = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const currentLogoSize = logoSizes[invoice.logoSize];

  // Drag and Drop handlers
  const handleDragStart = useCallback((e: React.DragEvent, blockId: string) => {
    setDraggedBlockId(blockId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", blockId);
    // Add a slight delay to show the drag effect
    setTimeout(() => {
      (e.target as HTMLElement).style.opacity = "0.5";
    }, 0);
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    setDraggedBlockId(null);
    setDragOverBlockId(null);
    (e.target as HTMLElement).style.opacity = "1";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, blockId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (blockId !== draggedBlockId) {
      setDragOverBlockId(blockId);
    }
  }, [draggedBlockId]);

  const handleDragLeave = useCallback(() => {
    setDragOverBlockId(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetBlockId: string) => {
    e.preventDefault();
    const sourceBlockId = e.dataTransfer.getData("text/plain");

    if (sourceBlockId && sourceBlockId !== targetBlockId) {
      // Find the indices of the source and target blocks
      const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);
      const sourceIndex = sortedBlocks.findIndex(b => b.id === sourceBlockId);
      const targetIndex = sortedBlocks.findIndex(b => b.id === targetBlockId);

      if (sourceIndex !== -1 && targetIndex !== -1) {
        reorderBlocks(sourceIndex, targetIndex);
      }
    }

    setDraggedBlockId(null);
    setDragOverBlockId(null);
  }, [blocks, reorderBlocks]);

  // Trouver le bloc invoice-items
  const invoiceItemsBlock = blocks.find(
    b => b.type === "invoice-items" && b.enabled
  ) as InvoiceItemsBlock | undefined;

  // Trier les blocs par ordre
  const sortedBlocks = [...blocks]
    .filter(b => b.enabled && b.type !== "invoice-items")
    .sort((a, b) => a.order - b.order);

  // Fonction pour rendre un bloc
  const renderBlock = (block: InvoiceBlock) => {
    switch (block.type) {
      case "free-text":
        return (
          <FreeTextRenderer
            key={block.id}
            block={block as FreeTextBlock}
            primaryColor={styling.primaryColor}
          />
        );
      case "detailed-table":
        return (
          <DetailedTableRenderer
            key={block.id}
            block={block as DetailedTableBlock}
            primaryColor={styling.primaryColor}
          />
        );
      case "signature":
        return (
          <SignatureRenderer
            key={block.id}
            block={block as SignatureBlock}
            primaryColor={styling.primaryColor}
          />
        );
      case "qr-code":
        return (
          <QRCodeRenderer
            key={block.id}
            block={block as QRCodeBlock}
            primaryColor={styling.primaryColor}
          />
        );
      case "conditions":
        return (
          <ConditionsRenderer
            key={block.id}
            block={block as ConditionsBlock}
            primaryColor={styling.primaryColor}
          />
        );
      case "totals":
        return (
          <TotalsRenderer
            key={block.id}
            block={block as TotalsBlock}
            primaryColor={styling.primaryColor}
          />
        );
      case "payment-terms":
        return (
          <PaymentTermsRenderer
            key={block.id}
            block={block as PaymentTermsBlock}
            primaryColor={styling.primaryColor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Barre de zoom */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-center gap-3 shrink-0">
        <ZoomOut className="w-4 h-4 text-gray-500" />
        <input
          type="range"
          min="50"
          max="200"
          step="10"
          value={zoomLevel}
          onChange={(e) => setZoomLevel(parseInt(e.target.value, 10))}
          className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <ZoomIn className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600 min-w-[3rem] text-center">{zoomLevel}%</span>
        <button
          onClick={() => setZoomLevel(100)}
          className="text-xs text-blue-600 hover:text-blue-800 ml-2"
        >
          Réinitialiser
        </button>
      </div>

      {/* Zone de prévisualisation */}
      <div
        ref={containerRef}
        className="flex-1 p-6 overflow-auto flex items-start justify-center"
      >
        <div
          className="origin-top relative"
          style={{
            transform: `scale(${finalScale})`,
            transformOrigin: 'top center',
          }}
        >
          {/* Watermark overlay for logged-in free users only */}
          {user && isFreeUser && (
            <div
              data-export-hidden
              className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
            >
              <div
                className="text-6xl font-bold text-gray-300 opacity-30 transform -rotate-45 whitespace-nowrap select-none"
                style={{ letterSpacing: '8px' }}
              >
                InvoiceDesign
              </div>
            </div>
          )}

          {/* Remove watermark button for logged-in free users only */}
          {user && isFreeUser && (
            <button
              data-export-hidden
              onClick={() => setActiveSection('pricing')}
              className="absolute -top-3 right-0 z-20 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-full shadow-lg transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t("common.removeWatermark")}
            </button>
          )}

          {/* Template switching based on selected template */}
          {selectedTemplate === "elegant" ? (
            <ElegantTemplate ref={ref} isMobile={isMobile} />
          ) : (
            /* Classic Template - A4 Paper avec dimensions exactes pour export PDF */
            <div
              ref={ref}
              data-invoice-preview
              className="paper-shadow animate-scale-in"
              style={{
                fontFamily: styling.fontFamily,
                backgroundColor: styling.backgroundColor,
                color: styling.secondaryColor,
                width: '210mm',
                minHeight: 'auto',
                padding: '15mm',
                boxSizing: 'border-box',
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                {/* Logo */}
                <ClickableZone
                  target={{ type: 'logo' }}
                  disabled={isMobile}
                  className={`flex-1 flex ${logoAlignments[invoice.logoPosition]}`}
                >
                  {invoice.logo ? (
                    <img
                      src={invoice.logo}
                      alt="Logo"
                      style={{
                        height: currentLogoSize.height,
                        maxWidth: currentLogoSize.maxWidth,
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        backgroundColor: styling.primaryColor
                      }}
                    ></div>
                  )}
                </ClickableZone>

                {/* Invoice Info */}
                <ClickableZone
                  target={{ type: 'invoice-info' }}
                  disabled={isMobile}
                  className="text-right"
                >
                  <h1
                    className="text-2xl font-bold mb-1"
                    style={{ color: styling.primaryColor }}
                  >
                    FACTURE
                  </h1>
                  <p className="text-sm text-gray-600">N {invoice.invoiceNumber}</p>
                  <p className="text-sm text-gray-600">Date : {invoice.date}</p>
                  <p className="text-sm text-gray-600">
                    Echeance : {invoice.dueDate}
                  </p>
                </ClickableZone>
              </div>

              {/* Addresses */}
              <div className="grid grid-cols-12 gap-8 mb-10">
                {/* Issuer */}
                <ClickableZone
                  target={{ type: 'issuer' }}
                  disabled={isMobile}
                  className="col-span-5"
                >
                  <h2
                    className="text-sm font-semibold mb-2"
                    style={{ color: styling.primaryColor }}
                  >
                    DE :
                  </h2>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-semibold">{invoice.issuer.name}</p>
                    {(invoice.issuer.visibility?.address ?? true) && (
                      <p className="whitespace-pre-line">{invoice.issuer.address}</p>
                    )}
                    {(invoice.issuer.visibility?.siret ?? true) && (
                      <p>SIRET : {invoice.issuer.siret}</p>
                    )}
                    {(invoice.issuer.visibility?.email ?? true) && (
                      <p>{invoice.issuer.email}</p>
                    )}
                    {(invoice.issuer.visibility?.phone ?? true) && (
                      <p>{invoice.issuer.phone}</p>
                    )}
                    {invoice.issuer.customFields?.map((field) => (
                      field.label && field.value && (
                        <p key={field.id}>{field.label} : {field.value}</p>
                      )
                    ))}
                  </div>
                </ClickableZone>

                {/* Spacer */}
                <div className="col-span-3"></div>

                {/* Client */}
                <ClickableZone
                  target={{ type: 'client' }}
                  disabled={isMobile}
                  className="col-span-4 text-right"
                >
                  <h2
                    className="text-sm font-semibold mb-2"
                    style={{ color: styling.primaryColor }}
                  >
                    A :
                  </h2>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-semibold">{invoice.client.name}</p>
                    {(invoice.client.visibility?.company ?? true) && (
                      <p>{invoice.client.company}</p>
                    )}
                    {(invoice.client.visibility?.address ?? true) && (
                      <p className="whitespace-pre-line">{invoice.client.address}</p>
                    )}
                    {(invoice.client.visibility?.email ?? true) && (
                      <p>{invoice.client.email}</p>
                    )}
                    {invoice.client.customFields?.map((field) => (
                      field.label && field.value && (
                        <p key={field.id}>{field.label} : {field.value}</p>
                      )
                    ))}
                  </div>
                </ClickableZone>
              </div>

              {/* Items Table - Dynamique basé sur le bloc invoice-items */}
              {invoiceItemsBlock && (
                <ClickableZone
                  target={{ type: 'items-table', mode: 'content' }}
                  showLayoutOption={true}
                  disabled={isMobile}
                  className="mb-8"
                >
                  <InvoiceItemsRenderer
                    block={invoiceItemsBlock}
                    primaryColor={styling.primaryColor}
                  />
                </ClickableZone>
              )}

              {/* Blocs modulaires avec drag & drop */}
              {sortedBlocks.length > 0 && (
                <div className="space-y-2 mt-6">
                  {sortedBlocks.map(block => {
                    const isTableBlock = block.type === 'detailed-table';

                    return (
                      <ClickableZone
                        key={block.id}
                        target={{ type: 'block', blockId: block.id, mode: 'content' }}
                        showLayoutOption={isTableBlock}
                        disabled={isMobile}
                      >
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, block.id)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(e) => handleDragOver(e, block.id)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, block.id)}
                          onClick={() => selectBlock(block.id)}
                          className={`relative group transition-all duration-200 ${dragOverBlockId === block.id
                            ? "border-t-2 border-blue-500"
                            : ""
                            } ${selectedBlockId === block.id
                              ? "ring-2 ring-blue-400 ring-offset-2"
                              : ""
                            } ${draggedBlockId === block.id
                              ? "opacity-50"
                              : ""
                            }`}
                        >
                          {/* Drag handle - visible on hover, masqué à l'export */}
                          <div
                            data-export-hidden
                            className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing print:hidden"
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <GripVertical className="w-4 h-4 text-gray-400" />
                          </div>

                          {renderBlock(block)}
                        </div>
                      </ClickableZone>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

InvoicePreview.displayName = "InvoicePreview";

export default InvoicePreview;
