"use client";

import { FreeTextBlock } from "@/types/invoice";

interface FreeTextRendererProps {
  block: FreeTextBlock;
  primaryColor: string;
}

const FreeTextRenderer = ({ block, primaryColor }: FreeTextRendererProps) => {
  if (!block.enabled) return null;

  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[block.alignment];

  return (
    <div className="mb-6">
      {block.showTitle && block.title && (
        <h3
          className="text-sm font-semibold mb-2"
          style={{ color: primaryColor }}
        >
          {block.title}
        </h3>
      )}
      <div className={`text-sm text-gray-700 whitespace-pre-wrap ${alignmentClass}`}>
        {block.content}
      </div>
    </div>
  );
};

export default FreeTextRenderer;
