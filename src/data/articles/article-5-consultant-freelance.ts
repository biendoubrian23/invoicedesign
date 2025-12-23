import { Article } from './types';

export const articleConsultantFreelance: Article = {
  slug: 'facture-consultant-freelance-modele',
  title: 'Facture consultant et freelance : modèle professionnel',
  titleEn: 'Consultant & Freelance Invoice: Professional Template',
  description: 'Comment facturer en tant que consultant ou freelance ? Modèle, mentions obligatoires et conseils pour indépendants.',
  descriptionEn: 'How to invoice as a consultant or freelance? Template, mandatory mentions and tips for independents.',
  image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
  category: 'sector',
  readTime: 5,
  author: 'InvoiceDesign',
  publishedAt: '2025-12-23',
  tags: [
    'facture consultant', 'facture freelance', 'indépendant', 'prestation intellectuelle',
    'TJM', 'taux journalier', 'consultant IT', 'développeur freelance',
    'mission consulting', 'portage salarial', 'facturation services'
  ],
  tagsEn: [
    'consultant invoice', 'freelance invoice', 'independent', 'intellectual services',
    'daily rate', 'IT consultant', 'freelance developer',
    'consulting mission', 'umbrella company', 'service invoicing'
  ],
  content: `
## Les modes de facturation consultant

| Mode | Description | Exemple |
|------|-------------|---------|
| **TJM** | Taux Journalier Moyen | 500€/jour × 22 jours |
| **Forfait** | Prix fixe pour une mission | Audit 5 000€ |
| **Régie** | Facturation au temps passé | 50€/h × heures réelles |
| **Success fee** | % sur résultat | 10% du CA généré |

---

## Structure de facture consultant

| Section | Contenu |
|---------|---------|
| **En-tête** | Logo, coordonnées, SIRET |
| **Référence mission** | N° de commande, contrat |
| **Période** | Du 01/12 au 31/12/2025 |
| **Détail prestations** | Jours × TJM ou heures × taux |
| **Frais refacturables** | Déplacements, hébergement |
| **Total** | HT + TVA 20% = TTC |

---

## Mentions obligatoires

| Mention | Statut | Détail |
|---------|--------|--------|
| SIRET | ✅ Obligatoire | 14 chiffres |
| N° TVA intracom | ✅ Si assujetti | Format FR + 11 chiffres |
| Mention "EI" | ✅ Si entreprise individuelle | Depuis 2022 |
| RCP | Recommandé | Assurance Responsabilité Civile Pro |

---

## Exemple de facture de mission

| Désignation | Qté | Unité | PU HT | Total HT |
|-------------|-----|-------|-------|----------|
| Mission conseil digital - Décembre 2025 | 18 | jours | 550,00 € | 9 900,00 € |
| Atelier formation équipe | 1 | forfait | 1 200,00 € | 1 200,00 € |
| Frais déplacement (train) | 1 | forfait | 180,00 € | 180,00 € |
| | | | **Total HT** | **11 280,00 €** |
| | | | TVA 20% | 2 256,00 € |
| | | | **Total TTC** | **13 536,00 €** |

---

## Facturation des frais

<div class="info-box blue">
<h4>Frais refacturables</h4>
<p>Les frais peuvent être refacturés :</p>
<ul>
<li><strong>Au réel</strong> : montant exact + justificatifs</li>
<li><strong>Forfait</strong> : montant convenu à l'avance</li>
<li><strong>Avec marge</strong> : si prévu au contrat</li>
</ul>
</div>

| Type de frais | TVA applicable |
|---------------|----------------|
| Transport | Récupérable si pro |
| Hébergement | TVA à 10% |
| Restauration | Non déductible |
| Matériel | TVA 20% |

---

## Délais de paiement

| Client | Délai standard |
|--------|----------------|
| Grands comptes | 45-60 jours fin de mois |
| PME | 30 jours |
| Startups | 30 jours ou à réception |

<div class="warning-box">
<h4>⚠️ Pénalités de retard</h4>
<p>Mentionnez toujours les pénalités de retard et l'indemnité forfaitaire de 40€.</p>
</div>

---

## Numérotation recommandée

| Format | Exemple | Avantage |
|--------|---------|----------|
| Année-Client-N° | 2025-ACME-001 | Tri par client |
| Année-Mois-N° | 2025-12-001 | Tri chronologique |
| Préfixe-Année-N° | FC-2025-0001 | Simple et clair |

---

## Conditions de vente consultant

Mentions recommandées :
- Délai de paiement
- Pénalités de retard (taux BCE + 10 points minimum)
- Indemnité forfaitaire : 40€
- Clause de réserve de propriété intellectuelle
- Conditions d'annulation

---

<div class="cta-box">
<h3>Factures consultant professionnelles</h3>
<p>Créez des factures qui inspirent confiance à vos clients grands comptes.</p>
</div>
`,
  contentEn: `
## Consultant Billing Methods

| Method | Description | Example |
|--------|-------------|---------|
| **Daily Rate** | Average Daily Rate | €500/day × 22 days |
| **Fixed Fee** | Fixed price for a mission | Audit €5,000 |
| **Time & Materials** | Billing for actual time | €50/h × actual hours |
| **Success Fee** | % of results | 10% of generated revenue |

---

## Consultant Invoice Structure

| Section | Content |
|---------|---------|
| **Header** | Logo, contact details, SIRET |
| **Mission Reference** | Order number, contract |
| **Period** | From 12/01 to 12/31/2025 |
| **Service Details** | Days × daily rate or hours × rate |
| **Reimbursable Expenses** | Travel, accommodation |
| **Total** | Excl. tax + 20% VAT = Incl. tax |

---

## Mandatory Mentions

| Mention | Status | Detail |
|---------|--------|--------|
| SIRET | ✅ Required | 14 digits |
| Intra-EU VAT No. | ✅ If registered | Format FR + 11 digits |
| "EI" Mention | ✅ If sole proprietor | Since 2022 |
| PL Insurance | Recommended | Professional Liability |

---

## Mission Invoice Example

| Description | Qty | Unit | Unit Price | Total |
|-------------|-----|------|------------|-------|
| Digital consulting mission - December 2025 | 18 | days | €550.00 | €9,900.00 |
| Team training workshop | 1 | flat | €1,200.00 | €1,200.00 |
| Travel expenses (train) | 1 | flat | €180.00 | €180.00 |
| | | | **Subtotal** | **€11,280.00** |
| | | | VAT 20% | €2,256.00 |
| | | | **Total** | **€13,536.00** |

---

## Expense Billing

<div class="info-box blue">
<h4>Reimbursable Expenses</h4>
<p>Expenses can be rebilled:</p>
<ul>
<li><strong>At cost</strong>: exact amount + receipts</li>
<li><strong>Flat fee</strong>: pre-agreed amount</li>
<li><strong>With markup</strong>: if specified in contract</li>
</ul>
</div>

| Expense Type | Applicable VAT |
|--------------|----------------|
| Transport | Recoverable if business |
| Accommodation | 10% VAT |
| Meals | Not deductible |
| Equipment | 20% VAT |

---

## Payment Terms

| Client | Standard Term |
|--------|---------------|
| Large accounts | 45-60 days end of month |
| SMEs | 30 days |
| Startups | 30 days or on receipt |

<div class="warning-box">
<h4>⚠️ Late Payment Penalties</h4>
<p>Always mention late payment penalties and the €40 fixed recovery fee.</p>
</div>

---

## Recommended Numbering

| Format | Example | Advantage |
|--------|---------|-----------|
| Year-Client-No. | 2025-ACME-001 | Sort by client |
| Year-Month-No. | 2025-12-001 | Chronological |
| Prefix-Year-No. | INV-2025-0001 | Simple and clear |

---

## Consultant Terms and Conditions

Recommended mentions:
- Payment deadline
- Late payment penalties (ECB rate + 10 points minimum)
- Fixed recovery fee: €40
- Intellectual property reservation clause
- Cancellation conditions

---

<div class="cta-box">
<h3>Professional Consultant Invoices</h3>
<p>Create invoices that inspire confidence with your enterprise clients.</p>
</div>
`,
};
