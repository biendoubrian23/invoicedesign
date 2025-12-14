"use client";

import { PaymentTermsBlock } from "@/types/invoice";

interface PaymentTermsRendererProps {
  block: PaymentTermsBlock;
  primaryColor: string;
}

const PaymentTermsRenderer = ({ block, primaryColor }: PaymentTermsRendererProps) => {
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
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          {block.content}
        </p>
      </div>
    </div>
  );
};

export default PaymentTermsRenderer;
