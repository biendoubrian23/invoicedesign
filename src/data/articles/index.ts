// Types et catégories
export type { Article } from './types';
export { categories } from './types';

// Articles individuels
import { articleMentionsObligatoires } from './article-1-mentions-obligatoires';
import { articleFacturationElectronique } from './article-2-facturation-electronique';
import { articleAutoEntrepreneur } from './article-3-auto-entrepreneur';
import { articleBtpArtisan } from './article-4-btp-artisan';
import { articleConsultantFreelance } from './article-5-consultant-freelance';
import { articleTvaGuide } from './article-6-tva-guide';
import { articleCreerFactureEnLigne } from './article-7-creer-facture-en-ligne';
import { articleModeleGratuit } from './article-8-modele-gratuit';
import { articleDevisFacture } from './article-9-devis-facture';
import { articleFactureProforma } from './article-10-facture-proforma';
import { articleAvoirFacture } from './article-11-avoir-facture';
import { articleDelaiPaiement } from './article-12-delai-paiement';
import { articleFactureAcompte } from './article-13-facture-acompte';
import { articleFactureRestaurant } from './article-14-facture-restaurant';
import { articleNumerotationFacture } from './article-15-numerotation-facture';

import type { Article } from './types';
import { categories } from './types';

// Export des articles individuels pour import direct
export {
  articleMentionsObligatoires,
  articleFacturationElectronique,
  articleAutoEntrepreneur,
  articleBtpArtisan,
  articleConsultantFreelance,
  articleTvaGuide,
  articleCreerFactureEnLigne,
  articleModeleGratuit,
  articleDevisFacture,
  articleFactureProforma,
  articleAvoirFacture,
  articleDelaiPaiement,
  articleFactureAcompte,
  articleFactureRestaurant,
  articleNumerotationFacture,
};

// Tableau de tous les articles
export const articles: Article[] = [
  articleMentionsObligatoires,
  articleFacturationElectronique,
  articleAutoEntrepreneur,
  articleBtpArtisan,
  articleConsultantFreelance,
  articleTvaGuide,
  articleCreerFactureEnLigne,
  articleModeleGratuit,
  articleDevisFacture,
  articleFactureProforma,
  articleAvoirFacture,
  articleDelaiPaiement,
  articleFactureAcompte,
  articleFactureRestaurant,
  articleNumerotationFacture,
];

// =====================================================
// FONCTIONS UTILITAIRES
// =====================================================

/**
 * Calcule le nombre d'articles par catégorie
 */
export function getCategoriesWithCount(lang: 'fr' | 'en' = 'fr') {
  const counts: Record<string, number> = { all: articles.length };
  
  articles.forEach(article => {
    counts[article.category] = (counts[article.category] || 0) + 1;
  });
  
  return categories.map(cat => ({
    ...cat,
    name: lang === 'en' ? cat.nameEn : cat.name,
    count: counts[cat.id] || 0,
  }));
}

/**
 * Récupère un article par son slug
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

/**
 * Récupère tous les articles triés par date de publication
 */
export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Récupère les articles d'une catégorie
 */
export function getArticlesByCategory(categoryId: string): Article[] {
  if (categoryId === 'all') return getAllArticles();
  return articles
    .filter(article => article.category === categoryId)
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/**
 * Récupère les articles liés (même catégorie ou tags communs)
 */
export function getRelatedArticles(currentSlug: string, limit: number = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];
  
  return articles
    .filter(article => 
      article.slug !== currentSlug && 
      (article.category === current.category || 
       article.tags.some(tag => current.tags.includes(tag)))
    )
    .slice(0, limit);
}
