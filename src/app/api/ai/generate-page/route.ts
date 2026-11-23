import { NextResponse } from "next/server";
import { z } from "zod";
import type { Data } from "@puckeditor/core";

import { getCurrentUser } from "@/lib/auth/session";
import { ensureComponentIds } from "@/lib/builder/default-templates";

const generateSchema = z.object({
  prompt: z.string().min(3, "Please enter a descriptive prompt"),
  tone: z.enum(["bold", "enterprise", "friendly"]).default("bold"),
  goal: z.enum(["lead-gen", "demo", "product-launch"]).default("lead-gen"),
});

// Helper: Smart Structured AI Composer (Zero API Key Fallback)
function composeSmartPage(prompt: string, tone: string, goal: string): Data {
  const cleanPrompt = prompt.trim();
  const lower = cleanPrompt.toLowerCase();

  // 1. Detect industry / niche
  let industry = "General SaaS";
  let product = "GrowthPlatform AI";
  let targetAudience = "modern growth leaders";
  let proofLogos = ["ScaleFlow", "HyperLoop", "MetricVibe", "ApexData", "ZenithHQ", "PulseCloud"];

  if (lower.includes("real estate") || lower.includes("realtor") || lower.includes("property")) {
    industry = "Real Estate";
    product = "EstateFlow AI";
    targetAudience = "top-producing agents and brokerages";
    proofLogos = ["CompassPeak", "SothebyModern", "KellerPulse", "VanguardEstates", "BeaconRealty", "PremierHomes"];
  } else if (lower.includes("dental") || lower.includes("clinic") || lower.includes("implant") || lower.includes("health")) {
    industry = "Healthcare";
    product = "SmileCraft Dental Studio";
    targetAudience = "patients seeking painless, same-day transformations";
    proofLogos = ["ApexHealth", "VitalisCare", "ClearSmile", "MedVanguard", "OmniDent", "NovaWellness"];
  } else if (lower.includes("security") || lower.includes("cyber") || lower.includes("compliance") || lower.includes("soc2")) {
    industry = "Cybersecurity";
    product = "SentinelShield SOC";
    targetAudience = "security leaders, CISOs, and enterprise IT teams";
    proofLogos = ["FortressNet", "CloudGuard", "ZeroTrustHQ", "CyberMatrix", "VigilantData", "IroncladCloud"];
  } else if (lower.includes("skincare") || lower.includes("dtc") || lower.includes("ecommerce") || lower.includes("beauty")) {
    industry = "Ecommerce & Beauty";
    product = "Lumière Botanic Serum";
    targetAudience = "beauty enthusiasts craving radiant, clinical results";
    proofLogos = ["VogueBeauty", "ElleGlow", "GlossMatrix", "BotanicaLab", "PureAura", "ZenithStyle"];
  } else if (lower.includes("agency") || lower.includes("marketing") || lower.includes("ads") || lower.includes("cro")) {
    industry = "Growth Agency";
    product = "OmniGrowth Media";
    targetAudience = "CMOs and performance marketing teams";
    proofLogos = ["AdScale", "CampaignHero", "VerveMedia", "AlphaClick", "ConvertLab", "ROASKings"];
  } else {
    // Extract a product name candidate if mentioned
    const words = cleanPrompt.split(/\s+/);
    if (words.length > 0 && words[0].length > 2) {
      product = words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
  }

  // 2. Adjust copy based on Goal & Tone
  let primaryCta = "Start 14-Day Free Trial";
  let secondaryCta = "Watch 90-Sec Demo";
  let formButton = "Claim Free Growth Audit";

  if (goal === "demo") {
    primaryCta = "Schedule Live VIP Demo";
    secondaryCta = "View Product Tour";
    formButton = "Book 15-Min Strategy Session";
  } else if (goal === "product-launch") {
    primaryCta = "Get Early Access Pass";
    secondaryCta = "Explore Feature Matrix";
    formButton = "Join Priority Waitlist (Instant Access)";
  }

  // Headline styling
  let headline = `Transform Your ${industry} Performance with Autonomous AI`;
  let subheadline = `The all-in-one high-converting engine built for ${targetAudience}. Automate repetitive workflows, optimize conversion velocity, and scale revenue.`;

  if (industry === "Real Estate") {
    headline = "Close 3x More Luxury Listings with Autonomous Real Estate AI";
    subheadline = "Capture high-intent home buyers and sellers on autopilot. Nurture leads with hyper-personalized SMS and voice intelligence in seconds.";
  } else if (industry === "Healthcare") {
    headline = "Restore Your Perfect Smile with Same-Day 3D Guided Implants";
    subheadline = "Minimally invasive, virtually painless dental restorations engineered by board-certified specialists with over 20 years of excellence.";
  } else if (industry === "Cybersecurity") {
    headline = "Continuous Autonomous Cloud Security & SOC 2 Compliance in Hours";
    subheadline = "Eliminate vulnerabilities across AWS, Azure, and GCP before attackers strike. Backed by real-time remediation and audit-ready reports.";
  } else if (industry === "Ecommerce & Beauty") {
    headline = "Clinical Grade Botanical Skincare Engineered for Immediate Radiance";
    subheadline = "100% certified organic, dermatologist tested, and formulated with bioactive peptides that restore your youthful barrier overnight.";
  }

  if (tone === "bold") {
    headline = "Stop Wasting 70% of Your Ad Budget. Convert Traffic at Scale.";
  } else if (tone === "enterprise") {
    headline = `Enterprise-Grade ${industry} Intelligence Powered by Next-Gen AI`;
  }

  const generatedData: Data = {
    root: {
      props: {
        title: `${product} — High CVR Landing Page`,
      },
    },
    content: [
      {
        type: "AnnouncementBar",
        props: {
          id: `announcement-bar-${Date.now()}-1`,
          badgeLabel: "NEW RELEASE",
          text: `Announcing ${product} 2.0 with Smart Traffic™ autonomous routing.`,
          ctaText: "See Performance Data →",
          bgColor: "blue",
        },
      },
      {
        type: "HeroSection",
        props: {
          id: `hero-section-${Date.now()}-2`,
          eyebrow: `BATTLE-TESTED BY 15,000+ ${targetAudience.toUpperCase()}`,
          headline,
          subheadline,
          primaryCtaText: primaryCta,
          secondaryCtaText: secondaryCta,
          alignment: "center",
          theme: "light",
          trustNote: "✓ No credit card required • 14-day free trial • Cancel anytime",
        },
      },
      {
        type: "LogoProofStrip",
        props: {
          id: `logo-strip-${Date.now()}-3`,
          label: `TRUSTED BY INDUSTRY LEADERS IN ${industry.toUpperCase()}`,
          logos: proofLogos.map((name) => ({ name })),
        },
      },
      {
        type: "FeatureGrid",
        props: {
          id: `feature-grid-${Date.now()}-4`,
          sectionTitle: "Engineered for Conversion Velocity",
          sectionSubtitle: `Everything ${targetAudience} needs to drive predictable, high-margin pipeline.`,
          columns: "3",
          items: [
            {
              badge: "Autonomous AI",
              title: "Instant Multi-Variant Generation",
              description: "Generate tailored headlines, persuasive copy, and conversion angles customized to every ad audience in seconds.",
            },
            {
              badge: "Sub-Second Edge",
              title: "Edge Runtime & Global CDN",
              description: "Deliver 100/100 Core Web Vitals with pages loading in under 800ms globally, reducing ad bounce rates by up to 40%.",
            },
            {
              badge: "Smart Traffic™",
              title: "Multi-Armed Bandit Routing",
              description: "Machine learning algorithms automatically route each visitor to the variant they are statistically most likely to convert on.",
            },
          ],
        },
      },
      {
        type: "MetricsBand",
        props: {
          id: `metrics-band-${Date.now()}-5`,
          theme: "dark",
          stats: [
            { value: "3.4x", label: "Average ROAS Multiplier" },
            { value: "+38%", label: "Verified Conversion Lift" },
            { value: "< 0.8s", label: "Edge Page Load Speed" },
            { value: "99.99%", label: "Enterprise SLA Uptime" },
          ],
        },
      },
      {
        type: "LeadCaptureForm",
        props: {
          id: `lead-form-${Date.now()}-6`,
          headline: `Claim Your VIP ${industry} Growth Consultation`,
          subheadline: "Get a comprehensive 12-point conversion audit and custom implementation blueprint within 24 hours.",
          buttonText: formButton,
          showCompanyField: "yes",
          privacyNote: "Strict enterprise security. We never sell or share your data.",
          accentColor: "blue",
        },
      },
      {
        type: "TestimonialCards",
        props: {
          id: `testimonials-${Date.now()}-7`,
          heading: "Loved by Top Growth Marketers Worldwide",
          items: [
            {
              resultBadge: "+52% Demo Bookings",
              quote: `${product} completely transformed our paid acquisition funnel. We went from a 3.1% CVR to 8.4% in less than 3 weeks.`,
              author: "Marcus Vance",
              role: "Head of Growth, Velocity Labs",
            },
            {
              resultBadge: "3.8x ROAS Scale",
              quote: "The combination of sub-second edge loading and autonomous variant testing allowed us to double our ad spend profitably.",
              author: "Sophia Alvarez",
              role: "VP Marketing, CloudMatrix",
            },
            {
              resultBadge: "-41% Cost Per Lead",
              quote: "Setting up A/B tests used to take our developers two sprints. Now our marketing team deploys and tests in 5 minutes.",
              author: "David Kim",
              role: "Growth Director, DTC Nexus",
            },
          ],
        },
      },
      {
        type: "FaqAccordion",
        props: {
          id: `faq-accordion-${Date.now()}-8`,
          heading: "Frequently Asked Questions",
          items: [
            {
              question: `How quickly can I launch with ${product}?`,
              answer: "You can publish your first high-converting page in under 5 minutes. Select your template or generate one with AI, connect your custom domain, and hit Publish.",
            },
            {
              question: "How does Smart Traffic™ compare to traditional A/B testing?",
              answer: "Traditional A/B testing splits traffic 50/50 and requires weeks of data before declaring a winner. Smart Traffic uses multi-armed bandit machine learning to dynamically direct traffic to the best variant as early as visitor #50, boosting total conversions while testing.",
            },
            {
              question: "Can I connect my CRM and analytics tools?",
              answer: "Yes! Leads captured integrate seamlessly with HubSpot, Salesforce, Zapier, Klaviyo, and custom Webhook endpoints.",
            },
            {
              question: "Is there a free trial?",
              answer: "Yes, you get full access to all features for 14 days without any credit card required.",
            },
          ],
        },
      },
      {
        type: "CtaBanner",
        props: {
          id: `cta-banner-${Date.now()}-9`,
          headline: "Ready to Turn More Clicks into Customers?",
          subheadline: `Join 15,000+ businesses scaling conversions with ${product} today.`,
          buttonText: primaryCta,
          trustItems: "✓ 14-Day Free Trial • No Credit Card Required • Instant Edge Setup",
          theme: "blue",
        },
      },
    ],
  };

  return ensureComponentIds(generatedData);
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const body = await req.json();
    const parsed = generateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { prompt, tone, goal } = parsed.data;

    // Check if Gemini API Key is present in environment
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an elite CRO landing page designer for Unbounce AI.
Create a JSON landing page with valid Puck Data structure for the following prompt: "${prompt}".
Tone: ${tone}. Goal: ${goal}.

Return ONLY valid JSON matching this structure:
{
  "root": { "props": { "title": "Page Title" } },
  "content": [
    { "type": "AnnouncementBar", "props": { "badgeLabel": "NEW", "text": "...", "ctaText": "...", "bgColor": "blue" } },
    { "type": "HeroSection", "props": { "eyebrow": "...", "headline": "...", "subheadline": "...", "primaryCtaText": "...", "secondaryCtaText": "...", "alignment": "center", "theme": "light", "trustNote": "..." } },
    { "type": "LogoProofStrip", "props": { "label": "...", "logos": [{ "name": "..." }] } },
    { "type": "FeatureGrid", "props": { "sectionTitle": "...", "sectionSubtitle": "...", "columns": "3", "items": [{ "badge": "...", "title": "...", "description": "..." }] } },
    { "type": "MetricsBand", "props": { "theme": "dark", "stats": [{ "value": "...", "label": "..." }] } },
    { "type": "LeadCaptureForm", "props": { "headline": "...", "subheadline": "...", "buttonText": "...", "showCompanyField": "yes", "privacyNote": "...", "accentColor": "blue" } },
    { "type": "TestimonialCards", "props": { "heading": "...", "items": [{ "resultBadge": "...", "quote": "...", "author": "...", "role": "..." }] } },
    { "type": "FaqAccordion", "props": { "heading": "...", "items": [{ "question": "...", "answer": "..." }] } },
    { "type": "CtaBanner", "props": { "headline": "...", "subheadline": "...", "buttonText": "...", "trustItems": "...", "theme": "blue" } }
  ]
}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (response.ok) {
          const geminiData = await response.json();
          const jsonText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (jsonText) {
            const parsedJson = JSON.parse(jsonText) as Data;
            if (parsedJson && Array.isArray(parsedJson.content)) {
              return NextResponse.json({
                data: ensureComponentIds(parsedJson),
                mode: "gemini",
              });
            }
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini API call fell back to Smart Engine:", geminiErr);
      }
    }

    // High-craft Smart Structured Engine (Instantaneous, zero external API requirement)
    const smartData = composeSmartPage(prompt, tone, goal);

    return NextResponse.json({
      data: ensureComponentIds(smartData),
      mode: "smart-engine",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
