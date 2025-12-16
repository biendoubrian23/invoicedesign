"use client";

import { useState } from "react";
import { InvoiceItem, InvoiceItemsColumn } from "@/types/invoice";
import { useInvoiceStore } from "@/store";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Trash2, Plus, ChevronDown, ChevronRight, Settings } from "lucide-react";

interface InvoiceItemEditorProps {
  item: InvoiceItem;
  index: number;
  customColumns?: InvoiceItemsColumn[];
}

const InvoiceItemEditor = ({ item, index, customColumns = [] }: InvoiceItemEditorProps) => {
  const {
    invoice,
    updateItem,
    removeItem,
    addSubItem,
    updateSubItem,
    removeSubItem,
    toggleSubItems,
    setSubItemsMode,
  } = useInvoiceStore();

  const [isExpanded, setIsExpanded] = useState(item.hasSubItems);
  const [showModeSelector, setShowModeSelector] = useState(false);

  const handleToggleSubItems = () => {
    const newState = !item.hasSubItems;
    toggleSubItems(item.id, newState);
    setIsExpanded(newState);
  };

  const handleModeChange = (mode: InvoiceItem['subItemsMode']) => {
    setSubItemsMode(item.id, mode);
    setShowModeSelector(false);
  };

  const getModeLabel = (mode: InvoiceItem['subItemsMode']) => {
    switch (mode) {
      case 'parent-quantity':
        return 'Quantité parent';
      case 'individual-quantities':
        return 'Quantités individuelles';
      case 'no-prices':
        return 'Sans prix';
    }
  };

  return (
    <div className="border border-gray-200 bg-white overflow-hidden">
      {/* Ligne principale */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-start gap-3">
          {/* Toggle expand/collapse */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 p-1 hover:bg-gray-200 transition-colors"
            title={isExpanded ? "Réduire" : "Développer"}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Ligne {index + 1}
              </span>
              <div className="flex items-center gap-2">
                {/* Bouton activer/désactiver sous-lignes */}
                <button
                  onClick={handleToggleSubItems}
                  className={`px-2 py-1 text-xs font-medium transition-colors ${item.hasSubItems
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  title="Activer/désactiver les sous-lignes"
                >
                  {item.hasSubItems ? "Sous-lignes actives" : "Ajouter sous-lignes"}
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Input
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(item.id, { description: e.target.value })}
            />

            {/* Colonnes personnalisées */}
            {customColumns.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {customColumns.map((col) => (
                  <Input
                    key={col.id}
                    placeholder={col.header}
                    value={item.customFields?.[col.key] || ""}
                    onChange={(e) => {
                      const newCustomFields = {
                        ...item.customFields,
                        [col.key]: e.target.value,
                      };
                      updateItem(item.id, { customFields: newCustomFields });
                    }}
                  />
                ))}
              </div>
            )}

            {/* Mode selector pour les sous-lignes */}
            {item.hasSubItems && (
              <div className="relative">
                <button
                  onClick={() => setShowModeSelector(!showModeSelector)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-300 hover:border-blue-400 transition-colors w-full justify-between"
                >
                  <span className="text-gray-700">
                    Mode: <span className="font-medium">{getModeLabel(item.subItemsMode)}</span>
                  </span>
                  <Settings className="w-4 h-4 text-gray-500" />
                </button>

                {showModeSelector && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg z-10">
                    <button
                      onClick={() => handleModeChange('parent-quantity')}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900">Quantité parent</div>
                      <div className="text-xs text-gray-500">
                        Sous-lignes × quantité de la ligne principale
                      </div>
                    </button>
                    <button
                      onClick={() => handleModeChange('individual-quantities')}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 transition-colors border-t"
                    >
                      <div className="font-medium text-gray-900">Quantités individuelles</div>
                      <div className="text-xs text-gray-500">
                        Chaque sous-ligne a sa propre quantité
                      </div>
                    </button>
                    <button
                      onClick={() => handleModeChange('no-prices')}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 transition-colors border-t"
                    >
                      <div className="font-medium text-gray-900">Sans prix</div>
                      <div className="text-xs text-gray-500">
                        Sous-lignes descriptives uniquement
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              {/* Quantité parent - visible uniquement si mode parent-quantity ou pas de sous-items */}
              {(!item.hasSubItems || item.subItemsMode === 'parent-quantity') && (
                <Input
                  type="number"
                  placeholder="Qté"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(item.id, { quantity: Number(e.target.value) })
                  }
                />
              )}

              {/* Prix unitaire - visible uniquement si pas de sous-items */}
              {!item.hasSubItems && (
                <Input
                  type="number"
                  placeholder="Prix unitaire"
                  value={item.unitPrice}
                  onChange={(e) =>
                    updateItem(item.id, { unitPrice: Number(e.target.value) })
                  }
                />
              )}

              {/* Total */}
              <div className={`flex items-center ${item.hasSubItems && item.subItemsMode !== 'parent-quantity' ? 'col-span-2' : ''} ${item.hasSubItems ? 'justify-end' : 'justify-end'}`}>
                <span className="text-sm font-semibold text-gray-900">
                  {item.total.toFixed(2)} {invoice.currency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sous-lignes */}
      {isExpanded && item.hasSubItems && item.subItems && (
        <div className="bg-blue-50 border-t border-blue-100">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                Sous-lignes
              </span>
            </div>

            {item.subItems.map((subItem, subIndex) => (
              <div
                key={subItem.id}
                className="bg-white p-3 border border-blue-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Sous-ligne {subIndex + 1}
                  </span>
                  <button
                    onClick={() => removeSubItem(item.id, subItem.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                <Input
                  placeholder="Description"
                  value={subItem.description}
                  onChange={(e) =>
                    updateSubItem(item.id, subItem.id, { description: e.target.value })
                  }
                  className="text-sm"
                />

                {/* Colonnes personnalisées pour sous-lignes */}
                {customColumns.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {customColumns.map((col) => (
                      <Input
                        key={col.id}
                        placeholder={col.header}
                        value={subItem.customFields?.[col.key] || ""}
                        onChange={(e) => {
                          const newCustomFields = {
                            ...subItem.customFields,
                            [col.key]: e.target.value,
                          };
                          updateSubItem(item.id, subItem.id, { customFields: newCustomFields });
                        }}
                        className="text-sm"
                      />
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  {/* Quantité - visible dans tous les modes sauf no-prices */}
                  {item.subItemsMode !== 'no-prices' && (
                    <Input
                      type="number"
                      placeholder="Qté"
                      value={subItem.quantity || 1}
                      onChange={(e) =>
                        updateSubItem(item.id, subItem.id, {
                          quantity: Number(e.target.value),
                          hasQuantity: true,
                        })
                      }
                      className="text-sm"
                    />
                  )}

                  {/* Prix - invisible en mode no-prices */}
                  {item.subItemsMode !== 'no-prices' && (
                    <>
                      <Input
                        type="number"
                        placeholder="Prix"
                        value={subItem.unitPrice}
                        onChange={(e) =>
                          updateSubItem(item.id, subItem.id, {
                            unitPrice: Number(e.target.value),
                          })
                        }
                        className="text-sm"
                      />

                      <div className="flex items-center justify-end">
                        <span className="text-xs font-medium text-gray-700">
                          {subItem.total.toFixed(2)} {invoice.currency}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Mode no-prices : span sur toute la largeur */}
                  {item.subItemsMode === 'no-prices' && (
                    <div className="col-span-3 text-xs text-gray-500 italic">
                      Description uniquement
                    </div>
                  )}
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="w-full text-blue-700 border-blue-300 hover:bg-blue-100"
              onClick={() => addSubItem(item.id)}
            >
              <Plus className="w-3 h-3 mr-2" />
              Ajouter une sous-ligne
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceItemEditor;
