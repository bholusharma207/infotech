-- 1. Ensure student_name text column exists in certificates table
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS student_name TEXT;

-- 2. Populate student_name from students table for existing records where it is null
UPDATE public.certificates c
SET student_name = s.full_name
FROM public.students s
WHERE c.student_id = s.student_id AND c.student_name IS NULL;

-- 3. Drop foreign key constraint on student_id if it exists
ALTER TABLE public.certificates DROP CONSTRAINT IF EXISTS certificates_student_id_fkey;

-- 4. Drop the index on student_id if it exists
DROP INDEX IF EXISTS public.idx_certificates_student_id;

-- 5. Drop student_id column from certificates table
ALTER TABLE public.certificates DROP COLUMN IF EXISTS student_id;

-- 6. Update public verification search function RPC
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
  WHERE c.certificate_id = p_search_query OR LOWER(c.student_name) = LOWER(p_search_query);
END;
$$ LANGUAGE plpgsql;

-- 7. Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
