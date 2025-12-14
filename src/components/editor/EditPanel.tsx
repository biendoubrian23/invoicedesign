"use client";

import { useInvoiceStore } from "@/store";
import InfoPanel from "./InfoPanel";
import OptionsPanel from "./OptionsPanel";
import LogoPanel from "./LogoPanel";
import BlocksPanel from "./BlocksPanel";
import { TemplateGrid } from "@/components/dashboard";

const EditPanel = () => {
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
