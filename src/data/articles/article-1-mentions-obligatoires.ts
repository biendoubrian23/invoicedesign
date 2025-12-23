import { Article } from './types';

export const articleMentionsObligatoires: Article = {
  slug: 'mentions-obligatoires-facture-france',
  title: 'Mentions obligatoires sur une facture en France 2026',
  titleEn: 'Mandatory Invoice Requirements in France 2026',
  description: "Liste complète des mentions obligatoires sur une facture en France. Auto-entrepreneur, SARL, SAS : tout ce qu'il faut savoir.",
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
};
