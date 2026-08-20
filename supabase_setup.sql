-- ==========================================
-- SUPABASE BASE TABLE CONFIGURATION
-- Run this in your Supabase SQL Editor.
-- ==========================================

-- Enable pgcrypto for password generation / general crypto functions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Create students table
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    course TEXT NOT NULL,
    batch TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Indices for students
CREATE INDEX IF NOT EXISTS idx_students_student_id ON public.students(student_id);

-- 2. Create certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_id TEXT UNIQUE NOT NULL,
    student_id TEXT REFERENCES public.students(student_id) ON DELETE CASCADE NOT NULL,
    course TEXT NOT NULL,
    issue_date DATE NOT NULL,
    certificate_file_path TEXT NOT NULL,
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'REVOKED')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Indices for certificates
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_id ON public.certificates(certificate_id);
CREATE INDEX IF NOT EXISTS idx_certificates_student_id ON public.certificates(student_id);

-- 3. Create admin_profiles table
-- Note: id refers to auth.users(id). It can be NULL for pre-authorized admins who haven't signed up yet.
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('SUPER_ADMIN', 'ADMIN')) NOT NULL,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('ACTIVE', 'PENDING', 'DISABLED')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT pk_admin_profiles PRIMARY KEY (email)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- ROLE MANAGEMENT HELPER FUNCTIONS
-- ==========================================

-- Check if user is an active admin (either ADMIN or SUPER_ADMIN)
CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND status = 'ACTIVE'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is an active super admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND role = 'SUPER_ADMIN' AND status = 'ACTIVE'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- ROW LEVEL SECURITY POLICIES
-- ==========================================

-- A. Policies for students table
CREATE POLICY "Admins can view students" ON public.students
    FOR SELECT TO authenticated USING (public.is_active_admin());

CREATE POLICY "Admins can insert students" ON public.students
    FOR INSERT TO authenticated WITH CHECK (public.is_active_admin());

CREATE POLICY "Admins can update students" ON public.students
    FOR UPDATE TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

CREATE POLICY "Super Admins can delete students" ON public.students
    FOR DELETE TO authenticated USING (public.is_super_admin());

-- B. Policies for certificates table
CREATE POLICY "Admins can view certificates" ON public.certificates
    FOR SELECT TO authenticated USING (public.is_active_admin());

CREATE POLICY "Admins can insert certificates" ON public.certificates
    FOR INSERT TO authenticated WITH CHECK (public.is_active_admin());

CREATE POLICY "Admins can update certificates" ON public.certificates
    FOR UPDATE TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

CREATE POLICY "Super Admins can delete certificates" ON public.certificates
    FOR DELETE TO authenticated USING (public.is_super_admin());

-- C. Policies for admin_profiles table
CREATE POLICY "Admins can view admin profiles" ON public.admin_profiles
    FOR SELECT TO authenticated USING (public.is_active_admin() OR auth.uid() = id);

CREATE POLICY "Super Admins can manage admin profiles" ON public.admin_profiles
    FOR ALL TO authenticated USING (public.is_super_admin()) WITH CHECK (public.is_super_admin());

-- ==========================================
-- PUBLIC VERIFICATION SEARCH FUNCTION (RPC)
-- ==========================================
-- This provides secure, read-only search functionality to the public without exposing the raw tables.
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
    s.full_name as student_name,
    c.course,
    c.issue_date,
    c.certificate_file_path,
    c.status
  FROM public.certificates c
  JOIN public.students s ON c.student_id = s.student_id
  WHERE c.certificate_id = p_search_query OR c.student_id = p_search_query;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- AUTH SIGNUP TRIGGER
-- ==========================================
-- Triggers when a new user signs up. If the email has been pre-authorized in admin_profiles,
-- we link the user's UUID and activate their account.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.admin_profiles WHERE email = NEW.email AND id IS NULL) THEN
    UPDATE public.admin_profiles
    SET id = NEW.id, status = 'ACTIVE', updated_at = now()
    WHERE email = NEW.email;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- SETUP FIRST SUPER ADMIN INSTRUCTIONS
-- ==========================================
/*
To configure the first SUPER_ADMIN account:
1. Go to the "Users" tab under Authentication in your Supabase Dashboard.
2. Click "Add User" -> "Create User". Enter the admin's email and a secure password.
3. Note the User UID (UUID) created for this user.
4. Open the SQL Editor and execute:

   INSERT INTO public.admin_profiles (id, email, role, status)
   VALUES ('YOUR_USER_UUID', 'admin@pointeritinfo.org', 'SUPER_ADMIN', 'ACTIVE');
   
This completes the first Super Admin setup securely.
*/
