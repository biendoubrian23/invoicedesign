import { Metadata } from 'next';

interface OpenGraphConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  siteName?: string;
  locale?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

/**
 * Génère les metadata Open Graph et Twitter Cards pour Next.js
 */
export function generateOpenGraphMetadata({
  title,
  description,
  url = 'https://invoicedesign.fr',
  image = 'https://invoicedesign.fr/og-image.png',
  type = 'website',
  siteName = 'InvoiceDesign',
  locale = 'fr_FR',
  article,
}: OpenGraphConfig): Partial<Metadata> {
  return {
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: article.author ? [article.author] : undefined,
        section: article.section,
        tags: article.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@invoicedesign',
      site: '@invoicedesign',
    },
  };
}

/**
 * Génère les metadata pour un article de blog
 */
export function generateArticleMetadata(article: {
  title: string;
  description: string;
  slug: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
}): Partial<Metadata> {
  return generateOpenGraphMetadata({
    title: article.title,
    description: article.description,
    url: `https://invoicedesign.fr/articles/${article.slug}`,
    image: article.image,
    type: 'article',
    article: {
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      author: article.author,
      section: article.category,
      tags: article.tags,
    },
  });
}
