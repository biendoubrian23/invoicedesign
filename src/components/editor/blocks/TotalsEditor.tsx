"use client";

import { TotalsBlock } from "@/types/invoice";
import { Input } from "@/components/ui";

interface TotalsEditorProps {
  block: TotalsBlock;
  onUpdate: (updates: Partial<TotalsBlock>) => void;
}

const TotalsEditor = ({ block, onUpdate }: TotalsEditorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={block.showTitle}
          onChange={(e) => onUpdate({ showTitle: e.target.checked })}
          className="w-4 h-4"
        />
        <label className="text-sm">Afficher le titre</label>
      </div>

      {block.showTitle && (
        <div>
          <label className="block text-sm font-medium mb-1">Titre</label>
          <Input
            value={block.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Totaux"
          />
        </div>
      )}

      <div className="space-y-3 pt-4 border-t">
        <h4 className="text-sm font-semibold">Affichage</h4>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={block.showSubtotal}
              onChange={(e) => onUpdate({ showSubtotal: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm">Afficher sous-total HT</label>
          </div>

          {block.showSubtotal && (
            <div className="ml-6">
              <Input
                value={block.subtotalLabel}
                onChange={(e) => onUpdate({ subtotalLabel: e.target.value })}
                placeholder="Sous-total HT"
                className="text-sm"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={block.showTax}
              onChange={(e) => onUpdate({ showTax: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm">Afficher TVA</label>
          </div>

          {block.showTax && (
            <div className="ml-6">
              <Input
                value={block.taxLabel}
                onChange={(e) => onUpdate({ taxLabel: e.target.value })}
                placeholder="TVA"
                className="text-sm"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={block.showTotal}
              onChange={(e) => onUpdate({ showTotal: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm">Afficher total TTC</label>
          </div>

          {block.showTotal && (
            <div className="ml-6">
              <Input
                value={block.totalLabel}
                onChange={(e) => onUpdate({ totalLabel: e.target.value })}
                placeholder="Total TTC"
                className="text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalsEditor;
