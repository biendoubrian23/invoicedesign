"use client";

import { forwardRef, useState, useCallback, memo } from "react";
import { useInvoiceStore } from "@/store";
import {
    InvoiceBlock,
    FreeTextBlock,
    DetailedTableBlock,
    SignatureBlock,
    QRCodeBlock,
    ConditionsBlock,
    PaymentTermsBlock,
    InvoiceItemsBlock,
    TotalsBlock,
} from "@/types/invoice";
// Direct imports for renderers (avoid barrel imports for better tree-shaking)
import FreeTextRenderer from "./blocks/renderers/FreeTextRenderer";
import DetailedTableRenderer from "./blocks/renderers/DetailedTableRenderer";
import SignatureRenderer from "./blocks/renderers/SignatureRenderer";
import QRCodeRenderer from "./blocks/renderers/QRCodeRenderer";
import ConditionsRenderer from "./blocks/renderers/ConditionsRenderer";
import TotalsRenderer from "./blocks/renderers/TotalsRenderer";
import PaymentTermsRenderer from "./blocks/renderers/PaymentTermsRenderer";
import InvoiceItemsRenderer from "./blocks/renderers/InvoiceItemsRenderer";
import ClickableZone from "./ClickableZone";
import { GripVertical } from "lucide-react";

/**
 * Elegant Template Preview
 * Layout based on the user's reference design:
 * - Header: Company name/address (left) + INVOICE title with details (right)
 * - Bill To (left) + Payment Method (right)
 * - ALL OTHER BLOCKS: Draggable and sortable in the main area.
 *   (Items table, Totals, Conditions, Signature, etc.)
 * - Special Logic: If "Payment Terms" and "Signature" are adjacent, they render side-by-side in a footer layout.
 */

interface ElegantTemplateProps {
    isMobile?: boolean;
}

