export interface SubItem {
  id: string;
  description: string;
  quantity?: number; // Optionnel : si défini, on calcule avec quantité
  unitPrice: number; // Prix unitaire ou prix fixe
  hasQuantity: boolean; // Si true, affiche et utilise la quantité
  total: number; // Calculé automatiquement
  selected?: boolean; // Si false, n'est pas inclus dans les calculs
  customFields?: Record<string, string>; // Valeurs des colonnes personnalisées
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number; // Quantité de la ligne principale
  unitPrice: number; // Prix unitaire calculé ou manuel
  total: number; // Total calculé
  isOptional?: boolean;
  selected?: boolean;
  customFields?: Record<string, string>; // Valeurs des colonnes personnalisées

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
  currency: string;
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

// ============================================
// BLOCS MODULAIRES
// ============================================

export type BlockType =
  | "invoice-items"      // Lignes de facturation (existant)
  | "free-text"          // Texte libre
  | "detailed-table"     // Tableau détaillé
  | "signature"          // Zone de signature
  | "qr-code"            // QR Code de paiement
  | "conditions"         // Conditions générales
  | "totals"             // Totaux (Sous-total, TVA, Total TTC)
  | "payment-terms";     // Conditions de paiement

export interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;         // Position dans la facture
  enabled: boolean;      // Bloc activé ou non
  showTitle: boolean;    // Afficher le titre du bloc
}

// Bloc Texte Libre
export interface FreeTextBlock extends BaseBlock {
  type: "free-text";
  title: string;
  content: string;
  alignment: "left" | "center" | "right";
}

// Bloc Tableau Détaillé
export interface DetailedTableColumn {
  id: string;
  header: string;
  width: number; // pourcentage
  align: "left" | "center" | "right";
  visible?: boolean; // Colonne visible ou masquée
}

export interface DetailedTableRow {
  id: string;
  cells: string[];
}

export interface DetailedTableBlock extends BaseBlock {
  type: "detailed-table";
  title: string;
  columns: DetailedTableColumn[];
  rows: DetailedTableRow[];
  showHeader: boolean;
  striped: boolean;
}

// Bloc Signature
export type SignatureMode = "draw" | "image" | "text";

export interface SignatureBlock extends BaseBlock {
  type: "signature";
  title: string;
  mode: SignatureMode;
  signatureData?: string;      // Base64 pour image ou dessin
  signatureText?: string;      // Texte de la signature
  signatureFont?: string;      // Police pour signature texte
  signatureSize?: number;      // Taille de la signature (50-200, défaut 100)
  showTitle: boolean;
  showDate: boolean;
  showName: boolean;
  signerName: string;
  signerRole?: string;         // Rôle du signataire (ex: Manager, Directeur)
  position: "left" | "center" | "right";
}

// Bloc QR Code
export interface QRCodeBlock extends BaseBlock {
  type: "qr-code";
  title: string;
  content: string;           // Contenu du QR (IBAN, lien, etc.)
  size: "small" | "medium" | "large";
  position: "left" | "center" | "right";
  showLabel: boolean;
  label: string;
}

// Bloc Conditions
export interface ConditionsBlock extends BaseBlock {
  type: "conditions";
  title: string;
  content: string;
  fontSize: "small" | "medium";
}

// Bloc Totaux (Sous-total, TVA, Total)
export interface TotalsBlock extends BaseBlock {
  type: "totals";
  title: string;
  showSubtotal: boolean;
  showTax: boolean;
  showTotal: boolean;
  subtotalLabel: string;
  taxLabel: string;
  totalLabel: string;
}

// Bloc Conditions de paiement
export interface PaymentTermsBlock extends BaseBlock {
  type: "payment-terms";
  title: string;
  content: string;
}

// Bloc Lignes de facturation (avec colonnes personnalisables)
export interface InvoiceItemsColumn {
  id: string;
  key: string;           // 'description' | 'quantity' | 'unitPrice' | 'total' | custom key
  header: string;        // Nom affiché dans l'en-tête
  width: number;         // Largeur en pourcentage ou colonnes grid
  visible: boolean;      // Afficher ou cacher la colonne
  required?: boolean;    // Colonnes obligatoires (description, total)
}

export interface InvoiceItemsBlock extends BaseBlock {
  type: "invoice-items";
  title: string;
  columns: InvoiceItemsColumn[];
  showHeader: boolean;
  striped: boolean;
}

// Union de tous les blocs
export type InvoiceBlock =
  | InvoiceItemsBlock
  | FreeTextBlock
  | DetailedTableBlock
  | SignatureBlock
  | QRCodeBlock
  | ConditionsBlock
  | TotalsBlock
  | PaymentTermsBlock;

// Liste des polices de signature disponibles
export const SIGNATURE_FONTS = [
  { name: "Dancing Script", value: "'Dancing Script', cursive" },
  { name: "Great Vibes", value: "'Great Vibes', cursive" },
  { name: "Pacifico", value: "'Pacifico', cursive" },
  { name: "Satisfy", value: "'Satisfy', cursive" },
  { name: "Allura", value: "'Allura', cursive" },
  { name: "Alex Brush", value: "'Alex Brush', cursive" },
  { name: "Tangerine", value: "'Tangerine', cursive" },
  { name: "Pinyon Script", value: "'Pinyon Script', cursive" },
] as const;

// Liste des polices pour le document
export const DOCUMENT_FONTS = [
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Open Sans", value: "'Open Sans', sans-serif" },
  { name: "Lato", value: "Lato, sans-serif" },
  { name: "Montserrat", value: "Montserrat, sans-serif" },
  { name: "Poppins", value: "Poppins, sans-serif" },
  { name: "Source Sans Pro", value: "'Source Sans Pro', sans-serif" },
  { name: "Nunito", value: "Nunito, sans-serif" },
  { name: "Raleway", value: "Raleway, sans-serif" },
  { name: "PT Sans", value: "'PT Sans', sans-serif" },
  { name: "Merriweather", value: "Merriweather, serif" },
  { name: "Playfair Display", value: "'Playfair Display', serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Times New Roman", value: "'Times New Roman', serif" },
] as const;
