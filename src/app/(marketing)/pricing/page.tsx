"use client";

import * as React from "react";
import Link from "next/link";
import { Check, HelpCircle, ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FinalCtaBanner } from "@/components/marketing/FinalCtaBanner";

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  monthlyPrice: number;
  annualPrice: number;
  visitorsTarget: string;
  description: string;
  aiCredits: string;
  keyFeatures: string[];
}

const PLANS: PricingPlan[] = [
  {
    id: "build",
    name: "Build",
    monthlyPrice: 99,
    annualPrice: 74,
    visitorsTarget: "20K",
    description: "For solo marketers, founders, and startups creating their first high-converting pages.",
    aiCredits: "50 AI credits / month",
    keyFeatures: [
      "Unlimited landing pages & variants",
      "AI Prompt-to-Page builder",
      "Popups & sticky promotional bars",
      "Up to 20,000 monthly visitors",
      "1 custom domain + free SSL",
      "1 workspace with standard support",
      "Direct CRM & webhook lead sync",
    ],
  },
  {
    id: "experiment",
    name: "Experiment",
    badge: "Most Popular",
    isPopular: true,
    monthlyPrice: 149,
    annualPrice: 112,
    visitorsTarget: "50K",
    description: "For growing teams scaling ad campaigns with continuous A/B testing and keyword matching.",
    aiCredits: "150 AI credits / month",
    keyFeatures: [
      "Everything in Build, plus:",
      "Unlimited 1-click A/B & multivariate testing",
      "Dynamic Text Replacement (Google Ads DTR)",
      "Up to 30,000 monthly visitors",
      "3 custom domains with sub-second edge CDN",
      "3 team member seats with role permissions",
      "Real-time statistical significance meter",
    ],
  },
  {
    id: "optimize",
    name: "Optimize",
    monthlyPrice: 249,
    annualPrice: 187,
    visitorsTarget: "100K",
    description: "For high-performance media buyers maximizing ROAS with autonomous AI traffic routing.",
    aiCredits: "300 AI credits / month",
    keyFeatures: [
      "Everything in Experiment, plus:",
      "Smart Traffic™ autonomous bandit AI routing",
      "Up to 50,000 monthly visitors",
      "5 custom domains with automated SSL",
      "Unlimited team member seats",
      "Advanced multi-touch attribution & analytics",
      "Priority customer success manager",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    monthlyPrice: 599,
    annualPrice: 449,
    visitorsTarget: "250K+",
    description: "For digital agencies and enterprise marketing departments managing multi-client portfolios.",
    aiCredits: "1,000 AI credits / month",
    keyFeatures: [
      "Everything in Optimize, plus:",
      "Multi-tenant client workspaces & white-labeling",
      "15+ custom domains with custom CNAMEs",
      "150,000+ monthly visitors (custom scaling)",
      "Dedicated CRO strategy & migration architect",
      "Custom SLA & 24/7 priority emergency support",
      "SOC-2 Type II report & Enterprise DPA",
    ],
  },
];

const ESTIMATOR_OPTIONS = ["20K", "50K", "100K", "250K+"] as const;

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = React.useState(true);
  const [selectedTraffic, setSelectedTraffic] = React.useState<string>("50K");

  // Dynamic recommended plan highlighting based on visitor selection
  const recommendedPlanId = React.useMemo(() => {
    switch (selectedTraffic) {
      case "20K":
        return "build";
      case "50K":
        return "experiment";
      case "100K":
        return "optimize";
      case "250K+":
        return "agency";
      default:
        return "experiment";
    }
  }, [selectedTraffic]);

  return (
    <div className="min-h-screen bg-white text-[#141414]">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION                                                  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50/70 px-3.5 py-1 text-xs font-bold text-[#0033FF]"
          >
            TRANSPARENT VALUE-BASED PRICING
          </Badge>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#141414]">
            Simple, conversion-focused pricing that{" "}
            <span className="text-[#0033FF]">scales with your wins.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-neutral-600 leading-relaxed">
            Every plan includes unlimited landing pages, sub-second global edge delivery, and our generative AI engine. No predatory overage fees.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-semibold cursor-pointer ${
                !isAnnual ? "text-[#141414]" : "text-neutral-500"
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly Billing
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              role="switch"
              aria-checked={isAnnual}
              className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isAnnual ? "bg-[#0033FF]" : "bg-neutral-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <span
              className={`text-sm font-semibold cursor-pointer flex items-center gap-1.5 ${
                isAnnual ? "text-[#141414]" : "text-neutral-500"
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual Billing
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-black text-[#00C48C] border border-emerald-200">
                Save 25%
              </span>
            </span>
          </div>

          {/* Monthly Visitors Estimator Pills */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider mr-2">
              Estimate Monthly Ad Traffic:
            </span>
            {ESTIMATOR_OPTIONS.map((traffic) => (
              <button
                key={traffic}
                onClick={() => setSelectedTraffic(traffic)}
                className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                  selectedTraffic === traffic
                    ? "bg-[#141414] text-white shadow-xs"
                    : "border border-neutral-200 bg-[#F7F8FA] text-neutral-600 hover:border-neutral-400"
                }`}
              >
                {traffic} visitors/mo
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4 PRICING CARDS GRID                                          */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PLANS.map((plan) => {
            const isRecommended = plan.id === recommendedPlanId;
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                id={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                  isRecommended
                    ? "border-[#0033FF] bg-white shadow-xl ring-2 ring-[#0033FF]"
                    : "border-neutral-200 bg-white hover:border-neutral-300 shadow-xs"
                }`}
              >
                {/* Popular or Recommended Top Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#0033FF] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-extrabold text-[#141414]">
                      {plan.name}
                    </h3>
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-600">
                      Up to {plan.visitorsTarget}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-neutral-500 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 border-y border-neutral-100 py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl sm:text-5xl font-black text-[#141414]">
                        ${price}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">/ month</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {isAnnual ? `Billed annually ($${price * 12}/yr)` : "Billed monthly, cancel anytime"}
                    </p>
                  </div>

                  {/* AI Credits Tag */}
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#0033FF] border border-blue-200">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{plan.aiCredits}</span>
                  </div>

                  {/* Key Features List */}
                  <div className="mt-6 space-y-2.5 text-xs text-neutral-700">
                    {plan.keyFeatures.map((feat) => (
                      <div key={feat} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[#00C48C] shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8 pt-4 border-t border-neutral-100">
                  <Link href={`/signup?plan=${plan.id}`}>
                    <Button
                      className={`w-full font-bold text-xs h-11 rounded-xl transition-all ${
                        isRecommended
                          ? "bg-[#0033FF] hover:bg-[#0025CC] text-white shadow-md hover:-translate-y-0.5"
                          : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      {plan.id === "agency" ? "Contact sales & demo" : "Start 14-day free trial"}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <p className="text-center text-[10px] text-neutral-400 mt-2">
                    No credit card required
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURE COMPARISON MATRIX TABLE                               */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-[#F7F8FA] py-20 border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#141414]">
              Compare all features across plans
            </h2>
            <p className="text-sm text-neutral-600">
              Complete breakdown of core builder functionality, AI models, and enterprise support.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="p-4 font-bold text-neutral-800 w-1/3">Feature</th>
                  <th className="p-4 font-bold text-neutral-800 text-center">Build</th>
                  <th className="p-4 font-bold text-[#0033FF] text-center">Experiment</th>
                  <th className="p-4 font-bold text-neutral-800 text-center">Optimize</th>
                  <th className="p-4 font-bold text-neutral-800 text-center">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {/* Section: Core Builder */}
                <tr className="bg-neutral-100/60 font-bold text-[11px] uppercase tracking-wider text-neutral-500">
                  <td colSpan={5} className="p-3 pl-4">Core Page Builder & Runtimes</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Unlimited landing pages & variants</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Monthly visitor capacity</td>
                  <td className="p-4 text-center text-neutral-600">20,000</td>
                  <td className="p-4 text-center font-bold text-[#0033FF]">30,000</td>
                  <td className="p-4 text-center text-neutral-600">50,000</td>
                  <td className="p-4 text-center text-neutral-600">150,000+</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Sub-second global edge CDN</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Custom domains connected</td>
                  <td className="p-4 text-center text-neutral-600">1 domain</td>
                  <td className="p-4 text-center font-bold text-[#0033FF]">3 domains</td>
                  <td className="p-4 text-center text-neutral-600">5 domains</td>
                  <td className="p-4 text-center text-neutral-600">15+ domains</td>
                </tr>

                {/* Section: AI & Optimization */}
                <tr className="bg-neutral-100/60 font-bold text-[11px] uppercase tracking-wider text-neutral-500">
                  <td colSpan={5} className="p-3 pl-4">AI & CRO Optimization</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">AI Prompt-to-Page Generation</td>
                  <td className="p-4 text-center text-neutral-600">50 credits/mo</td>
                  <td className="p-4 text-center font-bold text-[#0033FF]">150 credits/mo</td>
                  <td className="p-4 text-center text-neutral-600">300 credits/mo</td>
                  <td className="p-4 text-center text-neutral-600">1,000 credits/mo</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">A/B & Multi-Variant Split Testing</td>
                  <td className="p-4 text-center text-neutral-400">—</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓ Unlimited</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓ Unlimited</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓ Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Dynamic Text Replacement (Google Ads DTR)</td>
                  <td className="p-4 text-center text-neutral-400">—</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Smart Traffic™ Autonomous AI Routing</td>
                  <td className="p-4 text-center text-neutral-400">—</td>
                  <td className="p-4 text-center text-neutral-400">—</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓ Multi-Armed Bandit</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓ Multi-Armed Bandit</td>
                </tr>

                {/* Section: Team & Workspaces */}
                <tr className="bg-neutral-100/60 font-bold text-[11px] uppercase tracking-wider text-neutral-500">
                  <td colSpan={5} className="p-3 pl-4">Team, Workspaces & Security</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Team seats</td>
                  <td className="p-4 text-center text-neutral-600">1 user</td>
                  <td className="p-4 text-center text-neutral-600">3 users</td>
                  <td className="p-4 text-center font-bold text-[#0033FF]">Unlimited</td>
                  <td className="p-4 text-center text-neutral-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Multi-tenant client workspaces</td>
                  <td className="p-4 text-center text-neutral-400">—</td>
                  <td className="p-4 text-center text-neutral-400">—</td>
                  <td className="p-4 text-center text-neutral-400">—</td>
                  <td className="p-4 text-center text-[#00C48C] font-bold">✓ Full Isolation</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Support level</td>
                  <td className="p-4 text-center text-neutral-600">Email & Docs</td>
                  <td className="p-4 text-center text-neutral-600">Priority Chat</td>
                  <td className="p-4 text-center text-neutral-600">Dedicated CSM</td>
                  <td className="p-4 text-center font-bold text-[#0033FF]">24/7 Slack Channel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* PRICING FAQ (ACCORDION)                                       */}
      {/* ------------------------------------------------------------- */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <Badge variant="outline" className="text-xs font-bold text-neutral-600">
            FREQUENTLY ASKED QUESTIONS
          </Badge>
          <h2 className="font-display text-3xl font-extrabold text-[#141414]">
            Everything you need to know about billing
          </h2>
        </div>

        <Accordion className="w-full space-y-3">
          <AccordionItem value="faq-1" className="rounded-xl border border-neutral-200 bg-white px-5 shadow-xs">
            <AccordionTrigger className="py-4 font-display font-bold text-sm text-[#141414]">
              How does the 14-day free trial work?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-xs text-neutral-600 leading-relaxed">
              You get full unrestricted access to your chosen plan for 14 days without entering a credit card. You can generate pages with AI, connect custom domains, and launch live campaigns. If you choose not to subscribe, your account simply pauses without surprise billing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-2" className="rounded-xl border border-neutral-200 bg-white px-5 shadow-xs">
            <AccordionTrigger className="py-4 font-display font-bold text-sm text-[#141414]">
              What happens if my campaigns exceed the monthly visitor limit?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-xs text-neutral-600 leading-relaxed">
              Unlike legacy builders, we never shut off your live landing pages or penalize your traffic in the middle of a campaign. We provide a generous grace window and automatically notify you with the option to upgrade or add affordable extra visitor blocks.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-3" className="rounded-xl border border-neutral-200 bg-white px-5 shadow-xs">
            <AccordionTrigger className="py-4 font-display font-bold text-sm text-[#141414]">
              Can I connect my own custom domains and root domains?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-xs text-neutral-600 leading-relaxed">
              Yes. All plans support custom domain mapping with automated free SSL certificate provisioning. You can map subdomains (e.g. `promo.yourbrand.com`) or apex root domains seamlessly via standard CNAME records.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-4" className="rounded-xl border border-neutral-200 bg-white px-5 shadow-xs">
            <AccordionTrigger className="py-4 font-display font-bold text-sm text-[#141414]">
              How does Unbounce AI compare in pricing to legacy Unbounce?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-xs text-neutral-600 leading-relaxed">
              Legacy builders like Unbounce charge upwards of $100–$600+/month with harsh domain lockouts and dated jQuery runtimes. Unbounce AI provides true generative prompt-to-page generation, autonomous multi-armed bandit routing, sub-second edge speeds, and transparent value pricing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-5" className="rounded-xl border border-neutral-200 bg-white px-5 shadow-xs">
            <AccordionTrigger className="py-4 font-display font-bold text-sm text-[#141414]">
              What are AI generation credits and how do they renew?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-xs text-neutral-600 leading-relaxed">
              1 credit allows you to generate a full landing page layout or run 10 localized copy rewrites and headline variations. Credits renew automatically on the first day of each billing cycle. Unused credits rollover for up to 3 billing periods.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-6" className="rounded-xl border border-neutral-200 bg-white px-5 shadow-xs">
            <AccordionTrigger className="py-4 font-display font-bold text-sm text-[#141414]">
              Can I cancel or switch plans at any time?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-xs text-neutral-600 leading-relaxed">
              Yes. You can upgrade, downgrade, or cancel directly from your workspace dashboard with 1 click. If you cancel, your pages remain active until the end of your current prepaid billing term.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FINAL CONVERSION CTA BANNER                                   */}
      {/* ------------------------------------------------------------- */}
      <FinalCtaBanner />
    </div>
  );
}

