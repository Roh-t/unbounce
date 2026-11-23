-- Unbounce CRO Platform — Supabase PostgreSQL Schema & Security Policies
-- Full schema for users, landing pages, multi-variant testing, leads, and analytics

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS & PROFILES TABLE
create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text not null,
  workspace_name text not null default 'My Workspace',
  plan text not null default 'Experiment',
  created_at timestamptz not null default now()
);

-- Enable RLS for users
alter table public.users enable row level security;

create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

-- 2. LANDING PAGES TABLE
create table if not exists public.landing_pages (
  id text primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  slug text unique not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  category text not null default 'SaaS',
  template_id text,
  content_json jsonb not null default '{}'::jsonb,
  variant_b_json jsonb,
  ab_test_enabled boolean not null default false,
  ab_split_percent int not null default 50,
  views int not null default 0,
  conversions int not null default 0,
  variant_a_views int not null default 0,
  variant_b_views int not null default 0,
  variant_a_conversions int not null default 0,
  variant_b_conversions int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for lightning fast lookups
create index if not exists idx_pages_user on public.landing_pages(user_id);
create index if not exists idx_pages_slug on public.landing_pages(slug);
create index if not exists idx_pages_status on public.landing_pages(status);

-- Enable RLS for landing_pages
alter table public.landing_pages enable row level security;

create policy "Users can CRUD their own landing pages"
  on public.landing_pages for all
  using (auth.uid() = user_id);

create policy "Public can view published landing pages by slug"
  on public.landing_pages for select
  using (status = 'published');

-- 3. LEADS TABLE
create table if not exists public.leads (
  id text primary key,
  page_id text not null references public.landing_pages(id) on delete cascade,
  page_title text not null,
  variant text not null default 'A' check (variant in ('A', 'B')),
  name text not null,
  email text not null,
  company text,
  source text not null default 'direct',
  created_at timestamptz not null default now()
);

-- Indexes for leads CRM
create index if not exists idx_leads_page on public.leads(page_id);
create index if not exists idx_leads_email on public.leads(email);
create index if not exists idx_leads_created_at on public.leads(created_at desc);

-- Enable RLS for leads
alter table public.leads enable row level security;

create policy "Page owners can view leads for their pages"
  on public.leads for select
  using (
    exists (
      select 1 from public.landing_pages
      where public.landing_pages.id = public.leads.page_id
      and public.landing_pages.user_id = auth.uid()
    )
  );

create policy "Anyone can submit a lead on a published page"
  on public.leads for insert
  with check (
    exists (
      select 1 from public.landing_pages
      where public.landing_pages.id = public.leads.page_id
      and public.landing_pages.status = 'published'
    )
  );

-- 4. DAILY METRICS TABLE (For Time-series Analytics)
create table if not exists public.daily_metrics (
  id serial primary key,
  date date not null unique,
  visitors int not null default 0,
  conversions int not null default 0
);

create index if not exists idx_metrics_date on public.daily_metrics(date desc);

-- Enable RLS for daily_metrics
alter table public.daily_metrics enable row level security;

create policy "Authenticated users can view workspace metrics"
  on public.daily_metrics for select
  to authenticated
  using (true);

