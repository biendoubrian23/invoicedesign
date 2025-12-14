"use client";

import { useState, useCallback } from "react";
import { useInvoiceStore } from "@/store";
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

const blockTypes: { 
  type: BlockType; 
  name: string; 
  description: string; 
  icon: React.ElementType;
  isLineAction?: boolean; // Indique si c'est une action d'ajout de ligne (pas un bloc)
}[] = [
  {
    type: "invoice-items",
    name: "Nouvelle ligne",
    description: "Ajouter une ligne de prestation",
    icon: Plus,
    isLineAction: true,
  },
  {
    type: "free-text",
    name: "Texte libre",
    description: "Section de texte personnalisee",
    icon: Type,
  },
  {
    type: "detailed-table",
    name: "Tableau detaille",
    description: "Tableau avec colonnes",
    icon: Table,
  },
  {
    type: "totals",
    name: "Totaux",
    description: "Sous-total, TVA, total",
    icon: FileText,
  },
  {
    type: "payment-terms",
    name: "Conditions de paiement",
    description: "Modalites de paiement",
    icon: FileCheck,
  },
  {
    type: "signature",
    name: "Signatures",
    description: "Zone de signatures",
    icon: PenTool,
  },
  {
    type: "qr-code",
    name: "QR Code",
    description: "QR code de paiement",
    icon: QrCode,
  },
  {
    type: "conditions",
    name: "Conditions",
    description: "Conditions generales",
    icon: FileCheck,
  },
];

const getBlockIcon = (type: BlockType) => {
  const blockType = blockTypes.find(b => b.type === type);
  // Pour invoice-items dans les blocs actifs, utiliser Table
  if (type === "invoice-items") return Table;
  return blockType?.icon || FileText;
};

const getBlockName = (type: BlockType) => {
  // Noms spécifiques pour les blocs actifs (différent des boutons d'ajout)
  if (type === "invoice-items") return "Tableau détaillé";
  const blockType = blockTypes.find(b => b.type === type);
  return blockType?.name || type;
};

const BlocksPanel = () => {
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
  } = useInvoiceStore();

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
                  {getBlockName(selectedBlock.type)}
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
                Monter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveBlockDown(selectedBlock.id)}
                className="flex-1"
              >
                <ChevronDown className="w-4 h-4 mr-1" />
                Descendre
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
              Supprimer ce bloc
            </Button>
          </div>
        </div>
      ) : (
        /* Vue liste des blocs */
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Section: Ajouter une ligne de facturation */}
          <div className="animate-fade-in">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
              Lignes de facturation
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
                  Ajouter la ligne dans :
                </p>
                <div className="space-y-2">
                  {availableTableBlocks.map((tableBlock, idx) => {
                    const Icon = getBlockIcon(tableBlock.type);
                    const tableName = tableBlock.type === "invoice-items" 
                      ? "Tableau détaillé (principal)" 
                      : `Tableau: ${(tableBlock as DetailedTableBlock).title || "Sans titre"}`;
                    
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
                        <span className="text-xs text-gray-400 ml-auto">Tableau {idx + 1}</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setShowTableSelector(false)}
                  className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700 py-1"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>

          {/* Section: Ajouter un bloc */}
          <div className="animate-fade-in">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
              Ajouter un bloc
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Cliquez sur un bloc pour l&apos;ajouter a votre facture
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
                Blocs actifs ({sortedBlocks.length})
              </h3>
              <div className="space-y-2">
                {sortedBlocks.map((block) => {
                  const Icon = getBlockIcon(block.type);
                  return (
                    <div
                      key={block.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, block.id)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, block.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, block.id)}
                      className={`flex items-center gap-2 p-3 bg-white border rounded-lg transition-all cursor-move ${
                        block.enabled 
                          ? "border-gray-200 hover:border-blue-300" 
                          : "border-gray-100 opacity-50"
                      } ${
                        dragOverBlockId === block.id 
                          ? "border-t-4 border-t-blue-500" 
                          : ""
                      } ${
                        draggedBlockId === block.id 
                          ? "opacity-50" 
                          : ""
                      }`}
                    >
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="flex-1 text-sm font-medium text-gray-700">
                        {getBlockName(block.type)}
                      </span>
                      
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateBlock(block.id, { enabled: !block.enabled })}
                          className="p-1 text-gray-400 hover:text-gray-600 rounded"
                          title={block.enabled ? "Masquer" : "Afficher"}
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
                          title="Modifier"
                        >
                          <PenTool className="w-4 h-4" />
                        </button>
                        {block.type !== "invoice-items" && block.type !== "totals" && block.type !== "payment-terms" && (
                          <button
                            onClick={() => removeBlock(block.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            title="Supprimer"
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
              Les blocs ajoutes apparaissent dans votre facture. Vous pouvez les
              reorganiser en utilisant les fleches ou par glisser-deposer sur la preview.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlocksPanel;
