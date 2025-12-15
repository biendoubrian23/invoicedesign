// Types for template models

import { InvoiceBlock, InvoiceStyling } from '@/types/invoice';

/**
 * Capabilities that a template model can support
 * Each model can have specific features enabled or disabled
 */
export interface ModelCapabilities {
    supportsSubItems: boolean;
    supportsQRCode: boolean;
    supportsSignature: boolean;
    supportsCustomColumns: boolean;
    supportsDynamicPricing: boolean;
    supportsMultiCurrency: boolean;
}

/**
 * Template Model - defines a complete invoice template
 * This is the enhanced version that supports modularity
 */
export interface TemplateModel {
    // Identification
    id: string;
    name: string;
    description: string;
    version: number;
    isDefault: boolean;

    // Visual configuration
    styling: InvoiceStyling;
    previewColor: string; // Color used in template preview cards

    // Default blocks for this model
    defaultBlocks: InvoiceBlock[];

    // Model-specific capabilities
    capabilities: ModelCapabilities;

    // Metadata
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Default capabilities - all features enabled
 */
export const defaultCapabilities: ModelCapabilities = {
    supportsSubItems: true,
    supportsQRCode: true,
    supportsSignature: true,
    supportsCustomColumns: true,
    supportsDynamicPricing: true,
    supportsMultiCurrency: false,
};
