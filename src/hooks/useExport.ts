'use client';

import { useState, useCallback, RefObject } from 'react';
import { exportToPDF, exportToImage } from '@/lib/pdfExport';

interface UseExportOptions {
  filename?: string;
  format?: 'A4' | 'Letter';
}

interface UseExportReturn {
  isExporting: boolean;
  exportPDF: () => Promise<void>;
  exportImage: () => Promise<void>;
  error: string | null;
}

export function useExport(
  elementRef: RefObject<HTMLElement | null>,
  options: UseExportOptions = {}
): UseExportReturn {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { filename = 'facture', format = 'A4' } = options;

  const exportPDF = useCallback(async () => {
    if (!elementRef.current) {
      setError('Element de prévisualisation non trouvé');
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      await exportToPDF(elementRef.current, {
        filename,
        format,
      });
    } catch (err) {
      setError('Erreur lors de l\'export PDF');
      console.error('Export PDF error:', err);
    } finally {
      setIsExporting(false);
    }
  }, [elementRef, filename, format]);

  const exportImage = useCallback(async () => {
    if (!elementRef.current) {
      setError('Element de prévisualisation non trouvé');
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      await exportToImage(elementRef.current, filename);
    } catch (err) {
      setError('Erreur lors de l\'export image');
      console.error('Export image error:', err);
    } finally {
      setIsExporting(false);
    }
  }, [elementRef, filename]);

  return {
    isExporting,
    exportPDF,
    exportImage,
    error,
  };
}
