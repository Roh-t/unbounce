import * as React from "react";
import type { Config, ComponentConfig } from "@puckeditor/core";
import {
  Check,
  Sparkles,
  ArrowRight,
  Star,
  ShieldCheck,
  ChevronDown,
  Layers,
  Zap,
} from "lucide-react";
import { LeadCaptureBlock } from "@/components/builder/LeadCaptureBlock";

// Component Props Types
export interface AnnouncementBarProps {
  text: string;
  badgeLabel: string;
  ctaText: string;
  bgColor: "blue" | "ink" | "coral" | "emerald";
}

export interface HeroSectionProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  alignment: "center" | "left";
  theme: "light" | "dark" | "blue";
  trustNote: string;
}

export interface LeadCaptureFormProps {
  headline: string;
  subheadline: string;
  buttonText: string;
  showCompanyField: "yes" | "no";
  privacyNote: string;
  accentColor: "blue" | "emerald" | "coral";
}

export interface LogoProofStripProps {
  label: string;
  logos: { name: string }[];
}

export interface FeatureGridProps {
  sectionTitle: string;
  sectionSubtitle: string;
  columns: "2" | "3";
  items: { badge: string; title: string; description: string }[];
}

export interface MetricsBandProps {
  theme: "dark" | "blue" | "light";
  stats: { value: string; label: string }[];
}

export interface TestimonialCardsProps {
  heading: string;
  items: { resultBadge: string; quote: string; author: string; role: string }[];
}

export interface PricingTiersProps {
  heading: string;
  subheading: string;
  plans: {
    name: string;
    price: string;
    period: string;
    description: string;
    featuresText: string; // comma-separated or newline-separated
    ctaText: string;
    highlighted: "yes" | "no";
  }[];
}

export interface CtaBannerProps {
  headline: string;
  subheadline: string;
  buttonText: string;
  trustItems: string;
  theme: "blue" | "dark";
}

export interface FaqAccordionProps {
  heading: string;
  items: { question: string; answer: string }[];
}

export type RootProps = {
  title?: string;
};

// Puck Component Map
export type PuckComponentProps = {
  AnnouncementBar: AnnouncementBarProps;
  HeroSection: HeroSectionProps;
  LeadCaptureForm: LeadCaptureFormProps;
  LogoProofStrip: LogoProofStripProps;
  FeatureGrid: FeatureGridProps;
  MetricsBand: MetricsBandProps;
  TestimonialCards: TestimonialCardsProps;
  PricingTiers: PricingTiersProps;
  CtaBanner: CtaBannerProps;
  FaqAccordion: FaqAccordionProps;
};

