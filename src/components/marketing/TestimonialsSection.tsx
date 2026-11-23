"use client";

import * as React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  segment: string;
  resultBadge: string;
  quote: string;
  avatarBg: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Elena Rostova",
    role: "VP of Growth",
    company: "CloudSync (Series B SaaS)",
    segment: "B2B SaaS",
    resultBadge: "+47% Demo Bookings",
    quote: "We migrated from legacy Unbounce and immediately saw our mobile bounce rate drop in half. The AI prompt generator gave us 5 tailored variants for our Google Search ads in under 10 minutes.",
    avatarBg: "bg-blue-600",
  },
  {
    name: "Marcus Vance",
    role: "Managing Director",
    company: "Verve Media Agency",
    segment: "Paid Media Agency",
    resultBadge: "3.2x Paid Ad ROAS",
    quote: "Managing 35 client ad accounts used to require a team of 4 frontend devs just making landing page tweaks. Now our media buyers prompt and publish campaigns directly. Smart Traffic does the rest.",
    avatarBg: "bg-emerald-600",
  },
  {
    name: "Sarah Chen",
    role: "Co-Founder & CMO",
    company: "GlowBotanics DTC",
    segment: "E-Commerce",
    resultBadge: "-38% Cost Per Lead",
    quote: "When we run flash drops on TikTok, hundreds of people land on our pages simultaneously. Unbounce AI loads in under 700ms on mobile edge. It literally printed revenue for our holiday bundle campaign.",
    avatarBg: "bg-rose-600",
  },
  {
    name: "David Kempler",
    role: "Head of Performance Marketing",
    company: "FinFlow Technologies",
    segment: "Fintech",
    resultBadge: "68% Faster Launches",
    quote: "The Dynamic Text Replacement is magical. We went from running 20 duplicate landing pages for different loan keywords down to 2 dynamic templates that match search queries in real time.",
    avatarBg: "bg-amber-600",
  },
  {
    name: "Aria Montgomery",
    role: "Growth Director",
    company: "EduSpark Learning",
    segment: "EdTech",
    resultBadge: "+54% Course Enrollments",
    quote: "Standard 50/50 split testing took us a full month to declare winners. Smart Traffic identified the highest-converting variant within 48 hours and auto-routed 80% of our ad traffic to it.",
    avatarBg: "bg-purple-600",
  },
  {
    name: "Liam O'Connor",
    role: "Principal Partner",
    company: "Apex Advisory Group",
    segment: "Professional Services",
    resultBadge: "4.1x Pipeline Velocity",
    quote: "The built-in multi-step qualification form doubled our completed consultation bookings. High-net-worth clients won't fill out ugly clunky forms—these look like a $50k custom web app.",
    avatarBg: "bg-indigo-600",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <Badge
            variant="outline"
            className="border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-[#00C48C]"
          >
            CUSTOMER SUCCESS STORIES
          </Badge>

          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#141414] sm:text-5xl">
            Marketers who switched{" "}
            <span className="text-[#0033FF]">never looked back.</span>
          </h2>

          <p className="text-base text-neutral-600 sm:text-lg leading-relaxed">
            From high-velocity media agencies to venture-backed SaaS scaleups, discover how top growth teams drive predictable conversion lift with Unbounce AI.
          </p>
        </div>

        {/* 6-Card Responsive 3-Column Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-[#0033FF]/30 hover:shadow-lg"
            >
              <div className="space-y-4">
                {/* Result Pill Badge & 5-Star Row */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-black text-[#00C48C] border border-emerald-200">
                    {t.resultBadge}
                  </span>

                  <div className="flex items-center gap-0.5 text-[#FFB800]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Specific Quote */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-4">
                {/* Color-coded Initials Avatar */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${t.avatarBg}`}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-xs font-bold text-neutral-900">
                      {t.name}
                    </span>
                    <CheckCircle2 className="h-3 w-3 text-[#0033FF] shrink-0" />
                  </div>
                  <p className="truncate text-[11px] text-neutral-500">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

