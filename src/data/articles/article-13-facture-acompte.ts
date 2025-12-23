import { Article } from './types';

export const articleFactureAcompte: Article = {
  slug: 'facture-acompte-modele-regles',
  title: 'Facture d\'acompte : modèle, règles et comptabilisation',
  titleEn: 'Deposit Invoice: Template, Rules and Accounting',
  description: 'Comment faire une facture d\'acompte ? Mentions obligatoires, TVA sur acompte et comptabilisation correcte.',
  descriptionEn: 'How to create a deposit invoice? Required mentions, VAT on deposit and correct accounting.',
  image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
  category: 'tutorial',
  readTime: 5,
  author: 'InvoiceDesign',
  publishedAt: '2025-12-23',
  tags: [
    'facture acompte', 'acompte', 'paiement partiel', 'avance client',
    'TVA acompte', 'comptabilisation acompte', 'facture partielle',
    'arrhes', 'dépôt de garantie', 'versement initial'
  ],
  tagsEn: [
    'deposit invoice', 'deposit', 'partial payment', 'client advance',
    'deposit VAT', 'deposit accounting', 'partial invoice',
    'earnest money', 'security deposit', 'initial payment'
  ],
  content: `
## Qu'est-ce qu'une facture d'acompte ?

Une facture d'acompte est un document fiscal émis lors du **versement partiel avant livraison** d'un bien ou d'une prestation.

| Caractéristique | Facture d'acompte |
|-----------------|-------------------|
| Moment | Avant livraison/prestation |
| Montant | Partiel (ex: 30%) |
| TVA | Exigible à l'encaissement |
| Obligation | ✅ Obligatoire si TVA applicable |

---

## Acompte vs Arrhes vs Dépôt

| Type | Définition | Remboursable |
|------|------------|--------------|
| **Acompte** | Engagement ferme | ❌ Non (sauf accord) |
| **Arrhes** | Possibilité de dédit | ✅ Oui (double si vendeur annule) |
| **Dépôt de garantie** | Garantie restituée | ✅ Oui en fin de contrat |

<div class="warning-box">
<h4>⚠️ Attention</h4>
<p>L'acompte engage définitivement les deux parties. Le client ne peut pas annuler sans perdre l'acompte (sauf accord).</p>
</div>

---

## Mentions obligatoires

| Mention | Obligatoire |
|---------|-------------|
| **"FACTURE D'ACOMPTE"** | ✅ Oui |
| Numéro de facture | ✅ Oui |
| Date d'émission | ✅ Oui |
| Référence devis/commande | ✅ Recommandé |
| Description de la prestation | ✅ Oui |
| Montant HT de l'acompte | ✅ Oui |
| TVA sur l'acompte | ✅ Oui |
| Montant TTC de l'acompte | ✅ Oui |
| % du total ou montant fixe | ✅ Recommandé |

---

## TVA sur acompte

| Situation | TVA exigible |
|-----------|--------------|
| Prestation de services | À l'encaissement de l'acompte |
| Vente de biens | À la livraison (pas sur acompte) |
| Travaux immobiliers | À l'encaissement |

<div class="info-box blue">
<h4>Règle services</h4>
<p>Pour les prestations de services, la TVA est due dès l'encaissement de l'acompte, même avant la réalisation.</p>
</div>

---

## Exemple de facture d'acompte

| Élément | Détail |
|---------|--------|
| **Objet** | Acompte 30% - Création site web |
| **Référence** | Devis D-2025-042 du 15/12/2025 |
| **Montant total devis** | 5 000,00 € HT |
| **Acompte demandé** | 30% |
| **Montant HT** | 1 500,00 € |
| **TVA 20%** | 300,00 € |
| **Montant TTC** | 1 800,00 € |

---

## Numérotation

| Document | Numérotation |
|----------|--------------|
| Facture d'acompte | FA-2025-001-A1 ou FAC-2025-001 |
| Facture de solde | FA-2025-001-S ou FA-2025-002 |

---

## Facture de solde

La facture finale doit mentionner :

| Élément | Obligatoire |
|---------|-------------|
| Référence à la facture d'acompte | ✅ Oui |
| Montant total de la prestation | ✅ Oui |
| Acompte(s) déjà versé(s) | ✅ Oui |
| Solde restant dû | ✅ Oui |

**Exemple :**
| Ligne | Montant |
|-------|---------|
| Total prestation HT | 5 000,00 € |
| TVA 20% | 1 000,00 € |
| Total TTC | 6 000,00 € |
| Acompte versé (FA-001-A1) | -1 800,00 € |
| **Solde à payer** | **4 200,00 €** |

---

## Comptabilisation

### À l'encaissement de l'acompte :

| Compte | Débit | Crédit |
|--------|-------|--------|
| 512 Banque | 1 800 € | |
| 4191 Avances clients | | 1 500 € |
| 4457 TVA collectée | | 300 € |

### À la facturation finale :

| Compte | Débit | Crédit |
|--------|-------|--------|
| 411 Clients | 6 000 € | |
| 4191 Avances clients | 1 500 € | |
| 706 Prestations services | | 5 000 € |
| 4457 TVA collectée | | 700 € |

---

## Erreurs courantes

| ❌ Erreur | ✅ Solution |
|-----------|-------------|
| Pas de facture pour l'acompte | Toujours facturer les acomptes |
| Oublier la TVA | Appliquer la TVA sur l'acompte (services) |
| Pas de référence au devis | Mentionner le devis d'origine |
| Pas de déduction sur facture finale | Déduire clairement les acomptes |

---

<div class="cta-box">
<h3>Gérez vos acomptes facilement</h3>
<p>InvoiceDesign calcule automatiquement la TVA et génère les factures d'acompte conformes.</p>
</div>
`,
  contentEn: `
## What is a Deposit Invoice?

A deposit invoice is a tax document issued when a **partial payment is made before delivery** of goods or services.

| Characteristic | Deposit Invoice |
|----------------|-----------------|
| Timing | Before delivery/service |
| Amount | Partial (e.g., 30%) |
| VAT | Due upon collection |
| Requirement | ✅ Required if VAT applies |

---

## Deposit vs Earnest Money vs Security Deposit

| Type | Definition | Refundable |
|------|------------|------------|
| **Deposit** | Firm commitment | ❌ No (unless agreed) |
| **Earnest money** | Right to withdraw | ✅ Yes (double if seller cancels) |
| **Security deposit** | Returned guarantee | ✅ Yes at end of contract |

<div class="warning-box">
<h4>⚠️ Warning</h4>
<p>A deposit definitively commits both parties. The client cannot cancel without losing the deposit (unless agreed).</p>
</div>

---

## Required Mentions

| Mention | Required |
|---------|----------|
| **"DEPOSIT INVOICE"** | ✅ Yes |
| Invoice number | ✅ Yes |
| Issue date | ✅ Yes |
| Quote/order reference | ✅ Recommended |
| Service description | ✅ Yes |
| Deposit amount excl. tax | ✅ Yes |
| VAT on deposit | ✅ Yes |
| Deposit amount incl. tax | ✅ Yes |
| % of total or fixed amount | ✅ Recommended |

---

## VAT on Deposit

| Situation | VAT Due |
|-----------|---------|
| Service provision | Upon deposit collection |
| Goods sale | Upon delivery (not on deposit) |
| Construction work | Upon collection |

<div class="info-box blue">
<h4>Service Rule</h4>
<p>For services, VAT is due upon deposit collection, even before the service is performed.</p>
</div>

---

## Deposit Invoice Example

| Element | Detail |
|---------|--------|
| **Subject** | 30% Deposit - Website creation |
| **Reference** | Quote Q-2025-042 dated 12/15/2025 |
| **Total quote amount** | €5,000.00 excl. tax |
| **Deposit requested** | 30% |
| **Amount excl. tax** | €1,500.00 |
| **VAT 20%** | €300.00 |
| **Amount incl. tax** | €1,800.00 |

---

## Numbering

| Document | Numbering |
|----------|-----------|
| Deposit invoice | INV-2025-001-D1 or DEP-2025-001 |
| Final invoice | INV-2025-001-F or INV-2025-002 |

---

## Final Invoice

The final invoice must mention:

| Element | Required |
|---------|----------|
| Reference to deposit invoice | ✅ Yes |
| Total service amount | ✅ Yes |
| Deposit(s) already paid | ✅ Yes |
| Balance due | ✅ Yes |

**Example:**
| Line | Amount |
|------|--------|
| Total service excl. tax | €5,000.00 |
| VAT 20% | €1,000.00 |
| Total incl. tax | €6,000.00 |
| Deposit paid (INV-001-D1) | -€1,800.00 |
| **Balance due** | **€4,200.00** |

---

## Accounting

### Upon deposit collection:

| Account | Debit | Credit |
|---------|-------|--------|
| 512 Bank | €1,800 | |
| 4191 Customer advances | | €1,500 |
| 4457 VAT collected | | €300 |

### Upon final invoicing:

| Account | Debit | Credit |
|---------|-------|--------|
| 411 Customers | €6,000 | |
| 4191 Customer advances | €1,500 | |
| 706 Service revenue | | €5,000 |
| 4457 VAT collected | | €700 |

---

## Common Mistakes

| ❌ Mistake | ✅ Solution |
|------------|-------------|
| No invoice for deposit | Always invoice deposits |
| Forgetting VAT | Apply VAT on deposit (services) |
| No quote reference | Mention original quote |
| No deduction on final invoice | Clearly deduct deposits |

---

<div class="cta-box">
<h3>Manage Your Deposits Easily</h3>
<p>InvoiceDesign automatically calculates VAT and generates compliant deposit invoices.</p>
</div>
`,
};
