import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getAllArticles, getRelatedArticles, getCategoriesWithCount, Article } from "@/data/articles";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, ArrowLeft, ArrowRight, User, Tag, FileText, Globe, Share2 } from "lucide-react";
import ArticleClient from "./ArticleClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: `${article.title} | InvoiceDesign`,
    description: article.description,
    keywords: [...article.tags, ...article.tagsEn],
    authors: [{ name: article.author }],
    alternates: {
      languages: {
        'fr': `/articles/${article.slug}`,
        'en': `/articles/${article.slug}`,
      }
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      url: `https://www.invoicedesign.fr/articles/${article.slug}`,
      siteName: 'InvoiceDesign',
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }

  return <ArticleClient article={article} />;
}
