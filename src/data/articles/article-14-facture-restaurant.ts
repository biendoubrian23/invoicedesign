import { Article } from './types';

export const articleFactureRestaurant: Article = {
  slug: 'facture-restaurant-note-regles',
  title: 'Facture restaurant : note, ticket et obligations légales',
  titleEn: 'Restaurant Invoice: Receipt, Ticket and Legal Requirements',
  description: 'Quand un restaurant doit-il délivrer une facture ? Différence note/facture et mentions obligatoires.',
  descriptionEn: 'When must a restaurant issue an invoice? Receipt vs invoice differences and required mentions.',
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  category: 'legal',
  readTime: 5,
  author: 'InvoiceDesign',
  publishedAt: '2025-12-24',
  tags: [
    'facture restaurant', 'ticket restaurant', 'note restaurant',
    'addition', 'ticket de caisse', 'restauration', 'CHR',
    'hôtellerie restauration', 'TVA restauration', 'frais de repas'
  ],
  tagsEn: [
    'restaurant invoice', 'restaurant receipt', 'restaurant bill',
    'check', 'cash register receipt', 'catering', 'hospitality',
    'hotel restaurant', 'restaurant VAT', 'meal expenses'
  ],
  content: `
## Note ou facture : quelle différence ?

| Document | Quand | Pour qui | Seuil |
|----------|-------|----------|-------|
| **Note** | Toujours | Particuliers | Obligatoire dès le 1er € |
| **Ticket de caisse** | Toujours | Tous clients | Obligatoire (avec caisse) |
| **Facture** | Sur demande | Professionnels | À partir de 25 € HT |

---

## Quand la facture est-elle obligatoire ?

| Situation | Obligation |
|-----------|------------|
| Client particulier, < 25 € HT | Note suffit |
| Client particulier, ≥ 25 € HT | Note obligatoire |
| Client professionnel | Facture sur demande |
| Professionnel qui la demande | ✅ Obligatoire de fournir |
| Livraison/traiteur B2B | ✅ Facture obligatoire |

<div class="info-box blue">
<h4>Bon à savoir</h4>
<p>Les restaurants ne sont <strong>pas obligés</strong> d'émettre une facture spontanément, mais doivent la fournir si un professionnel la demande.</p>
</div>

---

## Mentions obligatoires sur la note

| Mention | Obligatoire |
|---------|-------------|
| Date et heure | ✅ Oui |
| Nom du restaurant | ✅ Oui |
| Adresse | ✅ Oui |
| Détail des prestations | ✅ Oui |
| Prix TTC par élément | ✅ Oui |
| Total TTC | ✅ Oui |
| Taux de TVA | ✅ Oui |

---

## Mentions sur la facture professionnelle

| Mention | Obligatoire |
|---------|-------------|
| Toutes mentions de la note | ✅ Oui |
| SIRET du restaurant | ✅ Oui |
| Numéro de facture | ✅ Oui |
| Identité du client | ✅ Oui |
| Adresse du client | ✅ Oui |
| SIRET du client (si pro) | ✅ Recommandé |
| Montant HT | ✅ Oui |
| TVA détaillée par taux | ✅ Oui |
| Montant TTC | ✅ Oui |

---

## Taux de TVA en restauration

| Type | Taux |
|------|------|
| Vente à emporter | 5,5% ou 10% |
| Consommation sur place | 10% |
| Boissons alcoolisées | 20% |
| Boissons non alcoolisées | 10% |
| Eau, pain, entrée, plat | 10% |

<div class="warning-box">
<h4>⚠️ Important</h4>
<p>La TVA doit être ventilée par taux sur la facture professionnelle.</p>
</div>

---

## Exemple de facture restaurant

| Détail | Quantité | Prix unit. HT | TVA | Total TTC |
|--------|----------|---------------|-----|-----------|
| Menu déjeuner | 2 | 15,00 € | 10% | 33,00 € |
| Vin (bouteille) | 1 | 20,83 € | 20% | 25,00 € |
| Café | 2 | 2,27 € | 10% | 5,00 € |
| **Totaux** | | **55,37 €** | | **63,00 €** |

**Récapitulatif TVA :**
| Base HT | Taux | Montant TVA |
|---------|------|-------------|
| 34,54 € | 10% | 3,46 € |
| 20,83 € | 20% | 4,17 € |
| **Total** | | **7,63 €** |

---

## Note de frais et déduction

Pour être déductible fiscalement :

| Critère | Exigence |
|---------|----------|
| Document | Facture (pas simple note) |
| Mentions | Client identifié |
| Motif | Professionnel justifié |
| Montant | Raisonnable |

<div class="info-box blue">
<h4>Pour les notes de frais</h4>
<p>Demandez toujours une <strong>facture au nom de votre société</strong> pour justifier la déduction fiscale.</p>
</div>

---

## Ticket-restaurant et facturation

| Situation | Règle |
|-----------|-------|
| Paiement partiel en tickets | Mentionner mode de paiement |
| Ticket + carte | Indiquer les deux |
| Facture professionnelle | Reste payé en carte/espèces |

---

## Logiciel de caisse certifié

Depuis 2018, obligation d'utiliser un logiciel certifié :

| Exigence | Objectif |
|----------|----------|
| Inaltérabilité | Données non modifiables |
| Sécurisation | Protection des données |
| Conservation | Archives sur 6 ans |
| Archivage | Traçabilité complète |

---

## Sanctions

| Infraction | Sanction |
|------------|----------|
| Note non remise | 750 € d'amende |
| Facture non fournie (si demandée) | 75 000 € d'amende |
| Logiciel non certifié | 7 500 € d'amende |
| Prix non affichés | 1 500 € d'amende |

---

## Checklist restaurateur

| Élément | ✅ |
|---------|---|
| Note remise au client | ☐ |
| Logiciel de caisse certifié | ☐ |
| Prix affichés à l'extérieur | ☐ |
| Carte visible avant commande | ☐ |
| Facture sur demande | ☐ |
| TVA ventilée correctement | ☐ |

---

<div class="cta-box">
<h3>Factures professionnelles pour la restauration</h3>
<p>InvoiceDesign gère automatiquement les différents taux de TVA et génère des factures conformes.</p>
</div>
`,
  contentEn: `
## Receipt vs Invoice: What's the Difference?

| Document | When | For Whom | Threshold |
|----------|------|----------|-----------|
| **Receipt** | Always | Individuals | Required from €1 |
| **Register ticket** | Always | All clients | Required (with register) |
| **Invoice** | On request | Professionals | From €25 excl. tax |

---

## When is an Invoice Required?

| Situation | Requirement |
|-----------|-------------|
| Individual client, < €25 excl. tax | Receipt sufficient |
| Individual client, ≥ €25 excl. tax | Receipt required |
| Professional client | Invoice on request |
| Professional who requests it | ✅ Must provide |
| B2B delivery/catering | ✅ Invoice required |

<div class="info-box blue">
<h4>Good to Know</h4>
<p>Restaurants are <strong>not required</strong> to issue an invoice spontaneously, but must provide one if a professional requests it.</p>
</div>

---

## Required Mentions on Receipt

| Mention | Required |
|---------|----------|
| Date and time | ✅ Yes |
| Restaurant name | ✅ Yes |
| Address | ✅ Yes |
| Service details | ✅ Yes |
| Price incl. tax per item | ✅ Yes |
| Total incl. tax | ✅ Yes |
| VAT rate | ✅ Yes |

---

## Professional Invoice Mentions

| Mention | Required |
|---------|----------|
| All receipt mentions | ✅ Yes |
| Restaurant business ID | ✅ Yes |
| Invoice number | ✅ Yes |
| Client identity | ✅ Yes |
| Client address | ✅ Yes |
| Client business ID (if pro) | ✅ Recommended |
| Amount excl. tax | ✅ Yes |
| VAT detailed by rate | ✅ Yes |
| Amount incl. tax | ✅ Yes |

---

## VAT Rates in Restaurants

| Type | Rate |
|------|------|
| Takeaway | 5.5% or 10% |
| On-site consumption | 10% |
| Alcoholic beverages | 20% |
| Non-alcoholic beverages | 10% |
| Water, bread, starter, main | 10% |

<div class="warning-box">
<h4>⚠️ Important</h4>
<p>VAT must be broken down by rate on professional invoices.</p>
</div>

---

## Restaurant Invoice Example

| Detail | Qty | Unit excl. tax | VAT | Total incl. |
|--------|-----|----------------|-----|-------------|
| Lunch menu | 2 | €15.00 | 10% | €33.00 |
| Wine (bottle) | 1 | €20.83 | 20% | €25.00 |
| Coffee | 2 | €2.27 | 10% | €5.00 |
| **Totals** | | **€55.37** | | **€63.00** |

**VAT Summary:**
| Base excl. tax | Rate | VAT Amount |
|----------------|------|------------|
| €34.54 | 10% | €3.46 |
| €20.83 | 20% | €4.17 |
| **Total** | | **€7.63** |

---

## Expense Reports and Deduction

To be tax-deductible:

| Criterion | Requirement |
|-----------|-------------|
| Document | Invoice (not simple receipt) |
| Mentions | Client identified |
| Purpose | Justified professional |
| Amount | Reasonable |

<div class="info-box blue">
<h4>For Expense Reports</h4>
<p>Always request an <strong>invoice in your company's name</strong> to justify the tax deduction.</p>
</div>

---

## Meal Vouchers and Invoicing

| Situation | Rule |
|-----------|------|
| Partial meal voucher payment | Mention payment method |
| Voucher + card | Indicate both |
| Professional invoice | Remainder paid by card/cash |

---

## Certified Cash Register Software

Since 2018, requirement to use certified software:

| Requirement | Purpose |
|-------------|---------|
| Unalterability | Non-modifiable data |
| Security | Data protection |
| Retention | 6-year archives |
| Archiving | Complete traceability |

---

## Penalties

| Violation | Penalty |
|-----------|---------|
| Receipt not provided | €750 fine |
| Invoice not provided (if requested) | €75,000 fine |
| Non-certified software | €7,500 fine |
| Prices not displayed | €1,500 fine |

---

## Restaurant Checklist

| Element | ✅ |
|---------|---|
| Receipt given to customer | ☐ |
| Certified cash register software | ☐ |
| Prices displayed outside | ☐ |
| Menu visible before order | ☐ |
| Invoice on request | ☐ |
| VAT correctly broken down | ☐ |

---

<div class="cta-box">
<h3>Professional Invoices for Restaurants</h3>
<p>InvoiceDesign automatically handles different VAT rates and generates compliant invoices.</p>
</div>
`,
};
