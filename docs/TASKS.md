# Granular Tasks & Implementation Roadmap

## Legend
- `[x]` Completed
- `[ ]` Pending implementation

---

## Phase 0: Project Setup & Technical Foundation
- [x] Initialize Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 in root directory
- [x] Install & initialize shadcn/ui components (`button`, `badge`, `card`, `tabs`, `accordion`, `sheet`, `dialog`, `separator`, `input`)
- [x] Install core animation and utility libraries (`lucide-react`, `framer-motion`, `clsx`, `tailwind-merge`)
- [x] Scaffold Route Groups (`(marketing)`, `(auth)`, `(dashboard)`, `editor/[pageId]`, `p/[slug]`)
- [x] Author comprehensive project brain files (`CLAUDE.md`, `docs/PRD.md`, `docs/DESIGN_SYSTEM.md`, `docs/ARCHITECTURE.md`, `docs/TASKS.md`)
- [x] Verify project builds with 0 errors via `npm run build`
- [x] Initial git commit

---

## Phase 1A: Marketing Foundations & Layout Shell
- [x] **Task 1A.1:** Configure Typography, CSS variables, and Design System tokens in `src/app/globals.css`.
- [x] **Task 1A.2:** Build Sticky Mega-Navbar (`src/components/marketing/Navbar.tsx`):
  - Brand logo with conversion mark
  - Desktop navigation with interactive dropdown menus (Solutions, Features, Templates, Pricing)
  - Mobile Sheet drawer for small screen navigation
  - "Log In" secondary button + "Start Free Trial" Electric Blue CTA button
- [x] **Task 1A.3:** Build Marketing Footer (`src/components/marketing/Footer.tsx`):
  - 4-column structured navigation (Product, Solutions, Resources, Company)
  - Newsletter signup box
  - Copyright, legal links, and status indicator

---

## Phase 1B: High-Converting Homepage (8 Core Sections)
- [x] **Task 1B.1 — Section 1: Hero Section:**
  - High-impact H1 headline ("Turn clicks into customers—with landing pages built to convert")
  - Conversion subheading and dual CTA buttons (Electric Blue + Outline Demo)
  - Interactive mock preview of the builder canvas with live industry prompt chips (SaaS, Dental, DTC Skincare), Variant A/B toggle, and floating CRO score & Smart Traffic badges
- [x] **Task 1B.2 — Section 2: Social Proof Logo Strip:**
  - "TRUSTED BY 15,000+ HIGH-GROWTH MARKETING TEAMS & TOP AGENCIES"
  - 7 custom monochrome client logo SVGs (CampaignFlow, Looma, ZestPay, Northstar, Kinetix, Veloce, PeakScale) with hover transitions
- [x] **Task 1B.3 — Section 3: Interactive Feature Switcher Tabs:**
  - "Three Ways to Build, One Platform to Convert"
  - 4 interactive tabs (Prompt with AI, Customize Templates, Drag & Drop Studio, A/B Testing & Smart Traffic)
  - Animated stage displaying interactive UI mockups for each of the 4 modes
- [x] **Task 1B.4 — Section 4: AI Page Generator & Smart Traffic Deep-Dive:**
  - Smart Traffic™ multi-armed bandit routing diagram (Google Ads, Meta, LinkedIn -> AI Brain -> Variant A/B/C)
  - Dynamic Text Replacement (DTR) interactive simulator with clickable keywords (`?kw=...`) updating headline in real time
- [x] **Task 1B.5 — Section 5: High-Converting Template Showcase:**
  - Filterable tabs: "SaaS", "Lead Gen", "Agency", "Ecommerce", "Events"
  - 6 interactive template preview cards with hover zoom and "Quick Preview" modal
- [x] **Task 1B.6 — Section 6: ROI Metrics Band:**
  - Deep Ink (`#141414`) high-contrast statistics band:
    * `2.5B+` Conversions Analyzed
    * `+30%` Average Conversion Rate Lift with Smart Traffic
    * `< 0.8s` Sub-second edge page load speed (100/100 Core Web Vitals)
    * `15,000+` Teams & Top Agencies
- [x] **Task 1B.7 — Section 7: Customer Testimonials Grid:**
  - 6-card 3-column masonry grid of marketer & agency testimonials
  - Result Badges (+47% Demo Bookings, 3.2x ROAS, -38% CPL), 5-star ratings (`#FFB800`), verified buyer badges
