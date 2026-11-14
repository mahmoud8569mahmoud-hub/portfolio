# Timo Portfolio — Supabase & Vercel Deployment Guide

## 1. Supabase Setup Instructions

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New Project** and name it `timo-portfolio`.
3. Choose a strong database password and select your closest region (e.g., Frankfurt / London).

### Step 2: Create Database Tables (SQL Editor)
Open the **SQL Editor** tab in your Supabase dashboard and run this SQL script:

```sql
-- 1. Create table for editable site content
create table site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create table for portfolio projects
create table projects (
  id text primary key,
  title_ar text not null,
  title_en text not null,
  description_ar text,
  description_en text,
  category text not null,
  tags text[],
  cover_image text,
  gallery text[],
  order_index integer default 0,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table site_content enable row level security;
alter table projects enable row level security;

-- Public read access (visitors can view projects and content)
create policy "Allow public read access to site_content"
  on site_content for select
  using (true);

create policy "Allow public read access to published projects"
  on projects for select
  using (is_published = true);

-- Authenticated / Admin write access
create policy "Allow admin full access to site_content"
  on site_content for all
  using (auth.role() = 'authenticated');

create policy "Allow admin full access to projects"
  on projects for all
  using (auth.role() = 'authenticated');
```

### Step 3: Create Storage Bucket for Uploads
1. Go to **Storage** -> **New Bucket**.
2. Name the bucket `portfolio`.
3. Make it **Public** so uploaded cover images and gallery items load smoothly for visitors.

### Step 4: Get API Credentials
1. Go to **Project Settings** -> **API**.
2. Copy:
   - `Project URL` -> `NEXT_PUBLIC_SUPABASE_URL`
   - `anon / public` key -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key -> `SUPABASE_SERVICE_ROLE_KEY`

---

## 2. Vercel Deployment

1. Push your project to GitHub or GitLab.
2. In [Vercel](https://vercel.com), click **Add New** -> **Project** and select your repository.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL` = `timo@portfolio.com` (or your preferred email)
   - `ADMIN_PASSWORD` = (choose a strong password)
   - `ADMIN_SECRET_KEY` = (any random 32+ character string)
4. Click **Deploy**. Your portfolio will be live worldwide on Vercel's Edge Network!

---

## 3. Security Confirmation for `/admin`

- **Server-Side Protection**: All `/admin` pages are strictly guarded by `src/middleware.ts`. Any unauthenticated request is blocked and redirected to `/admin/login`.
- **API Endpoint Guard**: `/api/content` (POST), `/api/projects` (POST, PUT, DELETE), and `/api/upload` (POST) verify the secure HMAC session token on every request.
- **Nobody without your exact email and password can modify content, upload images, or delete projects.**