export const puckConfig: Config<PuckComponentProps, RootProps> = {
  root: {
    render: ({ children }) => (
      <div className="min-h-screen bg-white text-[#141414] font-sans selection:bg-[#0033FF] selection:text-white">
        {children}
      </div>
    ),
  },
  categories: {
    conversion: {
      title: "Conversion Elements",
      components: ["AnnouncementBar", "HeroSection", "LeadCaptureForm", "PricingTiers", "CtaBanner"],
    },
    content: {
      title: "Content & Features",
      components: ["FeatureGrid", "FaqAccordion"],
    },
    socialProof: {
      title: "Social Proof & Trust",
      components: ["LogoProofStrip", "MetricsBand", "TestimonialCards"],
    },
  },
  components: {
    // 1. ANNOUNCEMENT BAR
    AnnouncementBar: {
      fields: {
        text: { type: "text", label: "Announcement Text" },
        badgeLabel: { type: "text", label: "Badge Label" },
        ctaText: { type: "text", label: "Action Link Text" },
        bgColor: {
          type: "select",
          label: "Background Color",
          options: [
            { label: "Electric Blue (#0033FF)", value: "blue" },
            { label: "Deep Ink (#141414)", value: "ink" },
            { label: "Conversion Coral (#FF4F38)", value: "coral" },
            { label: "Emerald (#00C48C)", value: "emerald" },
          ],
        },
      },
      defaultProps: {
        badgeLabel: "NEW",
        text: "Autonomous Smart Traffic AI & Next-Gen Visual Studio Live",
        ctaText: "Learn more →",
        bgColor: "blue",
      },
      render: ({ text, badgeLabel, ctaText, bgColor }) => {
        const bgStyles = {
          blue: "bg-[#0033FF] text-white",
          ink: "bg-[#141414] text-white",
          coral: "bg-[#FF4F38] text-white",
          emerald: "bg-[#00C48C] text-white",
        }[bgColor];

        return (
          <div className={`w-full py-2.5 px-4 text-center text-xs font-semibold ${bgStyles}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
              {badgeLabel && (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {badgeLabel}
                </span>
              )}
              <span>{text}</span>
              {ctaText && <span className="underline cursor-pointer opacity-90">{ctaText}</span>}
            </div>
          </div>
        );
      },
    },

    // 2. HERO SECTION
    HeroSection: {
      fields: {
        eyebrow: { type: "text", label: "Top Eyebrow Pill" },
        headline: { type: "textarea", label: "Main Headline" },
        subheadline: { type: "textarea", label: "Subheadline" },
        primaryCtaText: { type: "text", label: "Primary Button Text" },
        secondaryCtaText: { type: "text", label: "Secondary Button Text" },
        alignment: {
          type: "radio",
          label: "Text Alignment",
          options: [
            { label: "Centered", value: "center" },
            { label: "Left Aligned", value: "left" },
          ],
        },
        theme: {
          type: "select",
          label: "Color Theme",
          options: [
            { label: "Clean White", value: "light" },
            { label: "Deep Ink Dark", value: "dark" },
            { label: "Electric Blue Accent", value: "blue" },
          ],
        },
        trustNote: { type: "text", label: "Micro Trust Text" },
      },
      defaultProps: {
        eyebrow: "POWERED BY 2.5B+ CONVERSIONS",
        headline: "Turn ad clicks into customers with high-converting pages",
        subheadline: "Generate custom landing pages with AI, personalize variants dynamically, and route traffic with multi-armed bandit intelligence.",
        primaryCtaText: "Start Building for Free",
        secondaryCtaText: "Explore Live Demo",
        alignment: "center",
        theme: "light",
        trustNote: "No credit card required • 14-day free trial • 99.9% edge uptime",
      },
      render: ({
        eyebrow,
        headline,
        subheadline,
        primaryCtaText,
        secondaryCtaText,
        alignment,
        theme,
        trustNote,
      }) => {
        const themeStyles = {
          light: "bg-white text-[#141414]",
          dark: "bg-[#141414] text-white",
          blue: "bg-[#0033FF] text-white",
        }[theme];

        const isCenter = alignment === "center";

        return (
          <section className={`w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${themeStyles} border-b border-neutral-100`}>
            <div className={`max-w-4xl mx-auto ${isCenter ? "text-center items-center" : "text-left items-start"} flex flex-col space-y-6`}>
              {eyebrow && (
                <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{eyebrow}</span>
                </div>
              )}

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
                {headline}
              </h1>

              {subheadline && (
                <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${theme === "dark" || theme === "blue" ? "text-neutral-300" : "text-neutral-600"}`}>
                  {subheadline}
                </p>
              )}

              <div className={`flex flex-wrap gap-3 pt-2 ${isCenter ? "justify-center" : "justify-start"}`}>
                {primaryCtaText && (
                  <button className="px-6 py-3.5 rounded-xl text-sm font-bold bg-[#0033FF] text-white hover:bg-[#0025CC] transition-all shadow-lg shadow-blue-500/25">
                    {primaryCtaText}
                  </button>
                )}
                {secondaryCtaText && (
                  <button className="px-6 py-3.5 rounded-xl text-sm font-bold border border-neutral-300 bg-white/10 hover:bg-white/20 transition-all">
                    {secondaryCtaText}
                  </button>
                )}
              </div>

              {trustNote && (
                <p className={`text-xs ${theme === "dark" || theme === "blue" ? "text-neutral-400" : "text-neutral-500"}`}>
                  {trustNote}
                </p>
              )}
            </div>
          </section>
        );
      },
    },

    // 3. LEAD CAPTURE FORM
    LeadCaptureForm: {
      fields: {
        headline: { type: "text", label: "Form Headline" },
        subheadline: { type: "textarea", label: "Subheadline" },
        buttonText: { type: "text", label: "Button CTA Text" },
        showCompanyField: {
          type: "radio",
          label: "Show Company Field",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ],
        },
        privacyNote: { type: "text", label: "Privacy / Anti-Spam Note" },
        accentColor: {
          type: "select",
          label: "Accent Color",
          options: [
            { label: "Electric Blue", value: "blue" },
            { label: "Emerald Green", value: "emerald" },
            { label: "Conversion Coral", value: "coral" },
          ],
        },
      },
      defaultProps: {
        headline: "Claim Your Free Conversion Audit",
        subheadline: "Get a comprehensive 12-point CRO breakdown for your current ad campaigns.",
        buttonText: "Get My Free Audit (Zero Cost)",
        showCompanyField: "yes",
        privacyNote: "Strict privacy. No spam ever.",
        accentColor: "blue",
      },
      render: (props) => <LeadCaptureBlock {...props} isEditMode={true} />,
    },

    // 4. LOGO PROOF STRIP
    LogoProofStrip: {
      fields: {
        label: { type: "text", label: "Proof Label" },
        logos: {
          type: "array",
          label: "Brand Logos",
          arrayFields: {
            name: { type: "text", label: "Company Name" },
          },
          getItemSummary: (item) => item.name || "Brand Logo",
        },
      },
      defaultProps: {
        label: "TRUSTED BY 15,000+ HIGH-GROWTH BRANDS AND TOP PERFORMANCE AGENCIES",
        logos: [
          { name: "CampaignFlow" },
          { name: "Looma" },
          { name: "ZestPay" },
          { name: "Northstar" },
          { name: "Kinetix" },
          { name: "Veloce" },
        ],
      },
      render: ({ label, logos }) => (
        <section className="w-full py-8 border-y border-neutral-100 bg-[#F7F8FA]">
          <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
            {label && (
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                {label}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75">
              {logos.map((logo, idx) => (
                <div key={idx} className="font-display font-black text-sm tracking-wider text-neutral-600 hover:text-[#141414] transition-colors">
                  {logo.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    // 5. FEATURE GRID
    FeatureGrid: {
      fields: {
        sectionTitle: { type: "text", label: "Section Title" },
        sectionSubtitle: { type: "textarea", label: "Section Subtitle" },
        columns: {
          type: "radio",
          label: "Columns",
          options: [
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
          ],
        },
        items: {
          type: "array",
          label: "Feature Cards",
          arrayFields: {
            badge: { type: "text", label: "Badge Tag" },
            title: { type: "text", label: "Card Title" },
            description: { type: "textarea", label: "Card Description" },
          },
          getItemSummary: (item) => item.title || "Feature Item",
        },
      },
      defaultProps: {
        sectionTitle: "Engineered For Peak Conversion Rates",
        sectionSubtitle: "Every component is fine-tuned based on over 2.5 Billion analyzed conversion actions.",
        columns: "3",
        items: [
          {
            badge: "AI Native",
            title: "Prompt-to-Page Generation",
            description: "Describe your offer and get a production-ready, beautifully structured landing page in 10 seconds.",
          },
          {
            badge: "Optimization",
            title: "Smart Traffic™ AI Routing",
            description: "Automatically routes visitors to the variant most likely to convert based on device and intent.",
          },
          {
            badge: "Speed",
            title: "Sub-Second Edge Rendering",
            description: "Pages deployed directly to Cloudflare edge nodes with 100/100 Core Web Vitals score.",
          },
        ],
      },
      render: ({ sectionTitle, sectionSubtitle, columns, items }) => (
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="font-display text-3xl font-extrabold text-[#141414]">
              {sectionTitle}
            </h2>
            {sectionSubtitle && (
              <p className="text-xs text-neutral-500 leading-relaxed">
                {sectionSubtitle}
              </p>
            )}
          </div>

          <div className={`grid grid-cols-1 ${columns === "2" ? "md:grid-cols-2" : "md:grid-cols-3"} gap-6`}>
            {items.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-neutral-200/80 bg-white hover:border-neutral-300 shadow-xs transition-all">
                {item.badge && (
                  <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#0033FF] border border-blue-200 mb-3">
                    {item.badge}
                  </span>
                )}
                <h3 className="font-display text-base font-bold text-[#141414] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      ),
    },

    // 6. METRICS BAND
    MetricsBand: {
      fields: {
        theme: {
          type: "select",
          label: "Theme",
          options: [
            { label: "Deep Ink (#141414)", value: "dark" },
            { label: "Electric Blue (#0033FF)", value: "blue" },
            { label: "Light Gray", value: "light" },
          ],
        },
        stats: {
          type: "array",
          label: "Key Metrics",
          arrayFields: {
            value: { type: "text", label: "Metric Value (e.g. 2.5B+)" },
            label: { type: "text", label: "Label Description" },
          },
          getItemSummary: (item) => `${item.value} - ${item.label}`,
        },
      },
      defaultProps: {
        theme: "dark",
        stats: [
          { value: "2.5B+", label: "Conversions Analyzed" },
          { value: "+30%", label: "Average CVR Lift" },
          { value: "< 0.8s", label: "Edge Page Load Speed" },
          { value: "15,000+", label: "Active Marketers" },
        ],
      },
      render: ({ theme, stats }) => {
        const themeStyles = {
          dark: "bg-[#141414] text-white",
          blue: "bg-[#0033FF] text-white",
          light: "bg-[#F7F8FA] text-[#141414]",
        }[theme];

        return (
          <section className={`w-full py-12 px-4 ${themeStyles}`}>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-display text-3xl sm:text-4xl font-black tracking-tight">
                    {s.value}
                  </div>
                  <div className={`text-xs ${theme === "light" ? "text-neutral-500" : "text-neutral-400"}`}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      },
    },

    // 7. TESTIMONIAL CARDS
    TestimonialCards: {
      fields: {
        heading: { type: "text", label: "Section Heading" },
        items: {
          type: "array",
          label: "Testimonials",
          arrayFields: {
            resultBadge: { type: "text", label: "Result Badge (e.g. +47% CVR)" },
            quote: { type: "textarea", label: "Customer Quote" },
            author: { type: "text", label: "Customer Name" },
            role: { type: "text", label: "Company / Role" },
          },
          getItemSummary: (item) => item.author || "Testimonial",
        },
      },
      defaultProps: {
        heading: "Proven by High-Growth Marketers",
        items: [
          {
            resultBadge: "+47% Demo Bookings",
            quote: "Smart Traffic alone lifted our conversion rate by nearly 50% in the first month without changing our ad creative.",
            author: "Elena Rostova",
            role: "VP of Growth, CloudMatrix",
          },
          {
            resultBadge: "3.2x ROAS Increase",
            quote: "We replaced our legacy slow WordPress setup with this engine and our ad quality scores jumped to 10/10.",
            author: "Marcus Vance",
            role: "Founder, Kinetic Performance",
          },
        ],
      },
      render: ({ heading, items }) => (
        <section className="w-full py-16 px-4 max-w-6xl mx-auto space-y-8">
          {heading && (
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#141414] text-center">
              {heading}
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                    {item.resultBadge}
                  </span>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-neutral-600 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <div className="text-xs font-bold text-[#141414]">{item.author}</div>
                  <div className="text-[11px] text-neutral-400">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ),
    },

    // 8. PRICING TIERS
    PricingTiers: {
      fields: {
        heading: { type: "text", label: "Heading" },
        subheading: { type: "textarea", label: "Subheading" },
        plans: {
          type: "array",
          label: "Pricing Plans",
          arrayFields: {
            name: { type: "text", label: "Plan Name" },
            price: { type: "text", label: "Price (e.g. $74)" },
            period: { type: "text", label: "Billing Period (e.g. /month)" },
            description: { type: "text", label: "Short Description" },
            featuresText: { type: "textarea", label: "Features (one per line)" },
            ctaText: { type: "text", label: "CTA Button Label" },
            highlighted: {
              type: "radio",
              label: "Highlight Plan",
              options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ],
            },
          },
          getItemSummary: (item) => `${item.name} (${item.price})`,
        },
      },
      defaultProps: {
        heading: "Transparent, Conversion-Focused Pricing",
        subheading: "All plans include unlimited page publishing and our sub-second edge network.",
        plans: [
          {
            name: "Build",
            price: "$74",
            period: "/mo",
            description: "Essential AI builder for solo growth marketers.",
            featuresText: "Unlimited landing pages\nAI prompt builder\nPopups & Sticky bars\n20,000 monthly visitors",
            ctaText: "Start 14-Day Free Trial",
            highlighted: "no",
          },
          {
            name: "Experiment",
            price: "$112",
            period: "/mo",
            description: "High-growth CRO engine for modern teams.",
            featuresText: "Everything in Build\nUnlimited A/B testing\nSmart Traffic™ AI routing\n50,000 monthly visitors\nDynamic Text Replacement",
            ctaText: "Start 14-Day Free Trial",
            highlighted: "yes",
          },
        ],
      },
      render: ({ heading, subheading, plans }) => (
        <section className="w-full py-16 px-4 max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-display text-3xl font-extrabold text-[#141414]">{heading}</h2>
            {subheading && <p className="text-xs text-neutral-500">{subheading}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((p, idx) => {
              const isHl = p.highlighted === "yes";
              const feats = p.featuresText.split("\n").filter(Boolean);

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border flex flex-col justify-between ${
                    isHl
                      ? "border-[#0033FF] bg-blue-50/20 shadow-xl ring-2 ring-[#0033FF]/20"
                      : "border-neutral-200 bg-white shadow-xs"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#141414]">{p.name}</span>
                      {isHl && (
                        <span className="rounded-full bg-[#0033FF] text-white text-[10px] font-bold px-2 py-0.5">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-3xl font-black text-[#141414]">{p.price}</span>
                      <span className="text-xs text-neutral-500">{p.period}</span>
                    </div>
                    <p className="text-xs text-neutral-500">{p.description}</p>
                    <div className="h-px bg-neutral-200" />
                    <ul className="space-y-2 text-xs text-neutral-600">
                      {feats.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-[#0033FF] shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isHl
                          ? "bg-[#0033FF] text-white hover:bg-[#0025CC] shadow-md shadow-blue-500/20"
                          : "border border-neutral-300 hover:bg-neutral-50 text-[#141414]"
                      }`}
                    >
                      {p.ctaText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ),
    },

    // 9. CTA BANNER
    CtaBanner: {
      fields: {
        headline: { type: "text", label: "Banner Headline" },
        subheadline: { type: "textarea", label: "Banner Subheadline" },
        buttonText: { type: "text", label: "Button Text" },
        trustItems: { type: "text", label: "Trust Bullets (dot separated)" },
        theme: {
          type: "radio",
          label: "Theme",
          options: [
            { label: "Electric Blue (#0033FF)", value: "blue" },
            { label: "Deep Ink (#141414)", value: "dark" },
          ],
        },
      },
      defaultProps: {
        headline: "Ready to turn clicks into profitable customers?",
        subheadline: "Join over 15,000+ businesses scaling with Unbounce AI landing pages today.",
        buttonText: "Start 14-Day Free Trial",
        trustItems: "No credit card required • Cancel anytime • 14-day free trial",
        theme: "blue",
      },
      render: ({ headline, subheadline, buttonText, trustItems, theme }) => {
        const isBlue = theme === "blue";

        return (
          <section className="w-full py-16 px-4">
            <div
              className={`max-w-5xl mx-auto rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl ${
                isBlue ? "bg-[#0033FF] shadow-blue-500/25" : "bg-[#141414] shadow-black/25"
              }`}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                {headline}
              </h2>
              {subheadline && (
                <p className="text-sm opacity-90 max-w-xl mx-auto leading-relaxed">
                  {subheadline}
                </p>
              )}
              <div>
                <button className="px-8 py-3.5 rounded-xl text-sm font-bold bg-white text-[#141414] hover:bg-neutral-100 transition-all shadow-md">
                  {buttonText}
                </button>
              </div>
              {trustItems && <p className="text-xs opacity-75">{trustItems}</p>}
            </div>
          </section>
        );
      },
    },

    // 10. FAQ ACCORDION
    FaqAccordion: {
      fields: {
        heading: { type: "text", label: "Heading" },
        items: {
          type: "array",
          label: "Questions & Answers",
          arrayFields: {
            question: { type: "text", label: "Question" },
            answer: { type: "textarea", label: "Answer" },
          },
          getItemSummary: (item) => item.question || "FAQ Item",
        },
      },
      defaultProps: {
        heading: "Frequently Asked Questions",
        items: [
          {
            question: "How does Smart Traffic differ from regular A/B testing?",
            answer: "Traditional A/B testing splits traffic 50/50 and waits weeks for statistical significance. Smart Traffic uses multi-armed bandit AI to dynamically route each visitor to the variant they are most likely to convert on in real time.",
          },
          {
            question: "Can I connect my own custom domains?",
            answer: "Yes, all plans include custom CNAME domain publishing with automatic SSL certificates provisioned instantly at the edge.",
          },
        ],
      },
      render: ({ heading, items }) => (
        <section className="w-full py-16 px-4 max-w-3xl mx-auto space-y-8">
          {heading && (
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#141414] text-center">
              {heading}
            </h2>
          )}
          <div className="space-y-4">
            {items.map((item, idx) => (
              <details
                key={idx}
                className="group p-4 rounded-2xl border border-neutral-200 bg-white shadow-xs open:bg-neutral-50/50"
              >
                <summary className="font-bold text-xs sm:text-sm text-[#141414] cursor-pointer flex items-center justify-between">
                  <span>{item.question}</span>
                  <ChevronDown className="h-4 w-4 text-neutral-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-xs text-neutral-600 mt-3 pt-3 border-t border-neutral-100 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      ),
    },
  },
};
