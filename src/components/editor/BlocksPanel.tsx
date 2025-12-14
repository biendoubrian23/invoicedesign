"use client";

import { useInvoiceStore } from "@/store";
import Button from "@/components/ui/Button";
import { FileText, Type, Table, PenTool, QrCode, FileCheck } from "lucide-react";

const blocks = [
  {
    id: "line",
    name: "Ligne de facturation",
    description: "Ajouter une nouvelle ligne",
    icon: FileText,
  },
  {
    id: "text",
    name: "Texte libre",
    description: "Section de texte personnalisee",
    icon: Type,
  },
  {
    id: "table",
    name: "Tableau detaille",
    description: "Tableau avec colonnes",
    icon: Table,
  },
  {
    id: "signature",
    name: "Signatures",
    description: "Zone de signatures",
    icon: PenTool,
  },
  {
    id: "qr",
    name: "QR Code",
    description: "QR code de paiement",
    icon: QrCode,
  },
  {
    id: "terms",
    name: "Conditions",
    description: "Conditions generales",
    icon: FileCheck,
  },
];

const BlocksPanel = () => {
  const { addItem } = useInvoiceStore();

  const handleAddBlock = (blockId: string) => {
    if (blockId === "line") {
      addItem();
    }
    // Other block types would be handled here
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="animate-fade-in">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
          Ajouter un bloc
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Cliquez sur un bloc pour l&apos;ajouter a votre facture
        </p>

        <div className="grid grid-cols-1 gap-3">
          {blocks.map((block, index) => (
            <button
              key={block.id}
              onClick={() => handleAddBlock(block.id)}
              className="flex items-center gap-4 p-4 bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.05}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <block.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">{block.name}</h4>
                <p className="text-xs text-gray-500">{block.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-100">
        <p className="text-sm text-blue-800">
          Les blocs ajoutes apparaissent dans votre facture. Vous pouvez les
          modifier depuis la section Informations.
        </p>
      </div>
    </div>
  );
};

export default BlocksPanel;
