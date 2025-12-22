/**
 * API Route pour export PDF avec Playwright
 * Fonctionne sur Vercel avec le navigateur Chromium embarqué
 */

import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright-core';

export const maxDuration = 60; // Maximum pour Vercel Pro
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let browser = null;
  
  try {
    const { html, format = 'A4' } = await request.json();

    if (!html) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    // Lancer Playwright avec le navigateur système ou Chromium de Vercel
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
      viewport: { width: 794, height: 1123 }, // A4 à 96 DPI
    });

    const page = await context.newPage();

    // Charger le HTML
    await page.setContent(html, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Attendre que les polices soient chargées
    await page.waitForFunction(() => document.fonts.ready);

    // Attendre un peu plus pour le rendu complet
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Générer le PDF
    const pdfBuffer = await page.pdf({
      format: format as 'A4' | 'Letter',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();

    // Retourner le PDF (convertir Buffer en Uint8Array)
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="facture.pdf"',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    
    if (browser) {
      try {
        await browser.close();
      } catch {
        // Ignorer l'erreur de fermeture
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate PDF', details: String(error) },
      { status: 500 }
    );
  }
}

