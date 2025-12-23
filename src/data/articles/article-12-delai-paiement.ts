import { Article } from './types';

export const articleDelaiPaiement: Article = {
  slug: 'delai-paiement-facture-reglementation',
  title: 'Délai de paiement facture : réglementation et pénalités 2026',
  titleEn: 'Invoice Payment Terms: Regulations and Penalties 2026',
  description: 'Quels sont les délais de paiement légaux en France ? 30, 45, 60 jours, pénalités de retard et indemnité forfaitaire.',
  descriptionEn: 'What are the legal payment terms in France? 30, 45, 60 days, late payment penalties and fixed compensation.',
  image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&q=80',
  category: 'legal',
  readTime: 5,
  author: 'InvoiceDesign',
  publishedAt: '2025-12-23',
  tags: [
    'délai paiement', 'paiement facture', '30 jours', '60 jours',
    'pénalités retard', 'indemnité forfaitaire', 'LME', 'loi Sapin',
    'recouvrement', 'impayé', 'relance client'
  ],
  tagsEn: [
    'payment terms', 'invoice payment', '30 days', '60 days',
    'late penalties', 'fixed compensation', 'payment law',
    'debt collection', 'unpaid', 'client reminder'
  ],
  content: `
## Délais légaux en France (2025-2026)

| Délai | Application |
|-------|-------------|
| **30 jours** | Délai par défaut (droit commun) |
| **45 jours fin de mois** | Si accord entre parties |
| **60 jours** | Maximum légal absolu |
| **Comptant** | Paiement à réception |

<div class="warning-box">
<h4>⚠️ Règle absolue</h4>
<p>Le délai de paiement ne peut <strong>jamais</strong> dépasser <strong>60 jours</strong> à compter de l'émission de la facture (ou 45 jours fin de mois).</p>
</div>

---

## Délais par secteur

| Secteur | Délai spécifique |
|---------|------------------|
| Transport routier | 30 jours max |
| Alimentaire périssable | 30 jours max |
| Bétail / viande | 20 jours max |
| Boissons alcoolisées | 30 jours fin de mois |
| Secteur public | 30 jours (État) |

---

## Mentions obligatoires sur facture

| Mention | Obligatoire |
|---------|-------------|
| Date d'échéance | ✅ Oui |
| Taux pénalités de retard | ✅ Oui |
| Indemnité forfaitaire (40€) | ✅ Oui |

---

## Calcul des pénalités de retard

| Élément | Valeur |
|---------|--------|
| **Taux minimum légal** | Taux BCE × 3 (soit ~12-13% en 2025) |
| **Taux habituel** | 10% à 15% annuel |
| **Base de calcul** | Montant TTC impayé |
| **Point de départ** | Lendemain de l'échéance |

**Formule :**
> Pénalités = Montant TTC × (Taux / 365) × Jours de retard

<div class="info-box blue">
<h4>Exemple</h4>
<p>Facture de 1 000€ TTC, 15 jours de retard, taux 12% :</p>
<p>1 000 × (0,12 / 365) × 15 = <strong>4,93€</strong></p>
</div>

---

## Indemnité forfaitaire de recouvrement

| Élément | Montant |
|---------|---------|
| Montant fixe | **40€** par facture en retard |
| Applicable | De plein droit, sans rappel |
| Cumulable | Oui, avec les pénalités |

---

## Mentions sur facture

Exemple de mention légale :
> *"En cas de retard de paiement, une pénalité de 12% l'an sera appliquée, ainsi qu'une indemnité forfaitaire de 40€ pour frais de recouvrement (articles L.441-10 et D.441-5 du Code de commerce)."*

---

## Sanctions pour dépassement

| Infraction | Amende |
|------------|--------|
| Non-respect délai légal | Jusqu'à **2 millions €** |
| Récidive | Jusqu'à **4 millions €** |
| Clause abusive | Nullité + amende |

---

## Procédure de relance

| Étape | Délai | Action |
|-------|-------|--------|
| 1 | J+7 | Relance amiable (email) |
| 2 | J+15 | 2ème relance (courrier) |
| 3 | J+30 | Mise en demeure (RAR) |
| 4 | J+45 | Recouvrement contentieux |

---

## Mise en demeure

| Élément | Contenu |
|---------|---------|
| Format | Lettre recommandée AR |
| Références | N° facture, date, montant |
| Demande | Paiement sous 8 jours |
| Mention | Pénalités + 40€ |
| Avertissement | Procédure judiciaire |

---

## Recours en cas d'impayé

| Procédure | Seuil | Délai |
|-----------|-------|-------|
| Injonction de payer | < 5 000€ | 1-2 mois |
| Référé provision | Créance certaine | 2-3 semaines |
| Assignation | Tous montants | 6-12 mois |

---

## Bonnes pratiques

| ✅ Faire | ❌ Éviter |
|----------|----------|
| Facturer immédiatement | Attendre la fin du mois |
| Préciser l'échéance | Délai vague ("sous 30 jours") |
| Relancer vite | Attendre 60 jours |
| Documenter les relances | Relances orales seules |

---

<div class="cta-box">
<h3>Factures avec mentions légales automatiques</h3>
<p>InvoiceDesign ajoute les pénalités et l'indemnité de 40€ sur toutes vos factures.</p>
</div>
`,
  contentEn: `
## Legal Payment Terms in France (2025-2026)

| Term | Application |
|------|-------------|
| **30 days** | Default term (common law) |
| **45 days end of month** | If agreed between parties |
| **60 days** | Absolute legal maximum |
| **Immediate** | Payment on receipt |

<div class="warning-box">
<h4>⚠️ Absolute Rule</h4>
<p>Payment terms can <strong>never</strong> exceed <strong>60 days</strong> from invoice issue date (or 45 days end of month).</p>
</div>

---

## Terms by Sector

| Sector | Specific Term |
|--------|---------------|
| Road transport | 30 days max |
| Perishable food | 30 days max |
| Livestock / meat | 20 days max |
| Alcoholic beverages | 30 days end of month |
| Public sector | 30 days (State) |

---

## Required Invoice Mentions

| Mention | Required |
|---------|----------|
| Due date | ✅ Yes |
| Late payment penalty rate | ✅ Yes |
| Fixed compensation (€40) | ✅ Yes |

---

## Calculating Late Payment Penalties

| Element | Value |
|---------|-------|
| **Minimum legal rate** | ECB rate × 3 (approx. 12-13% in 2025) |
| **Usual rate** | 10% to 15% annual |
| **Calculation base** | Unpaid amount incl. tax |
| **Starting point** | Day after due date |

**Formula:**
> Penalties = Amount incl. tax × (Rate / 365) × Days late

<div class="info-box blue">
<h4>Example</h4>
<p>Invoice of €1,000 incl. tax, 15 days late, 12% rate:</p>
<p>1,000 × (0.12 / 365) × 15 = <strong>€4.93</strong></p>
</div>

---

## Fixed Recovery Compensation

| Element | Amount |
|---------|--------|
| Fixed amount | **€40** per late invoice |
| Applicable | Automatically, no reminder needed |
| Cumulative | Yes, with penalties |

---

## Invoice Mentions

Example legal mention:
> *"In case of late payment, a 12% annual penalty will be applied, plus a fixed €40 compensation for recovery costs (articles L.441-10 and D.441-5 of the Commercial Code)."*

---

## Penalties for Exceeding Terms

| Violation | Fine |
|-----------|------|
| Non-compliance with legal term | Up to **€2 million** |
| Repeat offense | Up to **€4 million** |
| Unfair clause | Nullity + fine |

---

## Reminder Procedure

| Step | Delay | Action |
|------|-------|--------|
| 1 | D+7 | Friendly reminder (email) |
| 2 | D+15 | 2nd reminder (letter) |
| 3 | D+30 | Formal notice (registered mail) |
| 4 | D+45 | Legal debt collection |

---

## Formal Notice

| Element | Content |
|---------|---------|
| Format | Registered letter with AR |
| References | Invoice no., date, amount |
| Request | Payment within 8 days |
| Mention | Penalties + €40 |
| Warning | Legal proceedings |

---

## Remedies for Non-Payment

| Procedure | Threshold | Timeframe |
|-----------|-----------|-----------|
| Payment order | < €5,000 | 1-2 months |
| Summary judgment | Certain debt | 2-3 weeks |
| Lawsuit | All amounts | 6-12 months |

---

## Best Practices

| ✅ Do | ❌ Avoid |
|-------|---------|
| Invoice immediately | Wait until month-end |
| Specify due date | Vague term ("within 30 days") |
| Follow up quickly | Wait 60 days |
| Document reminders | Verbal reminders only |

---

<div class="cta-box">
<h3>Invoices with Automatic Legal Mentions</h3>
<p>InvoiceDesign adds penalties and the €40 compensation to all your invoices.</p>
</div>
`,
};
