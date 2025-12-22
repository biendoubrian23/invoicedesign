import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Guide - Comment créer une facture professionnelle",
  description: "Guide complet pour créer vos factures avec InvoiceDesign. Tutoriel pas à pas, conseils et bonnes pratiques de facturation.",
  keywords: ["guide facturation", "tutoriel facture", "comment faire facture", "créer facture guide"],
  openGraph: {
    title: "Guide InvoiceDesign - Créez votre première facture",
    description: "Apprenez à créer des factures professionnelles en quelques minutes.",
  },
}

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
