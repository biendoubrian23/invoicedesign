import { getAllArticles } from '@/data/articles';

const SITE_URL = 'https://invoicedesign.fr';

export async function GET() {
  const articles = getAllArticles();

  const rssItems = articles
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_URL}/articles/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/articles/${article.slug}</guid>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <author>contact@invoicedesign.fr (${article.author})</author>
      <category>${article.category}</category>
      ${article.image ? `<enclosure url="${article.image}" type="image/jpeg" />` : ''}
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>InvoiceDesign Blog - Facturation et Gestion</title>
    <link>${SITE_URL}</link>
    <description>Guides, tutoriels et conseils pour la facturation professionnelle. Mentions obligatoires, TVA, auto-entrepreneur, et plus.</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>InvoiceDesign</title>
      <link>${SITE_URL}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
