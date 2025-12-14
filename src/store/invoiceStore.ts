import { create } from "zustand";
import { Invoice, InvoiceItem, SubItem, Template, EditorSection } from "@/types/invoice";

interface InvoiceStore {
  // Current invoice being edited
  invoice: Invoice;
  // Selected template
  selectedTemplate: string | null;
  // Active editor section
  activeSection: EditorSection;
  // Templates list
  templates: Template[];
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
  
  setStyling: (styling: Partial<Invoice["styling"]>) => void;
  setLogo: (logo: string | undefined) => void;
  setLogoPosition: (position: Invoice["logoPosition"]) => void;
  setLogoSize: (size: Invoice["logoSize"]) => void;
  setActiveSection: (section: EditorSection) => void;
  selectTemplate: (templateId: string) => void;
  resetInvoice: () => void;
  calculateTotals: () => { subtotal: number; tax: number; total: number };
}

const defaultInvoice: Invoice = {
  id: crypto.randomUUID(),
  invoiceNumber: `FAC-${new Date().getFullYear()}-001`,
  date: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
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

const defaultTemplates: Template[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Template traditionnel et professionnel",
    color: "#2563eb",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Design epure et contemporain",
    color: "#059669",
  },
  {
    id: "detailed",
    name: "Detailed",
    description: "Avec sous-elements et options",
    color: "#7c3aed",
  },
];

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoice: defaultInvoice,
  selectedTemplate: "classic",
  activeSection: "templates",
  templates: defaultTemplates,

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

        // Calculer le total des sous-items sélectionnés
        const subItemsTotal = item.subItems
          .filter(sub => sub.selected !== false)
          .reduce((sum, sub) => {
            if (item.subItemsMode === 'individual-quantities' && sub.hasQuantity) {
              return sum + (sub.quantity || 1) * sub.unitPrice;
            }
            return sum + sub.unitPrice;
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
              hasQuantity: item.subItemsMode === 'individual-quantities',
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
        if (subItem.hasQuantity && subItem.quantity !== undefined) {
          return subItem.quantity * subItem.unitPrice;
        }
        return subItem.unitPrice;
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

              // Recalculer le total de l'item parent
              const subItemsSum = updatedSubItems
                .filter(sub => sub.selected !== false)
                .reduce((sum, sub) => sum + sub.unitPrice, 0);

              let newTotal = 0;
              if (item.subItemsMode === 'parent-quantity') {
                newTotal = item.quantity * subItemsSum;
              } else if (item.subItemsMode === 'individual-quantities') {
                newTotal = updatedSubItems
                  .filter(sub => sub.selected !== false)
                  .reduce((sum, sub) => sum + sub.total, 0);
              }

              return {
                ...item,
                subItems: updatedSubItems,
                unitPrice: item.subItemsMode === 'parent-quantity' ? subItemsSum : item.unitPrice,
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
            return {
              ...item,
              hasSubItems: enabled,
              subItems: enabled ? (item.subItems || []) : [],
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
              hasQuantity: mode === 'individual-quantities',
              quantity: mode === 'individual-quantities' ? (sub.quantity || 1) : undefined,
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
      set((state) => ({
        selectedTemplate: templateId,
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

  calculateTotals: () => {
    const { invoice } = get();
    const subtotal = invoice.items
      .filter((item) => item.selected !== false)
      .reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * (invoice.taxRate / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  },
}));
