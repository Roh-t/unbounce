"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Check, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCtaBanner() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Large Rounded Electric Blue Banner Container */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0033FF] px-6 py-14 sm:px-12 sm:py-20 text-white shadow-2xl">
          {/* Subtle Geometric Overlay Texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(#FFFFFF 1px, transparent 1px), radial-gradient(#FFFFFF 1px, #0033FF 1px)`,
              backgroundSize: "24px 24px",
              backgroundPosition: "0 0, 12px 12px",
            }}
          />

          <div className="relative mx-auto max-w-3xl text-center space-y-6">
            {/* Top Micro Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-xs border border-white/20">
              <Sparkles className="h-3.5 w-3.5 text-blue-200" />
              <span>START OPTIMIZING IN UNDER 3 MINUTES</span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl sm:leading-[1.12]">
              Launch your highest-converting landing page in the next 3 minutes.
            </h2>

            {/* Subheadline */}
            <p className="mx-auto max-w-xl text-sm sm:text-base text-blue-100 leading-relaxed">
              Prompt with AI, customize a proven template, or build from scratch. Join 15,000+ top marketing teams turning more ad clicks into revenue today.
            </p>

            {/* Dual Conversion CTA Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button className="h-12 w-full rounded-xl bg-white px-8 font-bold text-[#0033FF] shadow-md transition-all duration-150 hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-xl sm:w-auto">
                  Start building for free
                  <ArrowRight className="ml-2 h-4 w-4 text-[#0033FF]" />
                </Button>
              </Link>

              <Link href="/pricing" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-xl border-white/30 bg-transparent px-6 font-semibold text-white transition-all hover:bg-white/10 hover:border-white sm:w-auto"
                >
                  Compare pricing plans
                </Button>
              </Link>
            </div>

            {/* Horizontal Trust Checklist */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-6 text-xs text-blue-200 font-medium border-t border-white/15">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-white" /> 14-day free trial
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-white" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-white" /> Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

