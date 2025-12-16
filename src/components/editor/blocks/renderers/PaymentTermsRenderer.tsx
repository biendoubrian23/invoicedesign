"use client";

import { PaymentTermsBlock } from "@/types/invoice";
import { useInvoiceStore } from "@/store";

interface PaymentTermsRendererProps {
  block: PaymentTermsBlock;
  primaryColor: string;
}

const PaymentTermsRenderer = ({ block, primaryColor }: PaymentTermsRendererProps) => {
  const { invoice } = useInvoiceStore();

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

      <div
        className="border border-gray-200 rounded-lg p-4"
        style={{ backgroundColor: invoice.styling.backgroundColor }}
      >
        <p
          className="text-sm whitespace-pre-line leading-relaxed"
          style={{ color: invoice.styling.secondaryColor }}
        >
          {block.content}
        </p>
      </div>
    </div>
  );
};

export default PaymentTermsRenderer;
