"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Play,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Split,
  Laptop,
  Smartphone,
  Sliders,
  ShieldCheck,
  Zap,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Preset Prompt Variations for the Interactive Mockup
interface IndustryPreset {
  id: string;
  name: string;
  prompt: string;
  variantA: {
    badge: string;
    headline: string;
    highlight: string;
    subheadline: string;
    cta: string;
    ctaColor: string;
    formLabel: string;
    metric: string;
    metricLabel: string;
  };
  variantB: {
    badge: string;
    headline: string;
    highlight: string;
    subheadline: string;
    cta: string;
    ctaColor: string;
    formLabel: string;
    metric: string;
    metricLabel: string;
  };
}

const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: "saas",
    name: "B2B SaaS CRM",
    prompt: "High-ticket sales pipeline CRM for fast-growing B2B revenue teams",
    variantA: {
      badge: "Pipeline Acceleration",
      headline: "Close 2x More Enterprise Deals With",
      highlight: "Autonomous Sales Intelligence",
      subheadline: "Replace clunky legacy spreadsheets with predictive pipeline analytics and automated deal tracking.",
      cta: "Book 15-Min Live Demo",
      ctaColor: "#0033FF",
      formLabel: "Enter your work email for priority access",
      metric: "+142%",
      metricLabel: "Average pipeline velocity lift",
    },
    variantB: {
      badge: "Risk-Free Trial",
      headline: "The Modern CRM Built For",
      highlight: "High-Velocity RevOps Teams",
      subheadline: "Get complete deal visibility in 5 minutes without mandatory onboarding fees or engineering overhead.",
      cta: "Start Free 14-Day Trial",
      ctaColor: "#FF4F38",
      formLabel: "Start free trial — no credit card needed",
      metric: "99.4%",
      metricLabel: "Customer retention rate",
    },
  },
  {
    id: "clinic",
    name: "Dental Clinic",
    prompt: "Modern gentle family & cosmetic dental practice in Downtown Chicago",
    variantA: {
      badge: "Painless Modern Dentistry",
      headline: "Experience Comfortable Dental Care In",
      highlight: "Downtown Chicago",
      subheadline: "Same-day appointments, 3D digital imaging, and sedation options tailored for anxious patients.",
      cta: "Schedule Free Consultation",
      ctaColor: "#00C48C",
      formLabel: "Select preferred day and time",
      metric: "4.9★",
      metricLabel: "Over 850+ verified patient reviews",
    },
    variantB: {
      badge: "Emergency & Urgent Care",
      headline: "Same-Day Emergency Dental Visits",
      highlight: "Zero Wait Time Guarantee",
      subheadline: "Broken tooth or severe pain? Walk in today and be seen by board-certified specialists in under 30 minutes.",
      cta: "Call Now for Immediate Care",
      ctaColor: "#0033FF",
      formLabel: "Emergency hotline & urgent booking",
      metric: "<20min",
      metricLabel: "Average check-in to exam time",
    },
  },
  {
    id: "skincare",
    name: "DTC Skincare",
    prompt: "Clinically backed peptide brightening serum for hyperpigmentation",
    variantA: {
      badge: "Clinical Dermatology Formula",
      headline: "Fade Stubborn Dark Spots With",
      highlight: "Bio-Fermented Peptides",
      subheadline: "Visible skin tone brightening and deeper barrier hydration proven in double-blind dermatological trials.",
      cta: "Claim 20% Off Bundle",
      ctaColor: "#FF4F38",
      formLabel: "Get 20% off code & free shipping",
      metric: "94%",
      metricLabel: "Reported visible glow in 14 days",
    },
    variantB: {
      badge: "Clean Beauty Certified",
      headline: "The Science-Backed Botanical Serum For",
      highlight: "Radiant Morning Skin",
      subheadline: "100% vegan, fragrance-free, and dermatologist-tested on sensitive, acne-prone complexions.",
      cta: "Shop The Complete Routine",
      ctaColor: "#0033FF",
      formLabel: "Join 40,000+ subscriber glow club",
      metric: "30-Day",
      metricLabel: "100% money-back guarantee",
    },
  },
];

