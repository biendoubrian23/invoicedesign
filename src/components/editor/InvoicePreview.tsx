"use client";

import { forwardRef, useState, useCallback, useEffect, useRef } from "react";
import { useInvoiceStore } from "@/store";
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
import {
  FreeTextRenderer,
  DetailedTableRenderer,
  SignatureRenderer,
  QRCodeRenderer,
  ConditionsRenderer,
} from "./blocks/renderers";
import TotalsRenderer from "./blocks/renderers/TotalsRenderer";
import PaymentTermsRenderer from "./blocks/renderers/PaymentTermsRenderer";
import ClickableZone from "./ClickableZone";
import ElegantTemplate from "./ElegantTemplate";
import { GripVertical, ZoomIn, ZoomOut } from "lucide-react";

// Dimensions A4 en pixels (à 96 DPI: 210mm = 793.7px, 297mm = 1122.5px)
const A4_WIDTH_PX = 794;
const A4_MIN_HEIGHT_PX = 1123;

interface InvoicePreviewProps {
  isMobile?: boolean;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ isMobile = false }, ref) => {
  const { invoice, calculateTotals, blocks, reorderBlocks, selectBlock, selectedBlockId, navigateFromPreview, selectedTemplate } = useInvoiceStore();
  const { subtotal, tax, total } = calculateTotals();
  const { styling } = invoice;

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
          className="origin-top"
          style={{
            transform: `scale(${finalScale})`,
            transformOrigin: 'top center',
          }}
        >
          {/* Template switching based on selected template */}
          {selectedTemplate === "elegant" ? (
            <ElegantTemplate ref={ref} isMobile={isMobile} />
          ) : (
            /* Classic Template - A4 Paper avec dimensions exactes pour export PDF */
            <div
              ref={ref}
              data-invoice-preview
              className="bg-white paper-shadow animate-scale-in"
              style={{
                fontFamily: styling.fontFamily,
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
                    <p className="whitespace-pre-line">{invoice.issuer.address}</p>
                    <p>SIRET : {invoice.issuer.siret}</p>
                    <p>{invoice.issuer.email}</p>
                    <p>{invoice.issuer.phone}</p>
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
                    <p>{invoice.client.company}</p>
                    <p className="whitespace-pre-line">{invoice.client.address}</p>
                    <p>{invoice.client.email}</p>
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
                  {/* Titre optionnel */}
                  {invoiceItemsBlock.showTitle && invoiceItemsBlock.title && (
                    <h3
                      className="text-sm font-semibold mb-3"
                      style={{ color: styling.primaryColor }}
                    >
                      {invoiceItemsBlock.title}
                    </h3>
                  )}

                  {/* Header */}
                  {invoiceItemsBlock.showHeader && (
                    <div
                      className="flex gap-2 py-3 px-4 text-sm font-semibold text-white"
                      style={{ backgroundColor: styling.primaryColor }}
                    >
                      {invoiceItemsBlock.columns.filter(col => col.visible).map((column, idx, arr) => {
                        // Calculer la largeur : dernière colonne prend le reste
                        const isLast = idx === arr.length - 1;
                        const usedWidth = arr.slice(0, arr.length - 1).reduce((sum, c) => sum + c.width, 0);
                        const width = isLast ? 100 - usedWidth : column.width;

                        return (
                          <div
                            key={column.id}
                            style={{ width: `${width}%`, minWidth: 0 }}
                            className={`${column.key === 'quantity' || column.key === 'unitPrice' || column.key === 'total'
                              ? 'text-right'
                              : column.key === 'description'
                                ? ''
                                : 'text-center'
                              }`}
                          >
                            {column.header}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Rows */}
                  {invoice.items.map((item, index) => (
                    <div key={item.id}>
                      {/* Ligne principale */}
                      <div
                        className={`flex gap-2 py-3 px-4 text-sm ${invoiceItemsBlock.striped
                          ? index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          : "bg-white"
                          }`}
                      >
                        {invoiceItemsBlock.columns.filter(col => col.visible).map((column, idx, arr) => {
                          // Calculer la largeur : dernière colonne prend le reste
                          const isLast = idx === arr.length - 1;
                          const usedWidth = arr.slice(0, arr.length - 1).reduce((sum, c) => sum + c.width, 0);
                          const width = isLast ? 100 - usedWidth : column.width;

                          let content = "";
                          let alignment = "";

                          switch (column.key) {
                            case "description":
                              content = item.description;
                              alignment = "";
                              break;
                            case "quantity":
                              content = (!item.hasSubItems || item.subItemsMode === 'parent-quantity')
                                ? item.quantity.toString()
                                : '-';
                              alignment = "text-right";
                              break;
                            case "unitPrice":
                              content = !item.hasSubItems
                                ? `${item.unitPrice.toFixed(2)} ${invoice.currency}`
                                : item.subItemsMode === 'parent-quantity'
                                  ? `${item.unitPrice.toFixed(2)} ${invoice.currency}`
                                  : '-';
                              alignment = "text-right";
                              break;
                            case "total":
                              content = `${item.total.toFixed(2)} ${invoice.currency}`;
                              alignment = "text-right font-medium";
                              break;
                            default:
                              // Colonnes personnalisées
                              content = item.customFields?.[column.key] || "-";
                              alignment = "text-center";
                          }

                          return (
                            <div
                              key={column.id}
                              style={{ width: `${width}%`, minWidth: 0 }}
                              className={`text-gray-800 ${alignment}`}
                            >
                              {content}
                            </div>
                          );
                        })}
                      </div>

                      {/* Sous-lignes */}
                      {item.hasSubItems && item.subItems && item.subItems.length > 0 && (
                        <div className={invoiceItemsBlock.striped ? (index % 2 === 0 ? "bg-gray-50" : "bg-white") : "bg-white"}>
                          {item.subItems.map((subItem) => (
                            <div
                              key={subItem.id}
                              className="flex gap-2 py-2 px-4 text-xs"
                            >
                              {invoiceItemsBlock.columns.filter(col => col.visible).map((column, idx, arr) => {
                                // Calculer la largeur : dernière colonne prend le reste
                                const isLast = idx === arr.length - 1;
                                const usedWidth = arr.slice(0, arr.length - 1).reduce((sum, c) => sum + c.width, 0);
                                const width = isLast ? 100 - usedWidth : column.width;

                                let content = "";
                                let alignment = "";

                                switch (column.key) {
                                  case "description":
                                    content = subItem.description;
                                    alignment = "text-gray-700";
                                    break;
                                  case "quantity":
                                    content = item.subItemsMode === 'individual-quantities' && subItem.hasQuantity
                                      ? subItem.quantity?.toString() || '-'
                                      : '-';
                                    alignment = "text-right text-gray-500";
                                    break;
                                  case "unitPrice":
                                    content = item.subItemsMode !== 'no-prices'
                                      ? `${subItem.unitPrice.toFixed(2)} ${invoice.currency}`
                                      : '-';
                                    alignment = "text-right text-gray-500";
                                    break;
                                  case "total":
                                    content = item.subItemsMode === 'individual-quantities'
                                      ? `${subItem.total.toFixed(2)} ${invoice.currency}`
                                      : item.subItemsMode === 'parent-quantity'
                                        ? `${subItem.unitPrice.toFixed(2)} ${invoice.currency}`
                                        : '-';
                                    alignment = "text-right text-gray-700";
                                    break;
                                  default:
                                    // Colonnes personnalisées
                                    content = subItem.customFields?.[column.key] || "-";
                                    alignment = "text-center text-gray-500";
                                }

                                return (
                                  <div
                                    key={column.id}
                                    style={{ width: `${width}%`, minWidth: 0 }}
                                    className={`${alignment} ${column.key === "description" ? "flex items-center pl-8" : ""
                                      }`}
                                  >
                                    {column.key === "description" && (
                                      <span className="mr-2 text-gray-400">-</span>
                                    )}
                                    {content}
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
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
