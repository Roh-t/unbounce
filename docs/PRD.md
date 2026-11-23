# Product Requirements Document (PRD)

## 1. Executive Summary & Vision
An AI-first, high-performance landing page builder and Conversion Rate Optimization (CRO) platform. While legacy tools like Unbounce, Instapage, and Leadpages revolutionized conversion marketing over a decade ago, their architectures are weighed down by bloated client-side runtimes, slow builders, complex legacy pricing models, and superficial AI additions.

Our platform re-engineers landing page creation from first principles:
- **Zero Runtime Overhead:** Pages publish to statically generated edge assets with sub-500ms global load times.
- **AI-Native Generation:** Instant generation of full, high-converting landing pages tailored to specific target audiences, keywords, and campaign goals.
- **Modern Component-Driven Canvas:** Intuitive drag-and-drop block builder (using Puck/Craft.js) with responsive controls and precision styling.
- **Smart CRO & Traffic Allocation:** Built-in multi-armed bandit algorithm that automatically directs traffic to winning page variants in real time.

---

## 2. "How We Beat Unbounce" Scorecard

| Capability | Legacy Unbounce | Our Platform | Why It Matters |
| :--- | :--- | :--- | :--- |
| **Page Speed & Core Web Vitals** | Often scores 40-70 on mobile Lighthouse due to legacy scripts and tracking bloat. | Pure static HTML/CSS at the edge, scoring 98-100 on Mobile & Desktop. | Directly lowers Google Ads Cost-per-Click (Quality Score) and lifts ad conversion. |
| **Builder Experience** | Outdated desktop-era coordinate canvas, slow drag-and-drop, clunky responsive views. | Component-based modern grid/flex canvas with fluid mobile/tablet previews and instant undo/redo. | Saves 80% of page assembly and editing time. |
| **AI Integration** | Bolt-on copy generation assistant in side modals. | End-to-end prompt-to-page generation: generates complete structure, conversion copy, themed styles, and forms in 5 seconds. | Marketers can launch full campaigns from a brief or ad URL in seconds. |
| **A/B Testing** | Basic split testing requiring manual traffic balancing or complicated rules. | Autonomous Multi-Armed Bandit testing that automatically adjusts traffic weights to maximize conversions. | Eliminates wasted ad spend on underperforming variants during test ramp-up. |
| **Pricing & Limits** | Harsh visitor and domain caps with aggressive enterprise upselling ($100-$600+/mo). | Transparent value pricing based on active workspaces and published campaigns, no punishing overage penalties. | Predictable, agency-friendly scaling. |

---

## 3. Product Roadmap & Phased Architecture

### Phase 1: High-Converting Marketing Website (Antigravity)
- **Mega-Navbar & Drawer:** Conversion-optimized header with interactive dropdown menus, resource links, and sticky CTA.
- **Homepage (8 Core Sections):**
  1. *Hero:* Punchy headline, dual CTA, animated visual preview of the builder canvas.
  2. *Social Proof Logo Strip:* Trusted brands and agency badges.
  3. *Feature Switcher Tabs:* Interactive tabs showcasing Builder, AI Engine, Smart Traffic, and Analytics.
  4. *AI Builder Deep-Dive:* Split view demonstrating prompt-to-landing-page generation.
  5. *Template Showcase:* Filterable interactive cards of high-converting templates.
  6. *ROI Metrics Band:* Animated conversion statistics (+35% lift, 2.4x faster builds).
  7. *Customer Testimonials:* High-trust grid of marketer and agency reviews.
  8. *Final Conversion CTA:* Deep ink background, high-contrast primary CTA banner.
- **Secondary Pages:**
  - *Pricing:* Monthly/Annual toggle, 3 transparent tiers, comprehensive comparison matrix, and FAQ accordion.
  - *Templates:* Interactive gallery with industry category filtering and full-page previews.
  - *Features:* Deep-dive product tour highlighting builder speed, smart traffic, and integrations.

### Phase 2: Authentication & Workspace Multi-Tenancy (Claude Code)
- Supabase Auth (Magic Link, Google OAuth, GitHub).
- Multi-tenant workspaces with role-based permissions (`owner`, `admin`, `editor`, `viewer`).
- Workspace settings, custom domain configurations, and API key management.
- Dashboard overview showing active pages, aggregate conversion rates, and total captured leads.

### Phase 3: Visual Page Builder & AI Generation Engine (Claude Code)
- Drag-and-drop block builder integration using Puck / Craft.js.
- Custom conversion-oriented block library:
  - Hero sections (centered, split-form, video background)
  - Lead capture forms (multi-step, validation, custom fields, hidden UTM inputs)
  - Feature grids & comparison cards
  - Testimonial carousels & star ratings
  - Accordion FAQ & sticky call-to-action bars
  - Timers, countdowns, and social proof popups
- AI Generation Engine:
  - Prompt input: Product description, target persona, campaign goal, tone.
  - Generates structured page schema (JSON) rendered directly in the canvas.
  - "AI Rewrite / Tone Shift" inline on any text block.

### Phase 4: Edge Publishing Engine & Custom Domains (Claude Code)
- Edge-rendered landing pages under `/p/[slug]`.
- Custom domain mapping (CNAME verification, automated SSL provisioning).
- Global CDN caching with instant invalidation upon publish.
- Native SEO metadata, OpenGraph tags, and favicon management.

### Phase 5: CRO Engine, A/B Testing & Lead Management (Claude Code)
- Variant generator (Variant A, B, C...) with independent builder state.
- Dynamic traffic splitter and multi-armed bandit algorithm.
- Real-time event tracking: page views, unique visitors, scroll depth, form submissions, and conversion value.
- Lead capture inbox with CSV export, webhook triggers (Zapier, Make), and direct CRM integrations (HubSpot, Mailchimp).

---

## 4. User Personas
1. **Performance Marketer / Media Buyer:** Needs to spin up 10 targeted landing page variants for Google/Meta ads daily, optimize Quality Score, and maximize ROAS.
2. **Growth Agency:** Manages dozens of client accounts, needs multi-tenant workspaces, team collaboration, and branded client reporting.
3. **SaaS Founder / Indie Hacker:** Wants clean, high-converting product pages without hiring expensive designers or writing frontend code from scratch.

