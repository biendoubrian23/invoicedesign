import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ path?: string }>;
}

// Générer les métadonnées dynamiquement pour le titre de l'onglet
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Facture ${id} - InvoiceDesign`,
    description: `Facture ${id} générée par InvoiceDesign`,
  };
}

export default async function InvoiceViewPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { path } = await searchParams;

  if (!path) {
    notFound();
  }

  // Construire l'URL du PDF via notre API proxy
  const pdfUrl = `/api/invoice/${encodeURIComponent(id)}?path=${encodeURIComponent(path)}`;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <span className="font-semibold text-lg">InvoiceDesign</span>
        </div>
        
        <div className="text-sm opacity-90 hidden sm:block">
          Facture {id}
        </div>
        
        <a 
          href={pdfUrl} 
          download={`${id}.pdf`} 
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-50 transition-colors"
        >
          ⬇ Télécharger
        </a>
      </div>
      
      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden">
        <iframe 
          src={pdfUrl} 
          className="w-full h-full border-none"
          title={`Facture ${id}`}
        />
      </div>
    </div>
  );
}
