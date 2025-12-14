import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FactureDesign - Creez des factures professionnelles",
  description:
    "Creez, personnalisez et exportez des factures professionnelles en quelques clics. Interface intuitive, calculs automatiques et export PDF.",
  keywords: ["facture", "facturation", "PDF", "professionnel", "design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
