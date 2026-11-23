# CLAUDE.md — Agent & Developer Operating Guide

## Project Overview
Next-generation landing page builder and Conversion Rate Optimization (CRO) SaaS platform.
Modeled after https://unbounce.com, but engineered with modern architecture:
- Sub-second edge-rendered live landing pages (100/100 Lighthouse score)
- Clean, modular Next.js 16 (App Router) + React 19 codebase
- AI-first prompt-to-landing-page generative engine
- Multi-armed bandit dynamic traffic allocation & A/B testing
- Modern visual builder using component-based tree serialization (Puck / Craft.js)

---

## Current Status: v1.0 Complete — Production Ready! (Executed inside Antigravity)
- [x] **Phase 0:** Project setup, route groups, shadcn/ui, and blueprint docs.
- [x] **Phase 1A:** Typography (`Plus Jakarta Sans` + `Inter`), Unbounce conversion tokens, sticky Mega-Navbar with Product/Solutions/Resources dropdowns, responsive mobile Sheet drawer, and deep ink multi-column Footer with AI research strip.
- [x] **Phase 1B:** Complete 8-section Homepage deployed.
- [x] **Phase 1C:** Secondary Marketing Pages & Zero-404 Link Polish (`/pricing`, `/templates`, `/features`, `/login`, `/signup`).
- [x] **Phase 2:** Authentication, Persistent Backend API Layer, and Full SaaS Dashboard (`src/app/(dashboard)/`).
- [x] **Phase 3:** Visual Page Builder & AI Engine (`src/app/editor/[pageId]/`) with `@puckeditor/core`, 10 high-converting conversion blocks, and A/B Variant Studio.
- [x] **Phase 4:** Live Edge Publishing (`/p/[slug]`), Real End-to-End Lead Capture, Real A/B Variant Split Testing, Dynamic Text Replacement, and 1-Click AI Prompt-to-Page Generator.
- [x] **Phase 5:** Final Production Polish, Vercel-Safe Persistence, Cloud Supabase Adapter, Custom 404/Error Boundaries, SEO & Launch Readiness.


---

## EXECUTION PLAN (DIRECT IN ANTIGRAVITY)

All phases are executed directly inside Google Antigravity with full verification (`npm run build` with 0 errors).


### 1. Build & Runtime Environment Note
- `npm run build` runs `next build --webpack` (configured in `package.json` to ensure 100% stable compilation on all platforms).
- Run `npm run build` to verify that 0 TypeScript errors exist before starting work.
- Dev server runs via `npm run dev` (`http://localhost:3000`).

### 2. Available Routes & Architecture
- **Marketing Shell:**
  - `/` — Homepage (8 full conversion sections in [src/app/(marketing)/page.tsx](file:///d:/Unbounce/src/app/(marketing)/page.tsx))
  - `/pricing` — Pricing page with annual toggle, estimator, comparison matrix, FAQ
  - `/templates` — Templates gallery with live search, category/goal filters, 12 templates
  - `/features` — Deep-dive feature tour & comparison scorecard
- **Auth Shells (Ready for Phase 2 Supabase wiring):**
  - `/login` — [src/app/(auth)/login/page.tsx](file:///d:/Unbounce/src/app/(auth)/login/page.tsx)
  - `/signup` — [src/app/(auth)/signup/page.tsx](file:///d:/Unbounce/src/app/(auth)/signup/page.tsx)
- **Shared Data & Primitives:**
  - [src/lib/templates-data.ts](file:///d:/Unbounce/src/lib/templates-data.ts) — 12 structured templates
  - [src/lib/marketing-nav.ts](file:///d:/Unbounce/src/lib/marketing-nav.ts) — Centralized navigation links
  - [src/components/ui/](file:///d:/Unbounce/src/components/ui/) — shadcn/ui components (`button`, `badge`, `card`, `tabs`, `accordion`, `sheet`, `dialog`, `separator`, `input`)

### 3. Your Immediate Phase 2 Objectives
1. **Supabase Setup:**
   - Install `@supabase/supabase-js` and `@supabase/ssr`.
   - Configure Supabase client & server utility in `src/lib/supabase/`.
   - Apply the draft PostgreSQL schema in [docs/ARCHITECTURE.md](file:///d:/Unbounce/docs/ARCHITECTURE.md) (`profiles`, `workspaces`, `workspace_members`, `pages`, `page_variants`, `leads`, `page_events`).
2. **Wire Auth Flows:**
   - Connect `src/app/(auth)/login/page.tsx` and `src/app/(auth)/signup/page.tsx` to Supabase Auth (Email + Google OAuth).
   - Add auth middleware for route protection.
3. **Scaffold SaaS Dashboard:**
   - Build authenticated workspace shell in `src/app/(dashboard)/dashboard/page.tsx`.
   - Display active pages, conversion metrics, lead counts, and "Create New Page" flow.

---

## Strict Development Rules

### 1. TypeScript Strictness
- `strict: true` is enforced in `tsconfig.json`.
- Zero `any` types allowed. Write explicit interfaces and types for props, state, API schemas, and builder nodes.
- Validate all external inputs/forms using Zod schemas.

### 2. Design Tokens & Styling
- Tailwind CSS v4 tokens only. Refer strictly to `docs/DESIGN_SYSTEM.md`.
- Primary Electric Blue: `#0033FF` (hover `#0026CC`)
- High-Conversion Accents: Coral `#FF4F38`, Green `#00C48C`, Amber `#FFB800`
- Dark ink surfaces: `#141414`, `#1F1F1F`, canvas gray: `#F7F8FA`, pure white: `#FFFFFF`.
- Never insert unapproved random hex values or ad-hoc margins.

### 3. Strict Route Group Isolation
- Keep `(marketing)` and `(dashboard)` completely separated.
- Marketing components must live exclusively in `src/components/marketing/`.
- UI primitives live in `src/components/ui/`.
- Do NOT leak builder state or heavy canvas packages into public marketing pages or edge-published `/p/[slug]` runtime.

### 4. Surgical File Editing
- NEVER touch or refactor files outside the single requested section or task.
- When working on Section X, only edit the relevant section component and page registry.
- Keep diffs small, legible, and easy to review.

### 5. Mandatory Verification Before Committing
- Always run `npm run build` before committing.
- Build must complete with 0 TypeScript errors and 0 ESLint warnings.

---

## Handoff Instructions for Claude Code / Future Sessions

When picking up this repository:
1. Review `docs/TASKS.md` to identify the current active section.
2. Check `docs/DESIGN_SYSTEM.md` for tokens, color schemes, and component styling.
3. Review `docs/PRD.md` and `docs/ARCHITECTURE.md` for product specs and data schemas.
4. Execute strictly one atomic checklist item at a time.
5. Verify build with `npm run build`.
6. Commit with concise conventional commit messages: `feat(marketing): implement hero section` or `feat(editor): puck canvas wrapper`.

