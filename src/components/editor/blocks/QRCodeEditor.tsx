"use client";

import { QRCodeBlock } from "@/types/invoice";
import Input from "@/components/ui/Input";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface QRCodeEditorProps {
  block: QRCodeBlock;
  onChange: (data: Partial<QRCodeBlock>) => void;
}

const QRCodeEditor = ({ block, onChange }: QRCodeEditorProps) => {
  const sizes: { value: QRCodeBlock["size"]; label: string }[] = [
    { value: "small", label: "Petit" },
    { value: "medium", label: "Moyen" },
    { value: "large", label: "Grand" },
  ];

  const positions: { value: QRCodeBlock["position"]; icon: React.ReactNode }[] = [
    { value: "left", icon: <AlignLeft className="w-4 h-4" /> },
    { value: "center", icon: <AlignCenter className="w-4 h-4" /> },
    { value: "right", icon: <AlignRight className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4">
      <Input
        label="Titre"
        value={block.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="ex: Paiement par QR Code"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contenu du QR Code
        </label>
        <textarea
          value={block.content}
          onChange={(e) => onChange({ content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="IBAN, lien de paiement, ou toute autre information..."
        />
        <p className="mt-1 text-xs text-gray-500">
          Entrez un IBAN, un lien de paiement (Stripe, PayPal), ou toute autre donnée à encoder.
        </p>
      </div>

      {/* Taille */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Taille
        </label>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => onChange({ size: size.value })}
              className={`flex-1 py-2 px-3 rounded-lg border text-sm transition-colors ${
                block.size === size.value
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Position
        </label>
        <div className="flex gap-2">
          {positions.map((pos) => (
            <button
              key={pos.value}
              onClick={() => onChange({ position: pos.value })}
              className={`p-2 rounded-lg border transition-colors ${
                block.position === pos.value
                  ? "bg-blue-100 border-blue-500 text-blue-600"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {pos.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2">
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
            checked={block.showLabel}
            onChange={(e) => onChange({ showLabel: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Afficher un label
        </label>
        
        {block.showLabel && (
          <Input
            value={block.label}
            onChange={(e) => onChange({ label: e.target.value })}
            placeholder="ex: Scannez pour payer"
          />
        )}
      </div>
    </div>
  );
};

export default QRCodeEditor;
