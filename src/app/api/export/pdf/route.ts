import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';

export async function POST(request: NextRequest) {
  let browser = null;
  
  try {
    const { html, options = {} } = await request.json();
    
    const {
      filename = 'facture',
      format = 'A4',
      printBackground = true,
      margin = { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    } = options;

    // Lancer le navigateur Chromium
    browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.newContext({
      viewport: { width: 794, height: 1123 }, // A4 à 96 DPI
      deviceScaleFactor: 2, // Haute résolution pour un meilleur rendu
    });

    const page = await context.newPage();

    // Définir le contenu HTML avec les styles inline
    await page.setContent(html, {
      waitUntil: 'networkidle',
    });

    // Attendre que les polices soient chargées
    await page.waitForTimeout(500);

    // Générer le PDF avec Playwright
    const pdfBuffer = await page.pdf({
      format,
      printBackground,
      margin,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });

    await browser.close();
    browser = null;

    // Convertir le Buffer en Uint8Array pour NextResponse
    const uint8Array = new Uint8Array(pdfBuffer);

    // Retourner le PDF
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    
    if (browser) {
      await browser.close();
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la génération du PDF', details: String(error) },
      { status: 500 }
    );
  }
}
