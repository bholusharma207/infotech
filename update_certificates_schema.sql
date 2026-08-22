-- 1. Add student_name column to certificates table if it doesn't exist
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS student_name TEXT;

-- 2. Make student_id column nullable in certificates table
ALTER TABLE public.certificates ALTER COLUMN student_id DROP NOT NULL;

-- 3. Update verify_certificate RPC to support direct student_name and LEFT JOIN students
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
