"use client";

import { DetailedTableBlock } from "@/types/invoice";

interface DetailedTableRendererProps {
  block: DetailedTableBlock;
  primaryColor: string;
}

const DetailedTableRenderer = ({ block, primaryColor }: DetailedTableRendererProps) => {
  if (!block.enabled) return null;

  const getAlignClass = (align: "left" | "center" | "right") => {
    return {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align];
  };

  // Filtrer les colonnes visibles
  const visibleColumns = block.columns.filter(col => col.visible !== false);

  // Calculer les largeurs pour le flex
  const getColumnWidth = (col: typeof block.columns[0], idx: number) => {
    const isLast = idx === visibleColumns.length - 1;
    if (isLast) {
      const usedWidth = visibleColumns.slice(0, -1).reduce((sum, c) => sum + c.width, 0);
      return 100 - usedWidth;
    }
    return col.width;
  };

  return (
    <div className="mb-6">
      {block.showTitle && block.title && (
        <h3
          className="text-sm font-semibold mb-3"
          style={{ color: primaryColor }}
        >
          {block.title}
        </h3>
      )}
      
      {/* Header */}
      {block.showHeader && (
        <div
          className="flex gap-2 py-3 px-4 text-sm font-semibold text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {visibleColumns.map((col, idx) => (
            <div
              key={col.id}
              style={{ width: `${getColumnWidth(col, idx)}%`, minWidth: 0 }}
              className={getAlignClass(col.align)}
            >
              {col.header}
            </div>
          ))}
        </div>
      )}
      
      {/* Rows */}
      {block.rows.map((row, rowIndex) => (
        <div
          key={row.id}
          className={`flex gap-2 py-3 px-4 text-sm ${
            block.striped
              ? rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
              : "bg-white"
          }`}
        >
          {visibleColumns.map((col, colIdx) => {
            // Trouver l'index original de la colonne pour obtenir la bonne cellule
            const originalIndex = block.columns.findIndex(c => c.id === col.id);
            const cellContent = row.cells[originalIndex] || "";
            
            return (
              <div
                key={col.id}
                style={{ width: `${getColumnWidth(col, colIdx)}%`, minWidth: 0 }}
                className={`text-gray-800 ${getAlignClass(col.align)}`}
              >
                {cellContent}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default DetailedTableRenderer;
