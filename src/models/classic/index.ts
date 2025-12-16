// Classic Model - Default Model #1
// This is the original template with all standard features

import {
    InvoiceBlock,
    InvoiceItemsBlock,
    TotalsBlock,
    PaymentTermsBlock
} from '@/types/invoice';
import { TemplateModel, defaultCapabilities } from '../types';

/**
 * Default blocks configuration for Classic model
 */
const classicDefaultBlocks: InvoiceBlock[] = [
    {
        id: "invoice-items-default",
        type: "invoice-items",
        order: 0,
        enabled: true,
        showTitle: false,
        title: "Prestations",
        columns: [
            { id: "col-desc", key: "description", header: "Description", width: 45, visible: true, required: true },
            { id: "col-qty", key: "quantity", header: "Qté", width: 10, visible: true },
            { id: "col-price", key: "unitPrice", header: "Prix unit.", width: 20, visible: true },
            { id: "col-total", key: "total", header: "Total", width: 25, visible: true, required: true },
        ],
        showHeader: true,
        striped: true,
        showBorders: false,
        headerStyle: 'filled',
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

/**
 * Classic Template Model - Default Model #1
 * 
 * This is the standard invoice template with:
 * - Clean professional design
 * - Blue primary color
 * - All standard blocks (items, totals, payment terms)
 * - Full feature capabilities
 */
export const classicModel: TemplateModel = {
    // Identification
    id: "classic",
    name: "Classic",
    description: "Template traditionnel et professionnel",
    version: 1,
    isDefault: true,

    // Visual configuration
    styling: {
        primaryColor: "#2563eb",
        secondaryColor: "#111827",
        backgroundColor: "#ffffff",
        fontFamily: "Inter",
        fontSize: {
            title: "24px",
            heading: "14px",
            body: "12px",
        },
    },
    previewColor: "#2563eb",

    // Default blocks
    defaultBlocks: classicDefaultBlocks,

    // Capabilities - all enabled for Classic
    capabilities: {
        ...defaultCapabilities,
    },

    // Metadata
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
};

export default classicModel;
