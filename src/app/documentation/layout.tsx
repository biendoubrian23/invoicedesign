import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Documentation - API et fonctionnalités InvoiceDesign",
  description: "Documentation technique complète d'InvoiceDesign. Découvrez toutes les fonctionnalités et intégrations disponibles.",
  keywords: ["documentation facturation", "api facturation", "intégration facture"],
  openGraph: {
    title: "Documentation InvoiceDesign",
    description: "Tout savoir sur les fonctionnalités de notre logiciel de facturation.",
  },
}

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
