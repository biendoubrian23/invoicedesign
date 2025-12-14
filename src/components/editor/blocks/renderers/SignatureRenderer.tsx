"use client";

import { SignatureBlock, SIGNATURE_FONTS } from "@/types/invoice";

interface SignatureRendererProps {
  block: SignatureBlock;
  primaryColor: string;
}

// Map font CSS values to CSS classes
const getFontClass = (fontValue: string): string => {
  const fontMap: Record<string, string> = {
    "'Dancing Script', cursive": "font-dancing-script",
    "'Great Vibes', cursive": "font-great-vibes",
    "'Pacifico', cursive": "font-pacifico",
    "'Satisfy', cursive": "font-satisfy",
    "'Tangerine', cursive": "font-tangerine",
    "'Allura', cursive": "font-dancing-script", // fallback
    "'Alex Brush', cursive": "font-dancing-script", // fallback
    "'Pinyon Script', cursive": "font-dancing-script", // fallback
  };
  return fontMap[fontValue] || "font-dancing-script";
};

const SignatureRenderer = ({ block, primaryColor }: SignatureRendererProps) => {
  if (!block.enabled) return null;

  const positionClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[block.position];

  const today = new Date().toLocaleDateString("fr-FR");
  
  // Calcul de la taille basée sur signatureSize (défaut 100%)
  const sizePercent = block.signatureSize || 100;
  const baseHeight = 50; // hauteur de base en pixels
  const scaledHeight = Math.round(baseHeight * sizePercent / 100);
  const containerMinWidth = Math.round(200 * sizePercent / 100);
  const containerMinHeight = Math.round(60 * sizePercent / 100);
  const fontSize = Math.round(24 * sizePercent / 100); // 24px = text-2xl

  return (
    <div className="mb-6">
      {block.showTitle && block.title && (
        <h3
          className="text-sm font-semibold mb-3"
          style={{ color: primaryColor }}
        >
          {block.title}
        </h3>
      )}
      
      <div className={`flex ${positionClass}`}>
        <div style={{ minWidth: `${containerMinWidth}px` }}>
          {/* Zone de signature */}
          <div 
            className="border-b-2 border-gray-400 mb-2 flex items-end justify-center pb-1"
            style={{ minHeight: `${containerMinHeight}px` }}
          >
            {block.mode === "draw" && block.signatureData && (
              <img 
                src={block.signatureData} 
                alt="Signature" 
                className="object-contain"
                style={{ maxHeight: `${scaledHeight}px` }}
              />
            )}
            {block.mode === "image" && block.signatureData && (
              <img 
                src={block.signatureData} 
                alt="Signature" 
                className="object-contain"
                style={{ maxHeight: `${scaledHeight}px` }}
              />
            )}
            {block.mode === "text" && block.signatureText && (
              <span
                className={getFontClass(block.signatureFont || SIGNATURE_FONTS[0].value)}
                style={{ fontSize: `${fontSize}px` }}
              >
                {block.signatureText}
              </span>
            )}
          </div>
          
          {/* Infos sous la signature */}
          <div className="text-xs text-gray-600 text-center space-y-1">
            {block.showName && block.signerName && (
              <p className="font-medium">{block.signerName}</p>
            )}
            {block.showDate && (
              <p>Le {today}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureRenderer;
