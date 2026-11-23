"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Layout,
  Layers,
  Split,
  ArrowRight,
  CheckCircle2,
  Code2,
  MousePointer2,
  Sliders,
  TrendingUp,
  Cpu,
  Eye,
  Type,
  Maximize2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabDefinition {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
}

const TABS: TabDefinition[] = [
  {
    id: "ai-prompt",
    badge: "Instant Generation",
    title: "Prompt with AI",
    subtitle: "Describe your offer and get a conversion-ready page in 10 seconds.",
    description: "Our LLM engine generates complete page structures, persuasive marketing copy, tailored forms, and high-contrast color palettes specifically tuned for your campaign goal.",
    icon: Sparkles,
  },
  {
    id: "templates",
    badge: "100+ Proven Designs",
    title: "Customize Templates",
    subtitle: "Start from battle-tested layouts engineered by top CRO experts.",
    description: "Every template is built with proven conversion scent, high mobile Quality Scores, and responsive layouts designed to outperform standard agency designs by up to 40%.",
    icon: Layout,
  },
  {
    id: "drag-drop",
    badge: "Pixel-Level Studio",
    title: "Drag & Drop Canvas",
    subtitle: "Total creative freedom with responsive component blocks.",
    description: "Snap to flexible grids, add exit-intent popups, sticky promotional bars, multi-step qualification forms, and custom HTML/JS embeds with zero coordinate bugs.",
    icon: Layers,
  },
  {
    id: "smart-traffic",
    badge: "Autonomous CRO",
    title: "A/B Testing & Smart Traffic",
    subtitle: "Launch experiments in 1 click and let AI auto-route traffic.",
    description: "Our multi-armed bandit algorithm continuously shifts visitor traffic to the variant they are most likely to convert on—slashing wasted ad spend in real time.",
    icon: Split,
  },
];

