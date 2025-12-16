import { create } from "zustand";
import {
  Invoice,
  InvoiceItem,
  SubItem,
  Template,
  EditorSection,
  InvoiceBlock,
  FreeTextBlock,
  DetailedTableBlock,
  SignatureBlock,
  QRCodeBlock,
  ConditionsBlock,
  InvoiceItemsBlock,
  TotalsBlock,
  PaymentTermsBlock,
  BlockType,
} from "@/types/invoice";

// Types pour la navigation depuis la preview
export type PreviewClickTarget =
  | { type: 'logo' }
  | { type: 'invoice-info' }
  | { type: 'issuer' }
  | { type: 'client' }
  | { type: 'items-table'; mode: 'content' | 'layout' }
  | { type: 'item'; itemId: string }
  | { type: 'totals' }
  | { type: 'block'; blockId: string; mode?: 'content' | 'layout' };

interface InvoiceStore {
  // Current invoice being edited
  invoice: Invoice;
  // Selected template
  selectedTemplate: string | null;
  // Active editor section
  activeSection: EditorSection;
  // Templates list
  templates: Template[];

  // Blocs modulaires
  blocks: InvoiceBlock[];
  selectedBlockId: string | null;

  // Navigation depuis la preview (pour scroll vers l'élément)
  focusTarget: PreviewClickTarget | null;

  // Actions
  setInvoice: (invoice: Partial<Invoice>) => void;
  setIssuer: (issuer: Partial<Invoice["issuer"]>) => void;
  setClient: (client: Partial<Invoice["client"]>) => void;
  addItem: () => void;
  updateItem: (id: string, item: Partial<InvoiceItem>) => void;
  removeItem: (id: string) => void;

  // Sub-items actions
  addSubItem: (itemId: string) => void;
  updateSubItem: (itemId: string, subItemId: string, subItem: Partial<SubItem>) => void;
  removeSubItem: (itemId: string, subItemId: string) => void;
  toggleSubItems: (itemId: string, enabled: boolean) => void;
  setSubItemsMode: (itemId: string, mode: InvoiceItem['subItemsMode']) => void;

  // Block actions
  addBlock: (type: BlockType) => void;
  updateBlock: (id: string, data: Partial<InvoiceBlock>) => void;
  removeBlock: (id: string) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  selectBlock: (id: string | null) => void;
  moveBlockUp: (id: string) => void;
  moveBlockDown: (id: string) => void;

  setStyling: (styling: Partial<Invoice["styling"]>) => void;
  setLogo: (logo: string | undefined) => void;
  setLogoPosition: (position: Invoice["logoPosition"]) => void;
  setLogoSize: (size: Invoice["logoSize"]) => void;
  setActiveSection: (section: EditorSection) => void;
  selectTemplate: (templateId: string) => void;
  resetInvoice: () => void;
  calculateTotals: () => { subtotal: number; tax: number; total: number };

  // Navigation depuis la preview
  navigateFromPreview: (target: PreviewClickTarget) => void;
  clearFocusTarget: () => void;
}

