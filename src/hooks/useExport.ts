'use client';

import { useState, useCallback, RefObject } from 'react';
import { exportToPDF, exportToImage } from '@/lib/pdfExport';
import { uploadExportedFile } from '@/services/invoiceService';
import { useAuth } from '@/context/AuthContext';
import { useInvoiceStore } from '@/store';

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
  const { user } = useAuth();
  const { invoice, currentClientId } = useInvoiceStore();

  const { filename = 'facture', format = 'A4' } = options;

  // Get client folder name from invoice (company name)
  const clientFolder = currentClientId && invoice.client?.company
    ? invoice.client.company
    : undefined;

  const exportPDF = useCallback(async () => {
    if (!elementRef.current) {
      setError('Element de prévisualisation non trouvé');
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      // Export the PDF
      const blob = await exportToPDF(elementRef.current, {
        filename,
        format,
      });

      // If user is logged in, also upload to storage
      if (user && blob) {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
        const storageFilename = `${filename}_${timestamp}`;
        await uploadExportedFile(blob, storageFilename, 'pdf', clientFolder);
      }
    } catch (err) {
      setError('Erreur lors de l\'export PDF');
      console.error('Export PDF error:', err);
    } finally {
      setIsExporting(false);
    }
  }, [elementRef, filename, format, user, clientFolder]);

  const exportImage = useCallback(async () => {
    if (!elementRef.current) {
      setError('Element de prévisualisation non trouvé');
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      // Export the image
      const blob = await exportToImage(elementRef.current, filename);

      // If user is logged in, also upload to storage
      if (user && blob) {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
        const storageFilename = `${filename}_${timestamp}`;
        await uploadExportedFile(blob, storageFilename, 'png', clientFolder);
      }
    } catch (err) {
      setError('Erreur lors de l\'export image');
      console.error('Export image error:', err);
    } finally {
      setIsExporting(false);
    }
  }, [elementRef, filename, user, clientFolder]);

  return {
    isExporting,
    exportPDF,
    exportImage,
    error,
  };
}

