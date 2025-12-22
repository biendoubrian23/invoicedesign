import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { createClient } from '@supabase/supabase-js';

// Function to get user subscription plan
async function getUserSubscriptionPlan(userId: string | null): Promise<string> {
  if (!userId) return 'free';

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  const { data } = await supabase
    .from('profiles')
    .select('subscription_plan')
    .eq('id', userId)
    .single();

  return data?.subscription_plan || 'free';
}

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
    // En production (Vercel), utiliser @sparticuz/chromium v119
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 794, height: 1123 },
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
}

// Generate watermark HTML overlay
function generateWatermarkOverlay(): string {
  return `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 9999;
    ">
      <div style="
        font-size: 72px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.08);
        transform: rotate(-45deg);
        white-space: nowrap;
        font-family: Arial, sans-serif;
        text-transform: uppercase;
        letter-spacing: 8px;
      ">
        InvoiceDesign
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  let browser = null;

  try {
    const { html, options = {}, userId } = await request.json();

    const {
      filename = 'facture',
      format = 'A4',
      printBackground = true,
      margin = { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    } = options;

    // Check user subscription plan
    const subscriptionPlan = await getUserSubscriptionPlan(userId);
    const isFreeUser = subscriptionPlan === 'free';

    // Prepare HTML with watermark for free users
    let finalHtml = html;
    if (isFreeUser) {
      // Insert watermark overlay before closing body tag
      const watermark = generateWatermarkOverlay();
      if (finalHtml.includes('</body>')) {
        finalHtml = finalHtml.replace('</body>', `${watermark}</body>`);
      } else {
        finalHtml = `${finalHtml}${watermark}`;
      }
    }

    // Lancer le navigateur avec Puppeteer
    browser = await getBrowser();

    const page = await browser.newPage();
    
    // Définir le viewport pour A4 à 96 DPI
    await page.setViewport({ 
      width: 794, 
      height: 1123, 
      deviceScaleFactor: 2 
    });

    // Définir le contenu HTML
    await page.setContent(finalHtml, {
      waitUntil: 'networkidle0',
    });

    // Attendre que les polices soient chargées
    await new Promise(resolve => setTimeout(resolve, 500));

    // Générer le PDF avec Puppeteer
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

