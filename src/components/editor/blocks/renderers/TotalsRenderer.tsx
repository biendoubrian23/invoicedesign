"use client";

import { TotalsBlock } from "@/types/invoice";
import { useInvoiceStore } from "@/store";

interface TotalsRendererProps {
  block: TotalsBlock;
  primaryColor: string;
}

const TotalsRenderer = ({ block, primaryColor }: TotalsRendererProps) => {
  const { calculateTotals, invoice } = useInvoiceStore();
  const { subtotal, tax, total } = calculateTotals();

  if (!block.enabled) return null;

  return (
    <div className="mb-8">
      {block.showTitle && block.title && (
        <h3
          className="text-sm font-semibold mb-3"
          style={{ color: primaryColor }}
        >
          {block.title}
        </h3>
      )}
      
      <div className="grid grid-cols-12 gap-4 px-4">
        <div className="col-span-8"></div>
        <div className="col-span-4">
          {block.showSubtotal && (
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-600">{block.subtotalLabel}</span>
              <span className="font-medium text-right">{subtotal.toFixed(2)} {invoice.currency}</span>
            </div>
          )}
          
          {block.showTax && (
            <div className="flex justify-between py-2 text-sm border-b border-gray-200">
              <span className="text-gray-600">{block.taxLabel} ({invoice.taxRate}%)</span>
              <span className="font-medium text-right">{tax.toFixed(2)} {invoice.currency}</span>
            </div>
          )}
          
          {block.showTotal && (
            <div
              className="flex justify-between py-3 text-lg font-bold"
              style={{ color: primaryColor }}
            >
              <span>{block.totalLabel}</span>
              <span className="text-right">{total.toFixed(2)} {invoice.currency}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalsRenderer;
