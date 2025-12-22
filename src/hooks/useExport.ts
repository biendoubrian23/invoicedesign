'use client';

import { useState, useCallback, RefObject } from 'react';
import { useRouter } from 'next/navigation';
import { exportToPDF, exportToImage, generateExportHTML } from '@/lib/pdfExport';
import { uploadExportedFile } from '@/services/invoiceService';
import { saveClientState } from '@/services/clientService';
import { useAuth } from '@/context/AuthContext';
import { useInvoiceStore } from '@/store';

interface UseExportOptions {
  filename?: string;
  format?: 'A4' | 'Letter';
}

interface UseExportReturn {
  isExporting: boolean;
  isSendingEmail: boolean;
  exportPDF: () => Promise<void>;
  exportImage: () => Promise<void>;
  sendByEmail: () => Promise<void>;
  error: string | null;
  exportsRemaining: number | null;
}

interface ExportCheckResponse {
  canExport: boolean;
  reason: string;
  exportsRemaining: number;
  subscriptionPlan?: string;
}

export function useExport(
  elementRef: RefObject<HTMLElement | null>,
  options: UseExportOptions = {}
): UseExportReturn {
  const [isExporting, setIsExporting] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exportsRemaining, setExportsRemaining] = useState<number | null>(null);
  const { user } = useAuth();
  const { invoice, blocks, selectedTemplate, currentClientId, setActiveSection, calculateTotals } = useInvoiceStore();
  const router = useRouter();

  const { filename = 'facture', format = 'A4' } = options;

  // Get client folder name from invoice (company name)
  const clientFolder = currentClientId && invoice.client?.company
    ? invoice.client.company
    : undefined;

  // Check if user can export
  const checkExportLimit = async (): Promise<ExportCheckResponse | null> => {
    try {
      const response = await fetch('/api/check-export-limit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });
      const data = await response.json();
      setExportsRemaining(data.exportsRemaining);
      return data;
    } catch (error) {
      console.error('Error checking export limit:', error);
      return null;
    }
  };

  // Increment export count after successful export
  const incrementExportCount = async () => {
    if (!user) return;
    try {
      await fetch('/api/check-export-limit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
    } catch (error) {
      console.error('Error incrementing export count:', error);
    }
  };

  // Redirect to pricing section
  const redirectToPricing = useCallback(() => {
    setActiveSection('pricing');
    setError('Vous avez atteint la limite de 3 exports gratuits. Passez à un plan payant pour des exports illimités.');
  }, [setActiveSection]);

  const exportPDF = useCallback(async () => {
    // Clear any previous error first
    setError(null);

    if (!elementRef.current) {
      setError('Chargement en cours, veuillez réessayer dans quelques secondes.');
      // Auto-clear after 3 seconds
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Check export limit first
    const limitCheck = await checkExportLimit();
    if (!limitCheck?.canExport) {
      redirectToPricing();
      return;
    }

    setIsExporting(true);

    try {
      // ✅ SAVE CLIENT STATE TO DATABASE BEFORE EXPORTING
      // This ensures all modifications are saved for this client
      if (user && currentClientId) {
        console.log('[Export] Saving client state before PDF export...');
        await saveClientState(
          currentClientId,
          invoice,
          blocks,
          selectedTemplate || 'classic'
        );
        console.log('[Export] Client state saved successfully');
      }

      // Export the PDF (pass userId for watermark check)
      const blob = await exportToPDF(elementRef.current, {
        filename,
        format,
        userId: user?.id,
      });

      // Increment export count for free users
      await incrementExportCount();

      // Update remaining count
      if (exportsRemaining !== null && exportsRemaining > 0) {
        setExportsRemaining(exportsRemaining - 1);
      }

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
  }, [elementRef, filename, format, user, clientFolder, exportsRemaining, redirectToPricing]);

  const exportImage = useCallback(async () => {
    // Clear any previous error first
    setError(null);

    if (!elementRef.current) {
      setError('Chargement en cours, veuillez réessayer dans quelques secondes.');
      // Auto-clear after 3 seconds
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Check export limit first
    const limitCheck = await checkExportLimit();
    if (!limitCheck?.canExport) {
      redirectToPricing();
      return;
    }

    setIsExporting(true);

    try {
      // ✅ SAVE CLIENT STATE TO DATABASE BEFORE EXPORTING
      // This ensures all modifications are saved for this client
      if (user && currentClientId) {
        console.log('[Export] Saving client state before Image export...');
        await saveClientState(
          currentClientId,
          invoice,
          blocks,
          selectedTemplate || 'classic'
        );
        console.log('[Export] Client state saved successfully');
      }

      // Export the image
      const blob = await exportToImage(elementRef.current, filename);

      // Increment export count for free users
      await incrementExportCount();

      // Update remaining count
      if (exportsRemaining !== null && exportsRemaining > 0) {
        setExportsRemaining(exportsRemaining - 1);
      }

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
  }, [elementRef, filename, user, clientFolder, exportsRemaining, redirectToPricing]);

  // Send invoice by email - generates PDF, uploads it, and opens email client
  const sendByEmail = useCallback(async () => {
    // Clear any previous error first
    setError(null);

    if (!elementRef.current) {
      setError('Chargement en cours, veuillez réessayer dans quelques secondes.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Check export limit first
    const limitCheck = await checkExportLimit();
    if (!limitCheck?.canExport) {
      redirectToPricing();
      return;
    }

    setIsSendingEmail(true);

    try {
      // Save client state before sending
      if (user && currentClientId) {
        console.log('[SendEmail] Saving client state before sending...');
        await saveClientState(
          currentClientId,
          invoice,
          blocks,
          selectedTemplate || 'classic'
        );
        console.log('[SendEmail] Client state saved successfully');
      }

      // Generate the PDF client-side (without downloading it)
      const blob = await exportToPDF(elementRef.current, {
        filename,
        format,
        download: false, // Ne pas télécharger, juste générer le blob
      });

      // Upload to storage and get file path for clean URL
      let pdfUrl = '';
      if (user) {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
        const storageFilename = `${filename}_${timestamp}`;
        const { filePath } = await uploadExportedFile(blob, storageFilename, 'pdf', clientFolder);
        
        // Construire l'URL propre avec le nom de la facture
        if (filePath) {
          const baseUrl = window.location.origin;
          const invoiceId = invoice.invoiceNumber || filename;
          pdfUrl = `${baseUrl}/invoice/${encodeURIComponent(invoiceId)}?path=${encodeURIComponent(filePath)}`;
        }
      }

      // Increment export count for free users
      await incrementExportCount();

      // Update remaining count
      if (exportsRemaining !== null && exportsRemaining > 0) {
        setExportsRemaining(exportsRemaining - 1);
      }

      // Prepare email content
      const clientEmail = invoice.client?.email || '';
      const clientName = invoice.client?.name || 'Client';
      const issuerName = invoice.issuer?.name || 'Votre entreprise';
      const invoiceNumber = invoice.invoiceNumber || '';
      const { total } = calculateTotals();
      const totalAmount = `${total.toFixed(2)} ${invoice.currency}`;

      const subject = encodeURIComponent(`Facture ${invoiceNumber} - ${issuerName}`);
      const body = encodeURIComponent(
        `Bonjour ${clientName},\n\n` +
        `Veuillez trouver ci-joint votre facture n°${invoiceNumber} d'un montant de ${totalAmount}.\n\n` +
        (pdfUrl ? `📄 Télécharger la facture : ${pdfUrl}\n\n` : '') +
        `Merci pour votre confiance !\n\n` +
        `Cordialement,\n${issuerName}`
      );

      // Open email client with mailto:
      const mailtoLink = `mailto:${clientEmail}?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_blank');

    } catch (err) {
      setError('Erreur lors de l\'envoi');
      console.error('Send email error:', err);
    } finally {
      setIsSendingEmail(false);
    }
  }, [elementRef, filename, format, user, clientFolder, invoice, blocks, selectedTemplate, currentClientId, exportsRemaining, redirectToPricing]);

  return {
    isExporting,
    isSendingEmail,
    exportPDF,
    exportImage,
    sendByEmail,
    error,
    exportsRemaining,
  };
}