-- Migration: Ajouter billing_period pour distinguer mensuel/annuel
-- Exécuter dans Supabase SQL Editor

-- Ajouter la colonne billing_period à profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS billing_period TEXT DEFAULT 'monthly' CHECK (billing_period IN ('monthly', 'yearly'));

-- Ajouter billing_period à transactions aussi pour l'historique
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS billing_period TEXT CHECK (billing_period IN ('monthly', 'yearly'));
