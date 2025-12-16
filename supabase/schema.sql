-- =============================================
-- InvoiceDesign Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT DEFAULT 'Nouvelle facture',
  invoice_number TEXT,
  data JSONB NOT NULL,
  template TEXT DEFAULT 'classic',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create index for faster queries
CREATE INDEX IF NOT EXISTS invoices_user_id_idx ON invoices(user_id);
CREATE INDEX IF NOT EXISTS invoices_created_at_idx ON invoices(created_at DESC);

-- 4. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- 5. Profiles policies
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 6. Invoices policies
CREATE POLICY "Users can view own invoices" 
  ON invoices FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own invoices" 
  ON invoices FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own invoices" 
  ON invoices FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own invoices" 
  ON invoices FOR DELETE 
  USING (auth.uid() = user_id);

-- 7. Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Trigger to call function on new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- 11. Storage Policies for 'Facture' bucket
-- Run this AFTER creating the bucket in Supabase Dashboard
-- =============================================

-- Allow users to upload files to their own folder
CREATE POLICY "Users can upload own invoices"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'Facture' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to view their own files
CREATE POLICY "Users can view own invoices"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'Facture' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to update their own files
CREATE POLICY "Users can update own invoices"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'Facture' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own files
CREATE POLICY "Users can delete own invoices"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'Facture' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow public read access since bucket is public
CREATE POLICY "Public can read invoices"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'Facture');
