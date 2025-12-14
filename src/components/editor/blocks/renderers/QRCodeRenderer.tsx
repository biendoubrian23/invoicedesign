"use client";

import { QRCodeBlock } from "@/types/invoice";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QRCodeRendererProps {
  block: QRCodeBlock;
  primaryColor: string;
}

const QRCodeRenderer = ({ block, primaryColor }: QRCodeRendererProps) => {
  const [qrImageData, setQrImageData] = useState<string | null>(null);

  const sizes = {
    small: 80,
    medium: 120,
    large: 160,
  };

  const size = sizes[block.size];

  useEffect(() => {
    if (!block.content) {
      setQrImageData(null);
      return;
    }

    // Générer un vrai QR code avec la librairie qrcode
    QRCode.toDataURL(block.content, {
      width: size,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        setQrImageData(url);
      })
      .catch((err) => {
        console.error("Erreur génération QR code:", err);
        setQrImageData(null);
      });
  }, [block.content, size]);

  if (!block.enabled || !block.content) return null;

  const positionClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[block.position];

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
        <div className="text-center">
          {qrImageData ? (
            <img
              src={qrImageData}
              alt="QR Code"
              width={size}
              height={size}
              className="border border-gray-200"
            />
          ) : (
            <div 
              className="border border-gray-200 bg-gray-100 flex items-center justify-center"
              style={{ width: size, height: size }}
            >
              <span className="text-xs text-gray-400">QR</span>
            </div>
          )}
          {block.showLabel && block.label && (
            <p className="text-xs text-gray-600 mt-2">{block.label}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeRenderer;
