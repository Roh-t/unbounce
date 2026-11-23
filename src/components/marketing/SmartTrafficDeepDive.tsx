"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  ArrowRight,
  TrendingUp,
  Search,
  CheckCircle2,
  Sliders,
  Sparkles,
  Smartphone,
  Laptop,
  Flame,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface KeywordOption {
  query: string;
  headlineMatch: string;
  intent: string;
  source: string;
}

const KEYWORD_OPTIONS: KeywordOption[] = [
  {
    query: "?kw=b2b-crm-software",
    headlineMatch: "The #1 B2B CRM Software for High-Growth Sales Teams",
    intent: "High Commercial Intent",
    source: "Google Ads Search",
  },
  {
    query: "?kw=best-crm-for-agencies",
    headlineMatch: "The Best CRM Engineered Specifically for Client Agencies",
    intent: "Niche Audience Intent",
    source: "LinkedIn Sponsored Ad",
  },
  {
    query: "?kw=enterprise-sales-tools",
    headlineMatch: "Modern Enterprise Sales Tools That Shorten Deal Cycles",
    intent: "Enterprise Executive",
    source: "Executive Newsletter",
  },
];

export function SmartTrafficDeepDive() {
  const [selectedKeyword, setSelectedKeyword] = React.useState<KeywordOption>(KEYWORD_OPTIONS[0]);

  return (
    <section className="relative overflow-hidden bg-[#F7F8FA] py-20 lg:py-28 border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-[#00C48C]"
          >
            SMART TRAFFIC™ AI OPTIMIZATION
          </Badge>

          <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-[#141414] sm:text-5xl">
            Stop losing 70% of ad clicks to a{" "}
            <span className="text-[#0033FF]">one-size-fits-all</span> landing page.
          </h2>

          <p className="mt-4 text-base text-neutral-600 sm:text-lg leading-relaxed">
            Every visitor is different. Smart Traffic™ automatically learns which page variant converts each unique visitor profile—delivering up to a 30% conversion lift with zero manual testing required.
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2-COLUMN EDITORIAL SHOWCASE                                   */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-16 space-y-16">
          {/* BLOCK A: Smart Traffic Routing Flowchart */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Context & Value Props */}
            <div className="space-y-6 lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0033FF] border border-blue-200">
                <Cpu className="h-3.5 w-3.5" />
                Autonomous Routing Engine
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#141414]">
                Traditional A/B testing is too slow. Smart Traffic optimizes in hours.
              </h3>

              <p className="text-sm leading-relaxed text-neutral-600">
                Legacy A/B testing requires weeks of waiting and wastes 50% of your paid traffic on losing variants. Our multi-armed bandit algorithm continuously shifts ad spend to the best-fit page in real time.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#00C48C]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#141414]">Learns from just 50 visits</span>
                    <p className="text-xs text-neutral-500">
                      Starts routing visitors to their optimal variant in hours, not months.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#0033FF]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#141414]">Contextual multi-attribute matching</span>
                    <p className="text-xs text-neutral-500">
                      Considers device, browser, geolocation, and referral UTM data.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[#FFB800]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#141414]">Zero statistical waste</span>
                    <p className="text-xs text-neutral-500">
                      Underperforming pages automatically receive less traffic without manual pausing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Flow Interactive Diagram */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-neutral-300 bg-white p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Live Traffic Routing Simulation
                  </span>
                  <Badge className="bg-emerald-50 text-[#00C48C] border border-emerald-200 text-xs">
                    +30% Avg Conv Lift
                  </Badge>
                </div>

                {/* Incoming Ad Sources Strip */}
                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl border border-neutral-200 bg-[#F7F8FA] p-2.5">
                    <span className="text-[10px] font-bold text-neutral-400 block uppercase">Ad Source 1</span>
                    <span className="text-xs font-bold text-neutral-900">Google Ads Search</span>
                  </div>
                  <div className="rounded-xl border border-neutral-200 bg-[#F7F8FA] p-2.5">
                    <span className="text-[10px] font-bold text-neutral-400 block uppercase">Ad Source 2</span>
                    <span className="text-xs font-bold text-neutral-900">Meta Mobile Video</span>
                  </div>
                  <div className="rounded-xl border border-neutral-200 bg-[#F7F8FA] p-2.5">
                    <span className="text-[10px] font-bold text-neutral-400 block uppercase">Ad Source 3</span>
                    <span className="text-xs font-bold text-neutral-900">LinkedIn B2B Feed</span>
                  </div>
                </div>

                {/* Central AI Brain Router Node */}
                <div className="my-6 flex flex-col items-center justify-center">
                  <div className="h-6 w-0.5 bg-neutral-300" />
                  <div className="flex items-center gap-2 rounded-full bg-[#141414] px-5 py-2 text-white shadow-md">
                    <Cpu className="h-4 w-4 text-[#0033FF] animate-pulse" />
                    <span className="font-display text-xs font-bold">
                      Smart Traffic™ Bandit Algorithm
                    </span>
                  </div>
                  <div className="h-6 w-0.5 bg-neutral-300" />
                </div>

                {/* Outbound Dynamic Variants Split */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Variant A */}
                  <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3 space-y-1.5 text-center">
                    <span className="text-[10px] font-bold uppercase text-[#0033FF]">Desktop Search</span>
                    <p className="font-bold text-xs text-neutral-900">Variant A: Quick Form</p>
                    <p className="text-[11px] text-emerald-600 font-extrabold">14.2% Conv Rate</p>
                  </div>

                  {/* Variant B */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 space-y-1.5 text-center">
                    <span className="text-[10px] font-bold uppercase text-[#00C48C]">Mobile Social</span>
                    <p className="font-bold text-xs text-neutral-900">Variant B: Video Demo</p>
                    <p className="text-[11px] text-emerald-600 font-extrabold">18.5% Conv Rate</p>
                  </div>

                  {/* Variant C */}
                  <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-3 space-y-1.5 text-center">
                    <span className="text-[10px] font-bold uppercase text-purple-600">Enterprise Exec</span>
                    <p className="font-bold text-xs text-neutral-900">Variant C: ROI Calculator</p>
                    <p className="text-[11px] text-emerald-600 font-extrabold">16.8% Conv Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCK B: Dynamic Text Replacement (DTR) Interactive Simulator */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 pt-8 border-t border-neutral-200">
            {/* Left Column: Interactive DTR Simulator */}
            <div className="order-2 lg:order-1 lg:col-span-7">
              <div className="rounded-2xl border border-neutral-300 bg-white p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-[#0033FF]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                      Dynamic Text Replacement (DTR) Simulator
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-neutral-400">
                    Click a Keyword Below:
                  </span>
                </div>

                {/* 3 Clickable Keyword Pill Triggers */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {KEYWORD_OPTIONS.map((opt) => (
                    <button
                      key={opt.query}
                      onClick={() => setSelectedKeyword(opt)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-mono font-semibold transition-all ${
                        selectedKeyword.query === opt.query
                          ? "bg-[#0033FF] text-white shadow-xs"
                          : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400"
                      }`}
                    >
                      {opt.query}
                    </button>
                  ))}
                </div>

                {/* Live Simulated Landing Page Canvas */}
                <div className="mt-6 rounded-xl border border-neutral-200 bg-[#F7F8FA] p-6 text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
                    <span>Traffic Source: <strong className="text-neutral-800">{selectedKeyword.source}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">{selectedKeyword.intent}</span>
                  </div>

                  {/* Dynamically Matched Headline with Highlight Box */}
                  <motion.div
                    key={selectedKeyword.headlineMatch}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="mx-auto max-w-lg rounded-xl border-2 border-[#0033FF] bg-white p-5 shadow-sm"
                  >
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#0033FF] uppercase mb-2 inline-block">
                      DTR Keyword Match: 10/10 Quality Score
                    </span>
                    <h4 className="font-display text-lg sm:text-xl font-extrabold text-[#141414]">
                      {selectedKeyword.headlineMatch}
                    </h4>
                    <p className="mt-2 text-xs text-neutral-500">
                      Matches the exact query entered in Google Ads, reducing bounce rate by 55%.
                    </p>
                  </motion.div>

                  {/* Sticky Promotional Bar Simulation */}
                  <div className="mx-auto max-w-lg rounded-lg bg-[#141414] p-3 text-white flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Zap className="h-3.5 w-3.5 text-[#FFB800]" />
                      Limited 20% Discount for Today&apos;s Searchers
                    </span>
                    <Button size="sm" className="h-7 bg-[#FF4F38] text-white font-bold text-[11px] px-3">
                      Claim Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Explanation */}
            <div className="order-1 lg:order-2 space-y-6 lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#00C48C] border border-emerald-200">
                <Search className="h-3.5 w-3.5" />
                Higher Ad Quality Score
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#141414]">
                Match exact ad copy without creating 50 separate pages.
              </h3>

              <p className="text-sm leading-relaxed text-neutral-600">
                Google rewards ad-to-landing-page relevance. With Dynamic Text Replacement, your landing page headlines dynamically match the exact search keyword the user typed—instantly increasing Quality Score and cutting your ad spend.
              </p>

              <div className="space-y-3 pt-2">
                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <span className="font-bold text-sm text-[#141414] block">Slash Cost-Per-Click by 30-45%</span>
                  <p className="text-xs text-neutral-500 mt-1">
                    Higher Quality Scores mean you win ad auctions while paying significantly less per click than competitors.
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <span className="font-bold text-sm text-[#141414] block">Targeted Popups & Sticky Notification Bars</span>
                  <p className="text-xs text-neutral-500 mt-1">
                    Capture abandoning visitors with exit-intent modals and countdown promotional bars tailored to their UTM campaign.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

