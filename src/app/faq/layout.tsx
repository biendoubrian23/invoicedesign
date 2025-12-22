import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "FAQ - Questions fréquentes sur la facturation",
  description: "Trouvez les réponses à vos questions sur InvoiceDesign : création de factures, export PDF, abonnements et fonctionnalités.",
  keywords: ["faq facturation", "questions facturation", "aide facture", "comment créer facture"],
  openGraph: {
    title: "FAQ InvoiceDesign - Vos questions, nos réponses",
    description: "Tout savoir sur notre logiciel de facturation gratuit.",
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
