export interface NavLinkItem {
  title: string;
  description: string;
  href: string;
  iconName: string;
  badge?: string;
}

export interface FeaturedPromo {
  tag: string;
  title: string;
  description: string;
  href: string;
  ctaText: string;
}

export interface MegaCategory {
  title: string;
  description?: string;
  items: NavLinkItem[];
}

export const PRODUCT_NAV: {
  build: MegaCategory;
  optimize: MegaCategory;
  featured: FeaturedPromo;
} = {
  build: {
    title: "Create & Build",
    description: "Launch responsive, high-converting pages in record time",
    items: [
      {
        title: "AI Landing Page Builder",
        description: "Generate full structured pages, headlines, and conversion copy in seconds from a single prompt.",
        href: "/features#ai-builder",
        iconName: "Sparkles",
        badge: "AI Native",
      },
      {
        title: "Drag-and-Drop Canvas",
        description: "Pixel-perfect visual editor with modern responsive flexbox controls and zero coordinate bugs.",
        href: "/features#builder",
        iconName: "LayoutTemplate",
      },
      {
        title: "High-Converting Templates",
        description: "100+ industry-tested templates engineered for maximum ad Quality Score and ROAS.",
        href: "/templates",
        iconName: "Palette",
      },
      {
        title: "Popups & Sticky Bars",
        description: "Engage abandoning visitors with exit-intent modals and targeted sticky promotional bars.",
        href: "/features#popups",
        iconName: "BellRing",
      },
    ],
  },
  optimize: {
    title: "Optimize & Convert",
    description: "Automate experimentation and maximize revenue per visitor",
    items: [
      {
        title: "Smart Traffic AI",
        description: "Autonomous multi-armed bandit algorithm routes visitors to the variant most likely to convert.",
        href: "/features#smart-traffic",
        iconName: "Cpu",
        badge: "+35% Lift",
      },
      {
        title: "A/B & Multi-Variant Testing",
        description: "Run clean statistical experiments with zero client-side flicker and instant variant switching.",
        href: "/features#ab-testing",
        iconName: "Split",
      },
      {
        title: "Dynamic Text Replacement",
        description: "Match page copy dynamically to Google Ads search keywords for instant 10/10 ad relevance.",
        href: "/features#dynamic-text",
        iconName: "RefreshCw",
      },
      {
        title: "Integrations & Webhooks",
        description: "Directly sync captured leads to HubSpot, Salesforce, Klaviyo, Zapier, and custom webhooks.",
        href: "/features#integrations",
        iconName: "Boxes",
      },
    ],
  },
  featured: {
    tag: "HYBRID BUILDER",
    title: "Prompt, Customize, or Drag-and-Drop",
    description: "The only builder combining pure LLM page generation with precision pixel-level editing.",
    href: "/features#ai-builder",
    ctaText: "Explore AI Canvas",
  },
};

export const SOLUTIONS_NAV: NavLinkItem[] = [
  {
    title: "Agencies",
    description: "Multi-tenant client workspaces, automated performance reporting, and white-labeling.",
    href: "/templates?category=Agency",
    iconName: "Briefcase",
  },
  {
    title: "SaaS & Tech",
    description: "Double product signups, trial starts, and high-ticket enterprise demo bookings.",
    href: "/templates?category=SaaS",
    iconName: "Cloud",
  },
  {
    title: "E-Commerce",
    description: "Launch targeted flash sale pages, seasonal lookbooks, and bundle checkout funnels.",
    href: "/templates?category=Ecommerce",
    iconName: "ShoppingCart",
  },
  {
    title: "B2B Lead Generation",
    description: "Multi-step smart forms with UTM capture, qualification logic, and instant CRM routing.",
    href: "/templates?category=Lead+Gen",
    iconName: "Users",
  },
  {
    title: "Small Businesses",
    description: "Launch professional lead-gen funnels without hiring expensive development agencies.",
    href: "/pricing",
    iconName: "Store",
  },
  {
    title: "Professional Services",
    description: "Direct ad traffic to high-trust consultation booking pages for law, finance, and medical.",
    href: "/templates?category=Consulting",
    iconName: "Award",
  },
];

