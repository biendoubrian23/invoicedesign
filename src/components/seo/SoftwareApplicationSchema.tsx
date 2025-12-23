interface SoftwareApplicationSchemaProps {
  name?: string;
  description?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency?: string;
    priceValidUntil?: string;
    availability?: string;
  }[];
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
  screenshot?: string;
}

export function SoftwareApplicationSchema({
  name = 'InvoiceDesign',
  description = 'Logiciel de facturation en ligne gratuit. Créez des factures professionnelles, devis et avoirs en quelques clics.',
  applicationCategory = 'BusinessApplication',
  operatingSystem = 'Web, Windows, macOS, Linux, iOS, Android',
  offers = [
    { price: '0', priceCurrency: 'EUR' },
    { price: '4.99', priceCurrency: 'EUR' },
    { price: '9.99', priceCurrency: 'EUR' },
  ],
  aggregateRating,
  screenshot = 'https://invoicedesign.fr/screenshot.png',
}: SoftwareApplicationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem,
    offers: offers.map((offer) => ({
      '@type': 'Offer',
      price: offer.price,
      priceCurrency: offer.priceCurrency || 'EUR',
      ...(offer.priceValidUntil && { priceValidUntil: offer.priceValidUntil }),
      availability: offer.availability || 'https://schema.org/InStock',
    })),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    screenshot,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