- [x] **Task 1B.8 — Section 8: Final Conversion CTA Banner:**
  - Rounded-3xl Electric Blue (`#0033FF`) high-contrast conversion banner
  - Punchy closing headline, risk-reversal subtext ("No credit card required • 14-day free trial")
  - High-visibility conversion CTA buttons

---

## Phase 1C: Secondary Marketing Pages & Zero-404 Link Polish
- [x] **Task 1C.1 — Pricing Page (`src/app/(marketing)/pricing/page.tsx`):**
  - Monthly / Annual billing switch with "Save 25%" badge
  - Interactive monthly visitor estimator (`20K`, `50K`, `100K`, `250K+`) with recommended plan highlighting
  - 4 Tier Cards: Build ($74/mo), Experiment ($112/mo - Most Popular), Optimize ($187/mo), Agency ($449/mo)
  - Full structured feature comparison matrix table (Core Builder, AI & Optimization, Workspaces, Security)
  - Pricing FAQ accordion (free trial, traffic limits, custom domains, canceling, switching from Unbounce, AI credits)
  - Bottom `<FinalCtaBanner />`
- [x] **Task 1C.2 — Templates Gallery (`src/app/(marketing)/templates/page.tsx`):**
  - Real-time search input matching title, description, category, and conversion goal
  - Category filter pills (All, SaaS, Lead Gen, Agency, Ecommerce, Events, Consulting)
  - Conversion goal dropdown (All Goals, Lead Generation, Product Launch, Click-Through, Event Registration)
  - 12 richly styled template cards with miniature browser mockups, CVR badges, hover Quick Preview dialog, and template customization hooks
  - Empty state with reset filters button
  - Bottom `<FinalCtaBanner />`
- [x] **Task 1C.3 — Features Hub Page (`src/app/(marketing)/features/page.tsx`):**
  - 6 core pillars: AI Builder, Visual Studio, Smart Traffic, A/B Testing, Popups & Sticky Bars, Integrations & MCP
  - "How We Compare vs. Legacy Builders" architectural comparison table (Edge speed, AI generation, Canvas UX, Pricing)
  - Bottom `<FinalCtaBanner />`
- [x] **Task 1C.4 — Zero-404 Link Polish & Auth Shells:**
  - Updated all links in `marketing-nav.ts`, `Navbar.tsx`, and `Footer.tsx` to active routes and section anchors
  - Created Phase 2-ready authentication pages at `src/app/(auth)/login/page.tsx` and `src/app/(auth)/signup/page.tsx` with Google OAuth & email form shells

---

## Phase 2: Authentication, Persistent Backend & SaaS Dashboard (Executed in Antigravity)
- [x] Persistent JSON server database store (`.data/db.json` with auto-seeding: 1 demo workspace, 4 pages, 8 leads, 14 days of time-series metrics)
- [x] Complete Supabase PostgreSQL DDL & RLS schema (`supabase/schema.sql`)
- [x] Crypto session auth & HTTP-only cookies (`src/lib/auth/session.ts`)
- [x] Backend API Routes (`/api/auth/login`, `/api/auth/signup`, `/api/auth/logout`, `/api/auth/me`, `/api/pages`, `/api/pages/[id]`, `/api/pages/[id]/duplicate`, `/api/leads`, `/api/analytics`)
- [x] Auth pages with 1-click demo login (`/login`, `/signup`)
- [x] Full SaaS Dashboard (`(dashboard)` layout + `DashboardSidebar.tsx`):
  - [x] Overview (`/dashboard` with 4 KPIs, 14-day Recharts AreaChart, Recent Pages)
  - [x] Landing Pages Manager (`/dashboard/pages` with CRUD, live search, status switch, A/B toggle, duplicate, delete)
  - [x] Leads CRM (`/dashboard/leads` with search, source filters, client-side CSV export)
  - [x] Analytics (`/dashboard/analytics` with Recharts Area & Bar charts, traffic channel attribution, Smart Traffic metrics)
  - [x] Settings (`/dashboard/settings` with workspace profile, custom domains, webhooks, API keys)
- [x] Visual Page Builder Canvas placeholder (`src/app/editor/[pageId]/page.tsx`)


---

