"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useInvoiceStore } from "@/store";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/ui/Button";
import {
  FileText,
  Type,
  Table,
  PenTool,
  QrCode,
  FileCheck,
  ChevronUp,
  ChevronDown,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  X,
  Plus,
} from "lucide-react";
import {
  BlockType,
  InvoiceBlock,
  FreeTextBlock,
  DetailedTableBlock,
  SignatureBlock,
  QRCodeBlock,
  ConditionsBlock,
} from "@/types/invoice";
import {
  FreeTextEditor,
  DetailedTableEditor,
  SignatureEditor,
  QRCodeEditor,
  ConditionsEditor,
} from "./blocks";
import InvoiceItemsEditor from "./blocks/InvoiceItemsEditor";
import TotalsEditor from "./blocks/TotalsEditor";
import PaymentTermsEditor from "./blocks/PaymentTermsEditor";
import { InvoiceItemsBlock, TotalsBlock, PaymentTermsBlock } from "@/types/invoice";

const getBlockIcon = (type: BlockType) => {
  // Map block types to icons
  const iconMap: Record<BlockType, React.ElementType> = {
    "invoice-items": Table,
    "free-text": Type,
    "detailed-table": Table,
    "totals": FileText,
    "payment-terms": FileCheck,
    "signature": PenTool,
    "qr-code": QrCode,
    "conditions": FileCheck,
  };
  return iconMap[type] || FileText;
};


const getBlockName = (type: BlockType, t: (key: string) => string) => {
  if (type === "invoice-items") return t("blocksPanel.detailedTable");
  const nameMap: Record<BlockType, string> = {
    "free-text": t("blocksPanel.freeText"),
    "detailed-table": t("blocksPanel.detailedTable"),
    "totals": t("blocksPanel.totals"),
    "payment-terms": t("blocksPanel.paymentTerms"),
    "signature": t("blocksPanel.signatures"),
    "qr-code": t("blocksPanel.qrCode"),
    "conditions": t("blocksPanel.generalConditions"),
    "invoice-items": t("blocksPanel.invoiceLines"),
  };
  return nameMap[type] || type;
};

