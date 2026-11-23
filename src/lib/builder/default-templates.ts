import type { Data } from "@puckeditor/core";

export function ensureComponentIds(data: Data): Data {
  if (!data) return { root: {}, content: [] };
  const clone = JSON.parse(JSON.stringify(data)) as Data;
  if (!clone.root) clone.root = {};
  if (!clone.root.props) clone.root.props = {};
  if (!Array.isArray(clone.content)) clone.content = [];

  clone.content = clone.content.map((item, idx) => {
    if (!item.props) item.props = {} as any;
    if (!item.props.id) {
      item.props.id = `${item.type}-${idx + 1}-${Math.random().toString(36).slice(2, 7)}`;
    }
    return item;
  });

  return clone;
}

export const saasDefaultData: Data = {
  root: {
    props: {
      title: "SaaS AI Launchpad — High CVR",
    },
  },
  content: [
    {
      type: "AnnouncementBar",
      props: {
        id: "announcement-bar-1",
        badgeLabel: "NEW",
        text: "Smart Traffic™ Multi-Armed Bandit Engine Live for B2B",
        ctaText: "See Performance Data →",
        bgColor: "blue",
      },
    },
    {
      type: "HeroSection",
      props: {
        id: "hero-section-1",
        eyebrow: "POWERED BY 2.5B+ CONVERSIONS",
        headline: "Ship High-Converting Pages 10x Faster with AI",
        subheadline: "The complete CRO engine for modern SaaS teams. Generate prompt-to-page layouts, test variants autonomously, and scale revenue.",
        primaryCtaText: "Start 14-Day Free Trial",
        secondaryCtaText: "Watch 90-Sec Demo",
        alignment: "center",
        theme: "light",
        trustNote: "No credit card required • Instant sub-second edge deployment",
      },
    },
    {
      type: "LogoProofStrip",
      props: {
        id: "logo-proof-strip-1",
        label: "TRUSTED BY 15,000+ HIGH-GROWTH SAAS COMPANIES",
        logos: [
          { name: "CampaignFlow" },
          { name: "Looma AI" },
          { name: "ZestPay" },
          { name: "Northstar" },
          { name: "Kinetix Scale" },
        ],
      },
    },
    {
      type: "FeatureGrid",
      props: {
        id: "feature-grid-1",
        sectionTitle: "Engineered For Peak B2B Conversions",
        sectionSubtitle: "Every block is mathematically tuned to reduce bounce rates and capture high-intent leads.",
        columns: "3",
        items: [
          {
            badge: "AI Generation",
            title: "Prompt-to-Page Layouts",
            description: "Describe your software in plain English and get a fully serialized landing page in 10 seconds.",
          },
          {
            badge: "Dynamic Traffic",
            title: "Smart Traffic™ AI Routing",
            description: "Contextual bandit algorithm automatically delivers each visitor to their winning variant.",
          },
          {
            badge: "Speed",
            title: "Sub-Second Global Edge",
            description: "Zero client-side flicker with instant server-edge HTML hydration.",
          },
        ],
      },
    },
    {
      type: "MetricsBand",
      props: {
        id: "metrics-band-1",
        theme: "dark",
        stats: [
          { value: "2.5B+", label: "Conversion Events Analyzed" },
          { value: "+34.8%", label: "Average CVR Lift" },
          { value: "< 0.8s", label: "Edge Page Load Speed" },
          { value: "99.4%", label: "Statistical Significance" },
        ],
      },
    },
    {
      type: "PricingTiers",
      props: {
        id: "pricing-tiers-1",
        heading: "Simple, Conversion-Focused Pricing",
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
    },
    {
      type: "CtaBanner",
      props: {
        id: "cta-banner-1",
        headline: "Turn your ad spend into paying software customers",
        subheadline: "Join thousands of performance marketers launching hyper-optimized landing pages.",
        buttonText: "Start 14-Day Free Trial",
        trustItems: "14-day free trial • Cancel anytime with 1 click • SOC-2 certified",
        theme: "blue",
      },
    },
  ],
};

export const leadGenDefaultData: Data = {
  root: {
    props: {
      title: "B2B Enterprise Lead Magnet Guide",
    },
  },
  content: [
    {
      type: "AnnouncementBar",
      props: {
        id: "announcement-bar-lg-1",
        badgeLabel: "EXCLUSIVE REPORT",
        text: "The 2026 SaaS Conversion Benchmark Report is Available for Download",
        ctaText: "Get Free PDF →",
        bgColor: "ink",
      },
    },
    {
      type: "HeroSection",
      props: {
        id: "hero-section-lg-1",
        eyebrow: "FREE EXECUTIVE WHITE PAPER",
        headline: "Download The 2026 SaaS Conversion Benchmark Report",
        subheadline: "Analyzed over 2.5 Billion page sessions across 15,000 campaigns to uncover what actually converts in 2026.",
        primaryCtaText: "Download Whitepaper (PDF)",
        secondaryCtaText: "View Table of Contents",
        alignment: "center",
        theme: "light",
        trustNote: "Instant PDF delivery to your work inbox",
      },
    },
    {
      type: "LeadCaptureForm",
      props: {
        id: "lead-capture-form-lg-1",
        headline: "Get Instant Access to the Full 48-Page Report",
        subheadline: "Includes complete teardowns of the top 1% highest-converting B2B landing pages.",
        buttonText: "Send Me The Free Report Now",
        showCompanyField: "yes",
        privacyNote: "Strict corporate privacy. Zero spam guaranteed.",
        accentColor: "blue",
      },
    },
    {
      type: "MetricsBand",
      props: {
        id: "metrics-band-lg-1",
        theme: "blue",
        stats: [
          { value: "48 Pages", label: "In-Depth Research" },
          { value: "1,200+", label: "Landing Pages Tested" },
          { value: "+42%", label: "Average Headline Lift" },
          { value: "100% Free", label: "Zero Obligation" },
        ],
      },
    },
    {
      type: "TestimonialCards",
      props: {
        id: "testimonial-cards-lg-1",
        heading: "What Growth Executives Say",
        items: [
          {
            resultBadge: "Must-Read for 2026",
            quote: "This benchmark report completely changed our paid acquisition strategy. We restructured our hero forms and doubled demo bookings.",
            author: "Sarah Chen",
            role: "Head of Growth, TechScale",
          },
          {
            resultBadge: "+38% Form Completion",
            quote: "The multi-step form optimization chapter alone saved us over $40,000 in wasted ad spend last quarter.",
            author: "Marcus Vance",
            role: "Managing Director, Apex Labs",
          },
        ],
      },
    },
    {
      type: "FaqAccordion",
      props: {
        id: "faq-accordion-lg-1",
        heading: "Frequently Asked Questions",
        items: [
          {
            question: "Is this report truly free?",
            answer: "Yes, 100% free with no credit card or sales call required. You will receive an immediate download link.",
          },
          {
            question: "Can I share this internally with my team?",
            answer: "Yes, you are encouraged to circulate the PDF with your marketing, design, and executive teams.",
          },
        ],
      },
    },
  ],
};

export const ecommerceDefaultData: Data = {
  root: {
    props: {
      title: "DTC Skincare Summer Flash Sale",
    },
  },
  content: [
    {
      type: "AnnouncementBar",
      props: {
        id: "announcement-bar-ecom-1",
        badgeLabel: "FLASH SALE",
        text: "Limited Summer Drop — Save 30% on All Clean Botanical Duos",
        ctaText: "Shop Flash Drop →",
        bgColor: "coral",
      },
    },
    {
      type: "HeroSection",
      props: {
        id: "hero-section-ecom-1",
        eyebrow: "DERMATOLOGIST TESTED • CLINICALLY PROVEN",
        headline: "Unlock Radiant Skin in 14 Days — Botanical Flash Sale",
        subheadline: "Formulated with wild-harvested peptides and clinical antioxidants. Over 10,000 five-star verified customer reviews.",
        primaryCtaText: "Claim 30% Off Bundle",
        secondaryCtaText: "See Clinical Before & Afters",
        alignment: "center",
        theme: "light",
        trustNote: "Free expedited shipping on orders over $50 • 30-day money-back guarantee",
      },
    },
    {
      type: "LeadCaptureForm",
      props: {
        id: "lead-capture-form-ecom-1",
        headline: "Unlock Your VIP 30% Flash Code",
        subheadline: "Enter your email to reveal your private discount code and free gift with purchase.",
        buttonText: "Reveal My 30% Off Code",
        showCompanyField: "no",
        privacyNote: "Unsubscribe anytime. We protect your data.",
        accentColor: "coral",
      },
    },
    {
      type: "FeatureGrid",
      props: {
        id: "feature-grid-ecom-1",
        sectionTitle: "Clean Clinical Science Meets High Luxury",
        sectionSubtitle: "Zero parabens, zero fillers, 100% active botanicals that deliver visible glass-skin glow.",
        columns: "3",
        items: [
          {
            badge: "Purity",
            title: "100% Clean Formulation",
            description: "EWG-verified ingredients sourced ethically from certified regenerative organic farms.",
          },
          {
            badge: "Clinical Results",
            title: "14-Day Cellular Renewal",
            description: "Clinically demonstrated 94% improvement in skin moisture barrier and collagen density.",
          },
          {
            badge: "Guarantee",
            title: "30-Day Happiness Guarantee",
            description: "If you don't love your radiant glow, return the empty bottles for a full refund with no hassle.",
          },
        ],
      },
    },
    {
      type: "CtaBanner",
      props: {
        id: "cta-banner-ecom-1",
        headline: "Your brightest skin is just 14 days away",
        subheadline: "Limited inventory remaining for the summer batch. Claim your 30% savings today.",
        buttonText: "Shop the Duo Now",
        trustItems: "Free shipping • 30-day empty bottle guarantee • Dermatologist approved",
        theme: "blue",
      },
    },
  ],
};

export function getDefaultPuckData(category?: string, title?: string): Data {
  const cat = (category || "").toLowerCase();

  let baseData: Data;
  if (cat.includes("lead") || cat.includes("gen") || cat.includes("whitepaper")) {
    baseData = JSON.parse(JSON.stringify(leadGenDefaultData));
  } else if (cat.includes("ecom") || cat.includes("dtc") || cat.includes("product") || cat.includes("retail")) {
    baseData = JSON.parse(JSON.stringify(ecommerceDefaultData));
  } else {
    baseData = JSON.parse(JSON.stringify(saasDefaultData));
  }

  if (title) {
    baseData.root = {
      props: {
        title,
      },
    };
    const hero = baseData.content.find((item) => item.type === "HeroSection");
    if (hero && hero.props) {
      hero.props.headline = title;
    }
  }

  return ensureComponentIds(baseData);
}
