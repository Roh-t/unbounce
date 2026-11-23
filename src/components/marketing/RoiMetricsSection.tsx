"use client";

import * as React from "react";
import { CheckCircle2, XCircle, ArrowRight, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function RoiMetricsSection() {
  return (
    <section className="relative overflow-hidden bg-[#141414] py-20 lg:py-28 text-white">
      {/* Subtle Radial Electric Glow Behind Section */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #0033FF 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <Badge className="bg-[#0033FF]/20 text-blue-300 border border-[#0033FF]/30 text-xs font-bold">
            PROVEN AT SCALE
          </Badge>

          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Backed by over{" "}
            <span className="text-[#0033FF]">2.5 billion</span> real-world conversions.
          </h2>

          <p className="text-base text-neutral-400 sm:text-lg leading-relaxed">
            Our machine learning models have analyzed over a decade of paid advertising data, uncovering the exact design patterns, headline formats, and page velocities that maximize conversion rates.
          </p>
        </div>

        {/* 4 High-Impact Stat Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat 1 */}
          <div className="rounded-2xl border border-[#262626] bg-[#1A1A1A] p-6 space-y-3 transition-transform hover:-translate-y-1">
            <span className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white block">
              2.5B+
            </span>
            <h4 className="font-display text-base font-bold text-neutral-200">
              Conversions Analyzed
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Proprietary conversion intelligence trained on hundreds of millions of paid Google & Meta ad clicks.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="rounded-2xl border border-[#262626] bg-[#1A1A1A] p-6 space-y-3 transition-transform hover:-translate-y-1">
            <span className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#00C48C] block">
              +30%
            </span>
            <h4 className="font-display text-base font-bold text-neutral-200">
              Avg. Conversion Lift
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Achieved by Smart Traffic™ multi-armed bandit AI automatically routing visitors to their winning variant.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="rounded-2xl border border-[#262626] bg-[#1A1A1A] p-6 space-y-3 transition-transform hover:-translate-y-1">
            <span className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#0033FF] block">
              &lt; 0.8s
            </span>
            <h4 className="font-display text-base font-bold text-neutral-200">
              Edge Page Load Time
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Sub-second global edge CDN delivery scoring 100/100 Core Web Vitals to lower ad Cost-Per-Click.
            </p>
          </div>

          {/* Stat 4 */}
          <div className="rounded-2xl border border-[#262626] bg-[#1A1A1A] p-6 space-y-3 transition-transform hover:-translate-y-1">
            <span className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#FFB800] block">
              15,000+
            </span>
            <h4 className="font-display text-base font-bold text-neutral-200">
              Teams & Top Agencies
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Fast-growing media agencies and SaaS brands scaling profitable customer acquisition worldwide.
            </p>
          </div>
        </div>

        {/* Bottom Comparison Callout Strip: Why High-Growth Teams Switch */}
        <div className="mt-12 rounded-2xl border border-[#2A2A2A] bg-[#1C1C1C] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1 max-w-md">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0033FF]">
                The Architectural Advantage
              </span>
              <h4 className="font-display text-xl font-extrabold text-white">
                Why modern growth teams replace legacy page builders
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">100/100 Core Web Vitals</strong>
                  <span className="text-neutral-400">Boosts Google Ads Quality Score to slash CPC.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Instant Generative AI</strong>
                  <span className="text-neutral-400">Generate full pages and tailored copy in 10s.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Autonomous Bandit Routing</strong>
                  <span className="text-neutral-400">Zero wasted traffic on slow 50/50 split tests.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

