"use client";

import { useInvoiceStore } from "@/store";
import { EditorSection } from "@/types/invoice";
import { LayoutGrid, FileText, Palette, Image, PlusSquare } from "lucide-react";

const menuItems: { id: EditorSection; label: string; icon: React.ElementType }[] = [
  { id: "templates", label: "Modeles", icon: LayoutGrid },
  { id: "info", label: "Informations", icon: FileText },
  { id: "options", label: "Options", icon: Palette },
  { id: "logo", label: "Logo", icon: Image },
  { id: "blocks", label: "Ajouter un bloc", icon: PlusSquare },
];

const Sidebar = () => {
  const { activeSection, setActiveSection } = useInvoiceStore();

  return (
    <aside className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Menu */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-2 border-transparent"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Info */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          InvoiceDesign v1.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
