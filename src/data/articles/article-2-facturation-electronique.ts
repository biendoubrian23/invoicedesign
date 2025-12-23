import { Article } from './types';

export const articleFacturationElectronique: Article = {
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
};
