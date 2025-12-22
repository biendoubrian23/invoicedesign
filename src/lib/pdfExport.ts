/**
 * Module d'export PDF et Image
 * Utilise html2canvas + jsPDF pour génération côté client (compatible Vercel)
 */

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ExportOptions {
  filename?: string;
  format?: 'A4' | 'Letter';
  userId?: string;
  download?: boolean; // Si false, ne télécharge pas le fichier
}

interface ImageExportOptions {
  filename?: string;
  type?: 'png' | 'jpeg';
  quality?: number;
}

/**
 * Génère le HTML complet avec tous les styles inline pour l'export
 * Exportée pour être utilisée par d'autres fonctions comme sendByEmail
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

  // APRÈS avoir appliqué les styles, supprimer les éléments UI qui ne doivent pas apparaître dans l'export
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
    
    /* Assurer que les couleurs de fond sont imprimées */
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
 * Exporte l'élément en PDF - 100% côté client avec html2canvas + jsPDF
 * Compatible Vercel, pas de Chromium serverless nécessaire
 */
export async function exportToPDF(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<Blob> {
  const {
    filename = 'facture',
    format = 'A4',
    download = true, // Par défaut, télécharge le fichier
  } = options;

  try {
    // Dimensions A4 en mm
    const a4Width = 210;
    const a4Height = 297;
    
    // Créer une copie avec TOUS les styles inline pour éviter les problèmes oklab
    const createInlineStyledClone = (sourceElement: HTMLElement): HTMLElement => {
      const clone = sourceElement.cloneNode(true) as HTMLElement;
      
      // Fonction pour appliquer tous les styles computés en inline
      const applyAllInlineStyles = (source: Element, target: HTMLElement) => {
        const computed = getComputedStyle(source);
        
        // Copier TOUTES les propriétés CSS importantes
        const props = [
          'font-family', 'font-size', 'font-weight', 'font-style', 'line-height',
          'color', 'background-color', 'background',
          'margin', 'padding', 'border', 'border-radius',
          'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
          'display', 'flex-direction', 'justify-content', 'align-items', 'gap', 'flex-wrap',
          'grid-template-columns', 'grid-column', 'grid-row',
          'text-align', 'vertical-align', 'white-space', 'overflow', 'text-overflow',
          'position', 'top', 'right', 'bottom', 'left',
          'box-sizing', 'opacity', 'visibility',
          'border-collapse', 'border-spacing',
          'table-layout',
        ];
        
        props.forEach(prop => {
          try {
            const value = computed.getPropertyValue(prop);
            if (value && value !== 'none' && value !== 'initial' && value !== 'auto') {
              target.style.setProperty(prop, value, 'important');
            }
          } catch {
            // Ignorer les erreurs
          }
        });
      };
      
      // Appliquer au root
      applyAllInlineStyles(sourceElement, clone);
      
      // Appliquer à tous les enfants
      const sourceChildren = sourceElement.querySelectorAll('*');
      const cloneChildren = clone.querySelectorAll('*');
      sourceChildren.forEach((src, i) => {
        const tgt = cloneChildren[i] as HTMLElement;
        if (tgt) applyAllInlineStyles(src, tgt);
      });
      
      return clone;
    };
    
    // Créer le clone avec styles inline
    const clone = createInlineStyledClone(element);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '794px';
    clone.style.backgroundColor = '#ffffff';
    document.body.appendChild(clone);
    
    // Capturer l'élément en canvas haute résolution
    // On passe le clone qui a tous les styles inline, donc pas de parsing CSS
    const canvas = await html2canvas(clone, {
      scale: 2, // Haute résolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      // Dimensions pour A4
      windowWidth: 794, // A4 à 96 DPI
      windowHeight: 1123,
      // Ignorer les feuilles de style externes - on utilise les styles inline
      ignoreElements: (el) => {
        // Ignorer les éléments de style/link pour éviter le parsing oklab
        return el.tagName === 'STYLE' || el.tagName === 'LINK';
      },
    });
    
    // Nettoyer le clone
    document.body.removeChild(clone);

    // Créer le PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: format.toLowerCase() as 'a4' | 'letter',
    });

    // Calculer les dimensions pour remplir la page
    const imgWidth = a4Width;
    const imgHeight = (canvas.height * a4Width) / canvas.width;
    
    // Si l'image est plus haute que la page, on la redimensionne
    let finalWidth = imgWidth;
    let finalHeight = imgHeight;
    
    if (imgHeight > a4Height) {
      finalHeight = a4Height;
      finalWidth = (canvas.width * a4Height) / canvas.height;
    }

    // Centrer l'image sur la page
    const xOffset = (a4Width - finalWidth) / 2;
    const yOffset = 0;

    // Ajouter l'image au PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);

    // Générer le blob
    const pdfBlob = pdf.output('blob');
    
    // Télécharger le PDF seulement si demandé
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
 * Exporte l'élément en image (PNG) - 100% côté client avec html2canvas
 */
export async function exportToImage(
  element: HTMLElement,
  filename: string = 'facture',
  options: ImageExportOptions = {}
): Promise<Blob> {
  const {
    type = 'png',
    quality = 1.0,
  } = options;

  try {
    // Créer une copie avec TOUS les styles inline pour éviter les problèmes oklab
    const createInlineStyledClone = (sourceElement: HTMLElement): HTMLElement => {
      const clone = sourceElement.cloneNode(true) as HTMLElement;
      
      // Fonction pour appliquer tous les styles computés en inline
      const applyAllInlineStyles = (source: Element, target: HTMLElement) => {
        const computed = getComputedStyle(source);
        
        const props = [
          'font-family', 'font-size', 'font-weight', 'font-style', 'line-height',
          'color', 'background-color', 'background',
          'margin', 'padding', 'border', 'border-radius',
          'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
          'display', 'flex-direction', 'justify-content', 'align-items', 'gap', 'flex-wrap',
          'grid-template-columns', 'grid-column', 'grid-row',
          'text-align', 'vertical-align', 'white-space', 'overflow', 'text-overflow',
          'position', 'top', 'right', 'bottom', 'left',
          'box-sizing', 'opacity', 'visibility',
          'border-collapse', 'border-spacing',
          'table-layout',
        ];
        
        props.forEach(prop => {
          try {
            const value = computed.getPropertyValue(prop);
            if (value && value !== 'none' && value !== 'initial' && value !== 'auto') {
              target.style.setProperty(prop, value, 'important');
            }
          } catch {
            // Ignorer les erreurs
          }
        });
      };
      
      // Appliquer au root
      applyAllInlineStyles(sourceElement, clone);
      
      // Appliquer à tous les enfants
      const sourceChildren = sourceElement.querySelectorAll('*');
      const cloneChildren = clone.querySelectorAll('*');
      sourceChildren.forEach((src, i) => {
        const tgt = cloneChildren[i] as HTMLElement;
        if (tgt) applyAllInlineStyles(src, tgt);
      });
      
      return clone;
    };
    
    // Créer le clone avec styles inline
    const clone = createInlineStyledClone(element);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.backgroundColor = '#ffffff';
    document.body.appendChild(clone);
    
    // Capturer l'élément en canvas haute résolution
    const canvas = await html2canvas(clone, {
      scale: 3, // Très haute résolution pour les images
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      // Ignorer les feuilles de style externes
      ignoreElements: (el) => {
        return el.tagName === 'STYLE' || el.tagName === 'LINK';
      },
    });
    
    // Nettoyer le clone
    document.body.removeChild(clone);

    // Convertir en blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Erreur lors de la génération de l\'image'));
            return;
          }
          
          // Télécharger l'image
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${filename}.${type === 'png' ? 'png' : 'jpg'}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          resolve(blob);
        },
        type === 'png' ? 'image/png' : 'image/jpeg',
        quality
      );
    });
  } catch (error) {
    console.error('Erreur export image:', error);
    throw error;
  }
}
