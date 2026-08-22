-- ======================================================
-- 1. CERTIFICATE DATABASE SCHEMA UPDATES
-- ======================================================

-- Add student_name column to certificates table if it doesn't exist
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS student_name TEXT;

-- Make student_id column nullable in certificates table
ALTER TABLE public.certificates ALTER COLUMN student_id DROP NOT NULL;

-- Update verify_certificate RPC to support direct student_name and LEFT JOIN students
CREATE OR REPLACE FUNCTION public.verify_certificate(p_search_query text)
RETURNS TABLE (
  certificate_id TEXT,
  student_id TEXT,
  student_name TEXT,
  course TEXT,
  issue_date DATE,
  certificate_file_path TEXT,
  status TEXT
) SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.certificate_id,
    c.student_id,
    COALESCE(c.student_name, s.full_name) as student_name,
    c.course,
    c.issue_date,
    c.certificate_file_path,
    c.status
  FROM public.certificates c
  LEFT JOIN public.students s ON c.student_id = s.student_id
  WHERE c.certificate_id = p_search_query OR c.student_id = p_search_query;
END;
$$ LANGUAGE plpgsql;

-- ======================================================
-- 2. SUPABASE STORAGE CONFIGURATION
-- ======================================================

-- Ensure storage bucket 'certificates' exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist to prevent duplicate key errors
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Admins Can Upload Certificates" ON storage.objects;
DROP POLICY IF EXISTS "Admins Can Update Certificates" ON storage.objects;
DROP POLICY IF EXISTS "Admins Can Delete Certificates" ON storage.objects;

-- Create Storage policies for the 'certificates' bucket

-- A. Allow public read access to read/download certificates
CREATE POLICY "Public Read Access" ON storage.objects
    FOR SELECT TO public USING (bucket_id = 'certificates');

-- B. Allow authenticated active admins to upload new certificate PDFs
CREATE POLICY "Admins Can Upload Certificates" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (
        bucket_id = 'certificates' AND
        (SELECT public.is_active_admin())
    );

-- C. Allow authenticated active admins to update existing objects
CREATE POLICY "Admins Can Update Certificates" ON storage.objects
    FOR UPDATE TO authenticated USING (
        bucket_id = 'certificates' AND
        (SELECT public.is_active_admin())
    ) WITH CHECK (
        bucket_id = 'certificates' AND
        (SELECT public.is_active_admin())
    );

-- D. Allow authenticated active admins to delete objects
CREATE POLICY "Admins Can Delete Certificates" ON storage.objects
    FOR DELETE TO authenticated USING (
        bucket_id = 'certificates' AND
        (SELECT public.is_active_admin())
    );