export const RESOURCES_NAV: NavLinkItem[] = [
  {
    title: "Conversion Benchmark Report",
    description: "Proprietary analysis of 100M+ landing page visits across 16 major ad verticals.",
    href: "/features#compare",
    iconName: "BarChart3",
    badge: "2026 Data",
  },
  {
    title: "Landing Page Examples",
    description: "Curated teardowns of top-performing SaaS, e-com, and lead capture landing pages.",
    href: "/templates",
    iconName: "Eye",
  },
  {
    title: "What is a Landing Page?",
    description: "The comprehensive masterclass on conversion scent, information hierarchy, and CRO.",
    href: "/features",
    iconName: "BookOpen",
  },
  {
    title: "Pricing & Plans Guide",
    description: "Transparent feature comparison table, traffic allowances, and FAQ.",
    href: "/pricing#faq",
    iconName: "Newspaper",
  },
];

export interface FooterSection {
  title: string;
  links: { label: string; href: string; badge?: string }[];
}

export const FOOTER_COLUMNS: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "AI Landing Page Builder", href: "/features#ai-builder", badge: "New" },
      { label: "Visual Canvas", href: "/features#builder" },
      { label: "High-Converting Templates", href: "/templates" },
      { label: "Smart Traffic AI", href: "/features#smart-traffic" },
      { label: "A/B Testing", href: "/features#ab-testing" },
      { label: "Dynamic Text Replacement", href: "/features#dynamic-text" },
      { label: "Popups & Sticky Bars", href: "/features#popups" },
      { label: "Pricing & Plans", href: "/pricing" },
      { label: "Platform Features", href: "/features" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Agencies", href: "/templates?category=Agency" },
      { label: "For SaaS & Software", href: "/templates?category=SaaS" },
      { label: "For E-Commerce", href: "/templates?category=Ecommerce" },
      { label: "For B2B Lead Gen", href: "/templates?category=Lead+Gen" },
      { label: "For Consultants", href: "/templates?category=Consulting" },
      { label: "For Media Buyers", href: "/pricing" },
      { label: "Enterprise CRO", href: "/pricing#agency" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Unbounce AI", href: "/features#compare" },
      { label: "Features Tour", href: "/features" },
      { label: "Templates Gallery", href: "/templates" },
      { label: "Transparent Pricing", href: "/pricing" },
      { label: "Start Free Trial", href: "/signup", badge: "14-Day Free" },
      { label: "Customer Login", href: "/login" },
      { label: "Security & Edge CDN", href: "/features#compare" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      { label: "Talk to Sales", href: "/signup?plan=agency" },
      { label: "Pricing FAQ", href: "/pricing#faq" },
      { label: "Explore Features", href: "/features" },
      { label: "Browse Templates", href: "/templates" },
      { label: "Client Login", href: "/login" },
      { label: "Platform Status", href: "/pricing#faq", badge: "Operational" },
    ],
  },
];

export const AI_RESEARCH_PILLS = [
  {
    name: "ChatGPT",
    prompt: "https://chatgpt.com/?q=What+is+Unbounce+AI+and+how+does+its+smart+traffic+engine+increase+conversions+compared+to+legacy+landing+page+builders%3F",
  },
  {
    name: "Claude",
    prompt: "https://claude.ai/new?q=Explain+how+Unbounce+AI+builds+high-converting+landing+pages+using+modular+components+and+multi-armed+bandit+A%2FB+testing",
  },
  {
    name: "Gemini",
    prompt: "https://gemini.google.com/app",
  },
  {
    name: "Perplexity",
    prompt: "https://www.perplexity.ai/search?q=How+does+Unbounce+AI+compare+to+traditional+landing+page+builders+in+speed+and+conversion+rates%3F",
  },
];
