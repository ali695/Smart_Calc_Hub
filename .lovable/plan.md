# SmartCalc CMS Dashboard — Implementation Plan

## Goal
A `/admin` dashboard where authorized users can manage blog posts, edit text on existing pages, edit SEO/content of existing calculators, and create entirely new calculators (with custom inputs + formulas) — all without touching code and without breaking the live site or its responsiveness.

---

## Scope

### 1. Roles & Access
- Extend the existing `app_role` enum with `editor` (already has `admin`, `moderator`, `user`).
- **Admin**: full access (manage users/roles, all content, create calculators).
- **Editor**: edit blogs, page text, and calculator SEO content. Cannot create new calculators or manage users.
- Login uses the existing email/password auth. Admin invites users from the dashboard (creates a row in `user_roles`).
- All dashboard routes are guarded by `useAdminCheck` / new `useEditorCheck` hooks + RLS.

### 2. Blog Management (WYSIWYG)
- New table `blog_posts` (title, slug, excerpt, content_html, content_json, cover_image, author_id, status: draft/published, published_at, seo_title, seo_description, tags[]).
- TipTap rich-text editor (bold, headings, lists, links, images, code, quote).
- Image uploads → new Storage bucket `blog-images`.
- List view with search + filter by status.
- Existing blog pages (`/blog`, `/blog/:slug`) read from DB instead of static data.
- Existing static blog data is migrated into the table once.

### 3. Page Text Editing (Home, About, Contact, FAQ, Privacy, Terms)
- New table `page_content` (page_key, block_key, value_text, value_html, updated_at, updated_by).
- Frontend pages get an `useEditableText(pageKey, blockKey, fallback)` hook → returns the DB value if it exists, else the hard-coded fallback. Zero risk: if DB is empty everything renders exactly as today.
- Dashboard shows a per-page form listing every editable block with its current value and a textarea / rich-text input.
- FAQ page: editable list of Q/A pairs (separate `faq_items` table).

### 4. Calculator Management
**Two kinds of calculators coexist:**

- **Code calculators** (the 130+ existing ones): editable fields = title, description, SEO content, FAQs, related-calculator list, category. Math/UI stays in code (safest — these are battle-tested).
- **Custom calculators** (new, dashboard-built): full JSON definition stored in DB and rendered by a single generic React component.

**New table `calculators_cms`:**
- `slug` (unique), `name`, `category`, `description`, `icon`, `keywords[]`
- `seo_title`, `seo_description`, `seo_content_html`
- `is_custom` (boolean) — false = code calculator (only metadata/SEO editable), true = JSON-defined
- `definition` (jsonb) — for custom calculators only; schema below
- `status` (draft/published), `created_by`, timestamps

**Custom calculator JSON schema:**
```text
{
  "inputs": [
    { "key": "principal", "label": "Loan amount", "type": "number",
      "min": 0, "max": 1e9, "default": 10000, "unit": "USD" },
    { "key": "rate", "label": "Interest rate", "type": "number", "unit": "%" },
    { "key": "compound", "label": "Compounding", "type": "select",
      "options": [{ "value": "monthly", "label": "Monthly" }] }
  ],
  "outputs": [
    { "key": "monthly", "label": "Monthly payment",
      "formula": "principal * (rate/1200) / (1 - (1 + rate/1200)^(-years*12))",
      "format": "currency" }
  ]
}
```
- Formulas evaluated safely with `mathjs` (no `eval`). Inputs whitelisted; allowed identifiers limited to declared input keys. Errors caught and shown inline.
- Dashboard builder: add/remove input rows, add/remove output rows, live preview pane.
- A new route `/calculator/:slug` fallback resolves custom calculators from DB when no code route matches.

### 5. Dashboard UI
- Sidebar layout under `/admin`: Dashboard · Blogs · Pages · Calculators · Users (admin only) · Settings.
- Reuses existing shadcn components (Card, Table, Form, Tabs).
- Mobile responsive (collapsible sidebar).

### 6. Security
- All tables have strict RLS:
  - Public read for `published` blogs, `published` calculators_cms, all `page_content`.
  - Insert/update/delete restricted to `has_role(auth.uid(), 'admin')` or `has_role(auth.uid(), 'editor')` per table.
  - Only admins can write to `user_roles` (server-side function `assign_role`).
- Storage bucket `blog-images`: public read, authenticated upload, admin/editor delete.
- Input validation on every form using zod.
- HTML sanitized with DOMPurify before rendering rich text.

### 7. Migration & Safety
- All new pieces are **additive**. Existing calculators, pages, and blogs keep working untouched until you opt-in by editing them.
- A one-time SQL seed copies existing static blog posts into `blog_posts` so the DB-backed blog page shows the same content from day one.
- Prerender script keeps working: it will continue to crawl routes, picking up DB content via the live React app.

---

## Technical Detail (for reference)

### New tables
- `blog_posts`, `blog_categories` (optional), `page_content`, `faq_items`, `calculators_cms`
- Extend enum: `ALTER TYPE app_role ADD VALUE 'editor';`

### New libs
- `@tiptap/react` + starter-kit + image/link extensions
- `mathjs` (safe expression eval)
- `dompurify` + `isomorphic-dompurify`

### New routes
- `/admin` (overview), `/admin/blogs`, `/admin/blogs/new`, `/admin/blogs/:id`
- `/admin/pages`, `/admin/pages/:key`
- `/admin/calculators`, `/admin/calculators/new`, `/admin/calculators/:slug`
- `/admin/users` (admin only)

### New hooks/components
- `useEditableText`, `useEditableHtml`, `useEditableList`
- `<RichTextEditor>`, `<RichTextRender>`
- `<DynamicCalculator definition={...} />`
- `useEditorCheck`

### Build order (so I can ship in clean phases)
1. DB migration (tables, RLS, role enum, storage bucket) + types regen
2. Admin shell + role guards + Users page
3. Blog CMS (editor + list + public page wiring + seed)
4. Page-content CMS (key/value + hook + wire 6 static pages)
5. Calculator CMS — metadata/SEO for existing calculators
6. Calculator CMS — dynamic builder + safe formula runtime + public renderer
7. QA: responsive check, prerender re-run, RLS spot-check

Each phase is independently shippable; I'll pause for your "go" between phases so we can verify nothing on the live site regressed.

---

## Confirmations needed before I start
- OK to add `editor` role to the existing `app_role` enum?
- OK to migrate existing static blog data into the DB (one-time copy, originals stay in code as fallback)?
- For custom calculators, is `mathjs` formula syntax (`a + b * sqrt(c)`) acceptable, or do you want a visual no-formula builder later?

Reply **"go"** to start with **Phase 1 (DB migration + admin shell + roles)**, or tell me which phase to prioritize.