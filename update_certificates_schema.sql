-- 1. Drop foreign key constraint on student_id if it exists
ALTER TABLE public.certificates DROP CONSTRAINT IF EXISTS certificates_student_id_fkey;

-- 2. Drop the index on student_id if it exists
DROP INDEX IF EXISTS public.idx_certificates_student_id;

-- 3. Drop student_id column from certificates table
ALTER TABLE public.certificates DROP COLUMN IF EXISTS student_id;

-- 4. Ensure student_name text column exists in certificates table
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS student_name TEXT;

-- 5. Update public verification search function RPC
CREATE OR REPLACE FUNCTION public.verify_certificate(p_search_query text)
RETURNS TABLE (
  certificate_id TEXT,
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
    c.student_name,
    c.course,
    c.issue_date,
    c.certificate_file_path,
    c.status
  FROM public.certificates c
  WHERE c.certificate_id = p_search_query;
END;
$$ LANGUAGE plpgsql;
