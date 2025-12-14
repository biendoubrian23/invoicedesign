"use client";

import { ConditionsBlock } from "@/types/invoice";
import Input from "@/components/ui/Input";

interface ConditionsEditorProps {
  block: ConditionsBlock;
  onChange: (data: Partial<ConditionsBlock>) => void;
}

const ConditionsEditor = ({ block, onChange }: ConditionsEditorProps) => {
  const fontSizes: { value: ConditionsBlock["fontSize"]; label: string }[] = [
    { value: "small", label: "Petit (pour les longues conditions)" },
    { value: "medium", label: "Moyen" },
  ];

  // Templates de conditions prédéfinis
  const templates = [
    {
      name: "Standard",
      content: "Paiement a reception de facture. En cas de retard de paiement, une penalite de 3 fois le taux d'interet legal sera appliquee, ainsi qu'une indemnite forfaitaire de 40€ pour frais de recouvrement.",
    },
    {
      name: "30 jours",
      content: "Paiement sous 30 jours par virement bancaire. Tout retard de paiement entrainera l'application de penalites de retard calculees au taux de 3 fois le taux d'interet legal en vigueur, ainsi qu'une indemnite forfaitaire pour frais de recouvrement de 40€.",
    },
    {
      name: "Acompte",
      content: "Un acompte de 30% est requis a la commande. Le solde est payable a reception de facture. Escompte pour paiement anticipe : 0%. Penalite de retard : 3 fois le taux d'interet legal.",
    },
    {
      name: "Mention legale complete",
      content: "En cas de retard de paiement, seront exigibles, conformement a l'article L 441-10 du code de commerce, une indemnite calculee sur la base de trois fois le taux de l'interet legal en vigueur ainsi qu'une indemnite forfaitaire pour frais de recouvrement de 40 euros. Pas d'escompte pour paiement anticipe.",
    },
  ];

  return (
    <div className="space-y-4">
      <Input
        label="Titre"
        value={block.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="ex: Conditions generales"
      />

      {/* Templates */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Modeles de conditions
        </label>
        <div className="flex flex-wrap gap-2">
          {templates.map((template) => (
            <button
              key={template.name}
              onClick={() => onChange({ content: template.content })}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contenu
        </label>
        <textarea
          value={block.content}
          onChange={(e) => onChange({ content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={6}
          placeholder="Saisissez vos conditions generales..."
        />
      </div>

      {/* Taille de police */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Taille du texte
        </label>
        <div className="space-y-2">
          {fontSizes.map((size) => (
            <label
              key={size.value}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                block.fontSize === size.value
                  ? "bg-blue-50 border-blue-500"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="fontSize"
                value={size.value}
                checked={block.fontSize === size.value}
                onChange={() => onChange({ fontSize: size.value })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{size.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Option afficher titre */}
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

export default ConditionsEditor;
