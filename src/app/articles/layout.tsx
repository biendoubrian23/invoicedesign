import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Articles & Conseils - Facturation et Comptabilité",
  description: "Découvrez nos articles sur la facturation : guides pratiques, mentions légales obligatoires, conseils pour auto-entrepreneurs et actualités 2025.",
  keywords: ["articles facturation", "guide facture", "conseils facturation", "blog comptabilité", "auto-entrepreneur facture"],
  openGraph: {
    title: "Articles & Conseils Facturation | InvoiceDesign",
    description: "Guides et conseils pour maîtriser la facturation et respecter les obligations légales.",
  },
}

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
