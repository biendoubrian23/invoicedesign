/**
 * API Route pour export Image avec Playwright
 * Fonctionne sur Vercel avec le navigateur Chromium embarqué
 */

import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright-core';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let browser = null;
  
  try {
    const { html, type = 'png', quality = 100 } = await request.json();

    if (!html) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    // Lancer Playwright
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process',
      ],
    });

    const context = await browser.newContext({
      viewport: { width: 794, height: 1123 },
      deviceScaleFactor: 3, // Haute résolution
    });

    const page = await context.newPage();

    // Charger le HTML
    await page.setContent(html, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Attendre les polices
    await page.waitForFunction(() => document.fonts.ready);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Capturer la page entière
    const imageBuffer = await page.screenshot({
      fullPage: true,
      type: type as 'png' | 'jpeg',
      quality: type === 'jpeg' ? quality : undefined,
    });

    await browser.close();

    const contentType = type === 'jpeg' ? 'image/jpeg' : 'image/png';

    // Convertir Buffer en Uint8Array pour TypeScript
    return new NextResponse(new Uint8Array(imageBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="facture.${type}"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Image generation error:', error);
    
    if (browser) {
      try {
        await browser.close();
      } catch {
        // Ignorer
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate image', details: String(error) },
      { status: 500 }
    );
  }
}
