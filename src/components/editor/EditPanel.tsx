"use client";

import { useInvoiceStore } from "@/store";
import InfoPanel from "./InfoPanel";
import OptionsPanel from "./OptionsPanel";
import LogoPanel from "./LogoPanel";
import BlocksPanel from "./BlocksPanel";
import StockagePanel from "./StockagePanel";
import SettingsPanel from "./SettingsPanel";
import PricingPanel from "./PricingPanel";
import ClientsPanel from "./ClientsPanel";
import MyBusinessPanel from "./MyBusinessPanel";
import { TemplateGrid } from "@/components/dashboard";

interface PreviewFile {
  url: string;
  name: string;
  type: 'pdf' | 'image';
}

interface EditPanelProps {
  onPreviewFile?: (file: PreviewFile | null) => void;
}

const EditPanel = ({ onPreviewFile }: EditPanelProps) => {
  const { activeSection } = useInvoiceStore();

  const renderPanel = () => {
    switch (activeSection) {
      case "templates":
        return <TemplateGrid />;
      case "info":
        return <InfoPanel />;
      case "options":
        return <OptionsPanel />;
      case "logo":
        return <LogoPanel />;
      case "blocks":
        return <BlocksPanel />;
      case "stockage":
        return <StockagePanel onPreviewFile={onPreviewFile} />;
      case "settings":
        return <SettingsPanel />;
      case "pricing":
        return <PricingPanel />;
      case "clients":
        return <ClientsPanel />;
      case "my-business":
        return <MyBusinessPanel />;
      default:
        return <InfoPanel />;
    }
  };

  return (
    <div className="h-full overflow-hidden bg-white border-r border-gray-200">
      {renderPanel()}
    </div>
  );
};

export default EditPanel;