export function FeatureSwitcherSection() {
  const [activeTab, setActiveTab] = React.useState<string>("ai-prompt");

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-bold text-[#0033FF]"
          >
            THREE WAYS TO BUILD • ONE PLATFORM TO CONVERT
          </Badge>

          <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-[#141414] sm:text-5xl">
            Total creative freedom.{" "}
            <span className="text-[#0033FF]">Zero engineering required.</span>
          </h2>

          <p className="mt-4 text-base text-neutral-600 sm:text-lg leading-relaxed">
            Whether you want to generate in 30 seconds with AI, start from an industry-proven template, or fine-tune every pixel in our drag-and-drop studio—Unbounce AI adapts to your workflow.
          </p>
        </div>

        {/* Interactive Feature Stage: Left Tabs + Right Stage */}
        <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: 4 Interactive Card Tabs */}
          <div className="space-y-3 lg:col-span-5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative w-full rounded-2xl border p-5 text-left transition-all ${
                    isActive
                      ? "border-[#0033FF] bg-[#F7F8FA] shadow-md ring-1 ring-[#0033FF]/20"
                      : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isActive
                          ? "bg-[#0033FF] text-white"
                          : "bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-display text-base font-bold transition-colors ${
                            isActive ? "text-[#0033FF]" : "text-neutral-900"
                          }`}
                        >
                          {tab.title}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isActive
                              ? "bg-blue-100 text-[#0033FF]"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {tab.badge}
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-semibold text-neutral-700">
                        {tab.subtitle}
                      </p>

                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 text-xs leading-relaxed text-neutral-500"
                        >
                          {tab.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Tailored Animated Visual Mockup Canvas */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-neutral-300 bg-[#141414] p-1 shadow-2xl">
              {/* Stage Chrome Bar */}
              <div className="flex items-center justify-between border-b border-neutral-800 bg-[#1A1A1A] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono font-medium text-neutral-400">
                  app.unbounce.ai/workspace/{activeTab}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00C48C]">
                  ● Active
                </span>
              </div>

              {/* Dynamic Tab Mockup Canvas */}
              <div className="relative min-h-[460px] bg-[#141414] p-5 sm:p-6 text-white">
                <AnimatePresence mode="wait">
                  {/* TAB 1: AI Prompt Console Mockup */}
                  {activeTab === "ai-prompt" && (
                    <motion.div
                      key="ai-prompt"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[#0033FF]" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            AI Landing Page Generator Console
                          </span>
                        </div>
                        <Badge className="bg-blue-600/30 text-blue-300 border border-blue-500/30 text-[10px]">
                          Model: Gemini 2.5 Pro
                        </Badge>
                      </div>

                      {/* Prompt Input Box */}
                      <div className="rounded-xl border border-neutral-800 bg-[#1E1E1E] p-3 space-y-2">
                        <p className="text-[11px] font-medium text-neutral-400">
                          Campaign Prompt Brief:
                        </p>
                        <p className="font-mono text-xs text-white">
                          &quot;Create a high-converting B2B SaaS page for our AI Customer Success Copilot. Target VP of Customer Success. Key value prop: reduce customer churn by 35% with proactive health alerts.&quot;
                        </p>
                      </div>

                      {/* Generated Components Live Schema */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                          Generated Layout Components (Ready to Publish):
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="rounded-lg border border-neutral-800 bg-[#1A1A1A] p-2.5">
                            <span className="text-[#00C48C] font-mono text-[10px] block">01 / HERO SECTION</span>
                            <span className="font-semibold text-white">Split Form + Churn Metric</span>
                          </div>
                          <div className="rounded-lg border border-neutral-800 bg-[#1A1A1A] p-2.5">
                            <span className="text-[#0033FF] font-mono text-[10px] block">02 / SOCIAL PROOF</span>
                            <span className="font-semibold text-white">Fortune 500 CS Logos</span>
                          </div>
                          <div className="rounded-lg border border-neutral-800 bg-[#1A1A1A] p-2.5">
                            <span className="text-[#FFB800] font-mono text-[10px] block">03 / ROI CALCULATOR</span>
                            <span className="font-semibold text-white">Interactive Churn Savings</span>
                          </div>
                          <div className="rounded-lg border border-neutral-800 bg-[#1A1A1A] p-2.5">
                            <span className="text-[#FF4F38] font-mono text-[10px] block">04 / QUALIFICATION FORM</span>
                            <span className="font-semibold text-white">2-Step Calendar Booking</span>
                          </div>
                        </div>
                      </div>

                      {/* AI Copywriting Inspector */}
                      <div className="rounded-xl border border-[#0033FF]/30 bg-[#0033FF]/10 p-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-blue-200">
                            Headline Variation A vs B Generated
                          </p>
                          <p className="text-[11px] text-blue-300">
                            Predicted conversion lift: +28% based on 100M+ ad clicks
                          </p>
                        </div>
                        <Button size="sm" className="bg-[#0033FF] hover:bg-[#0025CC] text-white text-xs font-bold">
                          Insert into Canvas
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: Templates Showcase Mockup */}
                  {activeTab === "templates" && (
                    <motion.div
                      key="templates"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          100+ Conversion Templates Library
                        </span>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-neutral-300 text-[11px]">SaaS</span>
                          <span className="rounded-md bg-blue-600 px-2 py-0.5 text-white font-bold text-[11px]">Lead Gen</span>
                          <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-neutral-300 text-[11px]">E-Commerce</span>
                        </div>
                      </div>

                      {/* 2 Template Mini Cards */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Card 1 */}
                        <div className="rounded-xl border border-neutral-800 bg-[#1A1A1A] p-3 space-y-2 hover:border-[#0033FF] transition-colors">
                          <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-blue-950 to-neutral-900 p-2 flex flex-col justify-between">
                            <span className="rounded bg-[#00C48C] px-1.5 py-0.2 text-[9px] font-black text-black self-start">
                              24.8% Conv Rate
                            </span>
                            <div className="space-y-1">
                              <div className="h-1.5 w-16 bg-white/40 rounded" />
                              <div className="h-1 w-24 bg-white/20 rounded" />
                            </div>
                          </div>
                          <p className="font-bold text-xs text-white">Apex SaaS Demo Lead</p>
                          <p className="text-[10px] text-neutral-400">Optimized for Google Search Ads</p>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-xl border border-neutral-800 bg-[#1A1A1A] p-3 space-y-2 hover:border-[#FF4F38] transition-colors">
                          <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-rose-950 to-neutral-900 p-2 flex flex-col justify-between">
                            <span className="rounded bg-[#FF4F38] px-1.5 py-0.2 text-[9px] font-black text-white self-start">
                              31.2% Conv Rate
                            </span>
                            <div className="space-y-1">
                              <div className="h-1.5 w-16 bg-white/40 rounded" />
                              <div className="h-1 w-24 bg-white/20 rounded" />
                            </div>
                          </div>
                          <p className="font-bold text-xs text-white">Pulse Multi-Step Form</p>
                          <p className="text-[10px] text-neutral-400">Optimized for Meta & TikTok Paid Traffic</p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-neutral-800 bg-[#1A1A1A] p-3 flex items-center justify-between text-xs">
                        <span className="text-neutral-300">
                          Includes mobile breakpoints, UTM capture & CRM webhooks.
                        </span>
                        <Button size="sm" className="bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs">
                          Preview All Templates
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: Drag & Drop Canvas Studio Mockup */}
                  {activeTab === "drag-drop" && (
                    <motion.div
                      key="drag-drop"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {/* Canvas Top Toolbar */}
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-400">Zoom:</span>
                          <span className="font-mono text-white">100%</span>
                          <span className="text-neutral-600">|</span>
                          <span className="text-neutral-400">Grid:</span>
                          <span className="text-[#00C48C]">Snap On</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="rounded bg-neutral-800 px-2 py-0.5 text-[11px] text-white">Desktop</span>
                          <span className="rounded bg-neutral-800 px-2 py-0.5 text-[11px] text-neutral-400">Mobile</span>
                        </div>
                      </div>

                      {/* Mini Studio Canvas with Block Selection */}
                      <div className="grid grid-cols-12 gap-3">
                        {/* Elements Sidebar */}
                        <div className="col-span-3 space-y-1.5 border-r border-neutral-800 pr-2">
                          <p className="text-[10px] font-bold uppercase text-neutral-500">Blocks</p>
                          <div className="rounded border border-neutral-800 bg-[#1E1E1E] p-1.5 text-[11px] text-neutral-300 hover:text-white">
                            + Hero Block
                          </div>
                          <div className="rounded border border-neutral-800 bg-[#1E1E1E] p-1.5 text-[11px] text-neutral-300 hover:text-white">
                            + Multi-Step Form
                          </div>
                          <div className="rounded border border-neutral-800 bg-[#1E1E1E] p-1.5 text-[11px] text-neutral-300 hover:text-white">
                            + Countdown Bar
                          </div>
                          <div className="rounded border border-neutral-800 bg-[#1E1E1E] p-1.5 text-[11px] text-neutral-300 hover:text-white">
                            + Exit Popup
                          </div>
                        </div>

                        {/* Live Canvas Area with Blue Selection Box */}
                        <div className="col-span-9 rounded-xl border border-neutral-800 bg-[#1C1C1C] p-4 relative">
                          <div className="rounded-lg border-2 border-dashed border-[#0033FF] bg-[#0033FF]/10 p-4 relative">
                            {/* Drag handle dots */}
                            <div className="absolute -top-1.5 -left-1.5 h-3 w-3 bg-[#0033FF] rounded-full ring-2 ring-white" />
                            <div className="absolute -top-1.5 -right-1.5 h-3 w-3 bg-[#0033FF] rounded-full ring-2 ring-white" />
                            <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#0033FF] rounded-full ring-2 ring-white" />
                            <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#0033FF] rounded-full ring-2 ring-white" />

                            <span className="inline-block rounded bg-[#0033FF] px-1.5 py-0.2 text-[9px] font-bold text-white mb-2">
                              Selected: Button Component (Primary CTA)
                            </span>
                            <div className="flex items-center justify-between text-xs text-white">
                              <span>Button Text: &quot;Start Free Trial&quot;</span>
                              <span className="font-mono text-neutral-400">#0033FF • Radius: 8px</span>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400">
                            <span>Status: Auto-saved to Edge CDN</span>
                            <span className="text-[#00C48C] font-semibold">100% Validated</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: A/B Testing & Smart Traffic Mockup */}
                  {activeTab === "smart-traffic" && (
                    <motion.div
                      key="smart-traffic"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Split className="h-4 w-4 text-[#00C48C]" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            Real-Time Multi-Armed Bandit Experiment
                          </span>
                        </div>
                        <Badge className="bg-emerald-500/20 text-[#00C48C] border border-emerald-500/30 text-[10px]">
                          99.4% Confidence
                        </Badge>
                      </div>

                      {/* Variant A (Control) vs Variant B (AI Winner) */}
                      <div className="space-y-3">
                        {/* Variant A */}
                        <div className="rounded-xl border border-neutral-800 bg-[#1A1A1A] p-3 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-neutral-300">Variant A (Control - Video Hero)</span>
                            <span className="font-mono text-neutral-400">35% Traffic Allocation</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                            <div className="h-full bg-neutral-500" style={{ width: "35%" }} />
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-neutral-400">
                            <span>Visitors: 4,820</span>
                            <span className="font-bold text-white">8.4% Conversion Rate</span>
                          </div>
                        </div>

                        {/* Variant B (Winner) */}
                        <div className="rounded-xl border border-[#00C48C]/40 bg-[#00C48C]/10 p-3 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white">Variant B (Smart Traffic AI Winner)</span>
                              <span className="rounded bg-[#00C48C] px-1.5 py-0.2 text-[9px] font-black text-black">
                                +48% LIFT
                              </span>
                            </div>
                            <span className="font-mono text-[#00C48C] font-bold">65% Traffic Auto-Routed</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                            <div className="h-full bg-[#00C48C]" style={{ width: "65%" }} />
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-neutral-300">
                            <span>Visitors: 8,940</span>
                            <span className="font-bold text-[#00C48C]">12.5% Conversion Rate</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-neutral-800 bg-[#1A1A1A] p-3 flex items-center justify-between text-xs">
                        <span className="text-neutral-300">
                          Smart Traffic autonomously directed 4,120 extra visitors to the winning page.
                        </span>
                        <span className="font-bold text-[#00C48C]">+286 Leads Captured</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

