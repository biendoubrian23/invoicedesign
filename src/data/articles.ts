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
];

export const articles: Article[] = [
  // =====================================================
  // ARTICLE 1 : Mentions obligatoires France
  // =====================================================
  {
    slug: 'mentions-obligatoires-facture-france',
    title: 'Mentions obligatoires sur une facture en France 2026',
    titleEn: 'Mandatory Invoice Requirements in France 2026',
    description: 'Liste complète des mentions obligatoires sur une facture en France. Auto-entrepreneur, SARL, SAS : tout ce qu\'il faut savoir.',
    descriptionEn: 'Complete list of mandatory invoice requirements in France. Self-employed, LLC, corporations: everything you need to know.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    category: 'legal',
    readTime: 5,
    author: 'InvoiceDesign',
    publishedAt: '2025-12-22',
    tags: [
      'mentions obligatoires', 'facture France', 'SIRET', 'TVA', 'numéro facture',
      'auto-entrepreneur', 'micro-entreprise', 'SARL', 'SAS', 'freelance',
      'mentions légales facture', 'modèle facture', 'conformité fiscale'
    ],
    tagsEn: [
      'mandatory requirements', 'France invoice', 'tax ID', 'VAT', 'invoice number',
      'self-employed', 'small business', 'LLC', 'corporation', 'freelance',
      'legal invoice requirements', 'invoice template', 'tax compliance'
    ],
    content: `
## Qui doit établir des factures ?

| Statut | Obligatoire | Particularité |
|--------|-------------|---------------|
| Auto-entrepreneur | ✅ Oui | Mention "TVA non applicable" |
| Entreprise individuelle (EI) | ✅ Oui | Mention "EI" obligatoire |
| SARL / SAS / SA | ✅ Oui | Capital social requis |
| Profession libérale | ✅ Oui | N° ordre professionnel |
| Artisan | ✅ Oui | N° Répertoire des Métiers |

---

## Les mentions du vendeur

| Mention | Exemple |
|---------|---------|
| Nom ou raison sociale | DUPONT SARL |
| Forme juridique | SARL, SAS, EI... |
| Adresse du siège | 12 rue de Paris, 75001 Paris |
| SIRET | 123 456 789 00012 (14 chiffres) |
| N° TVA intracommunautaire | FR12345678901 |
| Contact | email, téléphone |

<div class="warning-box">
<h4>⚠️ Depuis 2022</h4>
<p>Les <strong>entrepreneurs individuels</strong> doivent ajouter la mention <strong>"EI"</strong> ou <strong>"Entrepreneur individuel"</strong> sur toutes leurs factures.</p>
</div>

---

## Les mentions du client

| Information | B2B | B2C |
|-------------|-----|-----|
| Nom / Raison sociale | ✅ Obligatoire | ✅ Obligatoire |
| Adresse facturation | ✅ Obligatoire | ✅ Obligatoire |
| Adresse livraison | Si différente | Recommandé |
| N° TVA intracommunautaire | ✅ Si UE | ❌ Non requis |

---

## Les éléments de la facture

| Élément | Description |
|---------|-------------|
| **Numéro de facture** | Unique, chronologique (ex: FA-2026-0001) |
| **Date d'émission** | Jour de création |
| **Date de prestation** | Quand le service a été rendu |
| **Date d'échéance** | Limite de paiement (ex: 30 jours) |

---

## Le détail des lignes

Pour **chaque produit ou service** :

| Élément | Exemple |
|---------|---------|
| Désignation | Création site web |
| Quantité | 1 |
| Prix unitaire HT | 1 500,00 € |
| Taux TVA | 20% |
| Montant HT | 1 500,00 € |

---

## Les totaux obligatoires

| Ligne | Calcul |
|-------|--------|
| Total HT | Somme des montants HT |
| TVA (par taux) | Montant TVA 20%, 10%, 5,5%... |
| Total TTC | Total HT + Total TVA |
| Acomptes | Montants déjà versés |
| **Net à payer** | Total TTC - Acomptes |

---

## Conditions de paiement

| Mention | Détail |
|---------|--------|
| Date d'échéance | Précise (ex: 15/01/2026) |
| Pénalités de retard | Minimum : 3× taux intérêt légal |
| Indemnité forfaitaire | **40€** (recouvrement) |

---

## Mentions spéciales

<div class="info-box blue">
<h4>Auto-entrepreneur sans TVA</h4>
<p><strong>"TVA non applicable, article 293 B du CGI"</strong></p>
</div>

<div class="info-box blue">
<h4>Sous-traitance BTP</h4>
<p><strong>"Autoliquidation de la TVA - Article 283-2 nonies du CGI"</strong></p>
</div>

---

## Sanctions en cas d'erreur

| Infraction | Amende |
|------------|--------|
| Mention manquante | **15€** par mention |
| Défaut de facturation | Jusqu'à **75 000€** |
| Facture fictive | **50%** du montant |

---

<div class="cta-box">
<h3>Créez des factures conformes</h3>
<p>InvoiceDesign intègre automatiquement toutes les mentions obligatoires.</p>
</div>
    `,
    contentEn: `
## Who Must Issue Invoices?

| Status | Required | Specifics |
|--------|----------|-----------|
| Self-employed | ✅ Yes | "VAT not applicable" mention |
| Sole proprietor | ✅ Yes | "EI" mention required |
| LLC / Corporation | ✅ Yes | Share capital required |
| Liberal profession | ✅ Yes | Professional order number |
| Craftsman | ✅ Yes | Trade register number |

---

## Seller Information

| Field | Example |
|-------|---------|
| Name or company name | SMITH LLC |
| Legal form | LLC, Corp, Sole Prop... |
| Headquarters address | 123 Main St, New York |
| Tax ID (SIRET) | 14 digits in France |
| VAT number | FR12345678901 |
| Contact | email, phone |

<div class="warning-box">
<h4>⚠️ Since 2022</h4>
<p><strong>Sole proprietors</strong> in France must add <strong>"EI"</strong> or <strong>"Entrepreneur individuel"</strong> on all invoices.</p>
</div>

---

## Customer Information

| Information | B2B | B2C |
|-------------|-----|-----|
| Name / Company | ✅ Required | ✅ Required |
| Billing address | ✅ Required | ✅ Required |
| Shipping address | If different | Recommended |
| VAT number | ✅ If EU | ❌ Not required |

---

## Invoice Elements

| Element | Description |
|---------|-------------|
| **Invoice number** | Unique, sequential (e.g., INV-2026-0001) |
| **Issue date** | Creation date |
| **Service date** | When service was provided |
| **Due date** | Payment deadline (e.g., Net 30) |

---

## Line Item Details

For **each product or service**:

| Element | Example |
|---------|---------|
| Description | Website creation |
| Quantity | 1 |
| Unit price (excl. tax) | $1,500.00 |
| Tax rate | 20% |
| Line total (excl. tax) | $1,500.00 |

---

## Required Totals

| Line | Calculation |
|------|-------------|
| Subtotal | Sum of line totals |
| Tax (by rate) | VAT 20%, 10%, 5.5%... |
| Grand total | Subtotal + Tax |
| Deposits | Amounts already paid |
| **Amount due** | Grand total - Deposits |

---

## Payment Terms

| Field | Details |
|-------|---------|
| Due date | Specific date (e.g., Jan 15, 2026) |
| Late payment penalties | Minimum: 3× legal interest rate |
| Recovery fee | **€40** flat fee |

---

## Special Mentions

<div class="info-box blue">
<h4>Self-employed without VAT</h4>
<p><strong>"VAT not applicable, article 293 B of the CGI"</strong></p>
</div>

<div class="info-box blue">
<h4>Construction subcontracting</h4>
<p><strong>"VAT reverse charge - Article 283-2 nonies of the CGI"</strong></p>
</div>

---

## Penalties for Errors

| Violation | Fine |
|-----------|------|
| Missing information | **€15** per item |
| Failure to invoice | Up to **€75,000** |
| Fake invoice | **50%** of amount |

---

<div class="cta-box">
<h3>Create Compliant Invoices</h3>
<p>InvoiceDesign automatically includes all required information.</p>
</div>
    `,
  },

  // =====================================================
  // ARTICLE 2 : Facturation électronique internationale
  // =====================================================
  {
    slug: 'facturation-electronique-2026-guide-international',
    title: 'Facturation électronique 2026 : Guide international',
    titleEn: 'E-Invoicing 2026: International Guide',
    description: 'Calendrier de la facturation électronique obligatoire en France, Europe et USA. Ce qui change en 2026.',
    descriptionEn: 'E-invoicing timeline for France, Europe, and USA. What changes in 2026.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: 'international',
    readTime: 4,
    author: 'InvoiceDesign',
    publishedAt: '2025-12-22',
    tags: [
      'facturation électronique', 'e-invoicing', 'facture 2026', 'Factur-X',
      'PPF', 'PDP', 'Europe', 'USA', 'TVA', 'ViDA', 'dématérialisation'
    ],
    tagsEn: [
      'electronic invoicing', 'e-invoicing', 'invoice 2026', 'Factur-X',
      'PPF', 'PDP', 'Europe', 'USA', 'VAT', 'ViDA', 'digital transformation'
    ],
    content: `
## Calendrier France 2026-2027

| Date | Obligation |
|------|------------|
| **1er septembre 2026** | Toutes les entreprises doivent **recevoir** des factures électroniques |
| **1er septembre 2026** | Grandes entreprises doivent **émettre** en e-invoicing |
| **1er septembre 2027** | Toutes les entreprises doivent **émettre** en e-invoicing |

---

## Comment ça fonctionne ?

| Élément | Description |
|---------|-------------|
| **PPF** | Portail Public de Facturation (gratuit) |
| **PDP** | Plateforme de Dématérialisation Partenaire (privée) |
| **Formats** | Factur-X, UBL, CII |

<div class="info-box blue">
<h4>Transmission obligatoire</h4>
<p>Les factures B2B devront transiter par le PPF ou une PDP agréée. Plus d'envoi direct par email !</p>
</div>

---

## Identifiants TVA par pays

| Pays | Identifiant | Format |
|------|-------------|--------|
| 🇫🇷 France | N° TVA | FR + 11 chiffres |
| 🇩🇪 Allemagne | USt-IdNr | DE + 9 chiffres |
| 🇪🇸 Espagne | NIF | ES + 9 caractères |
| 🇮🇹 Italie | Partita IVA | IT + 11 chiffres |
| 🇧🇪 Belgique | N° TVA | BE + 10 chiffres |
| 🇬🇧 Royaume-Uni | VAT | GB + 9 chiffres |

---

## États-Unis : Sales Tax par État

| État | Taux | Notes |
|------|------|-------|
| 🌴 Californie | 7.25% + local | Jusqu'à 10.75% |
| ⭐ Texas | 6.25% + local | Pas d'impôt sur le revenu |
| 🗽 New York | 4% + local | Jusqu'à 8.875% |
| ☀️ Floride | 6% + local | Pas d'impôt sur le revenu |
| 💎 Delaware | 0% | Pas de sales tax |
| 🌲 Oregon | 0% | Pas de sales tax |

---

## Europe : Directive ViDA

| Échéance | Mesure |
|----------|--------|
| **2028** | E-invoicing pour transactions transfrontalières B2B |
| **2030** | Reporting en temps réel obligatoire |

<div class="info-box green">
<h4>Ventes intracommunautaires</h4>
<p>Mention obligatoire : <strong>"Exonération de TVA - Article 262 ter I du CGI"</strong></p>
<p>+ N° TVA du vendeur et de l'acheteur</p>
</div>

---

## Préparez-vous dès maintenant

| Action | Priorité |
|--------|----------|
| Vérifier votre logiciel de facturation | 🔴 Haute |
| Choisir PPF ou PDP | 🟡 Moyenne |
| Former vos équipes | 🟢 À planifier |

---

<div class="cta-box">
<h3>InvoiceDesign est prêt pour 2026</h3>
<p>Créez des factures conformes aux nouvelles normes dès aujourd'hui.</p>
</div>
    `,
    contentEn: `
## France Timeline 2026-2027

| Date | Requirement |
|------|-------------|
| **September 1, 2026** | All businesses must **receive** electronic invoices |
| **September 1, 2026** | Large companies must **issue** e-invoices |
| **September 1, 2027** | All businesses must **issue** e-invoices |

---

## How Does It Work?

| Element | Description |
|---------|-------------|
| **PPF** | Public Invoicing Portal (free) |
| **PDP** | Partner Dematerialization Platform (private) |
| **Formats** | Factur-X, UBL, CII |

<div class="info-box blue">
<h4>Mandatory Transmission</h4>
<p>B2B invoices must go through PPF or an approved PDP. No more direct email sending!</p>
</div>

---

## VAT IDs by Country

| Country | ID Type | Format |
|---------|---------|--------|
| 🇫🇷 France | VAT | FR + 11 digits |
| 🇩🇪 Germany | USt-IdNr | DE + 9 digits |
| 🇪🇸 Spain | NIF | ES + 9 characters |
| 🇮🇹 Italy | Partita IVA | IT + 11 digits |
| 🇧🇪 Belgium | VAT | BE + 10 digits |
| 🇬🇧 UK | VAT | GB + 9 digits |

---

## USA: Sales Tax by State

| State | Rate | Notes |
|-------|------|-------|
| 🌴 California | 7.25% + local | Up to 10.75% |
| ⭐ Texas | 6.25% + local | No income tax |
| 🗽 New York | 4% + local | Up to 8.875% |
| ☀️ Florida | 6% + local | No income tax |
| 💎 Delaware | 0% | No sales tax |
| 🌲 Oregon | 0% | No sales tax |

---

## Europe: ViDA Directive

| Deadline | Measure |
|----------|---------|
| **2028** | E-invoicing for cross-border B2B transactions |
| **2030** | Real-time reporting mandatory |

<div class="info-box green">
<h4>Intra-Community Sales</h4>
<p>Required mention: <strong>"VAT exemption - Article 262 ter I of the CGI"</strong></p>
<p>+ VAT numbers of both seller and buyer</p>
</div>

---

## Prepare Now

| Action | Priority |
|--------|----------|
| Check your invoicing software | 🔴 High |
| Choose PPF or PDP | 🟡 Medium |
| Train your teams | 🟢 Plan ahead |

---

<div class="cta-box">
<h3>InvoiceDesign is Ready for 2026</h3>
<p>Create invoices compliant with new standards today.</p>
</div>
    `,
  },
];

// Calculer le nombre d'articles par catégorie
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
