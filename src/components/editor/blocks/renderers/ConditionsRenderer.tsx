"use client";

import { ConditionsBlock } from "@/types/invoice";

interface ConditionsRendererProps {
  block: ConditionsBlock;
  primaryColor: string;
}

const ConditionsRenderer = ({ block, primaryColor }: ConditionsRendererProps) => {
  if (!block.enabled) return null;

  const fontSizeClass = {
    small: "text-[10px]",
    medium: "text-xs",
  }[block.fontSize];

  return (
    <div className="mb-6 pt-4 border-t border-gray-200">
      {block.showTitle && block.title && (
        <h3
          className="text-xs font-semibold mb-2"
          style={{ color: primaryColor }}
        >
          {block.title}
        </h3>
      )}
      <p className={`${fontSizeClass} text-gray-500 leading-relaxed whitespace-pre-wrap`}>
        {block.content}
      </p>
    </div>
  );
};

export default ConditionsRenderer;