## Phase 3: Visual Page Builder Studio & Block Library (Executed in Antigravity)
- [x] `@puckeditor/core` integration in `/editor/[pageId]`
- [x] Unbounce conversion block library (`src/lib/builder/puck-config.tsx`):
  - [x] AnnouncementBar (promotional banner with background variants)
  - [x] HeroSection (high-impact hero with theme, alignment, and CTA controls)
  - [x] LeadCaptureForm & `LeadCaptureBlock.tsx` (inline conversion form saving to leads CRM)
  - [x] LogoProofStrip (customizable social proof brand marks)
  - [x] FeatureGrid (2/3-column benefits cards with badges)
  - [x] MetricsBand (high-contrast conversion statistics band)
  - [x] TestimonialCards (customer reviews with verified result badges)
  - [x] PricingTiers (conversion pricing matrix with highlighted tier)
  - [x] CtaBanner (final high-contrast closing banner)
  - [x] FaqAccordion (objection-buster FAQ accordion)
- [x] Pre-built rich templates (`src/lib/builder/default-templates.ts`: `saasDefaultData`, `leadGenDefaultData`, `ecommerceDefaultData`)
- [x] Persistent JSON database & API integration (`src/lib/db/store.ts` auto-migration, `createPage`, and `PATCH /api/pages/[id]`)
- [x] Fullscreen Visual Studio (`PageBuilderStudio.tsx`):
  - [x] Top studio bar with dashboard link, editable page title, and status badge
  - [x] A/B Variant switcher (`Variant A` | `Variant B`) with auto-cloning and independent variant editing
  - [x] Save Draft with real-time feedback
  - [x] One-click Publish Page with live link modal and clipboard copy
  - [x] Responsive viewports (Desktop 1280px / Tablet 768px / Mobile 390px), drag-and-drop reordering, component drawer, right property inspector, and undo/redo


---

## Phase 4: Live Edge Publishing, Real Lead Capture, A/B Split Testing & AI Generator (Executed in Antigravity)
- [x] Dynamic edge renderer in `/p/[slug]` fetching serialized Puck JSON (`src/app/p/[slug]/page.tsx` + `LiveLandingPage.tsx`)
- [x] Real A/B Variant split routing with cookie persistence (`ub_var_[id]`) and deterministic split percentages
- [x] Query overrides (`?variant=A`, `?variant=B`) and Draft preview mode (`?preview=1` with session auth check)
- [x] Dynamic Text Replacement (DTR) support for URL search keywords (`?kw=...` replacing `{{kw}}`)
- [x] Public page view tracking (`POST /api/public/track`) and public conversion lead capture (`POST /api/public/leads`)
- [x] Real end-to-end interactive `LeadCaptureBlock.tsx` with animated confirmation state ("✓ Success! We've received your request.")
- [x] 1-Click AI Prompt-to-Page Generator (`POST /api/ai/generate-page`) with Gemini 2.5 Flash + Smart Structured Composer fallback
- [x] Studio modal integration ("✨ AI Generate" toolbar button, multi-step generation animation, prompt chips, tone/goal selectors)
- [x] Active A/B Experiments & Variant Winner comparison card in `/dashboard/analytics` with live CVR, lift %, and winner badges

---

## Phase 5: Final Production Polish, Vercel-Safe Persistence & Launch Readiness (Executed in Antigravity)
- [x] Vercel-safe filesystem resilience: `src/lib/db/store.ts` global memory store fallback for read-only serverless runtimes
- [x] Cloud Supabase adapter (`src/lib/db/supabase-client.ts`) and updated PostgreSQL DDL (`supabase/schema.sql`)
- [x] Production dependency safety & `scripts/patch-puck.js` postinstall zero-crash guarantee
- [x] Environment variable documentation (`.env.example`)
- [x] Custom geometric SVG favicon (`src/app/icon.svg`)
- [x] Custom branded 404 page (`src/app/not-found.tsx`) and client error boundary (`src/app/error.tsx`)
- [x] Metadata routes for SEO (`src/app/robots.ts` and `src/app/sitemap.ts`)
- [x] Global layout metadata enhancements (OpenGraph, Twitter cards, title template, and keywords)
- [x] Comprehensive, portfolio-grade project `README.md`
- [x] Complete production build verification (`npm run build` with 0 errors)

