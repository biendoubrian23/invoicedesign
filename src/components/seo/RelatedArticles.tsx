'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getRelatedArticles, Article } from '@/data/articles';

interface RelatedArticlesProps {
  currentSlug: string;
  limit?: number;
}

export function RelatedArticles({ currentSlug, limit = 3 }: RelatedArticlesProps) {
  const { language } = useLanguage();
  const relatedArticles = getRelatedArticles(currentSlug, limit);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {language === 'fr' ? 'Articles liés' : 'Related Articles'}
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedArticles.map((article: Article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-white dark:bg-gray-800"
          >
            <div className="aspect-video mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src={article.image}
                alt={language === 'fr' ? article.title : article.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
              {language === 'fr' ? article.title : article.titleEn}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {article.readTime} min · {article.category}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
