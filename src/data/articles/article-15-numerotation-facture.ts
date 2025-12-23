import { Article } from './types';

export const articleNumerotationFacture: Article = {
  slug: 'numerotation-facture-regles-exemples',
  title: 'Numérotation facture : règles, exemples et erreurs à éviter',
  titleEn: 'Invoice Numbering: Rules, Examples and Mistakes to Avoid',
  description: 'Comment numéroter ses factures ? Règles légales, formats recommandés et gestion des erreurs de numérotation.',
  descriptionEn: 'How to number invoices? Legal rules, recommended formats and handling numbering errors.',
  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
  category: 'tutorial',
  readTime: 5,
  author: 'InvoiceDesign',
  publishedAt: '2025-12-25',
  tags: [
    'numérotation facture', 'numéro facture', 'séquence facture',
    'format facture', 'chronologie facture', 'erreur numérotation',
    'trou numérotation', 'rupture séquence', 'obligation facture'
  ],
  tagsEn: [
    'invoice numbering', 'invoice number', 'invoice sequence',
    'invoice format', 'invoice chronology', 'numbering error',
    'numbering gap', 'sequence break', 'invoice requirement'
  ],
  content: `
## Règles de numérotation

La loi impose une numérotation des factures avec des caractéristiques précises :

| Règle | Exigence |
|-------|----------|
| **Unique** | Chaque numéro n'apparaît qu'une seule fois |
| **Chronologique** | Séquence continue dans le temps |
| **Sans rupture** | Aucun trou dans la série |
| **Inaltérable** | Non modifiable après émission |

---

## Formats recommandés

| Format | Exemple | Avantages |
|--------|---------|-----------|
| Année + séquence | 2025-0001 | Simple, lisible |
| Année + mois + séquence | 2025-12-001 | Suivi mensuel |
| Préfixe + année + séquence | FA-2025-0001 | Distingue types de docs |
| Préfixe + séquence globale | FA-00001 | Numérotation continue |

<div class="info-box blue">
<h4>Recommandation</h4>
<p>Le format <strong>Préfixe + Année + Séquence</strong> (FA-2025-0001) est le plus utilisé car il combine clarté et organisation.</p>
</div>

---

## Préfixes courants

| Préfixe | Document |
|---------|----------|
| FA ou FAC | Facture |
| AV ou AVO | Avoir |
| D ou DEV | Devis |
| PRO | Facture proforma |
| AC ou ACP | Facture d'acompte |

---

## Exemples de séquences correctes

### ✅ Séquence correcte

| Date | Numéro | Statut |
|------|--------|--------|
| 01/12/2025 | FA-2025-0001 | ✅ |
| 03/12/2025 | FA-2025-0002 | ✅ |
| 05/12/2025 | FA-2025-0003 | ✅ |
| 10/12/2025 | FA-2025-0004 | ✅ |

### ❌ Séquences incorrectes

| Problème | Exemple | Risque |
|----------|---------|--------|
| Trou | ...0002, 0004, 0005 | Suspicion de fraude |
| Double | ...0003, 0003, 0004 | Confusion comptable |
| Inversion | ...0003, 0002, 0004 | Non-chronologique |

---

## Changement d'année

| Approche | Description | Exemple |
|----------|-------------|---------|
| Remise à zéro | Nouvelle série chaque année | 2024-0999 → 2025-0001 |
| Séquence continue | Numéro global sur plusieurs années | 0999 → 1000 → 1001 |

<div class="info-box blue">
<h4>Les deux sont valides</h4>
<p>La loi autorise les deux approches. Choisissez celle qui convient le mieux à votre organisation.</p>
</div>

---

## Gestion des erreurs

### Facture annulée

| ❌ Ne pas faire | ✅ À faire |
|----------------|-----------|
| Supprimer la facture | Conserver avec mention "Annulée" |
| Réutiliser le numéro | Garder le numéro dans la séquence |
| Ne rien documenter | Émettre un avoir si nécessaire |

### Trou dans la numérotation

| Action | Détail |
|--------|--------|
| Documenter | Note explicative dans la comptabilité |
| Conserver preuve | Courrier, incident technique, etc. |
| Ne pas combler | Ne jamais "remplir" un trou après coup |

---

## Multi-séries

Vous pouvez avoir plusieurs séries distinctes :

| Série | Usage | Exemple |
|-------|-------|---------|
| FA-2025-xxxx | Factures France | FA-2025-0001 |
| FE-2025-xxxx | Factures Export | FE-2025-0001 |
| AV-2025-xxxx | Avoirs | AV-2025-0001 |
| AC-2025-xxxx | Acomptes | AC-2025-0001 |

<div class="warning-box">
<h4>⚠️ Attention</h4>
<p>Chaque série doit avoir sa propre chronologie continue. Pas de mélange entre séries.</p>
</div>

---

## Établissements multiples

| Configuration | Solution |
|---------------|----------|
| Plusieurs établissements | Préfixe par établissement |
| Exemple | PARIS-2025-001, LYON-2025-001 |
| Règle | Chaque établissement = série distincte |

---

## Logiciel de facturation

| Fonctionnalité | Importance |
|----------------|------------|
| Numérotation automatique | ✅ Essentiel |
| Blocage des doublons | ✅ Essentiel |
| Historique non modifiable | ✅ Essentiel |
| Multi-séries | ⭐ Recommandé |

---

## Sanctions

| Infraction | Risque |
|------------|--------|
| Numérotation non chronologique | Rejet de la comptabilité |
| Trous non justifiés | Présomption de fraude |
| Factures supprimées | Amende + redressement |
| Doublons | Confusion fiscale |

---

## Checklist numérotation

| Critère | ✅ |
|---------|---|
| Format unique défini | ☐ |
| Séquence chronologique | ☐ |
| Pas de trous | ☐ |
| Pas de doublons | ☐ |
| Changement année géré | ☐ |
| Logiciel fiable utilisé | ☐ |

---

## Bonnes pratiques

| Conseil | Détail |
|---------|--------|
| Définir le format au départ | Ne pas changer en cours d'année |
| Utiliser un logiciel | Évite les erreurs manuelles |
| Archiver toutes les factures | Y compris annulées |
| Documenter les incidents | Preuves en cas de contrôle |

---

<div class="cta-box">
<h3>Numérotation automatique fiable</h3>
<p>InvoiceDesign gère automatiquement la numérotation chronologique de toutes vos factures.</p>
</div>
`,
  contentEn: `
## Numbering Rules

The law requires invoice numbering with specific characteristics:

| Rule | Requirement |
|------|-------------|
| **Unique** | Each number appears only once |
| **Chronological** | Continuous sequence over time |
| **No gaps** | No holes in the series |
| **Unalterable** | Non-modifiable after issue |

---

## Recommended Formats

| Format | Example | Advantages |
|--------|---------|------------|
| Year + sequence | 2025-0001 | Simple, readable |
| Year + month + sequence | 2025-12-001 | Monthly tracking |
| Prefix + year + sequence | INV-2025-0001 | Distinguishes doc types |
| Prefix + global sequence | INV-00001 | Continuous numbering |

<div class="info-box blue">
<h4>Recommendation</h4>
<p>The format <strong>Prefix + Year + Sequence</strong> (INV-2025-0001) is most commonly used as it combines clarity and organization.</p>
</div>

---

## Common Prefixes

| Prefix | Document |
|--------|----------|
| INV | Invoice |
| CN or CRN | Credit Note |
| QT or QUO | Quote |
| PRO | Proforma Invoice |
| DEP | Deposit Invoice |

---

## Correct Sequence Examples

### ✅ Correct Sequence

| Date | Number | Status |
|------|--------|--------|
| 12/01/2025 | INV-2025-0001 | ✅ |
| 12/03/2025 | INV-2025-0002 | ✅ |
| 12/05/2025 | INV-2025-0003 | ✅ |
| 12/10/2025 | INV-2025-0004 | ✅ |

### ❌ Incorrect Sequences

| Problem | Example | Risk |
|---------|---------|------|
| Gap | ...0002, 0004, 0005 | Fraud suspicion |
| Duplicate | ...0003, 0003, 0004 | Accounting confusion |
| Inversion | ...0003, 0002, 0004 | Non-chronological |

---

## Year Change

| Approach | Description | Example |
|----------|-------------|---------|
| Reset to zero | New series each year | 2024-0999 → 2025-0001 |
| Continuous sequence | Global number across years | 0999 → 1000 → 1001 |

<div class="info-box blue">
<h4>Both Are Valid</h4>
<p>The law allows both approaches. Choose the one that best suits your organization.</p>
</div>

---

## Error Management

### Cancelled Invoice

| ❌ Don't Do | ✅ Do |
|-------------|-------|
| Delete the invoice | Keep with "Cancelled" mention |
| Reuse the number | Keep number in sequence |
| Don't document | Issue credit note if needed |

### Numbering Gap

| Action | Detail |
|--------|--------|
| Document | Explanatory note in accounting |
| Keep proof | Letter, technical incident, etc. |
| Don't fill | Never "fill in" a gap later |

---

## Multiple Series

You can have several distinct series:

| Series | Usage | Example |
|--------|-------|---------|
| INV-2025-xxxx | Domestic invoices | INV-2025-0001 |
| EXP-2025-xxxx | Export invoices | EXP-2025-0001 |
| CN-2025-xxxx | Credit notes | CN-2025-0001 |
| DEP-2025-xxxx | Deposits | DEP-2025-0001 |

<div class="warning-box">
<h4>⚠️ Warning</h4>
<p>Each series must have its own continuous chronology. No mixing between series.</p>
</div>

---

## Multiple Locations

| Configuration | Solution |
|---------------|----------|
| Multiple locations | Prefix by location |
| Example | NYC-2025-001, LA-2025-001 |
| Rule | Each location = distinct series |

---

## Invoicing Software

| Feature | Importance |
|---------|------------|
| Automatic numbering | ✅ Essential |
| Duplicate blocking | ✅ Essential |
| Unmodifiable history | ✅ Essential |
| Multi-series | ⭐ Recommended |

---

## Penalties

| Violation | Risk |
|-----------|------|
| Non-chronological numbering | Accounting rejection |
| Unjustified gaps | Fraud presumption |
| Deleted invoices | Fine + adjustment |
| Duplicates | Tax confusion |

---

## Numbering Checklist

| Criterion | ✅ |
|-----------|---|
| Unique format defined | ☐ |
| Chronological sequence | ☐ |
| No gaps | ☐ |
| No duplicates | ☐ |
| Year change handled | ☐ |
| Reliable software used | ☐ |

---

## Best Practices

| Advice | Detail |
|--------|--------|
| Define format upfront | Don't change mid-year |
| Use software | Avoids manual errors |
| Archive all invoices | Including cancelled ones |
| Document incidents | Proof in case of audit |

---

<div class="cta-box">
<h3>Reliable Automatic Numbering</h3>
<p>InvoiceDesign automatically manages chronological numbering of all your invoices.</p>
</div>
`,
};
