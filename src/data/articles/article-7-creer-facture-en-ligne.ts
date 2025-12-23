import { Article } from './types';

export const articleCreerFactureEnLigne: Article = {
  slug: 'creer-facture-en-ligne-guide',
  title: 'Créer une facture en ligne : guide rapide et gratuit',
  titleEn: 'Create an Invoice Online: Quick and Free Guide',
  description: 'Comment créer une facture en ligne facilement ? Tutoriel étape par étape pour faire une facture professionnelle gratuitement.',
  descriptionEn: 'How to easily create an invoice online? Step-by-step tutorial to make a professional invoice for free.',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  category: 'tutorial',
  readTime: 4,
  author: 'InvoiceDesign',
  publishedAt: '2025-12-23',
  tags: [
    'créer facture en ligne', 'facture gratuite', 'logiciel facturation',
    'faire une facture', 'facture PDF', 'générateur facture',
    'facturation en ligne', 'outil facturation', 'facture rapide'
  ],
  tagsEn: [
    'create invoice online', 'free invoice', 'invoicing software',
    'make an invoice', 'PDF invoice', 'invoice generator',
    'online invoicing', 'invoicing tool', 'quick invoice'
  ],
  content: `
## Pourquoi créer ses factures en ligne ?

| Avantage | Détail |
|----------|--------|
| ⚡ **Rapidité** | Créez une facture en moins de 2 minutes |
| ✅ **Conformité** | Mentions légales automatiques |
| 💾 **Sauvegarde** | Vos factures stockées en sécurité |
| 📱 **Accessibilité** | Depuis n'importe quel appareil |
| 💰 **Économie** | Plus besoin de logiciel payant |

---

## Étape 1 : Vos informations

Renseignez vos coordonnées :

| Information | Exemple |
|-------------|---------|
| Nom / Raison sociale | DUPONT Jean EI |
| Adresse | 12 rue de Paris, 75001 Paris |
| SIRET | 123 456 789 00012 |
| N° TVA (si applicable) | FR12345678901 |
| Email | contact@dupont.fr |
| Téléphone | 01 23 45 67 89 |

---

## Étape 2 : Informations client

| Champ | B2B | B2C |
|-------|-----|-----|
| Nom / Société | ✅ Obligatoire | ✅ Obligatoire |
| Adresse | ✅ Obligatoire | ✅ Obligatoire |
| SIRET | Recommandé | Non requis |
| N° TVA | Si UE | Non requis |

---

## Étape 3 : Détail des prestations

Pour chaque ligne :

| Colonne | Description |
|---------|-------------|
| **Désignation** | Description claire du produit/service |
| **Quantité** | Nombre d'unités |
| **Unité** | pièce, heure, jour, m², kg... |
| **Prix unitaire HT** | Prix hors taxes |
| **TVA** | 20%, 10%, 5,5% ou 0% |

<div class="info-box blue">
<h4>Conseil</h4>
<p>Soyez précis dans vos descriptions pour éviter les litiges.</p>
</div>

---

## Étape 4 : Numérotation

| Règle | Exemple |
|-------|---------|
| Chronologique | FA-001, FA-002, FA-003 |
| Par année | FA-2025-001, FA-2025-002 |
| Unique | Jamais deux fois le même numéro |
| Sans trou | Pas de FA-001, FA-003 |

---

## Étape 5 : Conditions de paiement

| Élément | Recommandation |
|---------|----------------|
| Délai | 30 jours (standard B2B) |
| Moyens | Virement, chèque, carte |
| IBAN | Pour faciliter le paiement |
| Pénalités | Taux légal + indemnité 40€ |

---

## Étape 6 : Export et envoi

| Format | Usage |
|--------|-------|
| **PDF** | Envoi par email, archivage |
| **Impression** | Client particulier |
| **Lien** | Partage direct |

---

## Checklist avant envoi

| ✓ | Vérification |
|---|--------------|
| ☐ | Numéro de facture unique |
| ☐ | Date d'émission correcte |
| ☐ | Coordonnées complètes (vous et client) |
| ☐ | SIRET présent |
| ☐ | TVA correcte ou mention franchise |
| ☐ | Totaux exacts |
| ☐ | Conditions de paiement |
| ☐ | Pénalités de retard mentionnées |

---

## Les erreurs à éviter

| ❌ Ne pas faire | ✅ Faire |
|-----------------|----------|
| Numéro en double | Numérotation chronologique stricte |
| Oublier le SIRET | Toujours l'afficher |
| TVA incorrecte | Vérifier le taux applicable |
| Pas de date limite | Indiquer l'échéance |

---

<div class="cta-box">
<h3>Créez votre première facture maintenant</h3>
<p>Gratuit, rapide, professionnel. Essayez InvoiceDesign.</p>
</div>
`,
  contentEn: `
## Why Create Invoices Online?

| Advantage | Detail |
|-----------|--------|
| ⚡ **Speed** | Create an invoice in under 2 minutes |
| ✅ **Compliance** | Automatic legal mentions |
| 💾 **Backup** | Your invoices stored securely |
| 📱 **Accessibility** | From any device |
| 💰 **Savings** | No need for paid software |

---

## Step 1: Your Information

Enter your details:

| Information | Example |
|-------------|---------|
| Name / Company | SMITH John EI |
| Address | 123 Main St, Paris 75001 |
| SIRET | 123 456 789 00012 |
| VAT No. (if applicable) | FR12345678901 |
| Email | contact@smith.com |
| Phone | +33 1 23 45 67 89 |

---

## Step 2: Client Information

| Field | B2B | B2C |
|-------|-----|-----|
| Name / Company | ✅ Required | ✅ Required |
| Address | ✅ Required | ✅ Required |
| SIRET | Recommended | Not required |
| VAT No. | If EU | Not required |

---

## Step 3: Service Details

For each line:

| Column | Description |
|--------|-------------|
| **Description** | Clear product/service description |
| **Quantity** | Number of units |
| **Unit** | piece, hour, day, m², kg... |
| **Unit price excl. tax** | Price before tax |
| **VAT** | 20%, 10%, 5.5% or 0% |

<div class="info-box blue">
<h4>Tip</h4>
<p>Be precise in your descriptions to avoid disputes.</p>
</div>

---

## Step 4: Numbering

| Rule | Example |
|------|---------|
| Sequential | INV-001, INV-002, INV-003 |
| By year | INV-2025-001, INV-2025-002 |
| Unique | Never use same number twice |
| No gaps | Not INV-001, INV-003 |

---

## Step 5: Payment Terms

| Element | Recommendation |
|---------|----------------|
| Deadline | 30 days (standard B2B) |
| Methods | Wire transfer, check, card |
| IBAN | To facilitate payment |
| Penalties | Legal rate + €40 fee |

---

## Step 6: Export and Send

| Format | Use |
|--------|-----|
| **PDF** | Email sending, archiving |
| **Print** | Individual customers |
| **Link** | Direct sharing |

---

## Checklist Before Sending

| ✓ | Verification |
|---|--------------|
| ☐ | Unique invoice number |
| ☐ | Correct issue date |
| ☐ | Complete details (you and client) |
| ☐ | SIRET present |
| ☐ | Correct VAT or franchise mention |
| ☐ | Accurate totals |
| ☐ | Payment terms |
| ☐ | Late payment penalties mentioned |

---

## Mistakes to Avoid

| ❌ Don't | ✅ Do |
|----------|-------|
| Duplicate number | Strict sequential numbering |
| Forget SIRET | Always display it |
| Incorrect VAT | Verify applicable rate |
| No due date | Indicate the deadline |

---

<div class="cta-box">
<h3>Create Your First Invoice Now</h3>
<p>Free, fast, professional. Try InvoiceDesign.</p>
</div>
`,
};
