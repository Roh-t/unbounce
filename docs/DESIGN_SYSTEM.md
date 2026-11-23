# Design System Specification

## 1. Brand Identity & Visual Aesthetic
Modeled after the high-conversion, professional aesthetic of **unbounce.com**, enhanced with modern typography, crisp geometric surfaces, and ultra-snappy micro-animations.

The visual tone is:
- **Authoritative & Trustworthy:** Clean structured grids, high contrast, crisp borders.
- **High-Energy & Action-Oriented:** Electric blue and vibrant coral accents that guide the user's eye directly to conversion actions.
- **Modern & Engineered:** Deep ink dark surfaces contrasted against surgical pure-white card planes.

---

## 2. Color Palette & Tokens

### Primary Canvas & Backgrounds
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `bg-background` | `#FFFFFF` | Primary page canvas and clean content sections |
| `bg-muted` | `#F7F8FA` | Secondary section contrast, alternating rows, card backgrounds |
| `bg-surface-elevated` | `#FFFFFF` | Elevated cards, dialogs, dropdowns with subtle border |
| `bg-dark` | `#141414` | High-contrast dark sections, footer, and emphasis CTA bands |
| `bg-dark-surface` | `#1F1F1F` | Elevated cards and containers inside dark sections |

### Primary Brand Accents
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `primary` | `#0033FF` | Primary electric blue for brand identity, main links, and primary actions |
| `primary-hover` | `#0026CC` | Pressed / hover state for primary blue |
| `primary-subtle` | `#EEF2FF` | 5% opacity tint for badges, active states, and icon containers |

### High-Conversion Accents
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `accent-coral` | `#FF4F38` | High-urgency conversion CTA buttons, special offer badges, live alerts |
| `accent-coral-hover` | `#E53A24` | Hover state for high-urgency actions |
| `accent-green` | `#00C48C` | Conversion metrics (+35%), success indicators, positive ROI badges |
| `accent-amber` | `#FFB800` | Review star ratings, notice badges, warning highlights |
| `accent-purple` | `#7928CA` | AI-specific features, prompt magic badges, generative toolbars |

### Text & Borders
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `text-primary` | `#141414` | Primary high-contrast headings and body text |
| `text-secondary` | `#555555` | Subtitles, supporting copy, captions, and secondary links |
| `text-muted` | `#888888` | Disabled text, timestamps, placeholder text |
| `border-subtle` | `#E5E7EB` | Light mode card borders, divider lines, table grids |
| `border-dark` | `#262626` | Dark mode container borders and separators |

---

## 3. Typography Scale & Hierarchy

- **Primary Headings Font:** `Plus Jakarta Sans` or `Inter`, font-weight 700/800, tight tracking (`tracking-tight`, letter-spacing: `-0.025em` to `-0.04em`).
- **Body & Functional Font:** `Inter` or system sans-serif, font-weight 400/500, line-height 1.6 (`leading-relaxed`).

### Scale Breakdown
| Level | Desktop Size | Mobile Size | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Display Hero` | `64px / 4rem` | `40px / 2.5rem` | 800 (Extrabold) | `-0.04em` | Homepage Hero H1 |
| `Section H2` | `44px / 2.75rem` | `32px / 2rem` | 800 (Extrabold) | `-0.03em` | Primary section headings |
| `Subheading H3` | `28px / 1.75rem` | `22px / 1.375rem` | 700 (Bold) | `-0.02em` | Feature card titles, modal titles |
| `Item H4` | `20px / 1.25rem` | `18px / 1.125rem` | 600 (Semibold) | `-0.01em` | Accordion items, tab triggers |
| `Body Large` | `18px / 1.125rem` | `16px / 1rem` | 400/500 | Normal | Hero supporting paragraph, lead copy |
| `Body Default` | `16px / 1rem` | `15px / 0.9375rem` | 400 | Normal | Standard descriptions, table cells |
| `Caption / Badge`| `13px / 0.8125rem` | `12px / 0.75rem` | 600 (Semibold) | `+0.01em` | Metadata, pill badges, tags |

---

## 4. Component Patterns

### Buttons
1. **Primary Electric Button:**
   `bg-[#0033FF] hover:bg-[#0026CC] text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition-all duration-150`
2. **High-Conversion Coral Button:**
   `bg-[#FF4F38] hover:bg-[#E53A24] text-white font-bold px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all`
3. **Secondary Outline Button:**
   `border border-neutral-300 hover:border-neutral-900 bg-white text-neutral-800 font-medium px-5 py-2.5 rounded-lg transition-colors`
4. **Dark Surface Button:**
   `bg-white text-neutral-900 hover:bg-neutral-100 font-semibold px-6 py-3 rounded-lg transition-all`

### Cards & Surfaces
- **Light Cards:** `bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`
- **Interactive Feature Cards:** Subtle 1px blue border on hover or active selection: `hover:border-[#0033FF]/40 hover:-translate-y-0.5 transition-all`
- **Dark Emphasis Containers:** `bg-[#141414] text-white rounded-2xl p-8 border border-neutral-800`

### Badges & Status Indicators
- **Pill Badge:** `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold`
  - Blue: `bg-blue-50 text-[#0033FF] border border-blue-200`
  - Coral: `bg-red-50 text-[#FF4F38] border border-red-200`
  - Green: `bg-emerald-50 text-[#00C48C] border border-emerald-200`
  - AI Violet: `bg-purple-50 text-[#7928CA] border border-purple-200`

---

## 5. Motion & Micro-Interactions
- Smooth spring transitions via `framer-motion`: `type: "spring", stiffness: 350, damping: 25`.
- Interactive hover lifts: `-translate-y-0.5` or `-translate-y-1` on feature cards and pricing tiers.
- Subtle entrance fades: `opacity: 0, y: 15` to `opacity: 1, y: 0` staggered across list items.
- Tab transitions: Crossfade with quick 150ms opacity transition to maintain snappy responsiveness.