const ElegantTemplate = forwardRef<HTMLDivElement, ElegantTemplateProps>(
    ({ isMobile = false }, ref) => {
        const { invoice, blocks, reorderBlocks, selectBlock, selectedBlockId } = useInvoiceStore();
        const { styling } = invoice;

        // Drag and Drop state
        const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
        const [dragOverBlockId, setDragOverBlockId] = useState<string | null>(null);

        // Get sorted enabled blocks
        const sortedBlocks = [...blocks]
            .filter(b => b.enabled)
            .sort((a, b) => a.order - b.order);

        // Find specific blocks for helper logic (not used for separate rendering anymore)
        const paymentTermsBlock = blocks.find(b => b.type === "payment-terms") as PaymentTermsBlock | undefined;
        const signatureBlock = blocks.find(b => b.type === "signature") as SignatureBlock | undefined;

        // Logo sizes
        const logoSizes = {
            small: { height: 40, maxWidth: 120 },
            medium: { height: 56, maxWidth: 160 },
            large: { height: 80, maxWidth: 200 },
        };
        const currentLogoSize = logoSizes[invoice.logoSize];

        // Drag and Drop handlers
        const handleDragStart = useCallback((e: React.DragEvent, blockId: string) => {
            setDraggedBlockId(blockId);
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", blockId);
            setTimeout(() => {
                (e.target as HTMLElement).style.opacity = "0.5";
            }, 0);
        }, []);

        const handleDragEnd = useCallback((e: React.DragEvent) => {
            setDraggedBlockId(null);
            setDragOverBlockId(null);
            (e.target as HTMLElement).style.opacity = "1";
        }, []);

        const handleDragOver = useCallback((e: React.DragEvent, blockId: string) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            if (blockId !== draggedBlockId) {
                setDragOverBlockId(blockId);
            }
        }, [draggedBlockId]);

        const handleDragLeave = useCallback(() => {
            setDragOverBlockId(null);
        }, []);

        const handleDrop = useCallback((e: React.DragEvent, targetBlockId: string) => {
            e.preventDefault();
            const sourceBlockId = e.dataTransfer.getData("text/plain");

            if (sourceBlockId && sourceBlockId !== targetBlockId) {
                const currentSorted = [...blocks].sort((a, b) => a.order - b.order);
                const sourceIndex = currentSorted.findIndex(b => b.id === sourceBlockId);
                const targetIndex = currentSorted.findIndex(b => b.id === targetBlockId);

                if (sourceIndex !== -1 && targetIndex !== -1) {
                    reorderBlocks(sourceIndex, targetIndex);
                }
            }

            setDraggedBlockId(null);
            setDragOverBlockId(null);
        }, [blocks, reorderBlocks]);

        // Render blocks dynamically
        const renderBlock = (block: InvoiceBlock) => {
            switch (block.type) {
                case "invoice-items":
                    return (
                        <InvoiceItemsRenderer
                            key={block.id}
                            block={block as InvoiceItemsBlock}
                            primaryColor={styling.primaryColor}
                        />
                    );
                case "totals":
                    return (
                        <TotalsRenderer
                            key={block.id}
                            block={block as TotalsBlock}
                            primaryColor={styling.primaryColor}
                        />
                    );
                case "free-text":
                    return (
                        <FreeTextRenderer
                            key={block.id}
                            block={block as FreeTextBlock}
                            primaryColor={styling.primaryColor}
                        />
                    );
                case "detailed-table":
                    return (
                        <DetailedTableRenderer
                            key={block.id}
                            block={block as DetailedTableBlock}
                            primaryColor={styling.primaryColor}
                        />
                    );
                case "qr-code":
                    return (
                        <QRCodeRenderer
                            key={block.id}
                            block={block as QRCodeBlock}
                            primaryColor={styling.primaryColor}
                        />
                    );
                case "conditions":
                    return (
                        <ConditionsRenderer
                            key={block.id}
                            block={block as ConditionsBlock}
                            primaryColor={styling.primaryColor}
                        />
                    );
                case "payment-terms":
                    return (
                        <PaymentTermsRenderer
                            key={block.id}
                            block={block as PaymentTermsBlock}
                            primaryColor={styling.primaryColor}
                        />
                    );
                case "signature":
                    return (
                        <SignatureRenderer
                            key={block.id}
                            block={block as SignatureBlock}
                            primaryColor={styling.primaryColor}
                        />
                    );
                default:
                    return null;
            }
        };

        // Helper to check if current block is start of a standard footer group (Terms + Signature)
        const isFooterGroupStart = (index: number) => {
            const current = sortedBlocks[index];
            const next = sortedBlocks[index + 1];
            if (!current || !next) return false;

            // Check if current is PaymentTerms and next is Signature (Standard Footer Order)
            if (current.type === 'payment-terms' && next.type === 'signature') return true;

            // Check if current is Signature and next is PaymentTerms (Reverse Order)
            // Even if reversed, we display them side-by-side in standard layout (Terms Left, Sig Right)
            // This satisfies "si on met au dessus de term condition on met aussi au dessus de signature automatiquement"
            if (current.type === 'signature' && next.type === 'payment-terms') return true;

            return false;
        };

        // Helper to check if current block should be skipped (because it was handled in previous iteration as part of a group)
        const shouldSkipBlock = (index: number) => {
            const prev = sortedBlocks[index - 1];
            const current = sortedBlocks[index];
            if (!prev || !current) return false;

            // Skip if this is Signature and previous was Terms (Standard Group)
            if (prev.type === 'payment-terms' && current.type === 'signature') return true;

            // Skip if this is Terms and previous was Signature (Reverse Group)
            if (prev.type === 'signature' && current.type === 'payment-terms') return true;

            return false;
        };

        // Custom Footer Group Renderer (Terms Left, Signature Right)
        const renderFooterGroup = (block1: InvoiceBlock, block2: InvoiceBlock) => {
            // Identify which is which
            const termsBlock = (block1.type === 'payment-terms' ? block1 : block2) as PaymentTermsBlock;
            const sigBlock = (block1.type === 'signature' ? block1 : block2) as SignatureBlock;

            return (
                <div key={`group-${block1.id}-${block2.id}`} className="flex justify-between items-end pt-8 border-t border-gray-200 gap-8 animate-scale-in">
                    {/* Terms & Conditions (left) */}
                    <ClickableZone
                        target={{
                            type: "block",
                            blockId: termsBlock.id,
                            mode: "content",
                        }}
                        disabled={isMobile}
                        className="flex-1 max-w-xs"
                    >
                        <h3 className="text-sm font-bold text-gray-900 mb-2">
                            {termsBlock.title || "Conditions de paiement :"}
                        </h3>
                        <p className="text-xs text-gray-600 italic leading-relaxed">
                            {termsBlock.content ||
                                "Paiement sous 30 jours par virement bancaire."}
                        </p>
                    </ClickableZone>

                    {/* Signature (right) */}
                    <ClickableZone
                        target={{
                            type: "block",
                            blockId: sigBlock.id,
                            mode: "content",
                        }}
                        disabled={isMobile}
                        className="flex-1 text-right"
                    >
                        <div className="inline-block text-right">
                            {/* Signature line/text rendering (Inline or reuse renderer logic?) 
                                Reuse logic from previous ElegantTemplate footer 
                             */}
                            {sigBlock.signatureText ? (
                                <p
                                    className="text-2xl mb-2"
                                    style={{
                                        fontFamily: sigBlock.signatureFont || "cursive",
                                    }}
                                >
                                    {sigBlock.signatureText}
                                </p>
                            ) : sigBlock.signatureData ? (
                                <img
                                    src={sigBlock.signatureData}
                                    alt="Signature"
                                    className="h-12 ml-auto mb-2"
                                />
                            ) : (
                                <div className="h-12 border-b border-gray-400 w-40 ml-auto mb-2"></div>
                            )}
                            {/* Name & Role */}
                            {sigBlock.showName && sigBlock.signerName && (
                                <p className="text-sm font-medium text-gray-900">
                                    {sigBlock.signerName}
                                </p>
                            )}
                            {sigBlock.signerRole && (
                                <p className="text-xs text-gray-500">{sigBlock.signerRole}</p>
                            )}
                            {sigBlock.showDate && (
                                <p className="text-xs text-gray-500">Le {new Date().toLocaleDateString("fr-FR")}</p>
                            )}
                        </div>
                    </ClickableZone>
                </div>
            );
        };


        return (
            <div
                ref={ref}
                data-invoice-preview
                className="bg-white paper-shadow animate-scale-in"
                style={{
                    fontFamily: styling.fontFamily,
                    width: "210mm",
                    minHeight: "auto",
                    padding: "15mm",
                    boxSizing: "border-box",
                }}
            >
                {/* ============================================ */}
                {/* HEADER: Company (left) + INVOICE title (right) */}
                {/* ============================================ */}
                <div className="flex justify-between items-start mb-10">
                    {/* Left side: Company Name & Address with Logo */}
                    <ClickableZone
                        target={{ type: "issuer" }}
                        disabled={isMobile}
                        className="flex-1"
                    >
                        {/* Logo or Company Name */}
                        {invoice.logo ? (
                            <img
                                src={invoice.logo}
                                alt="Logo"
                                style={{
                                    height: currentLogoSize.height,
                                    maxWidth: currentLogoSize.maxWidth,
                                    objectFit: "contain",
                                }}
                                className="mb-2"
                            />
                        ) : (
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                {invoice.issuer.name}
                            </h1>
                        )}
                        {invoice.logo && (
                            <h2 className="text-lg font-semibold text-gray-900 mb-1">
                                {invoice.issuer.name}
                            </h2>
                        )}
                        <div className="text-sm text-gray-600 space-y-0.5">
                            <p className="whitespace-pre-line">{invoice.issuer.address}</p>
                            <p>{invoice.issuer.phone}</p>
                        </div>
                    </ClickableZone>

                    {/* Right side: INVOICE title & details */}
                    <ClickableZone
                        target={{ type: "invoice-info" }}
                        disabled={isMobile}
                        className="text-right"
                    >
                        <h1
                            className="text-4xl font-bold mb-2"
                            style={{ color: styling.primaryColor }}
                        >
                            INVOICE
                        </h1>
                        <div className="text-sm text-gray-600 space-y-0.5">
                            <p>
                                <span className="text-gray-500">Invoice Number:</span>{" "}
                                <span className="font-medium">#{invoice.invoiceNumber}</span>
                            </p>
                            <p>
                                <span className="text-gray-500">Date:</span>{" "}
                                <span className="font-medium">{invoice.date}</span>
                            </p>
                            <p>
                                <span className="text-gray-500">Due Date:</span>{" "}
                                <span className="font-medium">{invoice.dueDate}</span>
                            </p>
                        </div>
                    </ClickableZone>
                </div>

                {/* ============================================ */}
                {/* BILL TO (left) + PAYMENT METHOD (right) */}
                {/* ============================================ */}
                <div className="flex justify-between gap-8 mb-10">
                    {/* Bill To */}
                    <ClickableZone
                        target={{ type: "client" }}
                        disabled={isMobile}
                        className="flex-1"
                    >
                        <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase">
                            BILL TO:
                        </h3>
                        <div className="text-sm text-gray-700 space-y-0.5">
                            <p className="font-medium">{invoice.client.name}</p>
                            <p className="whitespace-pre-line">{invoice.client.address}</p>
                            <p>{invoice.client.email}</p>
                        </div>
                    </ClickableZone>

                    {/* Payment Method */}
                    <ClickableZone
                        target={{ type: "issuer" }}
                        disabled={isMobile}
                        className="flex-1 text-right"
                    >
                        <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase">
                            Payment Method
                        </h3>
                        <div className="text-sm text-gray-700 space-y-0.5">
                            <p>Central Bank</p>
                            <p className="font-medium">{invoice.issuer.name}</p>
                            <p>IBAN: FR76 XXXX XXXX XXXX</p>
                        </div>
                    </ClickableZone>
                </div>

                {/* ============================================ */}
                {/* ALL BLOCKS SECTION (Draggable) */}
                {/* ============================================ */}
                <div className="space-y-4">
                    {sortedBlocks.map((block, index) => {
                        // Check for Footer Flex grouping (Terms + Signature)
                        if (isFooterGroupStart(index)) {
                            // Render the group
                            return renderFooterGroup(block, sortedBlocks[index + 1]);
                        }

                        // Skip if part of a previously rendered group
                        if (shouldSkipBlock(index)) {
                            return null;
                        }

                        // Special Layout: Totals usually aligns right, but we need to support full drag
                        // TotalsRenderer handles its own alignment inside its container? 
                        // The TotalsRenderer in this app renders a full width block with right alignment inside.

                        const isTableBlock = block.type === 'detailed-table';
                        const isItemsBlock = block.type === 'invoice-items';

                        return (
                            <ClickableZone
                                key={block.id}
                                target={{ type: 'block', blockId: block.id, mode: 'content' }}
                                showLayoutOption={isTableBlock || isItemsBlock}
                                disabled={isMobile}
                            >
                                <div
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, block.id)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={(e) => handleDragOver(e, block.id)}
                                    onDragLeave={handleDragLeave}
                                    onDrop={(e) => handleDrop(e, block.id)}
                                    onClick={() => selectBlock(block.id)}
                                    className={`relative group transition-all duration-200 ${dragOverBlockId === block.id
                                        ? "border-t-2 border-blue-500"
                                        : ""
                                        } ${selectedBlockId === block.id
                                            ? "ring-2 ring-blue-400 ring-offset-2"
                                            : ""
                                        } ${draggedBlockId === block.id
                                            ? "opacity-50"
                                            : ""
                                        }`}
                                >
                                    {/* Drag handle */}
                                    <div
                                        data-export-hidden
                                        className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing print:hidden"
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        <GripVertical className="w-4 h-4 text-gray-400" />
                                    </div>

                                    {renderBlock(block)}
                                </div>
                            </ClickableZone>
                        );
                    })}
                </div>
            </div>
        );
    }
);

ElegantTemplate.displayName = "ElegantTemplate";

// Memoize the component to prevent unnecessary re-renders
export default memo(ElegantTemplate);
