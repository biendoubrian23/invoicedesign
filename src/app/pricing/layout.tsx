import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Tarifs - Logiciel de facturation à partir de 3,99€/mois",
  description: "Découvrez nos offres de facturation : gratuite, Standard à 3,99€/mois et Premium à 6,99€/mois. Créez des factures professionnelles sans engagement.",
  keywords: ["tarif facturation", "logiciel facturation prix", "facturation pas cher", "abonnement facturation"],
  openGraph: {
    title: "Tarifs InvoiceDesign - Facturation dès 3,99€/mois",
    description: "Offre gratuite disponible. Plans Standard et Premium pour les professionnels.",
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
