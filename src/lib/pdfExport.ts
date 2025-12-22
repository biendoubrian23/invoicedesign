/**
 * Module d'export PDF et Image
 * Utilise Playwright côté serveur via API routes
 */

interface ExportOptions {
  filename?: string;
  format?: 'A4' | 'Letter';
  userId?: string;
  download?: boolean;
}

interface ImageExportOptions {
  filename?: string;
  type?: 'png' | 'jpeg';
  quality?: number;
}

/**
 * Génère le HTML complet avec tous les styles inline pour l'export
 */
export function generateExportHTML(element: HTMLElement): string {
  // Cloner l'élément pour ne pas modifier l'original
  const clone = element.cloneNode(true) as HTMLElement;

  // Récupérer tous les styles computés et les appliquer inline
  const applyComputedStyles = (source: Element, target: HTMLElement) => {
    const computed = window.getComputedStyle(source);
    const importantStyles = [
      'font-family', 'font-size', 'font-weight', 'font-style',
      'color', 'background-color', 'background',
      'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
      'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
      'border-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
      'border-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
      'border-radius', 'border-collapse',
      'display', 'flex-direction', 'justify-content', 'align-items', 'gap',
      'grid-template-columns', 'grid-column',
      'width', 'min-width', 'max-width',
      'height', 'min-height', 'max-height',
      'text-align', 'line-height', 'letter-spacing',
      'white-space', 'overflow',
      'box-sizing', 'position',
    ];

    importantStyles.forEach(prop => {
      const value = computed.getPropertyValue(prop);
      if (value && value !== 'initial' && value !== 'none' && value !== 'normal') {
        target.style.setProperty(prop, value);
      }
    });
  };

  // Appliquer les styles à l'élément racine
  applyComputedStyles(element, clone);

  // Appliquer les styles à tous les enfants
  const sourceElements = element.querySelectorAll('*');
  const cloneElements = clone.querySelectorAll('*');

  sourceElements.forEach((sourceEl, index) => {
    const targetEl = cloneElements[index] as HTMLElement;
    if (targetEl) {
      applyComputedStyles(sourceEl, targetEl);
    }
  });

  // Supprimer les éléments UI qui ne doivent pas apparaître dans l'export
  const elementsToRemove = clone.querySelectorAll('[data-export-hidden]');
  elementsToRemove.forEach(el => el.remove());

  // Récupérer les polices Google utilisées
  const fontFamily = window.getComputedStyle(element).fontFamily;
  const primaryFont = fontFamily.split(',')[0].replace(/['"]/g, '').trim();

  // Construire le HTML complet
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(primaryFont)}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Great+Vibes&family=Pacifico&family=Satisfy&family=Allura&family=Alex+Brush&family=Tangerine&family=Pinyon+Script&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    @page {
      size: A4;
      margin: 0;
    }
    
    body {
      font-family: '${primaryFont}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: white;
      width: 210mm;
      min-height: 297mm;
    }
    
    [style*="background"] {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  </style>
</head>
<body>
  ${clone.outerHTML}
</body>
</html>
  `.trim();

  return html;
}

/**
 * Exporte l'élément en PDF via l'API serveur Playwright
 */
export async function exportToPDF(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<Blob> {
  const {
    filename = 'facture',
    format = 'A4',
    download = true,
  } = options;

  try {
    // Générer le HTML avec styles inline
    const html = generateExportHTML(element);

    // Appeler l'API serveur
    const response = await fetch('/api/export/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html, format }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la génération du PDF');
    }

    const pdfBlob = await response.blob();

    // Télécharger le PDF si demandé
    if (download) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    return pdfBlob;
  } catch (error) {
    console.error('Erreur export PDF:', error);
    throw error;
  }
}

/**
 * Exporte l'élément en image via l'API serveur Playwright
 */
export async function exportToImage(
  element: HTMLElement,
  filename: string = 'facture',
  options: ImageExportOptions = {}
): Promise<Blob> {
  const {
    type = 'png',
    quality = 100,
  } = options;

  try {
    // Générer le HTML avec styles inline
    const html = generateExportHTML(element);

    // Appeler l'API serveur
    const response = await fetch('/api/export/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html, type, quality }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la génération de l\'image');
    }

    const imageBlob = await response.blob();

    // Télécharger l'image
    const url = URL.createObjectURL(imageBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return imageBlob;
  } catch (error) {
    console.error('Erreur export Image:', error);
    throw error;
  }
}

/**
 * Envoie la facture par email
 */
export async function sendByEmail(
  element: HTMLElement,
  recipientEmail: string,
  options: ExportOptions = {}
): Promise<boolean> {
  const { filename = 'facture', format = 'A4' } = options;

  try {
    // Générer le PDF via l'API serveur (sans téléchargement)
    const pdfBlob = await exportToPDF(element, {
      filename,
      format,
      download: false,
    });

    // Préparer l'URL mailto avec sujet et corps
    const subject = encodeURIComponent(`Facture - ${filename}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nVeuillez trouver ci-joint votre facture.\n\nCordialement`
    );

    // Ouvrir l'email
    window.open(`mailto:${recipientEmail}?subject=${subject}&body=${body}`, '_blank');

    // Télécharger le PDF pour que l'utilisateur puisse l'attacher manuellement
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Erreur envoi email:', error);
    throw error;
  }
}
