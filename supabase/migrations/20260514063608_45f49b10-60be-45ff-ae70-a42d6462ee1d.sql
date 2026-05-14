-- =========================================================
-- Helper: is_editor_or_admin
-- =========================================================
CREATE OR REPLACE FUNCTION public.is_editor_or_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin','editor')
  )
$$;

REVOKE EXECUTE ON FUNCTION public.is_editor_or_admin(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_editor_or_admin(uuid) TO authenticated;

-- =========================================================
-- BLOG POSTS
-- =========================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  content_html text NOT NULL DEFAULT '',
  content_json jsonb,
  cover_image text,
  tags text[] DEFAULT ARRAY[]::text[],
  category text,
  seo_title text,
  seo_description text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  published_at timestamptz,
  author_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blog posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published' OR public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Editors can insert blog posts"
  ON public.blog_posts FOR INSERT TO authenticated
  WITH CHECK (public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Editors can update blog posts"
  ON public.blog_posts FOR UPDATE TO authenticated
  USING (public.is_editor_or_admin(auth.uid()))
  WITH CHECK (public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Admins can delete blog posts"
  ON public.blog_posts FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================
-- PAGE CONTENT (key/value text editing)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL,
  block_key text NOT NULL,
  value_text text,
  value_html text,
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(page_key, block_key)
);

CREATE INDEX IF NOT EXISTS idx_page_content_page ON public.page_content(page_key);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read page content"
  ON public.page_content FOR SELECT USING (true);

CREATE POLICY "Editors can insert page content"
  ON public.page_content FOR INSERT TO authenticated
  WITH CHECK (public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Editors can update page content"
  ON public.page_content FOR UPDATE TO authenticated
  USING (public.is_editor_or_admin(auth.uid()))
  WITH CHECK (public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Admins can delete page content"
  ON public.page_content FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================
-- FAQ ITEMS
-- =========================================================
CREATE TABLE IF NOT EXISTS public.faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL DEFAULT 'faq',
  question text NOT NULL,
  answer_html text NOT NULL,
  category text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_faq_items_page ON public.faq_items(page_key, sort_order);

ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active FAQ items"
  ON public.faq_items FOR SELECT
  USING (is_active = true OR public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Editors can insert FAQ items"
  ON public.faq_items FOR INSERT TO authenticated
  WITH CHECK (public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Editors can update FAQ items"
  ON public.faq_items FOR UPDATE TO authenticated
  USING (public.is_editor_or_admin(auth.uid()))
  WITH CHECK (public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Admins can delete FAQ items"
  ON public.faq_items FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_faq_items_updated_at
  BEFORE UPDATE ON public.faq_items
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================
-- CALCULATORS CMS
-- =========================================================
CREATE TABLE IF NOT EXISTS public.calculators_cms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  category text,
  icon text,
  keywords text[] DEFAULT ARRAY[]::text[],
  seo_title text,
  seo_description text,
  seo_content_html text,
  is_custom boolean NOT NULL DEFAULT false,
  definition jsonb,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_calculators_cms_slug ON public.calculators_cms(slug);
CREATE INDEX IF NOT EXISTS idx_calculators_cms_status ON public.calculators_cms(status);

ALTER TABLE public.calculators_cms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published calculators"
  ON public.calculators_cms FOR SELECT
  USING (status = 'published' OR public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Editors can insert calculators"
  ON public.calculators_cms FOR INSERT TO authenticated
  WITH CHECK (public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Editors can update calculators"
  ON public.calculators_cms FOR UPDATE TO authenticated
  USING (public.is_editor_or_admin(auth.uid()))
  WITH CHECK (public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Admins can delete calculators"
  ON public.calculators_cms FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_calculators_cms_updated_at
  BEFORE UPDATE ON public.calculators_cms
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================
-- assign_role: admin-only function to grant roles
-- =========================================================
CREATE OR REPLACE FUNCTION public.assign_role(_target_user uuid, _role app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can assign roles';
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_target_user, _role)
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.assign_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.assign_role(uuid, app_role) TO authenticated;

CREATE OR REPLACE FUNCTION public.revoke_role(_target_user uuid, _role app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can revoke roles';
  END IF;

  DELETE FROM public.user_roles
  WHERE user_id = _target_user AND role = _role;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.revoke_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.revoke_role(uuid, app_role) TO authenticated;

-- =========================================================
-- STORAGE: blog-images bucket
-- =========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Editors can upload blog images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Editors can update blog images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'blog-images' AND public.is_editor_or_admin(auth.uid()));

CREATE POLICY "Editors can delete blog images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'blog-images' AND public.is_editor_or_admin(auth.uid()));