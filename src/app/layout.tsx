import type { Metadata } from "next";
import {
  Inter,
  Roboto,
  Open_Sans,
  Lato,
  Montserrat,
  Poppins,
  Source_Sans_3,
  Nunito,
  Raleway,
  Oswald,
  Merriweather,
  Playfair_Display,
  Dancing_Script,
  Great_Vibes,
  Pacifico,
  Caveat,
  Satisfy,
  Lobster,
  Kaushan_Script,
  Tangerine
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Document fonts
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Signature fonts
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const kaushanScript = Kaushan_Script({
  variable: "--font-kaushan-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const tangerine = Tangerine({
  variable: "--font-tangerine",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const fontVariables = [
  inter.variable,
  roboto.variable,
  openSans.variable,
  lato.variable,
  montserrat.variable,
  poppins.variable,
  sourceSans.variable,
  nunito.variable,
  raleway.variable,
  oswald.variable,
  merriweather.variable,
  playfair.variable,
  dancingScript.variable,
  greatVibes.variable,
  pacifico.variable,
  caveat.variable,
  satisfy.variable,
  lobster.variable,
  kaushanScript.variable,
  tangerine.variable,
].join(' ');
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

const siteUrl = 'https://www.invoicedesign.fr';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "InvoiceDesign - Créez des factures professionnelles gratuitement",
    template: "%s | InvoiceDesign",
  },
  description:
    "Créez, personnalisez et exportez des factures professionnelles en quelques clics. Logiciel de facturation gratuit en ligne avec interface intuitive, calculs automatiques et export PDF/PNG.",
  keywords: [
    "facture", "facturation", "logiciel facturation", "facturation gratuite",
    "facture PDF", "créer facture", "facture en ligne", "devis facture",
    "logiciel devis", "facture auto-entrepreneur", "facture freelance",
    "modèle facture", "template facture", "facture professionnelle",
    "invoice", "invoice generator", "free invoice", "PDF invoice"
  ],
  authors: [{ name: "InvoiceDesign" }],
  creator: "InvoiceDesign",
  publisher: "InvoiceDesign",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/iconfav.png",
    apple: "/iconfav.png",
    shortcut: "/iconfav.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "InvoiceDesign",
    title: "InvoiceDesign - Créez des factures professionnelles gratuitement",
    description: "Logiciel de facturation gratuit en ligne. Créez et exportez des factures professionnelles en PDF en quelques clics.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InvoiceDesign - Logiciel de facturation gratuit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceDesign - Créez des factures professionnelles gratuitement",
    description: "Logiciel de facturation gratuit en ligne. Créez et exportez des factures professionnelles en PDF.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'fr-FR': siteUrl,
      'en-US': `${siteUrl}/en`,
    },
  },
  verification: {
    // Ajoute tes codes de vérification quand tu les auras
    // google: 'ton-code-google-search-console',
    // yandex: 'ton-code-yandex',
    // bing: 'ton-code-bing',
  },
  category: "business",
};

// JSON-LD Structured Data pour les moteurs de recherche
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'InvoiceDesign',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '0',
    highPrice: '6.99',
    priceCurrency: 'EUR',
    offerCount: '3',
  },
  description: 'Logiciel de facturation gratuit en ligne. Créez et exportez des factures professionnelles en PDF.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '120',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'InvoiceDesign',
  url: 'https://www.invoicedesign.fr',
  logo: 'https://www.invoicedesign.fr/iconfav.png',
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${fontVariables} font-sans antialiased bg-white`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

