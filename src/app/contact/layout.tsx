import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact - Support InvoiceDesign",
  description: "Contactez l'équipe InvoiceDesign pour toute question sur notre logiciel de facturation. Réponse rapide garantie.",
  keywords: ["contact facturation", "support InvoiceDesign", "aide facturation"],
  openGraph: {
    title: "Contactez InvoiceDesign",
    description: "Notre équipe est là pour vous aider avec votre facturation.",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
