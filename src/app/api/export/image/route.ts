import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

// Get browser executable path based on environment
async function getBrowser() {
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    // En local, utiliser Chrome/Chromium installé sur le système
    const puppeteerFull = await import('puppeteer');
    return puppeteerFull.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  } else {
    // En production (Vercel), utiliser @sparticuz/chromium
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 794, height: 1123 },
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
}

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

    // Lancer le navigateur avec Puppeteer
    browser = await getBrowser();

    const page = await browser.newPage();

    // Définir le viewport pour A4 à 96 DPI avec haute résolution
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 3, // Très haute résolution pour les images
    });

    // Définir le contenu HTML
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    });

    // Attendre que les polices soient chargées
    await new Promise(resolve => setTimeout(resolve, 500));

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
        'Content-Length': uint8Array.length.toString(),
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
