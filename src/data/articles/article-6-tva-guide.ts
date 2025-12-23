import { Article } from './types';

export const articleTvaGuide: Article = {
  slug: 'tva-facture-guide-taux-mentions',
  title: 'TVA sur facture : guide des taux et mentions obligatoires',
  titleEn: 'VAT on Invoices: Rate Guide and Required Mentions',
  description: 'Comprendre les taux de TVA en France (20%, 10%, 5.5%, 2.1%). Mentions obligatoires et cas d\'exonération.',
  descriptionEn: 'Understanding VAT rates in France (20%, 10%, 5.5%, 2.1%). Required mentions and exemption cases.',
  image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80',
  category: 'legal',
  readTime: 6,
  author: 'InvoiceDesign',
  publishedAt: '2025-12-23',
  tags: [
    'TVA', 'taux TVA France', 'TVA 20%', 'TVA 10%', 'TVA 5.5%',
    'exonération TVA', 'franchise TVA', 'mentions TVA facture',
    'TVA intracommunautaire', 'autoliquidation', 'article 293 B'
  ],
  tagsEn: [
    'VAT', 'France VAT rates', 'VAT 20%', 'VAT 10%', 'VAT 5.5%',
    'VAT exemption', 'VAT franchise', 'invoice VAT mentions',
    'intra-EU VAT', 'reverse charge', 'article 293 B'
  ],
  content: `
## Les 4 taux de TVA en France (2025)

| Taux | Nom | Application |
|------|-----|-------------|
| **20%** | Taux normal | Majorité des biens et services |
| **10%** | Taux intermédiaire | Restauration, travaux rénovation, transports |
| **5,5%** | Taux réduit | Alimentation, énergie, livres, spectacles |
| **2,1%** | Taux super réduit | Médicaments remboursables, presse |

---

## Tableau détaillé par secteur

| Secteur | Produit/Service | Taux TVA |
|---------|-----------------|----------|
| **Alimentation** | Produits alimentaires | 5,5% |
| | Restauration sur place | 10% |
| | Restauration à emporter | 10% |
| | Alcool | 20% |
| **Bâtiment** | Construction neuve | 20% |
| | Rénovation (+2 ans) | 10% |
| | Travaux énergie | 5,5% |
| **Culture** | Livres | 5,5% |
| | Cinéma | 5,5% |
| | Streaming vidéo | 20% |
| **Services** | Conseil, prestations | 20% |
| | Hébergement hôtel | 10% |

---

## Franchise en base de TVA

<div class="info-box blue">
<h4>Seuils 2025</h4>
<p>Vous êtes en franchise de TVA si votre CA ne dépasse pas :</p>
<ul>
<li><strong>36 800 €</strong> pour les prestations de services</li>
<li><strong>91 900 €</strong> pour la vente de marchandises</li>
</ul>
</div>

Mention obligatoire sur la facture :
> **"TVA non applicable, article 293 B du CGI"**

---

## Mentions TVA sur facture

| Situation | Mention obligatoire |
|-----------|---------------------|
| Assujetti TVA classique | Montant HT, TVA, TTC par taux |
| Franchise de TVA | "TVA non applicable, art. 293 B du CGI" |
| Autoliquidation (BTP) | "Autoliquidation TVA - Art. 283-2 nonies CGI" |
| Export hors UE | "Exonération de TVA - Art. 262 I du CGI" |
| Vente intra-UE | "Exonération TVA - Art. 262 ter I du CGI" + TVA client |

---

## Calcul de la TVA

| Donnée | Formule |
|--------|---------|
| TVA à partir du HT | HT × taux TVA |
| HT à partir du TTC | TTC ÷ (1 + taux TVA) |
| TVA à partir du TTC | TTC - HT |

**Exemple avec TVA 20% :**
- HT = 1 000 €
- TVA = 1 000 × 0,20 = **200 €**
- TTC = 1 000 + 200 = **1 200 €**

---

## N° TVA intracommunautaire

| Élément | Description |
|---------|-------------|
| Structure | FR + 2 chiffres clé + 9 chiffres SIREN |
| Exemple | FR12345678901 |
| Vérification | ec.europa.eu/taxation_customs/vies |

<div class="warning-box">
<h4>⚠️ Obligation</h4>
<p>Le N° TVA intracommunautaire est obligatoire sur chaque facture si vous êtes assujetti à la TVA.</p>
</div>

---

## Régimes de TVA

| Régime | CA annuel | Déclaration |
|--------|-----------|-------------|
| **Franchise** | < 36 800€ / 91 900€ | Pas de déclaration |
| **Réel simplifié** | < 840 000€ / 254 000€ | Annuelle + 2 acomptes |
| **Réel normal** | Au-delà | Mensuelle ou trimestrielle |

---

## Récupération de la TVA

La TVA est récupérable sur :
- ✅ Achats professionnels (matériel, fournitures)
- ✅ Services (logiciels, conseil)
- ✅ Carburant (selon véhicule)
- ❌ Cadeaux > 73€ TTC
- ❌ Hébergement personnel
- ❌ Véhicules de tourisme

---

## Erreurs courantes

| ❌ Erreur | ✅ Solution |
|-----------|-------------|
| Mauvais taux appliqué | Vérifier la catégorie du bien/service |
| TVA sur facture en franchise | Ajouter mention art. 293 B |
| N° TVA absent | Toujours l'indiquer si assujetti |
| Autoliquidation oubliée | Mention obligatoire en sous-traitance BTP |

---

<div class="cta-box">
<h3>Factures avec TVA correcte automatiquement</h3>
<p>InvoiceDesign calcule la TVA et ajoute les mentions obligatoires pour vous.</p>
</div>
`,
  contentEn: `
## The 4 VAT Rates in France (2025)

| Rate | Name | Application |
|------|------|-------------|
| **20%** | Standard rate | Majority of goods and services |
| **10%** | Intermediate rate | Restaurants, renovation work, transport |
| **5.5%** | Reduced rate | Food, energy, books, entertainment |
| **2.1%** | Super reduced rate | Reimbursable medicines, press |

---

## Detailed Table by Sector

| Sector | Product/Service | VAT Rate |
|--------|-----------------|----------|
| **Food** | Food products | 5.5% |
| | Dine-in restaurant | 10% |
| | Takeaway food | 10% |
| | Alcohol | 20% |
| **Construction** | New construction | 20% |
| | Renovation (+2 years) | 10% |
| | Energy work | 5.5% |
| **Culture** | Books | 5.5% |
| | Cinema | 5.5% |
| | Video streaming | 20% |
| **Services** | Consulting, services | 20% |
| | Hotel accommodation | 10% |

---

## VAT Franchise Threshold

<div class="info-box blue">
<h4>2025 Thresholds</h4>
<p>You are VAT exempt if your revenue does not exceed:</p>
<ul>
<li><strong>€36,800</strong> for services</li>
<li><strong>€91,900</strong> for goods sales</li>
</ul>
</div>

Required mention on invoice:
> **"VAT not applicable, article 293 B of the CGI"**

---

## VAT Mentions on Invoices

| Situation | Required Mention |
|-----------|------------------|
| Standard VAT registered | Amount excl. tax, VAT, incl. tax by rate |
| VAT franchise | "VAT not applicable, art. 293 B of CGI" |
| Reverse charge (construction) | "VAT reverse charge - Art. 283-2 nonies CGI" |
| Export outside EU | "VAT exemption - Art. 262 I of CGI" |
| Intra-EU sale | "VAT exemption - Art. 262 ter I of CGI" + customer VAT |

---

## VAT Calculation

| Data | Formula |
|------|---------|
| VAT from net amount | Net × VAT rate |
| Net from gross | Gross ÷ (1 + VAT rate) |
| VAT from gross | Gross - Net |

**Example with 20% VAT:**
- Net = €1,000
- VAT = 1,000 × 0.20 = **€200**
- Gross = 1,000 + 200 = **€1,200**

---

## Intra-EU VAT Number

| Element | Description |
|---------|-------------|
| Structure | FR + 2 key digits + 9 SIREN digits |
| Example | FR12345678901 |
| Verification | ec.europa.eu/taxation_customs/vies |

<div class="warning-box">
<h4>⚠️ Requirement</h4>
<p>The intra-EU VAT number is mandatory on every invoice if you are VAT registered.</p>
</div>

---

## VAT Regimes

| Regime | Annual Revenue | Declaration |
|--------|----------------|-------------|
| **Franchise** | < €36,800 / €91,900 | No declaration |
| **Simplified actual** | < €840,000 / €254,000 | Annual + 2 installments |
| **Normal actual** | Above | Monthly or quarterly |

---

## VAT Recovery

VAT is recoverable on:
- ✅ Professional purchases (equipment, supplies)
- ✅ Services (software, consulting)
- ✅ Fuel (depending on vehicle)
- ❌ Gifts > €73 incl. tax
- ❌ Personal accommodation
- ❌ Passenger vehicles

---

## Common Mistakes

| ❌ Mistake | ✅ Solution |
|------------|-------------|
| Wrong rate applied | Check the goods/service category |
| VAT on franchise invoice | Add art. 293 B mention |
| Missing VAT number | Always include if registered |
| Forgotten reverse charge | Required mention for BTP subcontracting |

---

<div class="cta-box">
<h3>Invoices with Correct VAT Automatically</h3>
<p>InvoiceDesign calculates VAT and adds required mentions for you.</p>
</div>
`,
};
