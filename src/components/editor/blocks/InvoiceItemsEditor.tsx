"use client";

import { useState, useCallback } from "react";
import { InvoiceItemsBlock, InvoiceItemsColumn } from "@/types/invoice";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";

interface InvoiceItemsEditorProps {
  block: InvoiceItemsBlock;
  onChange: (data: Partial<InvoiceItemsBlock>) => void;
}

const InvoiceItemsEditor = ({ block, onChange }: InvoiceItemsEditorProps) => {
  // Drag & Drop state pour réorganiser les colonnes
  const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null);
  const [dragOverColIndex, setDragOverColIndex] = useState<number | null>(null);

  const addColumn = () => {
    // Insérer avant la dernière colonne (Total)
    const newColumn: InvoiceItemsColumn = {
      id: crypto.randomUUID(),
      key: `custom_${Date.now()}`,
      header: "Nouvelle colonne",
      width: 10, // Largeur en pourcentage
      visible: true,
    };
    // Insérer avant la dernière colonne
    const newColumns = [...block.columns];
    newColumns.splice(newColumns.length - 1, 0, newColumn);
    onChange({ columns: newColumns });
  };

  // Drag & Drop handlers pour colonnes
  const handleColDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedColIndex(index);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleColDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (index !== draggedColIndex) {
      setDragOverColIndex(index);
    }
  }, [draggedColIndex]);

  const handleColDragLeave = useCallback(() => {
    setDragOverColIndex(null);
  }, []);

  const handleColDragEnd = useCallback(() => {
    setDraggedColIndex(null);
    setDragOverColIndex(null);
  }, []);

  const handleColDrop = useCallback((e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (draggedColIndex !== null && draggedColIndex !== targetIndex) {
      const newColumns = [...block.columns];
      const [draggedCol] = newColumns.splice(draggedColIndex, 1);
      newColumns.splice(targetIndex, 0, draggedCol);
      onChange({ columns: newColumns });
    }
    
    setDraggedColIndex(null);
    setDragOverColIndex(null);
  }, [block.columns, draggedColIndex, onChange]);

  // Modifier la largeur d'une colonne indépendamment (en pourcentage)
  const updateColumnWidth = (index: number, newWidth: number) => {
    // Limites : minimum 5%, maximum 70%
    const clampedWidth = Math.max(5, Math.min(70, newWidth));
    
    const updatedColumns = block.columns.map((col, idx) =>
      idx === index ? { ...col, width: clampedWidth } : col
    );
    
    onChange({ columns: updatedColumns });
  };

  const updateColumn = (index: number, updates: Partial<InvoiceItemsColumn>) => {
    const updatedColumns = block.columns.map((col, idx) =>
      idx === index ? { ...col, ...updates } : col
    );
    onChange({ columns: updatedColumns });
  };

  const removeColumn = (index: number) => {
    const column = block.columns[index];
    if (column.required) return; // Ne pas supprimer les colonnes obligatoires
    
    const updatedColumns = block.columns.filter((_, idx) => idx !== index);
    onChange({ columns: updatedColumns });
  };

  const toggleColumnVisibility = (index: number) => {
    const column = block.columns[index];
    if (column.required) return; // Les colonnes obligatoires restent visibles
    
    updateColumn(index, { visible: !column.visible });
  };

  return (
    <div className="space-y-4">
      <Input
        label="Titre du tableau (optionnel)"
        value={block.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="ex: Prestations"
      />

      {/* Options */}
      <div className="flex gap-4 flex-wrap">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={block.showTitle}
            onChange={(e) => onChange({ showTitle: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Afficher le titre
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={block.showHeader}
            onChange={(e) => onChange({ showHeader: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Afficher l&apos;en-tête
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={block.striped}
            onChange={(e) => onChange({ striped: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Lignes alternées
        </label>
      </div>

      {/* Gestion des colonnes */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Colonnes du tableau
          </label>
          <Button variant="ghost" size="sm" onClick={addColumn}>
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        </div>

        <div className="space-y-2">
          {block.columns.map((column, index) => (
            <div
              key={column.id}
              onDragOver={(e) => handleColDragOver(e, index)}
              onDragLeave={handleColDragLeave}
              onDrop={(e) => handleColDrop(e, index)}
              className={`p-3 border rounded-lg transition-all ${
                !column.visible ? "bg-gray-50" : "bg-white"
              } ${
                dragOverColIndex === index ? "border-t-4 border-t-blue-500" : ""
              } ${
                draggedColIndex === index ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  draggable
                  onDragStart={(e) => handleColDragStart(e, index)}
                  onDragEnd={handleColDragEnd}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
                <Input
                  value={column.header}
                  onChange={(e) => updateColumn(index, { header: e.target.value })}
                  placeholder="Nom de la colonne"
                  className="flex-1"
                />

                <button
                  onClick={() => toggleColumnVisibility(index)}
                  disabled={column.required}
                  className={`p-2 rounded ${
                    column.required
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  title={column.visible ? "Masquer" : "Afficher"}
                >
                  {column.visible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => removeColumn(index)}
                  disabled={column.required}
                  className={`p-2 rounded ${
                    column.required
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                  title={column.required ? "Colonne obligatoire" : "Supprimer"}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Slider de largeur indépendant (en pourcentage) */}
              {(() => {
                // Vérifier si c'est la dernière colonne visible
                let isLastVisible = true;
                for (let i = index + 1; i < block.columns.length; i++) {
                  if (block.columns[i].visible) {
                    isLastVisible = false;
                    break;
                  }
                }
                
                // La dernière colonne s'adapte automatiquement
                if (isLastVisible) {
                  // Calculer l'espace restant
                  const usedWidth = block.columns
                    .filter((col, idx) => col.visible && idx !== index)
                    .reduce((sum, col) => sum + col.width, 0);
                  const remainingWidth = 100 - usedWidth;
                  
                  return (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400 italic">
                        Dernière colonne - s&apos;adapte automatiquement ({remainingWidth}%)
                      </span>
                    </div>
                  );
                }
                
                return (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500 w-12">Largeur:</span>
                    <button
                      onClick={() => updateColumnWidth(index, column.width - 1)}
                      disabled={column.width <= 5}
                      className="w-6 h-6 flex items-center justify-center text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <input
                      type="range"
                      value={column.width}
                      onChange={(e) => updateColumnWidth(index, parseInt(e.target.value))}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      min="5"
                      max="70"
                      step="1"
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <button
                      onClick={() => updateColumnWidth(index, column.width + 1)}
                      disabled={column.width >= 70}
                      className="w-6 h-6 flex items-center justify-center text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                    <span className="text-xs font-medium text-gray-700 w-8 text-center">
                      {column.width}%
                    </span>
                  </div>
                );
              })()}

              {column.required && (
                <p className="text-xs text-gray-500 mt-1">
                  Colonne obligatoire
                </p>
              )}

              {!column.required && column.key.startsWith("custom_") && (
                <p className="text-xs text-blue-600 mt-1">
                  Colonne personnalisée - les valeurs seront vides par défaut
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
        <p className="font-medium mb-1">💡 Astuce :</p>
        <p>Les colonnes Description et Total sont obligatoires. Vous pouvez ajouter des colonnes personnalisées (Date, Référence, etc.) mais les valeurs seront vides - utilisez le bloc &quot;Tableau détaillé&quot; pour des données complètes.</p>
      </div>
    </div>
  );
};

export default InvoiceItemsEditor;
