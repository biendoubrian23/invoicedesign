import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Cette route sert de proxy pour afficher les factures avec une URL propre
// Ex: https://votre-site.com/api/invoice/FAC-2025-001 au lieu de l'URL Supabase

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Récupérer le chemin complet depuis le query param
  const searchParams = request.nextUrl.searchParams;
  const filePath = searchParams.get('path');
  
  if (!filePath) {
    return new NextResponse('Fichier non trouvé', { status: 404 });
  }

  try {
    // Télécharger le fichier depuis Supabase Storage
    const { data, error } = await supabase.storage
      .from('Facture')
      .download(filePath);

    if (error || !data) {
      console.error('Erreur téléchargement:', error);
      return new NextResponse('Fichier non trouvé', { status: 404 });
    }

    // Convertir le Blob en ArrayBuffer
    const arrayBuffer = await data.arrayBuffer();

    // Retourner le PDF avec les bons headers
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${id}.pdf"`,
        'Cache-Control': 'public, max-age=31536000', // Cache 1 an
      },
    });
  } catch (error) {
    console.error('Erreur:', error);
    return new NextResponse('Erreur serveur', { status: 500 });
  }
}
