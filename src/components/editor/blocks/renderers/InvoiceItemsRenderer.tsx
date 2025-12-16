"use client";

import { useInvoiceStore } from "@/store";
import { InvoiceItemsBlock } from "@/types/invoice";

interface InvoiceItemsRendererProps {
    block: InvoiceItemsBlock;
    primaryColor: string;
}

const InvoiceItemsRenderer = ({ block, primaryColor }: InvoiceItemsRendererProps) => {
    const { invoice, selectedTemplate } = useInvoiceStore();

    if (!block.enabled) return null;

    // Grid styles
    const showBorders = block.showBorders;
    // Default to 'filled' for classic template, 'simple' for others if not specified
    const defaultHeaderStyle = selectedTemplate === 'classic' ? 'filled' : 'simple';
    const headerStyle = block.headerStyle || defaultHeaderStyle;
    const borderColor = "border-gray-300";
    const containerClasses = showBorders || (headerStyle === 'filled' && !showBorders) ? "gap-0" : "gap-2";
    const cellPadding = showBorders ? "px-3 py-2" : "px-4 py-3";

    // Header styling logic
    const isFilledHeader = headerStyle === 'filled';

    let headerClasses = "";
    if (showBorders) {
        headerClasses = `border-t border-l border-r ${borderColor}`;
        // If filled, use colored background (via inline style) and white text
        // If simple, use gray background
        headerClasses += isFilledHeader ? " text-white" : " bg-gray-50";
    } else {
        // No borders
        if (isFilledHeader) {
            headerClasses = "text-white rounded-t-lg"; // Rounded corners for Classic look
        } else {
            headerClasses = "border-b-2 text-gray-900";
        }
    }

    // Row borders
    const rowClasses = showBorders
        ? `border-l border-r border-b ${borderColor}`
        : `border-b border-gray-200`;

    return (
        <div className="mb-8">
            {/* Table Header - Dynamic based on columns */}
            {block.showHeader && (
                <div
                    className={`flex ${containerClasses} text-sm font-bold ${headerClasses}`}
                    style={{
                        borderColor: !showBorders && !isFilledHeader ? primaryColor : undefined,
                        backgroundColor: isFilledHeader ? primaryColor : undefined
                    }}
                >
                    {block.columns.filter(col => col.visible).map((column, idx, arr) => {
                        const isLast = idx === arr.length - 1;
                        const usedWidth = arr.slice(0, arr.length - 1).reduce((sum, c) => sum + c.width, 0);
                        const width = isLast ? 100 - usedWidth : column.width;

                        // Border logic for filled header needs care
                        // If filled and borders enabled, maybe white borders? Or standard borderColor?
                        // Usually filled headers have white separators or no separators
                        // Let's stick to standard borderColor but beware visibility on dark bg.
                        // For now keep it simple: borders are visible if showBorders is true.
                        const cellBorder = showBorders && !isLast ? `border-r ${borderColor}` : "";

                        return (
                            <div
                                key={column.id}
                                style={{ width: `${width}%`, minWidth: 0 }}
                                className={`${column.key === 'quantity' || column.key === 'unitPrice' || column.key === 'total'
                                    ? 'text-right'
                                    : column.key === 'description'
                                        ? ''
                                        : 'text-center'
                                    } ${cellPadding} ${cellBorder}`}
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
                    {/* Main row - use dynamic backgroundColor */}
                    <div
                        className={`flex ${containerClasses} text-sm ${rowClasses}`}
                        style={{ backgroundColor: invoice.styling.backgroundColor }}
                    >
                        {block.columns.filter(col => col.visible).map((column, idx, arr) => {
                            const isLast = idx === arr.length - 1;
                            const usedWidth = arr.slice(0, arr.length - 1).reduce((sum, c) => sum + c.width, 0);
                            const width = isLast ? 100 - usedWidth : column.width;
                            const cellBorder = showBorders && !isLast ? `border-r ${borderColor}` : "";

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
                                    className={`${alignment} ${cellPadding} ${cellBorder}`}
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
                                    ) : column.key === "total" ? (
                                        <span className="font-bold">{content}</span>
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
                            <div
                                className={showBorders ? `border-l border-r border-b ${borderColor}` : ""}
                                style={{ backgroundColor: invoice.styling.backgroundColor }}
                            >
                                {item.subItems.map((subItem) => (
                                    <div
                                        key={subItem.id}
                                        className={`flex ${containerClasses} text-xs ${!showBorders ? "border-b border-gray-100" : ""}`}
                                    >
                                        {block.columns.filter(col => col.visible).map((column, idx, arr) => {
                                            const isLast = idx === arr.length - 1;
                                            const usedWidth = arr.slice(0, arr.length - 1).reduce((sum, c) => sum + c.width, 0);
                                            const width = isLast ? 100 - usedWidth : column.width;
                                            const cellBorder = showBorders && !isLast ? `border-r ${borderColor}` : "";

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
                                                    // Afficher la quantité si mode n'est pas no-prices
                                                    content = item.subItemsMode !== 'no-prices'
                                                        ? (subItem.quantity || 1).toString()
                                                        : '-';
                                                    break;
                                                case "unitPrice":
                                                    content = item.subItemsMode !== 'no-prices'
                                                        ? `${subItem.unitPrice.toFixed(2)} ${invoice.currency}`
                                                        : '-';
                                                    break;
                                                case "total":
                                                    // Afficher le total calculé (qty * prix) si mode n'est pas no-prices
                                                    content = item.subItemsMode !== 'no-prices'
                                                        ? `${((subItem.quantity || 1) * subItem.unitPrice).toFixed(2)} ${invoice.currency}`
                                                        : '-';
                                                    break;
                                                default:
                                                    content = subItem.customFields?.[column.key] || "-";
                                            }

                                            return (
                                                <div
                                                    key={column.id}
                                                    style={{ width: `${width}%`, minWidth: 0 }}
                                                    className={`${alignment} ${cellPadding} ${cellBorder}`}
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
        </div>
    );
};

export default InvoiceItemsRenderer;
