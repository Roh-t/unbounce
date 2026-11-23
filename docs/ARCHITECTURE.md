# System Architecture & Technical Specifications

## 1. High-Level Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router) + React 19 | Server Components, Streaming SSR, fast client transitions |
| **Language** | TypeScript 5 (Strict Mode) | End-to-end type safety |
| **Styling** | Tailwind CSS v4 | Zero-runtime styling with native CSS variable tokens |
| **Component Primitives** | shadcn/ui + Radix UI Primitives | Accessible, unstyled, composable UI blocks |
| **Icons & Motion** | Lucide React + Framer Motion | High-conversion visual cues and spring animations |
| **Backend & Database** | Supabase (PostgreSQL 15) | Relational data store, Row Level Security (RLS), real-time events |
| **Authentication** | Supabase Auth | Session cookies, SSR auth helpers, OAuth providers |
| **Visual Builder** | Puck / Craft.js | Component-tree serialization and live canvas editor |
| **AI Generation** | Gemini / Claude Structured APIs | Prompt-to-JSON landing page component tree generation |
| **Edge Deployment** | Vercel / Cloudflare Edge | Sub-second cached live landing page delivery (`/p/[slug]`) |

---

## 2. Directory & Route-Group Architecture

```
d:/Unbounce/
├── docs/
│   ├── PRD.md                   # Product vision, feature roadmap, competitive advantages
│   ├── DESIGN_SYSTEM.md         # Colors, typography, component rules, micro-interactions
│   ├── ARCHITECTURE.md          # Technical stack, folder map, Supabase DB schema
│   └── TASKS.md                 # Granular checkbox execution roadmap
├── src/
│   ├── app/
│   │   ├── (marketing)/         # Public marketing website
│   │   │   ├── page.tsx         # High-converting homepage
│   │   │   ├── pricing/         # Pricing page with toggle & comparison matrix
│   │   │   ├── templates/       # Template showcase gallery
│   │   │   └── features/        # Deep-dive product tour
│   │   ├── (auth)/              # Authentication flows (Phase 2)
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/         # Authenticated SaaS workspace (Phase 2)
│   │   │   ├── dashboard/       # Overview metrics & page list
│   │   │   ├── leads/           # Captured leads inbox & CSV export
│   │   │   └── settings/        # Workspace & domain settings
│   │   ├── editor/[pageId]/     # Visual Drag-and-Drop Builder canvas (Phase 3)
│   │   ├── p/[slug]/            # Live published high-speed landing pages (Phase 4)
│   │   ├── globals.css          # Tailwind tokens and base CSS
│   │   └── layout.tsx           # Root HTML shell
│   ├── components/
│   │   ├── marketing/           # Header, Footer, Hero, Tabs, Testimonials, Pricing
│   │   ├── ui/                  # shadcn/ui components (button, badge, card, tabs, etc.)
│   │   └── builder/             # Canvas, inspector sidebar, block library (Phase 3)
│   └── lib/
│       ├── utils.ts             # cn() helper
│       └── mock-data/           # Static data for templates, testimonials, features
├── CLAUDE.md                    # Universal agent instructions & project memory
├── package.json
└── tsconfig.json
```

---

## 3. Draft Supabase PostgreSQL Database Schema (Phase 2+)

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (linked to supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Workspaces (Multi-tenancy)
CREATE TABLE public.workspaces (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT NOT NULL,
  plan TEXT DEFAULT 'starter' CHECK (plan IN ('starter', 'pro', 'agency')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Workspace Members
CREATE TABLE public.workspace_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'editor' CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(workspace_id, user_id)
);

-- 4. Pages
CREATE TABLE public.pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  custom_domain TEXT,
  seo_title TEXT,
  seo_description TEXT,
  favicon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(workspace_id, slug)
);

-- 5. Page Variants (For A/B Testing & Smart Traffic)
CREATE TABLE public.page_variants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL, -- e.g. "Variant A", "Variant B"
  is_control BOOLEAN DEFAULT FALSE NOT NULL,
  traffic_weight NUMERIC(5,2) DEFAULT 100.00 CHECK (traffic_weight >= 0 AND traffic_weight <= 100),
  puck_data JSONB NOT NULL DEFAULT '{}'::jsonb, -- Serialized builder component tree
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. Leads (Captured Form Submissions)
CREATE TABLE public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  variant_id UUID REFERENCES public.page_variants(id) ON DELETE SET NULL,
  form_data JSONB NOT NULL, -- { "email": "user@example.com", "name": "Jane", "company": "Acme" }
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. Page Analytics & Conversion Events (High Throughput)
CREATE TABLE public.page_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
  variant_id UUID REFERENCES public.page_variants(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('pageview', 'cta_click', 'form_submit', 'bounce')),
  visitor_id TEXT NOT NULL, -- Anonymous cookie-based ID
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_pages_workspace ON public.pages(workspace_id);
CREATE INDEX idx_pages_slug ON public.pages(slug);
CREATE INDEX idx_variants_page ON public.page_variants(page_id);
CREATE INDEX idx_leads_page ON public.leads(page_id);
CREATE INDEX idx_events_page_variant ON public.page_events(page_id, variant_id, event_type);
```

---

## 4. Edge Publishing & Runtime Isolation
- **No Client Builder Leakage:** When a page is requested at `/p/[slug]`, the server fetches the winning variant's `puck_data` JSON and renders it into pure, semantic HTML.
- **Fast Interactive Hydration:** Only interactive form blocks and micro-animations carry tiny JS bundles (<30KB total runtime).
- **Sub-Second TTFB:** Pages are pre-rendered and edge-cached with HTTP `Cache-Control: s-maxage=3600, stale-while-revalidate`.

