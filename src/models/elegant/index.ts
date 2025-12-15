// Elegant Model - Model #2
// Clean, minimalist design with signature support

import {
    InvoiceBlock,
    InvoiceItemsBlock,
    TotalsBlock,
    PaymentTermsBlock,
    SignatureBlock
} from '@/types/invoice';
import { TemplateModel, defaultCapabilities } from '../types';

/**
 * Default blocks configuration for Elegant model
 * Layout based on user's reference design:
 * - Header: Company info (left) + Invoice title (right)
 * - Bill To (left) + Payment Method (right)
 * - Items table with NO/Description/Price/Qty/Total
 * - Totals section
 * - Footer: Terms & Conditions (left) + Signature (right)
 */
const elegantDefaultBlocks: InvoiceBlock[] = [
    {
        id: "invoice-items-elegant",
        type: "invoice-items",
        order: 0,
        enabled: true,
        showTitle: false,
        title: "Prestations",
        columns: [
            { id: "col-no", key: "index", header: "NO", width: 8, visible: true },
            { id: "col-desc", key: "description", header: "ITEM DESCRIPTION", width: 42, visible: true, required: true },
            { id: "col-price", key: "unitPrice", header: "PRICE", width: 15, visible: true },
            { id: "col-qty", key: "quantity", header: "QTY", width: 15, visible: true },
            { id: "col-total", key: "total", header: "TOTAL", width: 20, visible: true, required: true },
        ],
        showHeader: true,
        striped: false,
    } as InvoiceItemsBlock,
    {
        id: "totals-elegant",
        type: "totals",
        order: 100,
        enabled: true,
        showTitle: false,
        title: "Totaux",
        showSubtotal: true,
        showTax: true,
        showTotal: true,
        subtotalLabel: "Sub Total",
        taxLabel: "Tax",
        totalLabel: "Total",
    } as TotalsBlock,
    {
        id: "payment-terms-elegant",
        type: "payment-terms",
        order: 101,
        enabled: true,
        showTitle: true,
        title: "Term and Conditions:",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    } as PaymentTermsBlock,
    {
        id: "signature-elegant",
        type: "signature",
        order: 102,
        enabled: true,
        showTitle: false,
        title: "Signature",
        mode: "text",
        signatureText: "",
        signatureFont: "Dancing Script",
        signatureSize: 100,
        showDate: false,
        showName: true,
        signerName: "",
        signerRole: "Manager",
        position: "right",
    } as SignatureBlock,
];

/**
 * Elegant Template Model - Model #2
 * 
 * Clean, minimalist invoice template with:
 * - Black & white theme
 * - Company header + Invoice title layout
 * - Bill To + Payment Method side by side
 * - Clean table with item numbers
 * - Signature block at footer
 */
export const elegantModel: TemplateModel = {
    // Identification
    id: "elegant",
    name: "Elegant",
    description: "Design epure et minimaliste",
    version: 1,
    isDefault: false,

    // Visual configuration
    styling: {
        primaryColor: "#000000",
        secondaryColor: "#666666",
        fontFamily: "Inter",
        fontSize: {
            title: "28px",
            heading: "14px",
            body: "11px",
        },
    },
    previewColor: "#000000",

    // Default blocks
    defaultBlocks: elegantDefaultBlocks,

    // Capabilities
    capabilities: {
        ...defaultCapabilities,
        supportsSignature: true,
    },

    // Metadata
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
};

export default elegantModel;
