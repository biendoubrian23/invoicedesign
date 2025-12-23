export interface Article {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  content: string;
  contentEn: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  category: string;
  readTime: number;
  tags: string[];
  tagsEn: string[];
}

export const categories = [
  { id: 'all', name: 'Tous les articles', nameEn: 'All articles', count: 0 },
  { id: 'legal', name: 'Cadre légal', nameEn: 'Legal framework', count: 0 },
  { id: 'guide', name: 'Guides pratiques', nameEn: 'Practical guides', count: 0 },
  { id: 'international', name: 'International', nameEn: 'International', count: 0 },
  { id: 'sector', name: 'Par secteur', nameEn: 'By sector', count: 0 },
  { id: 'tutorial', name: 'Tutoriels', nameEn: 'Tutorials', count: 0 },
];
