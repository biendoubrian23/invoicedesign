"use client";

import { FreeTextBlock } from "@/types/invoice";
import Input from "@/components/ui/Input";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface FreeTextEditorProps {
  block: FreeTextBlock;
  onChange: (data: Partial<FreeTextBlock>) => void;
}

const FreeTextEditor = ({ block, onChange }: FreeTextEditorProps) => {
  const alignments: { value: FreeTextBlock["alignment"]; icon: React.ReactNode }[] = [
    { value: "left", icon: <AlignLeft className="w-4 h-4" /> },
    { value: "center", icon: <AlignCenter className="w-4 h-4" /> },
    { value: "right", icon: <AlignRight className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4">
      <Input
        label="Titre du bloc"
        value={block.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="ex: Note importante"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contenu
        </label>
        <textarea
          value={block.content}
          onChange={(e) => onChange({ content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={5}
          placeholder="Saisissez votre texte..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alignement
        </label>
        <div className="flex gap-2">
          {alignments.map((align) => (
            <button
              key={align.value}
              onClick={() => onChange({ alignment: align.value })}
              className={`p-2 rounded-lg border transition-colors ${
                block.alignment === align.value
                  ? "bg-blue-100 border-blue-500 text-blue-600"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {align.icon}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={block.showTitle}
            onChange={(e) => onChange({ showTitle: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Afficher le titre
        </label>
      </div>
    </div>
  );
};

export default FreeTextEditor;
