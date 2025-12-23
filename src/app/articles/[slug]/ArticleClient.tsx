"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, ArrowLeft, ArrowRight, User, Tag, FileText, Globe, Share2 } from "lucide-react";
import { Article, getCategoriesWithCount, getRelatedArticles } from "@/data/articles";

interface Props {
  article: Article;
}

export default function ArticleClient({ article }: Props) {
  const { language } = useLanguage();
  const isEn = language === 'en';
  
  const relatedArticles = getRelatedArticles(article.slug, 3);
  const categories = getCategoriesWithCount(isEn ? 'en' : 'fr');

  // Getters bilingues
  const getTitle = (a: Article) => isEn ? a.titleEn : a.title;
  const getDescription = (a: Article) => isEn ? a.descriptionEn : a.description;
  const getContent = (a: Article) => isEn ? a.contentEn : a.content;
  const getTags = (a: Article) => isEn ? a.tagsEn : a.tags;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isEn ? 'en-US' : 'fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const categoryName = categories.find(c => c.id === article.category)?.name || article.category;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero with background */}
        <section className="relative min-h-[400px] flex items-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-purple-900/85" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 py-16 w-full">
            <Link 
              href="/articles"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {isEn ? 'Back to articles' : 'Retour aux articles'}
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full border border-white/30">
                {categoryName}
              </span>
              <span className="inline-block bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                2026
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
              {getTitle(article)}
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl">
              {getDescription(article)}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-blue-200">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime} min {isEn ? 'read' : 'de lecture'}
              </span>
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                FR • EU • USA
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="bg-white">
            <div className="max-w-4xl mx-auto">
              <article 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: formatContent(getContent(article)) }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-gray-400" />
                  {getTags(article).slice(0, 10).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">
                    {isEn ? 'Share this article' : 'Partagez cet article'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getTitle(article))}&url=${encodeURIComponent(`https://www.invoicedesign.fr/articles/${article.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    aria-label="Share on X"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.invoicedesign.fr/articles/${article.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 bg-gray-900 border-2 border-gray-900 p-8 text-center">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {isEn ? 'Ready to create your invoices?' : 'Prêt à créer vos factures ?'}
                </h3>
                <p className="text-gray-300 mb-6">
                  {isEn 
                    ? 'Try InvoiceDesign for free and create professional invoices in minutes.'
                    : 'Essayez InvoiceDesign gratuitement et créez des factures professionnelles en quelques clics.'
                  }
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 hover:bg-gray-100 transition-colors"
                >
                  {isEn ? 'Create an invoice' : 'Créer une facture'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {isEn ? 'Related articles' : 'Articles similaires'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <article
                  key={relatedArticle.slug}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative h-40 overflow-hidden">
                    {relatedArticle.image ? (
                      <img 
                        src={relatedArticle.image} 
                        alt={getTitle(relatedArticle)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <FileText className="w-12 h-12 text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {getTitle(relatedArticle)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {getDescription(relatedArticle)}
                    </p>
                    <Link
                      href={`/articles/${relatedArticle.slug}`}
                      className="text-blue-600 font-medium hover:underline flex items-center gap-1 text-sm"
                    >
                      {isEn ? 'Read article' : "Lire l'article"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

// Fonction améliorée pour convertir le markdown en HTML avec styles
function formatContent(content: string): string {
  let html = content;
  
  // Tables avec support complet - style formel et élégant avec toutes les bordures
  const tableRegex = /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g;
  html = html.replace(tableRegex, (match, headerRow, bodyRows) => {
    const headers = headerRow.split('|').filter(Boolean).map((h: string) => 
      `<th style="border: 1px solid #d1d5db; padding: 16px; background: #ffffff; font-weight: 600; text-align: left;">${h.trim().replace(/\*\*/g, '')}</th>`
    ).join('');
    
    const rows = bodyRows.trim().split('\n').map((row: string, index: number) => {
      const cells = row.split('|').filter(Boolean).map((c: string) => 
        `<td style="border: 1px solid #d1d5db; padding: 16px;">${c.trim()}</td>`
      ).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    
    return `<div class="overflow-x-auto my-12"><table style="width: 100%; border-collapse: collapse; border: 1px solid #d1d5db;"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
  });
  
  // Headers with styles
  html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  
  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');
  
  // Blockquotes
  html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
  
  // Custom div class replacements for styling
  const divReplacements: [string, string][] = [
    ['info-box blue', 'border border-gray-300 p-8 my-12'],
    ['info-box green', 'border border-gray-300 p-8 my-12'],
    ['warning-box', 'border-2 border-gray-900 p-8 my-12'],
    ['important-box', 'border-l-4 border-gray-900 pl-8 pr-4 py-6 my-12'],
    ['highlight-box', 'bg-gray-50 border border-gray-300 p-8 my-12'],
    ['quote-box', 'border-2 border-gray-900 p-10 my-16 text-center'],
    ['us-box', 'border border-gray-300 p-8 my-12'],
    ['eu-box', 'border border-gray-300 p-8 my-12'],
    ['cta-box', 'bg-gray-100 border border-gray-300 p-12 my-16 text-center'],
    ['article-intro', 'border-l-2 border-gray-900 pl-8 pr-4 py-6 mb-12 text-lg font-light'],
    ['article-footer', 'border-t border-gray-300 pt-8 mt-16 text-sm text-gray-600 font-light'],
    ['step', 'border-l-2 border-gray-900 pl-8 pr-4 py-6 my-6'],
    ['step-number', 'inline-block w-10 h-10 border-2 border-gray-900 text-gray-900 flex items-center justify-center font-bold text-lg mr-4'],
    ['step-content', 'flex-1'],
    ['steps-container', 'my-12 space-y-6'],
    ['timeline', 'border-l-2 border-gray-300 pl-10 my-16'],
    ['timeline-item', 'relative pb-12 last:pb-0'],
    ['timeline-date', 'inline-block border border-gray-900 text-gray-900 font-semibold text-xs px-4 py-2 mb-4 uppercase tracking-wider'],
    ['timeline-content', 'border border-gray-300 p-6'],
    ['checklist', 'border border-gray-300 p-8 my-12 list-none space-y-4'],
    ['final-checklist', 'border-2 border-gray-900 p-10 my-16'],
    ['penalties-table', 'border-2 border-gray-900 p-8 my-12'],
    ['calculation-box', 'border border-gray-300 p-8 my-12'],
    ['faq', 'my-12 space-y-4'],
    ['table-container', 'overflow-x-auto my-12 border border-gray-300'],
  ];
  
  divReplacements.forEach(([oldClass, newClass]) => {
    html = html.replace(new RegExp(`<div class="${oldClass}">`, 'g'), `<div class="${newClass}">`);
  });
  
  // Lead paragraph - style éditorial
  html = html.replace(/<p class="lead">/g, '<p class="text-xl text-gray-800 font-light leading-loose my-10 first-letter:text-7xl first-letter:font-serif first-letter:text-gray-900 first-letter:mr-2 first-letter:float-left first-letter:leading-none">');
  
  // Lists with emojis - style minimaliste
  html = html.replace(/^- ✅ (.*$)/gm, '<li class="pl-8 mb-4 relative before:content-["✓"] before:absolute before:left-0 before:text-gray-900 before:font-bold before:border before:border-gray-900 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:text-xs">$1</li>');
  html = html.replace(/^- ❌ (.*$)/gm, '<li class="pl-8 mb-4 relative before:content-["×"] before:absolute before:left-0 before:text-gray-900 before:font-bold before:border before:border-gray-900 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:text-xs">$1</li>');
  html = html.replace(/^- ⚠️ (.*$)/gm, '<li class="pl-8 mb-4 relative before:content-["!"] before:absolute before:left-0 before:text-gray-900 before:font-bold before:border-2 before:border-gray-900 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:text-xs">$1</li>');
  html = html.replace(/^- 💡 (.*$)/gm, '<li class="pl-8 mb-4 relative before:content-["→"] before:absolute before:left-0 before:text-gray-900 before:font-bold">$1</li>');
  html = html.replace(/^- 📌 (.*$)/gm, '<li class="pl-8 mb-4 relative before:content-["•"] before:absolute before:left-0 before:text-gray-900 before:font-bold before:text-xl">$1</li>');
  
  // Regular lists - style épuré
  html = html.replace(/^- (.*$)/gm, '<li class="pl-8 mb-4 relative before:content-["—"] before:absolute before:left-0 before:text-gray-400">$1</li>');
  
  // Wrap consecutive li elements in ul
  html = html.replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/g, (match) => {
    return `<ul class="my-8 list-none">${match}</ul>`;
  });
  html = html.replace(/<\/ul>\s*<ul[^>]*>/g, '');
  
  // Details/Summary (FAQ) styling - style formel
  html = html.replace(/<details>/g, '<details class="border border-gray-300 overflow-hidden group my-4">');
  html = html.replace(/<summary>/g, '<summary class="p-6 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-300 group-open:border-b">');
  
  // Ajoute une icône pour summary
  html = html.replace(/<\/summary>/g, '<span class="float-right text-gray-400 transform group-open:rotate-90 transition-transform">→</span></summary><div class="p-6">');
  html = html.replace(/<\/details>/g, '</div></details>');
  
  // Clean empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p><\/p>/g, '');
  
  return html.trim();
}
