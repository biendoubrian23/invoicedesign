export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  category: string;
  readTime: number; // en minutes
  tags: string[];
}

export const categories = [
  { id: 'all', name: 'Tous les articles', count: 0 },
  { id: 'guide', name: 'Guides pratiques', count: 0 },
  { id: 'legal', name: 'Cadre légal', count: 0 },
  { id: 'conseils', name: 'Conseils', count: 0 },
  { id: 'auto-entrepreneur', name: 'Auto-entrepreneur', count: 0 },
];

export const articles: Article[] = [
  {
    slug: 'comment-creer-facture-auto-entrepreneur-2025',
    title: 'Comment créer une facture auto-entrepreneur en 2025 : Guide complet',
    description: 'Découvrez toutes les étapes pour créer une facture conforme en tant qu\'auto-entrepreneur. Mentions obligatoires, modèles et outils gratuits.',
    image: '/articles/facture-auto-entrepreneur.jpg',
    category: 'auto-entrepreneur',
    readTime: 8,
    author: 'InvoiceDesign',
    publishedAt: '2025-12-22',
    tags: ['auto-entrepreneur', 'facture', 'guide', 'mentions légales'],
    content: `
## Introduction

En tant qu'auto-entrepreneur (ou micro-entrepreneur), établir des factures conformes est une obligation légale. Que vous soyez consultant, artisan, ou prestataire de services, ce guide vous explique tout ce qu'il faut savoir pour créer des factures professionnelles en 2025.

## Les mentions obligatoires sur une facture auto-entrepreneur

Votre facture doit obligatoirement contenir les informations suivantes :

### Vos informations
- **Nom et prénom** ou nom commercial
- **Adresse complète** de votre activité
- **Numéro SIRET** (14 chiffres)
- **Code APE/NAF** de votre activité
- **Mention "EI"** ou "Entrepreneur individuel" (obligatoire depuis 2022)

### Informations du client
- **Nom ou raison sociale** du client
- **Adresse de facturation**
- Pour les professionnels : numéro SIRET ou TVA intracommunautaire

### Informations de la facture
- **Numéro de facture** unique et chronologique
- **Date d'émission** de la facture
- **Date de la prestation** ou de la vente
- **Description détaillée** des produits ou services
- **Quantité et prix unitaire HT**
- **Montant total**

### Mention TVA obligatoire

Si vous bénéficiez de la franchise en base de TVA (chiffre d'affaires inférieur aux seuils), vous devez ajouter la mention :

> "TVA non applicable, article 293 B du Code général des impôts"

## La numérotation des factures

La numérotation doit être :
- **Chronologique** : suivre un ordre logique
- **Continue** : sans trou dans la séquence
- **Unique** : chaque numéro ne peut être utilisé qu'une fois

### Exemples de numérotation acceptés
- 2025-001, 2025-002, 2025-003...
- F2025-0001, F2025-0002...
- 20251222-001 (date + numéro)

## Les délais de paiement

Vous devez indiquer sur la facture :
- La **date d'échéance** du paiement
- Les **conditions de paiement** (virement, chèque, etc.)
- Les **pénalités de retard** applicables

Le délai de paiement standard est de **30 jours** après réception de la facture, mais il peut être négocié jusqu'à 60 jours.

## Créer sa facture avec InvoiceDesign

Avec InvoiceDesign, créer une facture conforme devient simple :

1. **Renseignez vos informations** une seule fois
2. **Ajoutez votre client** (sauvegardé pour les prochaines fois)
3. **Décrivez vos prestations** avec les montants
4. **Exportez en PDF** professionnel

Toutes les mentions obligatoires sont automatiquement incluses, et la numérotation est gérée pour vous.

## Conclusion

Créer une facture auto-entrepreneur n'a rien de compliqué une fois que vous connaissez les règles. L'essentiel est de respecter les mentions obligatoires et de conserver une numérotation cohérente.

Avec un outil comme InvoiceDesign, vous gagnez du temps et vous êtes sûr d'être en conformité avec la réglementation 2025.

---

**Besoin de créer votre première facture ?** [Essayez InvoiceDesign gratuitement](/dashboard)
    `,
  },
  {
    slug: 'mentions-obligatoires-facture-2025',
    title: 'Mentions obligatoires sur une facture en 2025 : Liste complète',
    description: 'Toutes les mentions légales obligatoires à inclure sur vos factures en 2025. Guide complet et à jour avec les dernières réglementations.',
    image: '/articles/mentions-obligatoires.jpg',
    category: 'legal',
    readTime: 6,
    author: 'InvoiceDesign',
    publishedAt: '2025-12-20',
    tags: ['mentions légales', 'facture', 'réglementation', 'TVA'],
    content: `
## Pourquoi les mentions obligatoires sont importantes

Une facture n'est pas qu'un simple document commercial : c'est une pièce comptable et fiscale qui doit respecter des règles strictes. Une facture non conforme peut entraîner :

- Le **rejet de la déduction de TVA** pour votre client
- Des **amendes** pouvant aller jusqu'à 75 000€
- Des complications lors d'un **contrôle fiscal**

## Liste complète des mentions obligatoires

### 1. Identité du vendeur

| Mention | Détail |
|---------|--------|
| Dénomination sociale | Nom de l'entreprise ou nom/prénom pour les EI |
| Forme juridique | SARL, SAS, EI, etc. |
| Adresse du siège | Adresse complète |
| Numéro SIREN/SIRET | 9 ou 14 chiffres |
| Capital social | Pour les sociétés |
| Numéro RCS | Ville d'immatriculation |
| N° TVA intracommunautaire | Si assujetti à la TVA |

### 2. Identité de l'acheteur

- Dénomination sociale ou nom
- Adresse de facturation
- Adresse de livraison (si différente)
- N° TVA intracommunautaire (pour les échanges B2B en UE)

### 3. Informations sur la facture

- **Numéro unique** de facture
- **Date d'émission**
- **Date de la vente** ou de la prestation

### 4. Détail des produits/services

Pour chaque ligne :
- Désignation précise
- Quantité
- Prix unitaire HT
- Taux de TVA applicable
- Remises éventuelles

### 5. Montants

- Total HT
- Montant de la TVA (par taux)
- Total TTC
- Acomptes déjà versés (le cas échéant)
- Solde à payer

### 6. Conditions de paiement

- Date d'échéance
- Conditions d'escompte
- Taux des pénalités de retard
- Montant de l'indemnité forfaitaire (40€ minimum)

## Mentions spécifiques selon les cas

### Auto-entrepreneur sans TVA
> "TVA non applicable, article 293 B du CGI"

### Artisan
> Numéro au Répertoire des Métiers

### Profession réglementée
> Assurance professionnelle + coordonnées de l'assureur

### Facture d'acompte
> "Facture d'acompte" + référence au devis

## Sanctions en cas de non-conformité

| Infraction | Sanction |
|------------|----------|
| Mention manquante | 15€ par mention et par facture |
| Facture fictive | 50% du montant facturé |
| Défaut de facturation | 75 000€ d'amende |

## Simplifiez-vous la vie

Avec InvoiceDesign, toutes ces mentions sont automatiquement incluses. Vous n'avez qu'à renseigner vos informations une fois, et chaque facture générée sera conforme.

---

**Créez des factures conformes en quelques clics** → [Essayer InvoiceDesign](/dashboard)
    `,
  },
  {
    slug: 'numerotation-factures-regles',
    title: 'Numérotation des factures : les règles à respecter absolument',
    description: 'Comment numéroter correctement vos factures ? Découvrez les règles légales et les bonnes pratiques pour une numérotation conforme.',
    image: '/articles/numerotation-factures.jpg',
    category: 'guide',
    readTime: 5,
    author: 'InvoiceDesign',
    publishedAt: '2025-12-18',
    tags: ['numérotation', 'facture', 'comptabilité', 'règles'],
    content: `
## Pourquoi la numérotation est cruciale

La numérotation des factures n'est pas qu'une formalité : c'est une obligation légale qui permet de :

- **Assurer la traçabilité** de vos transactions
- **Faciliter les contrôles fiscaux**
- **Prouver l'authenticité** de vos documents

## Les 3 règles fondamentales

### 1. Chronologique

Les numéros doivent suivre un ordre logique dans le temps. Une facture du 15 décembre ne peut pas avoir un numéro inférieur à une facture du 10 décembre.

### 2. Continue

Pas de "trous" dans la numérotation. Si vous avez les factures 001, 002, 004... l'administration fiscale vous demandera où est passée la 003.

### 3. Unique

Chaque numéro ne peut être attribué qu'une seule fois. Deux factures ne peuvent jamais avoir le même numéro.

## Formats de numérotation acceptés

### Format simple
- 001, 002, 003...
- Idéal pour les petites structures

### Format avec préfixe année
- 2025-001, 2025-002...
- **Recommandé** : permet de repartir à 001 chaque année

### Format avec préfixe personnalisé
- FA-2025-001, FA-2025-002...
- Utile si vous avez plusieurs types de documents

### Format avec date complète
- 20251222-001 (AAAAMMJJ-numéro)
- Très précis, idéal pour les gros volumes

## Que faire en cas d'erreur ?

### Facture annulée
Ne supprimez jamais une facture ! Émettez plutôt un **avoir** (facture négative) qui annule la facture d'origine.

### Erreur sur une facture
Créez une facture rectificative qui fait référence à la facture d'origine et détaille les corrections.

## Bonnes pratiques

✅ **Utilisez un logiciel** qui gère automatiquement la numérotation

✅ **Documentez votre système** de numérotation

✅ **Ne mélangez pas** devis et factures dans la même séquence

✅ **Conservez vos factures** pendant 10 ans minimum

## La solution InvoiceDesign

Avec InvoiceDesign, la numérotation est automatique :
- Format personnalisable
- Incrémentation automatique
- Impossible de créer des doublons
- Historique complet accessible

---

**Fini les erreurs de numérotation** → [Créer une facture](/dashboard)
    `,
  },
];

// Calculer le nombre d'articles par catégorie
export function getCategoriesWithCount() {
  const counts: Record<string, number> = { all: articles.length };
  
  articles.forEach(article => {
    counts[article.category] = (counts[article.category] || 0) + 1;
  });
  
  return categories.map(cat => ({
    ...cat,
    count: counts[cat.id] || 0,
  }));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticlesByCategory(categoryId: string): Article[] {
  if (categoryId === 'all') return getAllArticles();
  return articles
    .filter(article => article.category === categoryId)
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

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
