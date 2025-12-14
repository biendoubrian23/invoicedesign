import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';

export async function POST(request: NextRequest) {
  let browser = null;
  
  try {
    const { html, options = {} } = await request.json();
    
    const {
      filename = 'facture',
      type = 'png',
      quality = 100,
      fullPage = true,
    } = options;

    // Lancer le navigateur Chromium
    browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.newContext({
      viewport: { width: 794, height: 1123 }, // A4 à 96 DPI
      deviceScaleFactor: 3, // Très haute résolution pour les images
    });

    const page = await context.newPage();

    // Définir le contenu HTML
    await page.setContent(html, {
      waitUntil: 'networkidle',
    });

    // Attendre que les polices soient chargées
    await page.waitForTimeout(500);

    // Capturer la screenshot
    const screenshotOptions: {
      type: 'png' | 'jpeg';
      fullPage: boolean;
      quality?: number;
    } = {
      type: type as 'png' | 'jpeg',
      fullPage,
    };

    // La qualité n'est disponible que pour JPEG
    if (type === 'jpeg') {
      screenshotOptions.quality = quality;
    }

    const imageBuffer = await page.screenshot(screenshotOptions);

    await browser.close();
    browser = null;

    const contentType = type === 'png' ? 'image/png' : 'image/jpeg';
    const extension = type === 'png' ? 'png' : 'jpg';

    // Convertir le Buffer en Uint8Array pour NextResponse
    const uint8Array = new Uint8Array(imageBuffer);

    // Retourner l'image
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}.${extension}"`,
        'Content-Length': imageBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Erreur lors de la génération de l\'image:', error);
    
    if (browser) {
      await browser.close();
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la génération de l\'image', details: String(error) },
      { status: 500 }
    );
  }
}
