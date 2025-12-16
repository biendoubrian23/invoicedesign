"use client";

import { useState } from "react";
import InfoPanel from "./InfoPanel";
import OptionsPanel from "./OptionsPanel";
import LogoPanel from "./LogoPanel";
import BlocksPanel from "./BlocksPanel";
import ClientsPanel from "./ClientsPanel";
import StockagePanel from "./StockagePanel";
import PricingPanel from "./PricingPanel";
import SettingsPanel from "./SettingsPanel";
import { TemplateGrid } from "@/components/dashboard";
import {
  LayoutGrid,
  FileText,
  Palette,
  Image,
  PlusSquare,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  Users,
  CreditCard,
  Settings
} from "lucide-react";

interface AccordionSection {
  id: string;
  label: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

const MobileEditPanel = () => {
  const [openSections, setOpenSections] = useState<string[]>(["info"]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sections: AccordionSection[] = [
    {
      id: "templates",
      label: "Modèles",
      icon: LayoutGrid,
      content: <TemplateGrid />
    },
    {
      id: "info",
      label: "Informations",
      icon: FileText,
      content: <InfoPanel />
    },
    {
      id: "options",
      label: "Options",
      icon: Palette,
      content: <OptionsPanel />
    },
    {
      id: "logo",
      label: "Logo",
      icon: Image,
      content: <LogoPanel />
    },
    {
      id: "blocks",
      label: "Ajouter un bloc",
      icon: PlusSquare,
      content: <BlocksPanel />
    },
    {
      id: "clients",
      label: "Clients",
      icon: Users,
      content: <ClientsPanel />
    },
    {
      id: "stockage",
      label: "Stockage",
      icon: FolderOpen,
      content: <StockagePanel />
    },
    {
      id: "pricing",
      label: "Tarifs",
      icon: CreditCard,
      content: <PricingPanel />
    },
    {
      id: "settings",
      label: "Paramètres",
      icon: Settings,
      content: <SettingsPanel />
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50 pb-20">
      <div className="space-y-2 p-3">
        {sections.map((section) => {
          const isOpen = openSections.includes(section.id);
          const Icon = section.icon;

          return (
            <div
              key={section.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Header accordéon */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-800">{section.label}</span>
                </div>
                <div className="text-gray-400">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Contenu accordéon */}
              {isOpen && (
                <div className="border-t border-gray-100 max-h-[60vh] overflow-y-auto">
                  <div className="p-3">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileEditPanel;
