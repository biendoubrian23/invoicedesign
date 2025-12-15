"use client";

import { useInvoiceStore } from "@/store";
import { InvoiceItemsBlock } from "@/types/invoice";

interface InvoiceItemsRendererProps {
    block: InvoiceItemsBlock;
    primaryColor: string;
}

const InvoiceItemsRenderer = ({ block, primaryColor }: InvoiceItemsRendererProps) => {
    const { invoice } = useInvoiceStore();

    if (!block.enabled) return null;

    return (
        <div className="mb-8">
            {/* Table Header - Dynamic based on columns */}
            {block.showHeader && (
                <div
                    className="flex gap-2 py-3 px-4 text-sm font-bold border-b-2"
                    style={{ borderColor: primaryColor }}
                >
                    {block.columns.filter(col => col.visible).map((column, idx, arr) => {
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
                    <div className={`flex gap-2 py-3 px-4 text-sm border-b border-gray-200 ${block.striped
                        ? index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        : "bg-white"
                        }`}>
                        {block.columns.filter(col => col.visible).map((column, idx, arr) => {
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
                                        {block.columns.filter(col => col.visible).map((column, idx, arr) => {
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
        </div>
    );
};

export default InvoiceItemsRenderer;