export function HeroSection() {
  const [selectedPreset, setSelectedPreset] = React.useState<IndustryPreset>(INDUSTRY_PRESETS[0]);
  const [activeVariant, setActiveVariant] = React.useState<"A" | "B">("A");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [demoOpen, setDemoOpen] = React.useState(false);
  const [customPrompt, setCustomPrompt] = React.useState(selectedPreset.prompt);

  const handleSelectPreset = (preset: IndustryPreset) => {
    setIsGenerating(true);
    setSelectedPreset(preset);
    setCustomPrompt(preset.prompt);
    setTimeout(() => setIsGenerating(false), 300);
  };

  const handleCustomGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 400);
  };

  const currentVariantData = activeVariant === "A" ? selectedPreset.variantA : selectedPreset.variantB;

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Subtle Geometric Grid Lines in Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#141414 1px, transparent 1px), radial-gradient(#141414 1px, #FFFFFF 1px)`,
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 16px 16px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Pill Badge */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1 text-xs font-semibold text-neutral-800 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00C48C] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00C48C]" />
              </span>
              <span className="tracking-wide text-[11px] font-bold text-neutral-700">
                POWERED BY 2.5B+ CONVERSION INSIGHTS
              </span>
            </div>
          </motion.div>
        </div>

        {/* Main Hero Header */}
        <div className="mx-auto mt-6 max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-display text-4xl font-extrabold tracking-[-0.035em] text-[#141414] sm:text-6xl sm:leading-[1.08] lg:text-7xl"
          >
            Turn clicks into customers—with landing pages{" "}
            <span className="relative inline-block text-[#0033FF]">
              built to convert.
              <svg
                aria-hidden="true"
                viewBox="0 0 418 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 -bottom-1 w-full text-[#FF4F38]"
              >
                <path
                  d="M1 9C120 2 300 2 417 9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 sm:text-xl leading-relaxed"
          >
            The next-generation CRO platform engineered for marketers. Build in 30 seconds with generative AI, customize 100+ proven templates, or drag-and-drop with total precision—delivering an average{" "}
            <span className="font-bold text-[#141414]">30% conversion rate lift</span>.
          </motion.p>

          {/* Dual Conversion CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link href="/signup" className="w-full sm:w-auto">
              <Button className="h-12 w-full rounded-xl bg-[#0033FF] px-8 text-base font-bold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#0025CC] hover:shadow-md sm:w-auto">
                Start building for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => setDemoOpen(true)}
              className="h-12 w-full rounded-xl border-neutral-300 bg-white px-6 text-sm font-semibold text-neutral-800 transition-all hover:border-neutral-900 hover:bg-neutral-50 sm:w-auto"
            >
              <Play className="mr-2 h-3.5 w-3.5 fill-current text-[#0033FF]" />
              Watch 90-sec demo
            </Button>
          </motion.div>

          {/* Micro Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-neutral-500"
          >
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#00C48C]" /> 14-day free trial
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0033FF]" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-[#FFB800]" /> Publish in 3 minutes
            </span>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE "BETTER THAN UNBOUNCE" SHOWCASE FRAME               */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="relative mx-auto mt-12 max-w-5xl"
        >
          {/* Main Browser Window Frame */}
          <div className="overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-2xl ring-1 ring-black/5">
            {/* Top Browser Navigation Chrome */}
            <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 bg-neutral-100/90 px-4 py-3 gap-2">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              {/* URL Address Bar */}
              <div className="flex flex-1 max-w-md items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 shadow-2xs">
                <span className="text-neutral-400 mr-1">https://</span>
                <span className="font-medium text-neutral-800">preview.unbounce.ai</span>
                <span className="text-neutral-400">/p/{selectedPreset.id}-page</span>
              </div>

              {/* Live Preview Status Pill */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-[#00C48C] border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00C48C] animate-pulse" />
                  Live Preview
                </span>
              </div>
            </div>

            {/* Interactive Control Console Strip */}
            <div className="border-b border-neutral-200 bg-[#F7F8FA] p-3 sm:p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                {/* 3 Prompt Preset Chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider mr-1">
                    Try Prompt:
                  </span>
                  {INDUSTRY_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        selectedPreset.id === preset.id
                          ? "bg-[#0033FF] text-white shadow-xs"
                          : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50"
                      }`}
                    >
                      <Sparkles className="h-3 w-3" />
                      {preset.name}
                    </button>
                  ))}
                </div>

                {/* Variant A vs Variant B Switcher Toggle */}
                <div className="flex items-center gap-2 self-start lg:self-auto">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    Variant:
                  </span>
                  <div className="inline-flex rounded-lg border border-neutral-300 bg-white p-0.5 shadow-2xs">
                    <button
                      onClick={() => setActiveVariant("A")}
                      className={`rounded-md px-3 py-1 text-xs font-bold transition-colors ${
                        activeVariant === "A"
                          ? "bg-[#0033FF] text-white shadow-xs"
                          : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      Variant A (Control)
                    </button>
                    <button
                      onClick={() => setActiveVariant("B")}
                      className={`rounded-md px-3 py-1 text-xs font-bold transition-colors ${
                        activeVariant === "B"
                          ? "bg-[#FF4F38] text-white shadow-xs"
                          : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      Variant B (Smart AI)
                    </button>
                  </div>
                </div>
              </div>

              {/* Custom Prompt Input & Re-Generate Button */}
              <div className="mt-3 flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Describe your landing page offer or product..."
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-[#0033FF] focus:outline-none focus:ring-1 focus:ring-[#0033FF]"
                  />
                </div>
                <Button
                  size="sm"
                  onClick={handleCustomGenerate}
                  disabled={isGenerating}
                  className="h-8.5 rounded-lg bg-[#141414] px-4 text-xs font-bold text-white hover:bg-neutral-800"
                >
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 text-[#00C48C]" />
                  {isGenerating ? "Building..." : "Generate Variant"}
                </Button>
              </div>
            </div>

            {/* ----------------------------------------------------------- */}
            {/* CANVAS INTERIOR — LIVE MINIATURE LANDING PAGE PREVIEW       */}
            {/* ----------------------------------------------------------- */}
            <div className="relative min-h-[420px] bg-white p-6 sm:p-10">
              {/* Floating Realistic Badge: Conversion Score (Top Right) */}
              <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 rounded-xl border border-neutral-200 bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-xs">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[#00C48C]">
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    CRO Score
                  </p>
                  <p className="text-xs font-black text-neutral-900">
                    96/100 <span className="text-[#00C48C] font-semibold">• High Scent</span>
                  </p>
                </div>
              </div>

              {/* Floating Realistic Badge: Smart Traffic Active (Bottom Left) */}
              <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 rounded-xl border border-neutral-200 bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-xs">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[#0033FF]">
                  <Cpu className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Smart Traffic AI
                  </p>
                  <p className="text-xs font-black text-[#0033FF]">
                    Active • <span className="text-[#00C48C] font-bold">+34% Conv Lift</span>
                  </p>
                </div>
              </div>

              {/* Live Rendered Canvas with Animated Swapping */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedPreset.id}-${activeVariant}-${isGenerating}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="mx-auto max-w-2xl text-center"
                >
                  {/* Miniature Hero Pill Badge */}
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0033FF] border border-blue-200">
                    <Sparkles className="h-3 w-3" />
                    {currentVariantData.badge}
                  </div>

                  {/* Miniature Headline */}
                  <h3 className="font-display mt-4 text-2xl font-black tracking-tight text-[#141414] sm:text-3xl">
                    {currentVariantData.headline}{" "}
                    <span className="text-[#0033FF]">
                      {currentVariantData.highlight}
                    </span>
                  </h3>

                  {/* Miniature Subheadline */}
                  <p className="mx-auto mt-3 max-w-lg text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {currentVariantData.subheadline}
                  </p>

                  {/* Miniature Conversion Form Container */}
                  <div className="mx-auto mt-6 max-w-md rounded-xl border border-neutral-200 bg-[#F7F8FA] p-4 shadow-xs">
                    <p className="text-left text-[11px] font-semibold text-neutral-700 mb-2">
                      {currentVariantData.formLabel}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="text"
                        placeholder="you@company.com"
                        readOnly
                        className="h-9 w-full rounded-lg border border-neutral-300 bg-white px-3 text-xs text-neutral-700 placeholder:text-neutral-400"
                      />
                      <button
                        style={{ backgroundColor: currentVariantData.ctaColor }}
                        className="h-9 w-full sm:w-auto shrink-0 rounded-lg px-4 text-xs font-bold text-white shadow-2xs hover:opacity-95 transition-opacity"
                      >
                        {currentVariantData.cta}
                      </button>
                    </div>
                  </div>

                  {/* Live Conversion Metric Proof Bar */}
                  <div className="mt-6 flex items-center justify-center gap-6 border-t border-neutral-100 pt-4 text-left">
                    <div>
                      <p className="font-display text-xl font-extrabold text-[#141414]">
                        {currentVariantData.metric}
                      </p>
                      <p className="text-[11px] text-neutral-500 font-medium">
                        {currentVariantData.metricLabel}
                      </p>
                    </div>
                    <div className="h-8 w-px bg-neutral-200" />
                    <div>
                      <p className="font-display text-xl font-extrabold text-[#00C48C]">
                        100/100
                      </p>
                      <p className="text-[11px] text-neutral-500 font-medium">
                        Edge Lighthouse Speed
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 90-Second Demo Modal Walkthrough */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="max-w-2xl bg-white p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-extrabold text-[#141414]">
              How Unbounce AI Delivers a +30% Conversion Lift
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {/* Video Mockup Stage */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#141414] to-[#1F1F1F] p-6 text-white shadow-inner flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#0033FF] text-white">Interactive Tour</Badge>
                <span className="text-xs text-neutral-400">Duration: 1:30</span>
              </div>
              <div className="text-center space-y-2">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xs ring-4 ring-white/20">
                  <Play className="h-6 w-6 fill-current text-white ml-1" />
                </div>
                <h4 className="font-display text-base font-bold">
                  From Prompt to Published Edge Landing Page
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Watch how our generative canvas produces multi-variant pages and autonomously routes ad traffic.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>00:15 / 01:30</span>
                <span>HD • 60 FPS</span>
              </div>
            </div>

            {/* Key Capabilities Bullet Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <div className="rounded-lg border border-neutral-200 bg-[#F7F8FA] p-3">
                <span className="font-bold text-[#141414] block">1. AI Page Gen</span>
                <span className="text-neutral-500 text-[11px]">Full page & copy in 5 seconds</span>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-[#F7F8FA] p-3">
                <span className="font-bold text-[#141414] block">2. Visual Canvas</span>
                <span className="text-neutral-500 text-[11px]">Responsive block editing</span>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-[#F7F8FA] p-3">
                <span className="font-bold text-[#141414] block">3. Smart Traffic</span>
                <span className="text-neutral-500 text-[11px]">Bandit algorithm routing</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link href="/signup">
                <Button className="bg-[#0033FF] hover:bg-[#0025CC] text-white font-bold">
                  Start Free 14-Day Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

