"use client";

import { useState, useRef, useEffect } from "react";
import { useInvoiceStore, PreviewClickTarget } from "@/store/invoiceStore";
import { Edit3, Layout, MousePointer } from "lucide-react";

interface ClickableZoneProps {
  children: React.ReactNode;
  target: PreviewClickTarget;
  showLayoutOption?: boolean; // Pour les tableaux, affiche le menu Contenu/Disposition
  className?: string;
  disabled?: boolean; // Pour désactiver sur mobile
}

const ClickableZone = ({ 
  children, 
  target, 
  showLayoutOption = false,
  className = "",
  disabled = false
}: ClickableZoneProps) => {
  const { navigateFromPreview } = useInvoiceStore();
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const zoneRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    e.stopPropagation();

    if (showLayoutOption && (target.type === 'items-table' || target.type === 'block')) {
      // Afficher le menu de choix
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setMenuPosition({ 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      });
      setShowMenu(true);
    } else {
      // Navigation directe
      navigateFromPreview(target);
    }
  };

  const handleMenuChoice = (mode: 'content' | 'layout') => {
    setShowMenu(false);
    
    if (target.type === 'items-table') {
      navigateFromPreview({ ...target, mode });
    } else if (target.type === 'block') {
      navigateFromPreview({ ...target, mode });
    }
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={zoneRef}
      onClick={handleClick}
      className={`relative cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 rounded print:ring-0 print:ring-offset-0 print:cursor-default ${className}`}
    >
      {children}

      {/* Indicateur de zone cliquable au survol - masqué à l'impression et à l'export */}
      <div 
        data-export-hidden
        className="absolute inset-0 bg-blue-500/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none print:hidden print:opacity-0 rounded"
      >
        <div className="absolute top-1 right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 print:hidden">
          <MousePointer className="w-3 h-3" />
          Modifier
        </div>
      </div>

      {/* Menu contextuel pour Contenu/Disposition */}
      {showMenu && (
        <div
          ref={menuRef}
          data-export-hidden
          className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[160px] print:hidden"
          style={{ 
            left: menuPosition.x, 
            top: menuPosition.y,
            transform: 'translate(-50%, 8px)'
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMenuChoice('content');
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <div className="text-left">
              <div className="font-medium">Contenu</div>
              <div className="text-xs text-gray-500">Modifier les données</div>
            </div>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMenuChoice('layout');
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <Layout className="w-4 h-4" />
            <div className="text-left">
              <div className="font-medium">Disposition</div>
              <div className="text-xs text-gray-500">Colonnes et mise en page</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ClickableZone;
