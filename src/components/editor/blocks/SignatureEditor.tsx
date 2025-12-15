"use client";

import { useState } from "react";
import { SignatureBlock, SIGNATURE_FONTS, SignatureMode } from "@/types/invoice";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SignaturePad from "@/components/ui/SignaturePad";
import { Pen, Image, Type, AlignLeft, AlignCenter, AlignRight, Upload } from "lucide-react";

interface SignatureEditorProps {
  block: SignatureBlock;
  onChange: (data: Partial<SignatureBlock>) => void;
}

// Map font names to CSS classes
const getFontClass = (fontValue: string): string => {
  const fontMap: Record<string, string> = {
    "'Dancing Script', cursive": "font-dancing-script",
    "'Great Vibes', cursive": "font-great-vibes",
    "'Pacifico', cursive": "font-pacifico",
    "'Satisfy', cursive": "font-satisfy",
    "'Tangerine', cursive": "font-tangerine",
  };
  return fontMap[fontValue] || "font-dancing-script";
};

const SignatureEditor = ({ block, onChange }: SignatureEditorProps) => {
  const [showPad, setShowPad] = useState(false);

  const modes: { value: SignatureMode; icon: React.ReactNode; label: string }[] = [
    { value: "draw", icon: <Pen className="w-4 h-4" />, label: "Dessiner" },
    { value: "image", icon: <Image className="w-4 h-4" />, label: "Image" },
    { value: "text", icon: <Type className="w-4 h-4" />, label: "Texte" },
  ];

  const positions: { value: SignatureBlock["position"]; icon: React.ReactNode }[] = [
    { value: "left", icon: <AlignLeft className="w-4 h-4" /> },
    { value: "center", icon: <AlignCenter className="w-4 h-4" /> },
    { value: "right", icon: <AlignRight className="w-4 h-4" /> },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChange({ signatureData: result });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveDrawing = (data: string) => {
    onChange({ signatureData: data });
    setShowPad(false);
  };

  return (
    <div className="space-y-4">
      <Input
        label="Titre"
        value={block.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="ex: Signature du client"
      />

      {/* Mode de signature */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de signature
        </label>
        <div className="flex gap-2">
          {modes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => onChange({ mode: mode.value })}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors ${block.mode === mode.value
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
            >
              {mode.icon}
              <span className="text-sm">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenu selon le mode */}
      {block.mode === "draw" && (
        <div className="space-y-3">
          {!showPad ? (
            <div className="text-center">
              {block.signatureData ? (
                <div className="space-y-2">
                  <div className="border rounded-lg p-4 bg-white">
                    <img
                      src={block.signatureData}
                      alt="Signature"
                      className="max-h-24 mx-auto"
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm" onClick={() => setShowPad(true)}>
                      Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onChange({ signatureData: undefined })}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={() => setShowPad(true)}>
                  <Pen className="w-4 h-4 mr-2" />
                  Dessiner la signature
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <SignaturePad
                onSave={handleSaveDrawing}
                onClear={() => onChange({ signatureData: undefined })}
                initialValue={block.signatureData}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPad(false)}
                className="w-full"
              >
                Annuler
              </Button>
            </div>
          )}
        </div>
      )}

      {block.mode === "image" && (
        <div className="space-y-3">
          {block.signatureData ? (
            <div className="space-y-2">
              <div className="border rounded-lg p-4 bg-white">
                <img
                  src={block.signatureData}
                  alt="Signature"
                  className="max-h-24 mx-auto"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange({ signatureData: undefined })}
                className="w-full"
              >
                Supprimer l&apos;image
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Cliquez pour uploader une image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      )}

      {block.mode === "text" && (
        <div className="space-y-3">
          <Input
            label="Texte de la signature"
            value={block.signatureText || ""}
            onChange={(e) => onChange({ signatureText: e.target.value })}
            placeholder="ex: Jean Dupont"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Police de signature
            </label>
            <select
              value={block.signatureFont || SIGNATURE_FONTS[0].value}
              onChange={(e) => onChange({ signatureFont: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {SIGNATURE_FONTS.map((font) => (
                <option key={font.name} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          {block.signatureText && (
            <div className="p-4 bg-white border rounded-lg">
              <p
                className={`text-2xl text-center ${getFontClass(block.signatureFont || SIGNATURE_FONTS[0].value)}`}
              >
                {block.signatureText}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Nom du signataire */}
      <Input
        label="Nom du signataire"
        value={block.signerName}
        onChange={(e) => onChange({ signerName: e.target.value })}
        placeholder="ex: Jean Dupont"
      />

      {/* Rôle du signataire (optionnel, surtout pour le template Elegant) */}
      <Input
        label="Rôle / Fonction"
        value={block.signerRole || ""}
        onChange={(e) => onChange({ signerRole: e.target.value })}
        placeholder="ex: Manager, Directeur, CEO"
      />

      {/* Options */}
      <div className="flex gap-4 flex-wrap">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={block.showTitle}
            onChange={(e) => onChange({ showTitle: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Afficher le titre
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={block.showDate}
            onChange={(e) => onChange({ showDate: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Afficher la date
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={block.showName}
            onChange={(e) => onChange({ showName: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Afficher le nom
        </label>
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Position
        </label>
        <div className="flex gap-2">
          {positions.map((pos) => (
            <button
              key={pos.value}
              onClick={() => onChange({ position: pos.value })}
              className={`p-2 rounded-lg border transition-colors ${block.position === pos.value
                  ? "bg-blue-100 border-blue-500 text-blue-600"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
            >
              {pos.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Taille de la signature */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Taille de la signature : {block.signatureSize || 100}%
        </label>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">50%</span>
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={block.signatureSize || 100}
            onChange={(e) => onChange({ signatureSize: parseInt(e.target.value, 10) })}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-xs text-gray-500">200%</span>
        </div>
      </div>
    </div>
  );
};

export default SignatureEditor;
