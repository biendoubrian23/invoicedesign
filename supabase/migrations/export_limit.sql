-- Add export count column to profiles table
-- Free users: limited to 3 exports
-- Paid users: unlimited exports

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS export_count INTEGER DEFAULT 0;

-- Reset export count when user upgrades to paid plan (handled in webhook)
