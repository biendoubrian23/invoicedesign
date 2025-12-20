-- =============================================
-- USER BUSINESS INFO TABLE
-- Stores the user's own company/business information
-- This is used as the default "issuer" on all invoices
-- =============================================

CREATE TABLE IF NOT EXISTS public.user_business_info (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Company information
  company_name TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'France',
  
  -- Contact information
  email TEXT,
  phone TEXT,
  website TEXT,
  
  -- Legal information
  siret TEXT,
  tva_number TEXT,  -- Numéro de TVA intracommunautaire
  ape_code TEXT,    -- Code APE/NAF
  rcs TEXT,         -- RCS (Registre du Commerce)
  
  -- Banking information (optional)
  iban TEXT,
  bic TEXT,
  bank_name TEXT,
  
  -- Logo (stored as base64 or URL)
  logo TEXT,
  
  -- Default settings
  default_currency TEXT DEFAULT '€',
  default_tax_rate DECIMAL(5,2) DEFAULT 20.00,
  default_payment_terms TEXT DEFAULT 'Paiement sous 30 jours par virement bancaire',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.user_business_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own business info"
  ON public.user_business_info FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own business info"
  ON public.user_business_info FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own business info"
  ON public.user_business_info FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own business info"
  ON public.user_business_info FOR DELETE
  USING (auth.uid() = user_id);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_business_info_user_id ON public.user_business_info(user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_business_info_updated_at
  BEFORE UPDATE ON public.user_business_info
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
