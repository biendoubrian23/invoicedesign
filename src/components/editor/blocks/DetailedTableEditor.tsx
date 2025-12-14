"use client";

import { useState, useCallback } from "react";
import { DetailedTableBlock, DetailedTableColumn, DetailedTableRow } from "@/types/invoice";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, Trash2, AlignLeft, AlignCenter, AlignRight, GripVertical, Eye, EyeOff } from "lucide-react";

interface DetailedTableEditorProps {
  block: DetailedTableBlock;
  onChange: (data: Partial<DetailedTableBlock>) => void;
}

const DetailedTableEditor = ({ block, onChange }: DetailedTableEditorProps) => {
  // Drag & drop state for columns
  const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null);
  const [dragOverColIndex, setDragOverColIndex] = useState<number | null>(null);

  const addColumn = () => {
    const newColumn: DetailedTableColumn = {
      id: crypto.randomUUID(),
      header: "Nouvelle colonne",
      width: 25,
      align: "left",
      visible: true,
    };
    
    // Insérer avant la dernière colonne
    const insertIndex = Math.max(0, block.columns.length - 1);
    const updatedColumns = [
      ...block.columns.slice(0, insertIndex),
      newColumn,
      ...block.columns.slice(insertIndex),
    ];
    
    // Ajouter une cellule vide à chaque ligne à la bonne position
    const updatedRows = block.rows.map(row => {
      const newCells = [...row.cells];
      newCells.splice(insertIndex, 0, "");
      return { ...row, cells: newCells };
    });
    
    onChange({ 
      columns: updatedColumns,
      rows: updatedRows,
    });
  };

  const removeColumn = (index: number) => {
    if (block.columns.length <= 1) return;
    
    const updatedColumns = block.columns.filter((_, i) => i !== index);
    const updatedRows = block.rows.map(row => ({
      ...row,
      cells: row.cells.filter((_, i) => i !== index),
    }));
    
    onChange({ columns: updatedColumns, rows: updatedRows });
  };

  const updateColumn = (index: number, data: Partial<DetailedTableColumn>) => {
    const updatedColumns = block.columns.map((col, i) =>
      i === index ? { ...col, ...data } : col
    );
    onChange({ columns: updatedColumns });
  };

  const updateColumnWidth = (index: number, newWidth: number) => {
    const clampedWidth = Math.max(5, Math.min(70, newWidth));
    updateColumn(index, { width: clampedWidth });
  };

  // Column drag handlers
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

  const handleColDrop = useCallback((e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (draggedColIndex !== null && draggedColIndex !== targetIndex) {
      const newColumns = [...block.columns];
      const [draggedCol] = newColumns.splice(draggedColIndex, 1);
      newColumns.splice(targetIndex, 0, draggedCol);
      
      // Réorganiser aussi les cellules des lignes
      const updatedRows = block.rows.map(row => {
        const newCells = [...row.cells];
        const [draggedCell] = newCells.splice(draggedColIndex, 1);
        newCells.splice(targetIndex, 0, draggedCell);
        return { ...row, cells: newCells };
      });
      
      onChange({ columns: newColumns, rows: updatedRows });
    }
    
    setDraggedColIndex(null);
    setDragOverColIndex(null);
  }, [block.columns, block.rows, draggedColIndex, onChange]);

  const handleColDragEnd = useCallback(() => {
    setDraggedColIndex(null);
    setDragOverColIndex(null);
  }, []);

  const addRow = () => {
    const newRow: DetailedTableRow = {
      id: crypto.randomUUID(),
      cells: block.columns.map(() => ""),
    };
    onChange({ rows: [...block.rows, newRow] });
  };

  const removeRow = (index: number) => {
    onChange({ rows: block.rows.filter((_, i) => i !== index) });
  };

  const updateCell = (rowIndex: number, cellIndex: number, value: string) => {
    const updatedRows = block.rows.map((row, rIdx) => {
      if (rIdx === rowIndex) {
        const updatedCells = [...row.cells];
        updatedCells[cellIndex] = value;
        return { ...row, cells: updatedCells };
      }
      return row;
    });
    onChange({ rows: updatedRows });
  };

  const alignments: { value: "left" | "center" | "right"; icon: React.ReactNode }[] = [
    { value: "left", icon: <AlignLeft className="w-3 h-3" /> },
    { value: "center", icon: <AlignCenter className="w-3 h-3" /> },
    { value: "right", icon: <AlignRight className="w-3 h-3" /> },
  ];

  return (
    <div className="space-y-4">
      <Input
        label="Titre du tableau"
        value={block.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="ex: Details supplementaires"
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
          Afficher l&apos;entête
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

      {/* Colonnes avec drag & drop et largeurs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Colonnes</label>
          <Button variant="ghost" size="sm" onClick={addColumn}>
            <Plus className="w-4 h-4 mr-1" />
            Colonne
          </Button>
        </div>
        <div className="space-y-2">
          {block.columns.map((col, idx) => (
            <div
              key={col.id}
              onDragOver={(e) => handleColDragOver(e, idx)}
              onDragLeave={handleColDragLeave}
              onDrop={(e) => handleColDrop(e, idx)}
              className={`p-3 border rounded-lg transition-all ${
                col.visible === false ? "bg-gray-50" : "bg-white"
              } ${
                dragOverColIndex === idx ? "border-t-4 border-t-blue-500" : ""
              } ${
                draggedColIndex === idx ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  draggable
                  onDragStart={(e) => handleColDragStart(e, idx)}
                  onDragEnd={handleColDragEnd}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
                <input
                  type="text"
                  value={col.header}
                  onChange={(e) => updateColumn(idx, { header: e.target.value })}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                  placeholder="En-tête"
                />
                <div className="flex gap-1">
                  {alignments.map((align) => (
                    <button
                      key={align.value}
                      onClick={() => updateColumn(idx, { align: align.value })}
                      className={`p-1 rounded ${
                        col.align === align.value
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      {align.icon}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => updateColumn(idx, { visible: col.visible === false ? true : false })}
                  className={`p-1 rounded ${
                    col.visible === false ? "text-gray-400" : "text-blue-600"
                  } hover:bg-gray-100`}
                  title={col.visible === false ? "Afficher" : "Masquer"}
                >
                  {col.visible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {block.columns.length > 1 && (
                  <button
                    onClick={() => removeColumn(idx)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Slider de largeur */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-12">Largeur:</span>
                <button
                  onClick={() => updateColumnWidth(idx, col.width - 1)}
                  disabled={col.width <= 5}
                  className="w-6 h-6 flex items-center justify-center text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  −
                </button>
                <input
                  type="range"
                  value={col.width}
                  onChange={(e) => updateColumnWidth(idx, parseInt(e.target.value))}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  min="5"
                  max="70"
                  step="1"
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <button
                  onClick={() => updateColumnWidth(idx, col.width + 1)}
                  disabled={col.width >= 70}
                  className="w-6 h-6 flex items-center justify-center text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
                <span className="text-xs font-medium text-gray-700 w-8 text-center">
                  {col.width}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lignes */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Données</label>
          <Button variant="ghost" size="sm" onClick={addRow}>
            <Plus className="w-4 h-4 mr-1" />
            Ligne
          </Button>
        </div>
        <div className="space-y-2">
          {block.rows.map((row, rowIdx) => (
            <div key={row.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${block.columns.filter(c => c.visible !== false).length}, 1fr)` }}>
                {row.cells.map((cell, cellIdx) => {
                  // Ne pas afficher les cellules des colonnes cachées
                  if (block.columns[cellIdx]?.visible === false) return null;
                  return (
                    <input
                      key={cellIdx}
                      type="text"
                      value={cell}
                      onChange={(e) => updateCell(rowIdx, cellIdx, e.target.value)}
                      className="px-2 py-1 text-sm border border-gray-300 rounded"
                      placeholder={block.columns[cellIdx]?.header || ""}
                    />
                  );
                })}
              </div>
              <button
                onClick={() => removeRow(rowIdx)}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {block.rows.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              Aucune ligne. Cliquez sur &quot;+ Ligne&quot; pour en ajouter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedTableEditor;
