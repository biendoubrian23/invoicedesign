import { Article } from './types';

export const articleAvoirFacture: Article = {
  slug: 'avoir-facture-annulation-rectification',
  title: 'Avoir sur facture : comment annuler ou rectifier une facture',
  titleEn: 'Credit Note: How to Cancel or Correct an Invoice',
  description: 'Comment faire un avoir sur facture ? Modèle, mentions obligatoires et procédure pour annuler ou rectifier une facture.',
  descriptionEn: 'How to create a credit note? Template, required mentions and procedure to cancel or correct an invoice.',
  image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80',
  category: 'legal',
  readTime: 5,
  author: 'InvoiceDesign',
  publishedAt: '2025-12-23',
  tags: [
    'avoir', 'facture avoir', 'annuler facture', 'rectifier facture',
    'note crédit', 'remboursement', 'erreur facture', 'correction facture',
    'avoir partiel', 'avoir total', 'mentions avoir'
  ],
  tagsEn: [
    'credit note', 'invoice credit', 'cancel invoice', 'correct invoice',
    'credit memo', 'refund', 'invoice error', 'invoice correction',
    'partial credit', 'full credit', 'credit note mentions'
  ],
  content: `
## Qu'est-ce qu'un avoir ?

Un avoir (ou note de crédit) est un document comptable qui **annule totalement ou partiellement une facture** précédemment émise.

| Caractéristique | Avoir |
|-----------------|-------|
| Montant | Négatif ou créditeur |
| Référence | Obligatoirement à la facture d'origine |
| Valeur fiscale | ✅ Oui, document comptable |
| Numérotation | Séquence propre (AV-001) |

---

## Quand émettre un avoir ?

| Situation | Type d'avoir |
|-----------|--------------|
| Erreur de facturation | Avoir total + nouvelle facture |
| Retour de marchandise | Avoir partiel ou total |
| Remise accordée après coup | Avoir du montant de la remise |
| Annulation de commande | Avoir total |
| Litige résolu | Avoir négocié |
| Trop-perçu | Avoir du montant excédentaire |

<div class="warning-box">
<h4>⚠️ Règle d'or</h4>
<p>On ne supprime <strong>jamais</strong> une facture. On l'annule par un avoir pour conserver la traçabilité comptable.</p>
</div>

---

## Mentions obligatoires de l'avoir

| Mention | Obligatoire | Exemple |
|---------|-------------|---------|
| **"AVOIR"** ou **"Note de crédit"** | ✅ Oui | En titre |
| Numéro d'avoir | ✅ Oui | AV-2025-001 |
| Date d'émission | ✅ Oui | 23/12/2025 |
| Référence facture d'origine | ✅ Oui | "Annule FA-2025-042" |
| Coordonnées émetteur | ✅ Oui | Nom, adresse, SIRET |
| Coordonnées client | ✅ Oui | Identiques à la facture |
| Motif de l'avoir | ✅ Recommandé | "Retour marchandise" |
| Montant HT | ✅ Oui | -500,00 € |
| TVA | ✅ Oui | -100,00 € |
| Montant TTC | ✅ Oui | -600,00 € |

---

## Avoir total vs partiel

| Type | Usage | Montant |
|------|-------|---------|
| **Avoir total** | Annulation complète | = Facture d'origine |
| **Avoir partiel** | Correction/retour partiel | < Facture d'origine |

---

## Procédure d'émission

| Étape | Action |
|-------|--------|
| 1 | Identifier la facture concernée |
| 2 | Créer l'avoir avec référence |
| 3 | Indiquer le motif |
| 4 | Calculer les montants (négatifs) |
| 5 | Numéroter l'avoir |
| 6 | Envoyer au client |
| 7 | Comptabiliser l'avoir |

---

## Numérotation des avoirs

| Méthode | Exemple | Avantage |
|---------|---------|----------|
| Séquence propre | AV-2025-001 | Claire et distincte |
| Préfixe sur facture | FA-2025-042-AV | Lien visible |
| Mixte | AV-FA42-001 | Référence directe |

<div class="info-box blue">
<h4>Conseil</h4>
<p>Utilisez une numérotation séparée (AV-001, AV-002...) pour distinguer facilement les avoirs des factures.</p>
</div>

---

## Impact comptable

| Écriture | Débit | Crédit |
|----------|-------|--------|
| Facture initiale | Client | Ventes + TVA |
| Avoir | Ventes + TVA | Client |

---

## Remboursement ou déduction ?

| Option | Quand l'utiliser |
|--------|------------------|
| **Remboursement** | Client sans factures en attente |
| **Déduction** | Appliquer sur prochaine facture |
| **Compensation** | Déduire de factures impayées |

---

## Erreurs courantes

| ❌ Erreur | ✅ Solution |
|-----------|-------------|
| Supprimer la facture | Émettre un avoir |
| Pas de référence | Toujours citer la facture d'origine |
| Montant positif | Les avoirs sont en négatif |
| Oublier la TVA | Rectifier aussi la TVA |
| Pas de motif | Indiquer la raison |

---

## Délai d'émission

| Contexte | Délai recommandé |
|----------|------------------|
| Erreur détectée | Immédiat |
| Retour marchandise | À réception du retour |
| Litige | À la résolution |
| Clôture exercice | Avant la clôture comptable |

---

<div class="cta-box">
<h3>Gérez vos avoirs simplement</h3>
<p>InvoiceDesign génère automatiquement vos avoirs avec toutes les mentions légales.</p>
</div>
`,
  contentEn: `
## What is a Credit Note?

A credit note (or credit memo) is an accounting document that **fully or partially cancels a previously issued invoice**.

| Characteristic | Credit Note |
|----------------|-------------|
| Amount | Negative or credit |
| Reference | Must reference original invoice |
| Tax value | ✅ Yes, accounting document |
| Numbering | Own sequence (CN-001) |

---

## When to Issue a Credit Note?

| Situation | Credit Note Type |
|-----------|------------------|
| Billing error | Full credit + new invoice |
| Goods return | Partial or full credit |
| Discount granted afterwards | Credit for discount amount |
| Order cancellation | Full credit |
| Resolved dispute | Negotiated credit |
| Overpayment | Credit for excess amount |

<div class="warning-box">
<h4>⚠️ Golden Rule</h4>
<p>You <strong>never</strong> delete an invoice. You cancel it with a credit note to maintain accounting traceability.</p>
</div>

---

## Required Credit Note Mentions

| Mention | Required | Example |
|---------|----------|---------|
| **"CREDIT NOTE"** | ✅ Yes | As title |
| Credit note number | ✅ Yes | CN-2025-001 |
| Issue date | ✅ Yes | 12/23/2025 |
| Original invoice reference | ✅ Yes | "Cancels INV-2025-042" |
| Issuer details | ✅ Yes | Name, address, tax ID |
| Client details | ✅ Yes | Same as invoice |
| Credit note reason | ✅ Recommended | "Goods return" |
| Amount excl. tax | ✅ Yes | -€500.00 |
| VAT | ✅ Yes | -€100.00 |
| Amount incl. tax | ✅ Yes | -€600.00 |

---

## Full vs Partial Credit

| Type | Use | Amount |
|------|-----|--------|
| **Full credit** | Complete cancellation | = Original invoice |
| **Partial credit** | Partial correction/return | < Original invoice |

---

## Issuance Procedure

| Step | Action |
|------|--------|
| 1 | Identify the invoice concerned |
| 2 | Create credit note with reference |
| 3 | Indicate the reason |
| 4 | Calculate amounts (negative) |
| 5 | Number the credit note |
| 6 | Send to client |
| 7 | Record the credit note |

---

## Credit Note Numbering

| Method | Example | Advantage |
|--------|---------|-----------|
| Own sequence | CN-2025-001 | Clear and distinct |
| Invoice prefix | INV-2025-042-CN | Visible link |
| Mixed | CN-INV42-001 | Direct reference |

<div class="info-box blue">
<h4>Tip</h4>
<p>Use separate numbering (CN-001, CN-002...) to easily distinguish credit notes from invoices.</p>
</div>

---

## Accounting Impact

| Entry | Debit | Credit |
|-------|-------|--------|
| Initial invoice | Customer | Sales + VAT |
| Credit note | Sales + VAT | Customer |

---

## Refund or Deduction?

| Option | When to Use |
|--------|-------------|
| **Refund** | Client with no pending invoices |
| **Deduction** | Apply to next invoice |
| **Offset** | Deduct from unpaid invoices |

---

## Common Mistakes

| ❌ Mistake | ✅ Solution |
|------------|-------------|
| Delete the invoice | Issue a credit note |
| No reference | Always cite original invoice |
| Positive amount | Credit notes are negative |
| Forget VAT | Also correct the VAT |
| No reason | Indicate the cause |

---

## Issuance Deadline

| Context | Recommended Deadline |
|---------|---------------------|
| Error detected | Immediate |
| Goods return | Upon receipt of return |
| Dispute | At resolution |
| Year-end close | Before accounting close |

---

<div class="cta-box">
<h3>Manage Your Credit Notes Simply</h3>
<p>InvoiceDesign automatically generates your credit notes with all legal mentions.</p>
</div>
`,
};