const defaultInvoice: Invoice = {
  id: crypto.randomUUID(),
  invoiceNumber: `FAC-${new Date().getFullYear()}-001`,
  date: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  currency: "€",
  issuer: {
    name: "Votre Societe",
    address: "123 Rue de la Facturation\n75001 Paris",
    siret: "123 456 789 00010",
    email: "contact@votresociete.fr",
    phone: "+33 1 23 45 67 89",
  },
  client: {
    name: "Client XYZ",
    company: "Entreprise Cliente",
    address: "456 Avenue du Client\n69001 Lyon",
    email: "client@example.com",
  },
  items: [
    {
      id: crypto.randomUUID(),
      description: "Prestation de service",
      quantity: 2,
      unitPrice: 600,
      total: 1200,
      selected: true,
      hasSubItems: true,
      subItemsMode: 'parent-quantity',
      subItems: [
        {
          id: crypto.randomUUID(),
          description: "Modelisation 3D",
          unitPrice: 250,
          hasQuantity: false,
          total: 250,
          selected: true,
        },
        {
          id: crypto.randomUUID(),
          description: "Developpement",
          unitPrice: 300,
          hasQuantity: false,
          total: 300,
          selected: true,
        },
        {
          id: crypto.randomUUID(),
          description: "Stockage cloud",
          unitPrice: 50,
          hasQuantity: false,
          total: 50,
          selected: true,
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      description: "Support et maintenance",
      quantity: 1,
      unitPrice: 250,
      total: 250,
      selected: true,
      hasSubItems: false,
      subItemsMode: 'parent-quantity',
    },
  ],
  notes: "",
  paymentTerms: "Paiement sous 30 jours par virement bancaire\nIBAN: FR76 XXXX XXXX XXXX XXXX XXXX XXX",
  taxRate: 20,
  styling: {
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
    fontFamily: "Inter",
    fontSize: {
      title: "24px",
      heading: "18px",
      body: "14px",
    },
  },
  logo: undefined,
  logoPosition: "left",
  logoSize: "medium",
};

// Import model from models folder
import { classicModel, elegantModel } from '@/models';

// Templates disponibles (utilise les modèles du dossier models)
const defaultTemplates: Template[] = [
  {
    id: classicModel.id,
    name: classicModel.name,
    description: classicModel.description,
    color: classicModel.previewColor,
  },
  {
    id: elegantModel.id,
    name: elegantModel.name,
    description: elegantModel.description,
    color: elegantModel.previewColor,
  },
];

// Blocs par défaut
const defaultBlocks: InvoiceBlock[] = [
  {
    id: "invoice-items-default",
    type: "invoice-items",
    order: 0,
    enabled: true,
    showTitle: false,
    title: "Prestations",
    columns: [
      { id: "col-desc", key: "description", header: "Description", width: 45, visible: true, required: true },
      { id: "col-qty", key: "quantity", header: "Qte", width: 10, visible: true },
      { id: "col-price", key: "unitPrice", header: "Prix unit.", width: 20, visible: true },
      { id: "col-total", key: "total", header: "Total", width: 25, visible: true, required: true },
    ],
    showHeader: true,
    striped: true,
  } as InvoiceItemsBlock,
  {
    id: "totals-default",
    type: "totals",
    order: 100,
    enabled: true,
    showTitle: false,
    title: "Totaux",
    showSubtotal: true,
    showTax: true,
    showTotal: true,
    subtotalLabel: "Sous-total HT",
    taxLabel: "TVA",
    totalLabel: "Total TTC",
  } as TotalsBlock,
  {
    id: "payment-terms-default",
    type: "payment-terms",
    order: 101,
    enabled: true,
    showTitle: true,
    title: "Conditions de paiement",
    content: "Paiement sous 30 jours par virement bancaire\nIBAN: FR76 XXXX XXXX XXXX XXXX XXXX XXX",
  } as PaymentTermsBlock,
];

// Fonction pour créer un nouveau bloc selon son type
const createBlock = (type: BlockType, order: number): InvoiceBlock => {
  const id = crypto.randomUUID();

  switch (type) {
    case "invoice-items":
      return {
        id,
        type: "invoice-items",
        order,
        enabled: true,
        showTitle: false,
        title: "Prestations",
        columns: [
          { id: crypto.randomUUID(), key: "description", header: "Description", width: 45, visible: true, required: true },
          { id: crypto.randomUUID(), key: "quantity", header: "Qte", width: 10, visible: true },
          { id: crypto.randomUUID(), key: "unitPrice", header: "Prix unit.", width: 20, visible: true },
          { id: crypto.randomUUID(), key: "total", header: "Total", width: 25, visible: true, required: true },
        ],
        showHeader: true,
        striped: true,
      } as InvoiceItemsBlock;

    case "free-text":
      return {
        id,
        type: "free-text",
        order,
        enabled: true,
        showTitle: false,
        title: "Note",
        content: "Saisissez votre texte ici...",
        alignment: "left",
      } as FreeTextBlock;

    case "detailed-table":
      return {
        id,
        type: "detailed-table",
        order,
        enabled: true,
        showTitle: false,
        title: "Details supplementaires",
        columns: [
          { id: crypto.randomUUID(), header: "Element", width: 50, align: "left" },
          { id: crypto.randomUUID(), header: "Details", width: 50, align: "left" },
        ],
        rows: [
          { id: crypto.randomUUID(), cells: ["", ""] },
        ],
        showHeader: true,
        striped: true,
      } as DetailedTableBlock;

    case "signature":
      return {
        id,
        type: "signature",
        order,
        enabled: true,
        showTitle: false,
        title: "Signature",
        mode: "text",
        signatureText: "",
        signatureFont: "'Dancing Script', cursive",
        showDate: true,
        showName: true,
        signerName: "",
        position: "right",
      } as SignatureBlock;

    case "qr-code":
      return {
        id,
        type: "qr-code",
        order,
        enabled: true,
        showTitle: false,
        title: "Paiement",
        content: "",
        size: "medium",
        position: "left",
        showLabel: true,
        label: "Scannez pour payer",
      } as QRCodeBlock;

    case "conditions":
      return {
        id,
        type: "conditions",
        order,
        enabled: true,
        showTitle: false,
        title: "Conditions generales",
        content: "Paiement a reception de facture. En cas de retard de paiement, une penalite de 3 fois le taux d'interet legal sera appliquee, ainsi qu'une indemnite forfaitaire de 40€ pour frais de recouvrement.",
        fontSize: "small",
      } as ConditionsBlock;

    case "totals":
      return {
        id,
        type: "totals",
        order,
        enabled: true,
        showTitle: false,
        title: "Totaux",
        showSubtotal: true,
        showTax: true,
        showTotal: true,
        subtotalLabel: "Sous-total HT",
        taxLabel: "TVA",
        totalLabel: "Total TTC",
      } as TotalsBlock;

    case "payment-terms":
      return {
        id,
        type: "payment-terms",
        order,
        enabled: true,
        showTitle: true,
        title: "Conditions de paiement",
        content: "Paiement sous 30 jours par virement bancaire\nIBAN: FR76 XXXX XXXX XXXX XXXX XXXX XXX",
      } as PaymentTermsBlock;

    default:
      throw new Error(`Unknown block type: ${type}`);
  }
};

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoice: defaultInvoice,
  selectedTemplate: "classic",
  activeSection: "templates",
  templates: defaultTemplates,
  blocks: defaultBlocks,
  selectedBlockId: null,
  focusTarget: null,

  setInvoice: (invoiceData) =>
    set((state) => ({
      invoice: { ...state.invoice, ...invoiceData },
    })),

  setIssuer: (issuerData) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        issuer: { ...state.invoice.issuer, ...issuerData },
      },
    })),

  setClient: (clientData) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        client: { ...state.invoice.client, ...clientData },
      },
    })),

  addItem: () =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        items: [
          ...state.invoice.items,
          {
            id: crypto.randomUUID(),
            description: "Nouvelle ligne",
            quantity: 1,
            unitPrice: 0,
            total: 0,
            selected: true,
            hasSubItems: false,
            subItemsMode: 'parent-quantity',
          },
        ],
      },
    })),

  updateItem: (id, itemData) =>
    set((state) => {
      const calculateItemTotal = (item: InvoiceItem): number => {
        // Si pas de sous-items ou mode no-prices, calcul simple
        if (!item.hasSubItems || !item.subItems || item.subItemsMode === 'no-prices') {
          return item.quantity * item.unitPrice;
        }

        // Calculer le total des sous-items sélectionnés (toujours avec quantité)
        const subItemsTotal = item.subItems
          .filter(sub => sub.selected !== false)
          .reduce((sum, sub) => {
            // Toujours utiliser la quantité (défaut: 1) × prix unitaire
            return sum + (sub.quantity || 1) * sub.unitPrice;
          }, 0);

        // Mode parent-quantity : total des sous-items × quantité parent
        if (item.subItemsMode === 'parent-quantity') {
          return item.quantity * subItemsTotal;
        }

        // Mode individual-quantities : on retourne juste le total des sous-items
        return subItemsTotal;
      };

      return {
        invoice: {
          ...state.invoice,
          items: state.invoice.items.map((item) => {
            if (item.id === id) {
              const updated = { ...item, ...itemData };

              // Recalculer le unitPrice si on a des sous-items
              if (updated.hasSubItems && updated.subItems) {
                const subItemsSum = updated.subItems
                  .filter(sub => sub.selected !== false)
                  .reduce((sum, sub) => sum + sub.unitPrice, 0);

                if (updated.subItemsMode === 'parent-quantity') {
                  updated.unitPrice = subItemsSum;
                }
              }

              updated.total = calculateItemTotal(updated);
              return updated;
            }
            return item;
          }),
        },
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        items: state.invoice.items.filter((item) => item.id !== id),
      },
    })),

  // Sub-items actions
  addSubItem: (itemId) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        items: state.invoice.items.map((item) => {
          if (item.id === itemId) {
            const newSubItem: SubItem = {
              id: crypto.randomUUID(),
              description: "Nouvelle sous-ligne",
              quantity: 1,
              unitPrice: 0,
              hasQuantity: item.subItemsMode !== 'no-prices',
              total: 0,
              selected: true,
            };

            return {
              ...item,
              hasSubItems: true,
              subItems: [...(item.subItems || []), newSubItem],
            };
          }
          return item;
        }),
      },
    })),

  updateSubItem: (itemId, subItemId, subItemData) =>
    set((state) => {
      const calculateSubItemTotal = (subItem: SubItem): number => {
        // Toujours calculer avec la quantité (défaut: 1)
        const qty = subItem.quantity || 1;
        return qty * subItem.unitPrice;
      };

      return {
        invoice: {
          ...state.invoice,
          items: state.invoice.items.map((item) => {
            if (item.id === itemId && item.subItems) {
              const updatedSubItems = item.subItems.map((sub) => {
                if (sub.id === subItemId) {
                  const updated = { ...sub, ...subItemData };
                  updated.total = calculateSubItemTotal(updated);
                  return updated;
                }
                return sub;
              });

              // Recalculer le total de l'item parent basé sur les sous-items avec leurs quantités
              // Utiliser le calcul dynamique pour chaque sous-item
              const subItemsTotalSum = updatedSubItems
                .filter(sub => sub.selected !== false)
                .reduce((sum, sub) => sum + ((sub.quantity || 1) * sub.unitPrice), 0);

              const subItemsUnitSum = updatedSubItems
                .filter(sub => sub.selected !== false)
                .reduce((sum, sub) => sum + sub.unitPrice, 0);

              let newTotal = 0;
              if (item.subItemsMode === 'parent-quantity') {
                // En mode parent-quantity, multiplier la somme des sous-items (avec leurs quantités) par la quantité parent
                // Total = parentQty × SUM(subItemQty × subItemPrice)
                newTotal = item.quantity * subItemsTotalSum;
              } else {
                // En mode individual-quantities ou autre, additionner les totaux calculés (qty * prix)
                newTotal = subItemsTotalSum;
              }

              return {
                ...item,
                subItems: updatedSubItems,
                // Prix unitaire = somme des prix unitaires (sans les quantités des sous-items)
                unitPrice: item.subItemsMode === 'parent-quantity' ? subItemsUnitSum : item.unitPrice,
                // Total = prend en compte les quantités des sous-items × quantité parent
                total: newTotal || item.total,
              };
            }
            return item;
          }),
        },
      };
    }),

  removeSubItem: (itemId, subItemId) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        items: state.invoice.items.map((item) => {
          if (item.id === itemId && item.subItems) {
            const updatedSubItems = item.subItems.filter((sub) => sub.id !== subItemId);

            return {
              ...item,
              subItems: updatedSubItems,
              hasSubItems: updatedSubItems.length > 0,
            };
          }
          return item;
        }),
      },
    })),

  toggleSubItems: (itemId, enabled) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        items: state.invoice.items.map((item) => {
          if (item.id === itemId) {
            // Préserver les sous-items existants - juste toggler le flag hasSubItems
            return {
              ...item,
              hasSubItems: enabled,
              // Ne pas effacer les sous-items - les garder pour permettre de réactiver
            };
          }
          return item;
        }),
      },
    })),

  setSubItemsMode: (itemId, mode) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        items: state.invoice.items.map((item) => {
          if (item.id === itemId) {
            // Mettre à jour hasQuantity pour tous les sub-items
            const updatedSubItems = (item.subItems || []).map(sub => ({
              ...sub,
              hasQuantity: mode !== 'no-prices',
              quantity: mode !== 'no-prices' ? (sub.quantity || 1) : undefined,
            }));

            return {
              ...item,
              subItemsMode: mode,
              subItems: updatedSubItems,
            };
          }
          return item;
        }),
      },
    })),

  setStyling: (stylingData) =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        styling: { ...state.invoice.styling, ...stylingData },
      },
    })),

  setLogo: (logo) =>
    set((state) => ({
      invoice: { ...state.invoice, logo },
    })),

  setLogoPosition: (logoPosition) =>
    set((state) => ({
      invoice: { ...state.invoice, logoPosition },
    })),

  setLogoSize: (logoSize) =>
    set((state) => ({
      invoice: { ...state.invoice, logoSize },
    })),

  setActiveSection: (activeSection) => set({ activeSection }),

  selectTemplate: (templateId) => {
    const template = get().templates.find((t) => t.id === templateId);
    if (template) {
      // Import the model to get its default blocks
      const { getModelById } = require('@/models');
      const model = getModelById(templateId);

      set((state) => ({
        selectedTemplate: templateId,
        // Load model-specific blocks if available
        blocks: model?.defaultBlocks || state.blocks,
        invoice: {
          ...state.invoice,
          styling: {
            ...state.invoice.styling,
            primaryColor: template.color,
          },
        },
      }));
    }
  },

  resetInvoice: () => set({ invoice: defaultInvoice }),

  // Block actions
  addBlock: (type) =>
    set((state) => {
      let order: number;

      // Si c'est un tableau détaillé, le placer juste après invoice-items (order 1)
      if (type === "detailed-table") {
        const invoiceItemsBlock = state.blocks.find(b => b.type === "invoice-items");
        if (invoiceItemsBlock) {
          order = invoiceItemsBlock.order + 1;
          // Décaler tous les blocs suivants
          const updatedBlocks = state.blocks.map(b =>
            b.order >= order ? { ...b, order: b.order + 1 } : b
          );
          const newBlock = createBlock(type, order);
          return {
            blocks: [...updatedBlocks, newBlock],
            selectedBlockId: newBlock.id,
          };
        }
      }

      // Sinon, ajouter à la fin
      const maxOrder = Math.max(...state.blocks.map(b => b.order), -1);
      const newBlock = createBlock(type, maxOrder + 1);
      return {
        blocks: [...state.blocks, newBlock],
        selectedBlockId: newBlock.id,
      };
    }),

  updateBlock: (id, data) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, ...data } : block
      ) as InvoiceBlock[],
    })),

  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    })),

  reorderBlocks: (startIndex, endIndex) =>
    set((state) => {
      const result = [...state.blocks].sort((a, b) => a.order - b.order);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      // Recalculer les ordres
      const reordered = result.map((block, index) => ({
        ...block,
        order: index,
      }));

      return { blocks: reordered };
    }),

  selectBlock: (id) => set({ selectedBlockId: id }),

  moveBlockUp: (id) =>
    set((state) => {
      const sorted = [...state.blocks].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex(b => b.id === id);
      if (index <= 0) return state;

      // Échanger les ordres
      const newBlocks = sorted.map((block, i) => {
        if (i === index) return { ...block, order: index - 1 };
        if (i === index - 1) return { ...block, order: index };
        return block;
      });

      return { blocks: newBlocks };
    }),

  moveBlockDown: (id) =>
    set((state) => {
      const sorted = [...state.blocks].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex(b => b.id === id);
      if (index >= sorted.length - 1) return state;

      // Échanger les ordres
      const newBlocks = sorted.map((block, i) => {
        if (i === index) return { ...block, order: index + 1 };
        if (i === index + 1) return { ...block, order: index };
        return block;
      });

      return { blocks: newBlocks };
    }),

  calculateTotals: () => {
    const { invoice } = get();
    const subtotal = invoice.items
      .filter((item) => item.selected !== false)
      .reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * (invoice.taxRate / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  },

  navigateFromPreview: (target) => {
    // Déterminer la section à ouvrir selon le type de cible
    let section: EditorSection = "info";

    switch (target.type) {
      case 'logo':
        section = "logo";
        break;
      case 'invoice-info':
      case 'issuer':
      case 'client':
      case 'item':
        section = "info";
        break;
      case 'items-table':
        // Pour le tableau, content = info, layout = blocks
        section = target.mode === 'layout' ? "blocks" : "info";
        break;
      case 'totals':
        section = "blocks";
        break;
      case 'block': {
        // Si c'est le bloc items en mode contenu, aller vers info
        // Utiliser une variable locale pour satisfaire TypeScript
        const blockTarget = target as { type: 'block'; blockId: string; mode?: 'content' | 'layout' };
        if (blockTarget.mode === 'content') {
          const block = get().blocks.find(b => b.id === blockTarget.blockId);
          if (block?.type === 'invoice-items') {
            section = "info";
            // Important : Transformer la target en 'items-table' pour que InfoPanel scrolle dessus
            target = { type: 'items-table', mode: 'content' };
          } else {
            section = "blocks";
          }
        } else {
          section = "blocks";
        }
        break;
      }
    }

    set({
      activeSection: section,
      focusTarget: target,
      // Si c'est un bloc, le sélectionner
      selectedBlockId: target.type === 'block' ? target.blockId :
        target.type === 'items-table' && target.mode === 'layout' ?
          get().blocks.find(b => b.type === 'invoice-items')?.id || null :
          target.type === 'totals' ?
            get().blocks.find(b => b.type === 'totals')?.id || null :
            null
    });
  },

  clearFocusTarget: () => set({ focusTarget: null }),
}));