const BlocksPanel = () => {
  const { t } = useLanguage();

  // Block types with translated names - must be inside component to access t()
  const blockTypes: {
    type: BlockType;
    name: string;
    description: string;
    icon: React.ElementType;
    isLineAction?: boolean;
  }[] = [
      {
        type: "invoice-items",
        name: t("blocksPanel.newLine"),
        description: t("blocksPanel.addLineDesc"),
        icon: Plus,
        isLineAction: true,
      },
      {
        type: "free-text",
        name: t("blocksPanel.freeText"),
        description: t("blocksPanel.freeTextDesc"),
        icon: Type,
      },
      {
        type: "detailed-table",
        name: t("blocksPanel.detailedTable"),
        description: t("blocksPanel.detailedTableDesc"),
        icon: Table,
      },
      {
        type: "totals",
        name: t("blocksPanel.totals"),
        description: t("blocksPanel.totalsDesc"),
        icon: FileText,
      },
      {
        type: "payment-terms",
        name: t("blocksPanel.paymentTerms"),
        description: t("blocksPanel.paymentTermsDesc"),
        icon: FileCheck,
      },
      {
        type: "signature",
        name: t("blocksPanel.signatures"),
        description: t("blocksPanel.signaturesDesc"),
        icon: PenTool,
      },
      {
        type: "qr-code",
        name: t("blocksPanel.qrCode"),
        description: t("blocksPanel.qrCodeDesc"),
        icon: QrCode,
      },
      {
        type: "conditions",
        name: t("blocksPanel.generalConditions"),
        description: t("blocksPanel.generalConditionsDesc"),
        icon: FileCheck,
      },
    ];

  const {
    addItem,
    addBlock,
    blocks,
    selectedBlockId,
    selectBlock,
    updateBlock,
    removeBlock,
    moveBlockUp,
    moveBlockDown,
    reorderBlocks,
    focusTarget,
    clearFocusTarget,
  } = useInvoiceStore();

  // Refs pour le scroll
  const blockRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Effet pour gérer le scroll et le focus quand focusTarget change
  useEffect(() => {
    if (!focusTarget || focusTarget.type !== 'block') return;

    const blockId = focusTarget.blockId;
    if (!blockId) return;

    // Sélectionner le bloc
    selectBlock(blockId);

    // Attendre un court instant pour que le DOM se mette à jour
    requestAnimationFrame(() => {
      const blockRef = blockRefs.current.get(blockId);
      if (blockRef) {
        // Scroll vers l'élément
        blockRef.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Ajouter une animation de mise en évidence
        blockRef.classList.add('ring-2', 'ring-blue-400', 'ring-offset-2');

        // Retirer l'animation après un délai
        setTimeout(() => {
          blockRef.classList.remove('ring-2', 'ring-blue-400', 'ring-offset-2');
          clearFocusTarget();
        }, 2000);
      }
    });
  }, [focusTarget, selectBlock, clearFocusTarget]);

  // Drag & Drop state
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const [dragOverBlockId, setDragOverBlockId] = useState<string | null>(null);

  // État pour le sélecteur de tableau
  const [showTableSelector, setShowTableSelector] = useState(false);

  const handleDragStart = useCallback((e: React.DragEvent, blockId: string) => {
    setDraggedBlockId(blockId);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, blockId: string) => {
    e.preventDefault();
    if (blockId !== draggedBlockId) {
      setDragOverBlockId(blockId);
    }
  }, [draggedBlockId]);

  const handleDragLeave = useCallback(() => {
    setDragOverBlockId(null);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedBlockId(null);
    setDragOverBlockId(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetBlockId: string) => {
    e.preventDefault();

    if (draggedBlockId && draggedBlockId !== targetBlockId) {
      const draggedIndex = blocks.findIndex(b => b.id === draggedBlockId);
      const targetIndex = blocks.findIndex(b => b.id === targetBlockId);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        reorderBlocks(draggedIndex, targetIndex);
      }
    }

    setDraggedBlockId(null);
    setDragOverBlockId(null);
  }, [blocks, draggedBlockId, reorderBlocks]);

  const handleAddBlock = (type: BlockType) => {
    if (type === "invoice-items") {
      // Récupérer tous les tableaux disponibles
      const tableBlocks = blocks.filter(
        b => (b.type === "invoice-items" || b.type === "detailed-table") && b.enabled
      );

      if (tableBlocks.length === 0) {
        // Pas de tableau, ajouter au tableau principal
        addItem();
      } else if (tableBlocks.length === 1) {
        // Un seul tableau
        if (tableBlocks[0].type === "invoice-items") {
          addItem();
        } else {
          // Ajouter une ligne au detailed-table
          addRowToDetailedTable(tableBlocks[0].id);
        }
      } else {
        // Plusieurs tableaux, afficher le sélecteur
        setShowTableSelector(true);
      }
    } else {
      addBlock(type);
    }
  };

  // Ajouter une ligne à un tableau détaillé spécifique
  const addRowToDetailedTable = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId) as DetailedTableBlock | undefined;
    if (block && block.type === "detailed-table") {
      const newRow = {
        id: crypto.randomUUID(),
        cells: block.columns.map(() => ""),
      };
      updateBlock(blockId, { rows: [...block.rows, newRow] });
    }
    setShowTableSelector(false);
  };

  // Ajouter une ligne au tableau principal (invoice-items)
  const addRowToInvoiceItems = () => {
    addItem();
    setShowTableSelector(false);
  };

  // Liste des tableaux disponibles
  const availableTableBlocks = blocks.filter(
    b => (b.type === "invoice-items" || b.type === "detailed-table") && b.enabled
  );

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);
  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  // Rendu de l'éditeur selon le type de bloc
  const renderBlockEditor = (block: InvoiceBlock) => {
    switch (block.type) {
      case "free-text":
        return (
          <FreeTextEditor
            block={block as FreeTextBlock}
            onChange={(data) => updateBlock(block.id, data)}
          />
        );
      case "detailed-table":
        return (
          <DetailedTableEditor
            block={block as DetailedTableBlock}
            onChange={(data) => updateBlock(block.id, data)}
          />
        );
      case "signature":
        return (
          <SignatureEditor
            block={block as SignatureBlock}
            onChange={(data) => updateBlock(block.id, data)}
          />
        );
      case "qr-code":
        return (
          <QRCodeEditor
            block={block as QRCodeBlock}
            onChange={(data) => updateBlock(block.id, data)}
          />
        );
      case "conditions":
        return (
          <ConditionsEditor
            block={block as ConditionsBlock}
            onChange={(data) => updateBlock(block.id, data)}
          />
        );
      case "invoice-items":
        return (
          <InvoiceItemsEditor
            block={block as InvoiceItemsBlock}
            onChange={(data) => updateBlock(block.id, data)}
          />
        );
      case "totals":
        return (
          <TotalsEditor
            block={block as TotalsBlock}
            onUpdate={(data) => updateBlock(block.id, data)}
          />
        );
      case "payment-terms":
        return (
          <PaymentTermsEditor
            block={block as PaymentTermsBlock}
            onUpdate={(data) => updateBlock(block.id, data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-white">
      {/* Vue édition d'un bloc sélectionné */}
      {selectedBlock ? (
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = getBlockIcon(selectedBlock.type);
                  return <Icon className="w-5 h-5 text-blue-600" />;
                })()}
                <h3 className="font-semibold text-gray-900">
                  {getBlockName(selectedBlock.type, t)}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectBlock(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Contenu de l'éditeur */}
          <div className="p-4">
            {renderBlockEditor(selectedBlock)}
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveBlockUp(selectedBlock.id)}
                className="flex-1"
              >
                <ChevronUp className="w-4 h-4 mr-1" />
                {t("blocksPanel.moveUp")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveBlockDown(selectedBlock.id)}
                className="flex-1"
              >
                <ChevronDown className="w-4 h-4 mr-1" />
                {t("blocksPanel.moveDown")}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                removeBlock(selectedBlock.id);
                selectBlock(null);
              }}
              className="w-full text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t("blocksPanel.deleteBlock")}
            </Button>
          </div>
        </div>
      ) : (
        /* Vue liste des blocs */
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Section: Ajouter une ligne de facturation */}
          <div className="animate-fade-in">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
              {t("blocksPanel.invoiceLines")}
            </h3>
            {blockTypes.filter(b => b.isLineAction).map((block, index) => (
              <button
                key={block.type}
                onClick={() => handleAddBlock(block.type)}
                className="w-full flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 hover:border-blue-400 hover:bg-blue-100 transition-all duration-200 text-left group rounded-lg"
              >
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <block.icon className="w-4 h-4 text-blue-600 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-blue-900">{block.name}</h4>
                  <p className="text-xs text-blue-600 truncate">{block.description}</p>
                </div>
                <Plus className="w-4 h-4 text-blue-500 group-hover:text-blue-700" />
              </button>
            ))}

            {/* Sélecteur de tableau quand plusieurs tableaux existent */}
            {showTableSelector && availableTableBlocks.length > 1 && (
              <div className="mt-2 p-3 bg-white border border-blue-300 rounded-lg shadow-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {t("blocksPanel.addLineIn")}
                </p>
                <div className="space-y-2">
                  {availableTableBlocks.map((tableBlock, idx) => {
                    const Icon = getBlockIcon(tableBlock.type);
                    const tableName = tableBlock.type === "invoice-items"
                      ? t("blocksPanel.mainTable")
                      : `${t("blocksPanel.tableN")}: ${(tableBlock as DetailedTableBlock).title || ""}`;

                    return (
                      <button
                        key={tableBlock.id}
                        onClick={() => {
                          if (tableBlock.type === "invoice-items") {
                            addRowToInvoiceItems();
                          } else {
                            addRowToDetailedTable(tableBlock.id);
                          }
                        }}
                        className="w-full flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 hover:border-blue-400 hover:bg-blue-50 rounded-lg transition-colors text-left"
                      >
                        <Icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">{tableName}</span>
                        <span className="text-xs text-gray-400 ml-auto">{t("blocksPanel.tableN")} {idx + 1}</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setShowTableSelector(false)}
                  className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700 py-1"
                >
                  {t("common.cancel")}
                </button>
              </div>
            )}
          </div>

          {/* Section: Ajouter un bloc */}
          <div className="animate-fade-in">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
              {t("blocksPanel.addBlock")}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {t("blocksPanel.addBlockDesc")}
            </p>

            <div className="grid grid-cols-1 gap-2">
              {blockTypes.filter(b => !b.isLineAction).map((block, index) => (
                <button
                  key={block.type}
                  onClick={() => handleAddBlock(block.type)}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 text-left group rounded-lg opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <block.icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{block.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{block.description}</p>
                  </div>
                  <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Section: Blocs actifs */}
          {sortedBlocks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                {t("blocksPanel.activeBlocks")} ({sortedBlocks.length})
              </h3>
              <div className="space-y-2">
                {sortedBlocks.map((block) => {
                  const Icon = getBlockIcon(block.type);
                  return (
                    <div
                      key={block.id}
                      ref={(el) => {
                        if (el) {
                          blockRefs.current.set(block.id, el);
                        } else {
                          blockRefs.current.delete(block.id);
                        }
                      }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, block.id)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, block.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, block.id)}
                      className={`flex items-center gap-2 p-3 bg-white border rounded-lg transition-all cursor-move ${block.enabled
                        ? "border-gray-200 hover:border-blue-300"
                        : "border-gray-100 opacity-50"
                        } ${dragOverBlockId === block.id
                          ? "border-t-4 border-t-blue-500"
                          : ""
                        } ${draggedBlockId === block.id
                          ? "opacity-50"
                          : ""
                        }`}
                    >
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="flex-1 text-sm font-medium text-gray-700">
                        {getBlockName(block.type, t)}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateBlock(block.id, { enabled: !block.enabled })}
                          className="p-1 text-gray-400 hover:text-gray-600 rounded"
                          title={block.enabled ? t("blocksPanel.hide") : t("blocksPanel.show")}
                        >
                          {block.enabled ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => selectBlock(block.id)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title={t("common.edit")}
                        >
                          <PenTool className="w-4 h-4" />
                        </button>
                        {block.type !== "invoice-items" && block.type !== "totals" && block.type !== "payment-terms" && (
                          <button
                            onClick={() => removeBlock(block.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            title={t("common.delete")}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-sm text-blue-800">
              {t("blocksPanel.blockInfo")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlocksPanel;
