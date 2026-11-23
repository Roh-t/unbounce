# Unbounce AI — Next-Gen AI Landing Page Builder & CRO SaaS Platform

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Puck Editor](https://img.shields.io/badge/Puck-Visual_Canvas-0033FF?style=flat)](https://github.com/measuredco/puck)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Production_Ready-black?style=flat&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Turn ad clicks into high-converting customers.** An agency-grade, AI-native landing page platform inspired by [Unbounce.com](https://unbounce.com), built with sub-second edge-rendered live pages, visual drag-and-drop editing, autonomous A/B testing, and 1-click prompt-to-page generation.

---

## 🚀 Key Highlights & Features

### 1. High-Converting Marketing Hub
- **8-Section Production Homepage (`/`):** Display hero with live interactive preview, monochrome social proof logos, 4-way interactive feature tabs, Smart Traffic™ deep dive, filterable 6-card template showcase, dark `#141414` conversion statistics band, customer testimonials grid, and final high-contrast CTA banner.
- **Dedicated Marketing Pages:** 
  - **Pricing (`/pricing`):** Monthly/Annual billing toggle with 25% savings badge, interactive monthly visitors estimator, 4 Unbounce-grade tiers (`Build`, `Experiment`, `Optimize`, `Agency`), full feature comparison table, and pricing FAQ accordion.
  - **Templates Gallery (`/templates`):** Live search filter, category tabs (`SaaS`, `Lead Gen`, `Agency`, `Ecommerce`, `Events`, `Consulting`), conversion goal dropdowns, and 12 pre-built high-converting landing page templates with quick preview dialogs.
  - **Features Hub (`/features`):** Deep-dive comparison scorecard vs legacy builders.

### 2. Full-Featured SaaS Dashboard (`/dashboard`)
- **Executive Overview (`/dashboard`):** 4 conversion KPIs, 14-day Recharts AreaChart, quick action shortcuts, and recent pages table.
- **Pages Manager (`/dashboard/pages`):** Complete CRUD, instant duplicate, status toggles (`Draft` / `Published`), live search, and one-click access to the visual editor or public page.
- **Leads CRM (`/dashboard/leads`):** Live lead table with search, conversion source filtering, variant attribution (`Variant A` vs `Variant B`), and client-side CSV export.
- **Analytics & A/B Winner Studio (`/dashboard/analytics`):** Real-time A/B test comparison card showing Variant A vs Variant B views, conversions, CVR %, statistical lift %, and emerald winner badges (`🏆 Variant B Leading`).
- **Workspace Settings (`/dashboard/settings`):** Profile details, plan overview, custom domain manager, and outbound webhook settings.

### 3. Visual Drag-and-Drop Editor (`/editor/[pageId]`)
- **Powered by `@puckeditor/core`:** Ultra-responsive visual canvas with desktop (1280px), tablet (768px), and mobile (390px) viewports.
- **10 Unbounce-Grade Conversion Blocks:**
  1. `AnnouncementBar` — Sticky promo bar with color variants
  2. `HeroSection` — High-impact headline, subhead, CTA buttons, alignment, and trust notes
  3. `LeadCaptureForm` — Inline conversion form with real CRM integration
  4. `LogoProofStrip` — Customizable client logo proof band
  5. `FeatureGrid` — 2/3-column benefits cards with badges
  6. `MetricsBand` — Deep ink/blue conversion stats band
  7. `TestimonialCards` — Verified buyer testimonials with result badges
  8. `PricingTiers` — Conversion pricing cards with highlighted plan
  9. `FaqAccordion` — Objection-busting collapsible accordion
  10. `CtaBanner` — Closing high-urgency conversion banner
- **A/B Variant Studio Bar:** Switch between Variant A (Original) and Variant B (Challenger) with automatic cloning and independent editing.
- **Publish Modal:** Generates live edge URL and provides 1-click clipboard copy.

### 4. 1-Click AI Prompt-to-Page Generator
- Integrated directly into the editor top toolbar (`✨ AI Generate`).
- **Dual-Engine Architecture:**
  - **Google Gemini 2.5 Flash:** Automatically activated when `GEMINI_API_KEY` is provided.
  - **Smart Structured AI Composer:** Built-in zero-dependency fallback that extracts product, niche, audience, and offer to compose 9 tailored conversion blocks with zero external API key required.
- **Full Safety Guard:** Every generated component structure passes through `ensureComponentIds()` to ensure 100% Puck stability without null crashes.

### 5. Edge Visitor Runtime (`/p/[slug]`)
- **Sub-Second Edge Rendering:** Fast, accessible HTML rendering using Puck's `<Render />`.
- **Autonomous A/B Traffic Split:** Percentage-based random assignment with visitor cookie persistence (`ub_var_[id]`) and URL query overrides (`?variant=A` / `?variant=B`).
- **Dynamic Text Replacement (DTR):** Replaces `{{kw}}` in headlines dynamically from URL query parameters (e.g. `?kw=B2B+Sales+Automation`).
- **Real Lead Capture API:** Inline forms submit directly to `POST /api/public/leads` with UTM attribution and animated conversion confirmations.
- **Draft Preview Mode:** Allows logged-in workspace members to preview drafts via `?preview=1` while keeping unpublished pages protected from public visitors.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript (Strict Mode) |
| **Styling & Design** | Tailwind CSS v4, PostCSS, Lucide Icons, tw-animate-css |
| **UI Components** | shadcn/ui (`button`, `card`, `dialog`, `badge`, `tabs`, `input`, `textarea`, `dropdown-menu`, `table`) |
| **Visual Canvas** | `@puckeditor/core` (Drag-and-Drop Visual Tree Editor) |
| **Charts & Analytics** | Recharts (Responsive AreaChart & BarChart) |
| **AI Engine** | Google Gemini API (`gemini-2.5-flash`) + Smart Structured Composer |
| **Database & Auth** | Server-side persistent JSON store + Supabase PostgreSQL schema (`supabase/schema.sql`) |
| **Deployment** | Vercel Serverless & Edge Ready (100% Read-Only Filesystem Safe) |

---

## ⚡ Quick Start (Local Development)

### 1. Clone & Install
```bash
git clone https://github.com/your-username/unbounce-ai.git
cd unbounce-ai
npm install
```
*(The `postinstall` script automatically verifies and prepares the Puck editor package).*

### 2. Configure Environment (Optional)
Copy the example environment file:
```bash
cp .env.example .env.local
```
*Note: The platform is zero-config and runs fully out-of-the-box with built-in memory/JSON persistence and the Smart AI Composer.*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Demo Login Credentials
- **Email:** `demo@unbounce.ai`
- **Password:** `demo1234`
*(Or click the **"⚡ Fill Demo Credentials"** button on the `/login` screen).*

---

## 📦 Deployment to Vercel

This repository is pre-configured for seamless 1-click deployment on Vercel:

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/new).
3. The build command `next build --webpack` is already defined in `package.json`.
4. Deploy!

### Optional Environment Variables on Vercel:
- `SESSION_SECRET`: Random 32+ character string for secure session cookies.
- `GEMINI_API_KEY`: Google Gemini API key to activate live Gemini Flash AI generation.
- `NEXT_PUBLIC_SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY`: Supabase credentials to sync with cloud PostgreSQL.

---

## 🗄️ Supabase PostgreSQL Setup (Optional Cloud Sync)

To use cloud Supabase instead of the built-in JSON/memory store:
1. Create a project on [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Paste and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
4. Add your project URL and keys to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## 📄 License
MIT License. Created for high-performance marketing teams and modern conversion optimization.
