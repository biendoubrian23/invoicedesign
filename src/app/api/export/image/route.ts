/**
 * API Route pour export Image
 * Appelle le microservice PDF sur Railway
 */

import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { html, type = 'png', quality = 100 } = await request.json();

    if (!html) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    // URL du microservice PDF (Railway)
    const pdfServiceUrl = process.env.PDF_SERVICE_URL;
    
    if (!pdfServiceUrl) {
      return NextResponse.json(
        { error: 'PDF_SERVICE_URL not configured' },
        { status: 500 }
      );
    }

    // Appeler le microservice
    const response = await fetch(`${pdfServiceUrl}/api/image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html, type, quality }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error || 'Image generation failed' },
        { status: response.status }
      );
    }

    // Récupérer l'image et la renvoyer
    const imageBuffer = await response.arrayBuffer();
    const contentType = type === 'jpeg' ? 'image/jpeg' : 'image/png';

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="facture.${type}"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image', details: String(error) },
      { status: 500 }
    );
  }
}
