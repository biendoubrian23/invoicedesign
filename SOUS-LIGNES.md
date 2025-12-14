# Système de Sous-lignes de Facturation

## Vue d'ensemble

Le système de sous-lignes permet de créer des factures hiérarchiques avec des lignes principales contenant des sous-prestations détaillées.

## Fonctionnalités

### 3 Modes de Calcul

#### 1. **Quantité Parent** (mode par défaut)
- Les sous-lignes n'ont **pas** de quantité individuelle
- Le total des sous-lignes est **multiplié par la quantité de la ligne parent**
- Exemple parfait pour des prestations avec plusieurs composants

**Exemple :**
```
Prestation de service (Qté: 2)
  ↳ Modélisation 3D      250 EUR
  ↳ Développement        300 EUR
  ↳ Stockage cloud        50 EUR
  Prix unitaire = 600 EUR (250+300+50)
  Total = 1200 EUR (600 × 2)
```

#### 2. **Quantités Individuelles**
- Chaque sous-ligne a **sa propre quantité**
- Utile pour des détails de commande avec quantités variables
- Le total parent = somme des totaux des sous-lignes

**Exemple :**
```
Fournitures informatiques
  ↳ Souris (Qté: 5)        25 EUR = 125 EUR
  ↳ Claviers (Qté: 3)      80 EUR = 240 EUR
  ↳ Câbles (Qté: 10)       5 EUR  = 50 EUR
  Total = 415 EUR
```

#### 3. **Sans Prix**
- Les sous-lignes sont **purement descriptives**
- Aucun prix affiché pour les sous-lignes
- Utile pour décomposer une prestation sans détailler les coûts

**Exemple :**
```
Audit de sécurité (Qté: 1, Prix: 2000 EUR)
  ↳ Analyse des vulnérabilités
  ↳ Test d'intrusion
  ↳ Rapport détaillé
  Total = 2000 EUR
```

## Utilisation

### Dans l'Éditeur

1. **Activer les sous-lignes**
   - Cliquez sur "Ajouter sous-lignes" sur une ligne
   
2. **Choisir le mode**
   - Cliquez sur le bouton "Mode: ..." 
   - Sélectionnez le mode approprié

3. **Ajouter des sous-lignes**
   - Cliquez sur "Ajouter une sous-ligne"
   - Remplissez la description et le prix

4. **Gérer les sous-lignes**
   - Utilisez le chevron pour replier/déplier
   - Modifiez ou supprimez selon vos besoins

### Dans le PDF/Aperçu

Les sous-lignes apparaissent :
- **Indentées** avec un connecteur visuel (↳)
- Avec une **bordure colorée** à gauche
- **Police plus petite** pour la distinction visuelle
- Calculs automatiques selon le mode

## Calculs Automatiques

Le système recalcule automatiquement :
- ✅ Le total de chaque sous-ligne
- ✅ Le prix unitaire de la ligne parent (en mode "Quantité Parent")
- ✅ Le total de la ligne parent
- ✅ Le sous-total HT de la facture
- ✅ La TVA
- ✅ Le total TTC

## Cas d'Usage

### Services IT
```
Développement Web (2 sprints)
  ↳ Frontend React
  ↳ Backend Node.js
  ↳ Base de données
```

### Formation
```
Formation équipe (5 personnes)
  ↳ Jour 1: Fondamentaux
  ↳ Jour 2: Avancé
  ↳ Matériel pédagogique
```

### Consulting
```
Mission de conseil
  ↳ Analyse préliminaire
  ↳ Recommandations
  ↳ Suivi post-mission
```

## Export PDF

Les sous-lignes sont **parfaitement exportées** en PDF avec :
- Mise en forme préservée
- Hiérarchie visuelle claire
- Tous les calculs corrects

Généré avec **Playwright** pour un rendu haute qualité !
