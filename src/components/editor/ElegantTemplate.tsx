"use client";

import { forwardRef, useState, useCallback } from "react";
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
import {
    FreeTextRenderer,
    DetailedTableRenderer,
    SignatureRenderer,
    QRCodeRenderer,
    ConditionsRenderer,
} from "./blocks/renderers";
import TotalsRenderer from "./blocks/renderers/TotalsRenderer";
import PaymentTermsRenderer from "./blocks/renderers/PaymentTermsRenderer";
import ClickableZone from "./ClickableZone";
import { GripVertical } from "lucide-react";

/**
 * Elegant Template Preview
 * Layout based on the user's reference design:
 * - Header: Company name/address (left) + INVOICE title with details (right)
 * - Bill To (left) + Payment Method (right)
 * - Items table with NO/Description/Price/Qty/Total
 * - Totals section aligned right
 * - Footer: Terms & Conditions (left) + Signature (right)
 * - Additional blocks section (draggable, same as Classic)
 */

interface ElegantTemplateProps {
    isMobile?: boolean;
}

const ElegantTemplate = forwardRef<HTMLDivElement, ElegantTemplateProps>(
    ({ isMobile = false }, ref) => {
        const { invoice, calculateTotals, blocks, reorderBlocks, selectBlock, selectedBlockId } = useInvoiceStore();
        const { subtotal, tax, total } = calculateTotals();
        const { styling } = invoice;

        // Drag and Drop state
        const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
        const [dragOverBlockId, setDragOverBlockId] = useState<string | null>(null);

        // Trouver les blocs spécifiques
        const invoiceItemsBlock = blocks.find(
            (b) => b.type === "invoice-items" && b.enabled
        ) as InvoiceItemsBlock | undefined;

        const totalsBlock = blocks.find(
            (b) => b.type === "totals" && b.enabled
        ) as TotalsBlock | undefined;

        const paymentTermsBlock = blocks.find(
            (b) => b.type === "payment-terms" && b.enabled
        ) as PaymentTermsBlock | undefined;

        const signatureBlock = blocks.find(
            (b) => b.type === "signature" && b.enabled
        ) as SignatureBlock | undefined;

        // Tous les blocs triés par order (hors invoice-items et totals qui sont fixés)
        const allSortedBlocks = [...blocks]
            .filter(b => b.enabled && !["invoice-items", "totals"].includes(b.type))
            .sort((a, b) => a.order - b.order);

        // Vérifier si payment-terms et signature sont consécutifs (footer mode)
        // Si payment-terms suivi directement de signature OU signature suivi de payment-terms
        const ptIndex = allSortedBlocks.findIndex(b => b.type === "payment-terms");
        const sigIndex = allSortedBlocks.findIndex(b => b.type === "signature");
        const areFooterBlocksAdjacent = ptIndex !== -1 && sigIndex !== -1 &&
            Math.abs(ptIndex - sigIndex) === 1;

        // Si consécutifs, on les rend ensemble, sinon séparément
        const sortedBlocks = areFooterBlocksAdjacent
            ? allSortedBlocks.filter(b => b.type !== "payment-terms" && b.type !== "signature")
            : allSortedBlocks;

        // Position du footer (après quel bloc les mettre)
        const footerPosition = areFooterBlocksAdjacent ? Math.min(ptIndex, sigIndex) : -1;

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
                const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);
                const sourceIndex = sortedBlocks.findIndex(b => b.id === sourceBlockId);
                const targetIndex = sortedBlocks.findIndex(b => b.id === targetBlockId);

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
                {/* ITEMS TABLE */}
                {/* ============================================ */}
                {invoiceItemsBlock && (
                    <ClickableZone
                        target={{ type: "items-table", mode: "content" }}
                        showLayoutOption={true}
                        disabled={isMobile}
                        className="mb-8"
                    >
                        {/* Table Header - Dynamic based on columns */}
                        {invoiceItemsBlock.showHeader && (
                            <div
                                className="flex gap-2 py-3 px-4 text-sm font-bold border-b-2"
                                style={{ borderColor: styling.primaryColor }}
                            >
                                {invoiceItemsBlock.columns.filter(col => col.visible).map((column, idx, arr) => {
                                    const isLast = idx === arr.length - 1;
                                    const usedWidth = arr.slice(0, arr.length - 1).reduce((sum, c) => sum + c.width, 0);
                                    const width = isLast ? 100 - usedWidth : column.width;

                                    return (
                                        <div
                                            key={column.id}
                                            style={{ width: `${width}%`, minWidth: 0 }}
                                            className={`${column.key === 'quantity' || column.key === 'unitPrice' || column.key === 'total'
                                                ? 'text-right'
                                                : column.key === 'description'
                                                    ? ''
                                                    : 'text-center'
                                                }`}
                                        >
                                            {column.header}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Table Rows - Dynamic */}
                        {invoice.items.map((item, index) => (
                            <div key={item.id}>
                                {/* Main row */}
                                <div className={`flex gap-2 py-3 px-4 text-sm border-b border-gray-200 ${invoiceItemsBlock.striped
                                    ? index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    : "bg-white"
                                    }`}>
                                    {invoiceItemsBlock.columns.filter(col => col.visible).map((column, idx, arr) => {
                                        const isLast = idx === arr.length - 1;
                                        const usedWidth = arr.slice(0, arr.length - 1).reduce((sum, c) => sum + c.width, 0);
                                        const width = isLast ? 100 - usedWidth : column.width;

                                        let content = "";
                                        // Use same alignment as header
                                        let alignment = column.key === 'quantity' || column.key === 'unitPrice' || column.key === 'total'
                                            ? 'text-right'
                                            : column.key === 'description'
                                                ? ''
                                                : 'text-center';

                                        switch (column.key) {
                                            case "index":
                                                content = (index + 1).toString();
                                                break;
                                            case "description":
                                                content = item.description;
                                                break;
                                            case "quantity":
                                                content = (!item.hasSubItems || item.subItemsMode === 'parent-quantity')
                                                    ? item.quantity.toString()
                                                    : '-';
                                                break;
                                            case "unitPrice":
                                                content = !item.hasSubItems
                                                    ? `${item.unitPrice.toFixed(2)} ${invoice.currency}`
                                                    : item.subItemsMode === 'parent-quantity'
                                                        ? `${item.unitPrice.toFixed(2)} ${invoice.currency}`
                                                        : '-';
                                                break;
                                            case "total":
                                                content = `${item.total.toFixed(2)} ${invoice.currency}`;
                                                break;
                                            default:
                                                content = item.customFields?.[column.key] || "-";
                                        }

                                        return (
                                            <div
                                                key={column.id}
                                                style={{ width: `${width}%`, minWidth: 0 }}
                                                className={alignment}
                                            >
                                                {column.key === "description" ? (
                                                    <>
                                                        <p className="font-medium text-gray-900">{content}</p>
                                                        {item.hasSubItems && item.subItems && item.subItems.length > 0 && (
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {item.subItems.map((s) => s.description).join(", ")}
                                                            </p>
                                                        )}
                                                    </>
                                                ) : content}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Sub-items (if any) */}
                                {item.hasSubItems &&
                                    item.subItems &&
                                    item.subItems.length > 0 &&
                                    item.subItemsMode !== "no-prices" && (
                                        <div className="bg-gray-50">
                                            {item.subItems.map((subItem) => (
                                                <div
                                                    key={subItem.id}
                                                    className="flex gap-2 py-2 px-4 text-xs border-b border-gray-100"
                                                >
                                                    {invoiceItemsBlock.columns.filter(col => col.visible).map((column, idx, arr) => {
                                                        const isLast = idx === arr.length - 1;
                                                        const usedWidth = arr.slice(0, arr.length - 1).reduce((sum, c) => sum + c.width, 0);
                                                        const width = isLast ? 100 - usedWidth : column.width;

                                                        let content = "";
                                                        let alignment = column.key === 'quantity' || column.key === 'unitPrice' || column.key === 'total'
                                                            ? 'text-right text-gray-500'
                                                            : column.key === 'description'
                                                                ? 'pl-4 text-gray-600'
                                                                : 'text-center';

                                                        switch (column.key) {
                                                            case "index":
                                                                content = "";
                                                                alignment = "";
                                                                break;
                                                            case "description":
                                                                content = `- ${subItem.description}`;
                                                                break;
                                                            case "quantity":
                                                                content = item.subItemsMode === 'individual-quantities' && subItem.hasQuantity
                                                                    ? subItem.quantity?.toString() || '-'
                                                                    : '-';
                                                                break;
                                                            case "unitPrice":
                                                                content = item.subItemsMode !== 'no-prices'
                                                                    ? `${subItem.unitPrice.toFixed(2)} ${invoice.currency}`
                                                                    : '-';
                                                                break;
                                                            case "total":
                                                                content = item.subItemsMode === 'individual-quantities'
                                                                    ? `${subItem.total.toFixed(2)} ${invoice.currency}`
                                                                    : '-';
                                                                break;
                                                            default:
                                                                content = subItem.customFields?.[column.key] || "-";
                                                        }

                                                        return (
                                                            <div
                                                                key={column.id}
                                                                style={{ width: `${width}%`, minWidth: 0 }}
                                                                className={alignment}
                                                            >
                                                                {content}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </ClickableZone>
                )}

                {/* ============================================ */}
                {/* TOTALS SECTION (aligned right) */}
                {/* ============================================ */}
                <ClickableZone
                    target={{ type: "block", blockId: totalsBlock?.id || "totals", mode: "content" }}
                    disabled={isMobile}
                    className="flex justify-end mb-10"
                >
                    <div className="w-64">
                        <div className="border-t-2 border-gray-300 pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Sous-total HT</span>
                                <span className="font-medium">
                                    {subtotal.toFixed(2)} {invoice.currency}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">TVA ({invoice.taxRate}%)</span>
                                <span className="font-medium">
                                    {tax > 0 ? `${tax.toFixed(2)} ${invoice.currency}` : "-"}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Remise</span>
                                <span className="font-medium">-</span>
                            </div>
                            <div className="border-t border-gray-300 pt-2 mt-2">
                                <div className="flex justify-between text-base font-bold">
                                    <span>Total TTC</span>
                                    <span>
                                        {total.toFixed(2)} {invoice.currency}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ClickableZone>

                {/* ============================================ */}
                {/* ADDITIONAL BLOCKS (draggable like Classic) */}
                {/* ============================================ */}
                {sortedBlocks.length > 0 && (
                    <div className="space-y-2 mb-8">
                        {sortedBlocks.map(block => {
                            const isTableBlock = block.type === 'detailed-table';

                            return (
                                <ClickableZone
                                    key={block.id}
                                    target={{ type: 'block', blockId: block.id, mode: 'content' }}
                                    showLayoutOption={isTableBlock}
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
                )}

                {/* ============================================ */}
                {/* FOOTER FLEX: Terms & Signature côte à côte */}
                {/* S'affiche uniquement si payment-terms et signature sont consécutifs */}
                {/* ============================================ */}
                {areFooterBlocksAdjacent && paymentTermsBlock && signatureBlock && (
                    <div className="flex justify-between items-end pt-8 border-t border-gray-200 gap-8">
                        {/* Terms & Conditions (left) */}
                        <ClickableZone
                            target={{
                                type: "block",
                                blockId: paymentTermsBlock.id,
                                mode: "content",
                            }}
                            disabled={isMobile}
                            className="flex-1 max-w-xs"
                        >
                            <h3 className="text-sm font-bold text-gray-900 mb-2">
                                {paymentTermsBlock.title || "Conditions de paiement :"}
                            </h3>
                            <p className="text-xs text-gray-600 italic leading-relaxed">
                                {paymentTermsBlock.content ||
                                    "Paiement sous 30 jours par virement bancaire."}
                            </p>
                        </ClickableZone>

                        {/* Signature (right) */}
                        <ClickableZone
                            target={{
                                type: "block",
                                blockId: signatureBlock.id,
                                mode: "content",
                            }}
                            disabled={isMobile}
                            className="flex-1 text-right"
                        >
                            <div className="inline-block text-right">
                                {/* Signature line/text */}
                                {signatureBlock.signatureText ? (
                                    <p
                                        className="text-2xl mb-2"
                                        style={{
                                            fontFamily: signatureBlock.signatureFont || "cursive",
                                        }}
                                    >
                                        {signatureBlock.signatureText}
                                    </p>
                                ) : signatureBlock.signatureData ? (
                                    <img
                                        src={signatureBlock.signatureData}
                                        alt="Signature"
                                        className="h-12 ml-auto mb-2"
                                    />
                                ) : (
                                    <div className="h-12 border-b border-gray-400 w-40 ml-auto mb-2"></div>
                                )}
                                {/* Name & Role */}
                                {signatureBlock.showName && signatureBlock.signerName && (
                                    <p className="text-sm font-medium text-gray-900">
                                        {signatureBlock.signerName}
                                    </p>
                                )}
                                {signatureBlock.signerRole && (
                                    <p className="text-xs text-gray-500">{signatureBlock.signerRole}</p>
                                )}
                                {signatureBlock.showDate && (
                                    <p className="text-xs text-gray-500">Le {new Date().toLocaleDateString("fr-FR")}</p>
                                )}
                            </div>
                        </ClickableZone>
                    </div>
                )}
            </div>
        );
    }
);

ElegantTemplate.displayName = "ElegantTemplate";

export default ElegantTemplate;
