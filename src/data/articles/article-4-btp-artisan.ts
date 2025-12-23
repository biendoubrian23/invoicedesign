import { Article } from './types';

export const articleBtpArtisan: Article = {
  slug: 'facture-btp-artisan-modele',
  title: 'Facture BTP et artisan : modèle et mentions obligatoires',
  titleEn: 'Construction & Craftsman Invoice: Template and Requirements',
  description: 'Modèle de facture pour artisan du bâtiment. Mentions spécifiques BTP, autoliquidation TVA, garantie décennale.',
  descriptionEn: 'Invoice template for construction professionals. BTP-specific mentions, VAT reverse charge, ten-year warranty.',
  image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  category: 'sector',
  readTime: 5,
  author: 'InvoiceDesign',
  publishedAt: '2025-12-23',
  tags: [
    'facture BTP', 'facture artisan', 'bâtiment', 'construction', 'autoliquidation TVA',
    'garantie décennale', 'assurance RC', 'sous-traitance', 'devis travaux',
    'mentions obligatoires artisan', 'plombier', 'électricien', 'maçon'
  ],
  tagsEn: [
    'construction invoice', 'craftsman invoice', 'building', 'construction', 'VAT reverse charge',
    'ten-year warranty', 'liability insurance', 'subcontracting', 'work estimate',
    'craftsman requirements', 'plumber', 'electrician', 'mason'
  ],
  content: `
## Mentions obligatoires pour artisans du BTP

| Mention | Obligatoire | Exemple |
|---------|-------------|---------|
| N° SIRET | ✅ Oui | 123 456 789 00012 |
| N° RCS ou RM | ✅ Oui | RM Paris 123456 |
| Assurance décennale | ✅ Oui | AXA n°1234567 |
| Zone géographique garantie | ✅ Oui | France métropolitaine |
| Qualification professionnelle | ✅ Oui | Si réglementée |

---

## L'assurance décennale sur la facture

<div class="warning-box">
<h4>⚠️ Mentions assurance obligatoires</h4>
<p>Pour les travaux de construction, vous devez mentionner :</p>
<ul>
<li>Nom de l'assureur</li>
<li>Numéro du contrat</li>
<li>Couverture géographique</li>
</ul>
</div>

Exemple de mention :
> Assurance décennale : AXA France n°1234567890 - Couverture : France métropolitaine

---

## Autoliquidation de la TVA (sous-traitance)

Si vous êtes **sous-traitant** pour un donneur d'ordre assujetti à la TVA :

<div class="info-box blue">
<h4>Mention obligatoire</h4>
<p><strong>"Autoliquidation de la TVA - Article 283-2 nonies du CGI"</strong></p>
</div>

| Situation | TVA sur facture | Qui déclare la TVA ? |
|-----------|-----------------|----------------------|
| Travaux directs | ✅ Vous facturez la TVA | Vous |
| Sous-traitance BTP | ❌ Pas de TVA | Le donneur d'ordre |

---

## Structure d'une facture BTP

| Section | Contenu |
|---------|---------|
| **En-tête** | Vos coordonnées, SIRET, RM, assurance |
| **Client** | Nom, adresse du chantier |
| **Travaux** | Description détaillée par poste |
| **Matériaux** | Fournitures avec quantités |
| **Main d'œuvre** | Heures × taux horaire |
| **Total** | HT, TVA (10% ou 20%), TTC |

---

## TVA dans le bâtiment

| Type de travaux | Taux TVA |
|-----------------|----------|
| Travaux neufs | **20%** |
| Rénovation (logement +2 ans) | **10%** |
| Amélioration énergétique | **5,5%** |
| Travaux urgence/sécurité | **10%** |

<div class="info-box green">
<h4>Attestation TVA réduite</h4>
<p>Pour appliquer le taux réduit, le client doit signer l'attestation simplifiée ou normale selon les travaux.</p>
</div>

---

## Exemple de lignes de facture

| Désignation | Qté | Unité | PU HT | Total HT |
|-------------|-----|-------|-------|----------|
| Dépose ancien carrelage | 25 | m² | 15,00 € | 375,00 € |
| Fourniture carrelage 60×60 | 28 | m² | 35,00 € | 980,00 € |
| Pose carrelage + joints | 25 | m² | 45,00 € | 1 125,00 € |
| Déplacement | 1 | forfait | 50,00 € | 50,00 € |

---

## Acomptes et situations

| Document | Usage |
|----------|-------|
| **Devis** | Avant travaux, engage les 2 parties |
| **Facture d'acompte** | À la commande (30% classique) |
| **Situation de travaux** | Facturation intermédiaire chantier |
| **Facture de solde** | À la fin des travaux |

---

## Délai de paiement BTP

| Client | Délai |
|--------|-------|
| Particulier | À réception ou selon devis |
| Professionnel | 30 jours max (45 jours fin de mois) |
| Secteur public | 30 jours |

---

<div class="cta-box">
<h3>Factures BTP conformes en quelques clics</h3>
<p>InvoiceDesign intègre les mentions spécifiques au bâtiment et à l'artisanat.</p>
</div>
`,
  contentEn: `
## Mandatory Mentions for Construction Professionals

| Mention | Required | Example |
|---------|----------|---------|
| SIRET Number | ✅ Yes | 123 456 789 00012 |
| RCS or RM Number | ✅ Yes | RM Paris 123456 |
| Decennial Insurance | ✅ Yes | AXA #1234567 |
| Geographic coverage | ✅ Yes | Metropolitan France |
| Professional qualification | ✅ Yes | If regulated |

---

## Decennial Insurance on the Invoice

<div class="warning-box">
<h4>⚠️ Required Insurance Mentions</h4>
<p>For construction work, you must mention:</p>
<ul>
<li>Insurer name</li>
<li>Contract number</li>
<li>Geographic coverage</li>
</ul>
</div>

Example mention:
> Decennial insurance: AXA France #1234567890 - Coverage: Metropolitan France

---

## VAT Reverse Charge (Subcontracting)

If you are a **subcontractor** for a VAT-registered principal:

<div class="info-box blue">
<h4>Required Mention</h4>
<p><strong>"VAT reverse charge - Article 283-2 nonies of the CGI"</strong></p>
</div>

| Situation | VAT on Invoice | Who declares VAT? |
|-----------|----------------|-------------------|
| Direct work | ✅ You charge VAT | You |
| BTP Subcontracting | ❌ No VAT | The principal |

---

## BTP Invoice Structure

| Section | Content |
|---------|---------|
| **Header** | Your details, SIRET, RM, insurance |
| **Client** | Name, site address |
| **Work** | Detailed description by item |
| **Materials** | Supplies with quantities |
| **Labor** | Hours × hourly rate |
| **Total** | Excl. tax, VAT (10% or 20%), Incl. tax |

---

## VAT in Construction

| Type of Work | VAT Rate |
|--------------|----------|
| New construction | **20%** |
| Renovation (property +2 years) | **10%** |
| Energy improvement | **5.5%** |
| Emergency/safety work | **10%** |

<div class="info-box green">
<h4>Reduced VAT Certificate</h4>
<p>To apply the reduced rate, the client must sign the simplified or standard certificate depending on the work.</p>
</div>

---

## Invoice Line Example

| Description | Qty | Unit | Unit Price | Total |
|-------------|-----|------|------------|-------|
| Remove old tiles | 25 | m² | €15.00 | €375.00 |
| Supply 60×60 tiles | 28 | m² | €35.00 | €980.00 |
| Install tiles + grouting | 25 | m² | €45.00 | €1,125.00 |
| Travel | 1 | flat | €50.00 | €50.00 |

---

## Deposits and Progress Billing

| Document | Use |
|----------|-----|
| **Quote** | Before work, commits both parties |
| **Deposit invoice** | At order (typically 30%) |
| **Progress billing** | Intermediate site invoicing |
| **Final invoice** | At completion |

---

## BTP Payment Terms

| Client | Deadline |
|--------|----------|
| Individual | On receipt or per quote |
| Professional | 30 days max (45 days end of month) |
| Public sector | 30 days |

---

<div class="cta-box">
<h3>Compliant BTP Invoices in a Few Clicks</h3>
<p>InvoiceDesign includes construction and craft-specific mentions.</p>
</div>
`,
};
