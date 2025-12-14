export interface SubItem {
  id: string;
  description: string;
  quantity?: number; // Optionnel : si défini, on calcule avec quantité
  unitPrice: number; // Prix unitaire ou prix fixe
  hasQuantity: boolean; // Si true, affiche et utilise la quantité
  total: number; // Calculé automatiquement
  selected?: boolean; // Si false, n'est pas inclus dans les calculs
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number; // Quantité de la ligne principale
  unitPrice: number; // Prix unitaire calculé ou manuel
  total: number; // Total calculé
  isOptional?: boolean;
  selected?: boolean;
  
  // Sous-lignes
  hasSubItems: boolean; // Si true, ce line item contient des sub-items
  subItems?: SubItem[]; // Liste des sous-lignes
  
  // Mode de calcul pour les sous-lignes
  subItemsMode: 'parent-quantity' | 'individual-quantities' | 'no-prices';
  // - 'parent-quantity': Les sous-items n'ont pas de quantité, leur total est multiplié par la quantité parent
  // - 'individual-quantities': Chaque sous-item a sa propre quantité
  // - 'no-prices': Les sous-items sont juste descriptifs (pas de prix)
}

export interface CompanyInfo {
  name: string;
  address: string;
  siret: string;
  email: string;
  phone: string;
}

export interface ClientInfo {
  name: string;
  company: string;
  address: string;
  email: string;
}

export interface InvoiceStyling {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: {
    title: string;
    heading: string;
    body: string;
  };
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  issuer: CompanyInfo;
  client: ClientInfo;
  items: InvoiceItem[];
  notes: string;
  paymentTerms: string;
  taxRate: number;
  styling: InvoiceStyling;
  logo?: string;
  logoPosition: "left" | "center" | "right";
  logoSize: "small" | "medium" | "large";
}

export interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  thumbnail?: string;
}

export type EditorSection =
  | "templates"
  | "info"
  | "options"
  | "logo"
  | "blocks";
