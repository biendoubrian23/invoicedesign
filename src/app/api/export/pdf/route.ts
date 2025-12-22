/**
 * API Route pour export PDF
 * Appelle le microservice PDF sur Railway
 */

import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { html, format = 'A4' } = await request.json();

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
    const response = await fetch(`${pdfServiceUrl}/api/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html, format }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error || 'PDF generation failed' },
        { status: response.status }
      );
    }

    // Récupérer le PDF et le renvoyer
    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="facture.pdf"',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('PDF proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: String(error) },
      { status: 500 }
    );
  }
}

