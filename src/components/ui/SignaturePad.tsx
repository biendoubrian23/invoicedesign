"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Button from "./Button";
import { Trash2, Check } from "lucide-react";

interface SignaturePadProps {
  onSave: (signatureData: string) => void;
  onClear?: () => void;
  initialValue?: string;
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
}

const SignaturePad = ({
  onSave,
  onClear,
  initialValue,
  width = 400,
  height = 200,
  strokeColor = "#000000",
  strokeWidth = 2,
  className = "",
}: SignaturePadProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Initialiser le canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuration du canvas
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;

    // Fond blanc
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Charger la signature existante si présente
    if (initialValue) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        setHasSignature(true);
      };
      img.src = initialValue;
    }
  }, [initialValue, strokeColor, strokeWidth]);

  // Obtenir les coordonnées de la souris/touch
  const getCoordinates = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  // Commencer à dessiner
  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    lastPos.current = coords;
    setIsDrawing(true);
  }, [getCoordinates]);

  // Dessiner
  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const coords = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    lastPos.current = coords;
    setHasSignature(true);
  }, [isDrawing, getCoordinates]);

  // Arrêter de dessiner
  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  // Effacer la signature
  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onClear?.();
  }, [onClear]);

  // Sauvegarder la signature
  const saveSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
  }, [onSave]);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="touch-none cursor-crosshair w-full"
          style={{ maxWidth: "100%", height: "auto", aspectRatio: `${width}/${height}` }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-400 text-sm">Dessinez votre signature ici</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={clearSignature}
          className="flex-1"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Effacer
        </Button>
        <Button
          size="sm"
          onClick={saveSignature}
          disabled={!hasSignature}
          className="flex-1"
        >
          <Check className="w-4 h-4 mr-2" />
          Valider
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;
