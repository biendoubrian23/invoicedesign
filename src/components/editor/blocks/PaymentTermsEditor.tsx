"use client";

import { PaymentTermsBlock } from "@/types/invoice";
import { Input } from "@/components/ui";

interface PaymentTermsEditorProps {
  block: PaymentTermsBlock;
  onUpdate: (updates: Partial<PaymentTermsBlock>) => void;
}

const PaymentTermsEditor = ({ block, onUpdate }: PaymentTermsEditorProps) => {
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
            placeholder="Conditions de paiement"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Contenu</label>
        <textarea
          value={block.content}
          onChange={(e) => onUpdate({ content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          placeholder="Paiement à 30 jours par virement bancaire..."
        />
      </div>
    </div>
  );
};

export default PaymentTermsEditor;
