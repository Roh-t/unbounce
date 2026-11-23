"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Eye,
  Check,
  X,
  Smartphone,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TEMPLATES_DATA, TemplateItem } from "@/lib/templates-data";
import { FinalCtaBanner } from "@/components/marketing/FinalCtaBanner";

const CATEGORY_TABS = ["All", "SaaS", "Lead Gen", "Agency", "Ecommerce", "Events", "Consulting"] as const;
const GOAL_FILTERS = ["All Goals", "Lead Generation", "Product Launch", "Click-Through", "Event Registration"] as const;

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedGoal, setSelectedGoal] = React.useState<string>("All Goals");
  const [previewTemplate, setPreviewTemplate] = React.useState<TemplateItem | null>(null);

  // Real-time multi-attribute template filtering
  const filteredTemplates = React.useMemo(() => {
    return TEMPLATES_DATA.filter((item) => {
      // Category check
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      // Goal check
      if (selectedGoal !== "All Goals" && item.goal !== selectedGoal) {
        return false;
      }
      // Search query check
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesGoal = item.goal.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesGoal) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedGoal]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedGoal("All Goals");
  };

  return (
    <div className="min-h-screen bg-white text-[#141414]">
      {/* ------------------------------------------------------------- */}
      {/* HEADER SECTION                                                */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white pt-16 pb-10 sm:pt-20 sm:pb-14 text-center border-b border-neutral-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50/70 px-3.5 py-1 text-xs font-bold text-[#0033FF]"
          >
            100+ HIGH-CONVERTING TEMPLATES
          </Badge>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#141414]">
            Proven landing page templates for{" "}
            <span className="text-[#0033FF]">every ad campaign.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-neutral-600 leading-relaxed">
            Every template is engineered with optimal visual hierarchy, 100/100 Core Web Vitals, and pre-built lead capture funnels ready to customize in seconds.
          </p>

          {/* Search Bar Input */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by industry, keyword, or goal (e.g. 'SaaS', 'Webinar', 'B2B')..."
                className="h-12 w-full rounded-2xl border border-neutral-300 bg-[#F7F8FA] pl-11 pr-10 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-[#0033FF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0033FF]/20 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 p-1 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FILTER CONTROLS STRIP                                         */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-[#F7F8FA] border-b border-neutral-200 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider mr-1">
                Category:
              </span>
              {CATEGORY_TABS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#0033FF] text-white shadow-xs"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Conversion Goal Selector */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-500" />
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="h-8 rounded-lg border border-neutral-300 bg-white px-2.5 text-xs font-semibold text-neutral-700 focus:border-[#0033FF] focus:outline-none"
              >
                {GOAL_FILTERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* TEMPLATE CARDS GALLERY GRID                                   */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between pb-6">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Showing {filteredTemplates.length} of {TEMPLATES_DATA.length} Templates
          </p>
          {(searchQuery || selectedCategory !== "All" || selectedGoal !== "All Goals") && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#0033FF] hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-[#F7F8FA] p-12 text-center space-y-4">
            <h3 className="font-display text-lg font-bold text-neutral-800">
              No matching templates found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              We couldn&apos;t find any template matching &quot;{searchQuery}&quot;. Try broadening your search or resetting active filters.
            </p>
            <Button onClick={handleResetFilters} className="bg-[#0033FF] text-white font-bold text-xs">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs transition-all hover:-translate-y-1 hover:border-[#0033FF]/40 hover:shadow-xl"
                >
                  {/* Miniature Browser Frame */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-neutral-200 bg-[#F7F8FA]">
                    <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-3 py-1.5">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-neutral-300" />
                        <span className="h-2 w-2 rounded-full bg-neutral-300" />
                        <span className="h-2 w-2 rounded-full bg-neutral-300" />
                      </div>
                      <span className="font-mono text-[9px] text-neutral-400">
                        templates.unbounce.ai/{template.id}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </div>

                    {/* Top-Right CVR Badge */}
                    <div className="absolute top-8 right-2.5 z-10">
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-[#00C48C] border border-emerald-200 shadow-2xs">
                        {template.avgCvr}
                      </span>
                    </div>

                    {/* Rendered Miniature Page Visual */}
                    <div className="p-4 space-y-2 text-left">
                      <div className="h-2 w-16 rounded bg-blue-100" />
                      <div className="h-4 w-4/5 rounded bg-neutral-900" />
                      <div className="h-2 w-3/5 rounded bg-neutral-300" />
                      <div className="mt-3 flex items-center gap-2">
                        <div
                          style={{ backgroundColor: template.themeColor }}
                          className="h-6 w-24 rounded"
                        />
                        <div className="h-6 w-16 rounded border border-neutral-300 bg-white" />
                      </div>
                      <div className="mt-3 rounded-lg border border-neutral-200 bg-white p-2 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="h-1.5 w-12 rounded bg-neutral-400" />
                          <span className="h-1.5 w-8 rounded bg-emerald-400" />
                        </div>
                        <div className="h-4 w-full rounded bg-neutral-100" />
                      </div>
                    </div>

                    {/* Smooth Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-neutral-900/60 p-4 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setPreviewTemplate(template)}
                        className="bg-white text-xs font-bold text-neutral-900 hover:bg-neutral-100"
                      >
                        <Eye className="mr-1.5 h-3.5 w-3.5" /> Quick Preview
                      </Button>
                      <Link href={`/signup?template=${template.id}`}>
                        <Button
                          size="sm"
                          className="bg-[#0033FF] text-xs font-bold text-white hover:bg-[#0025CC]"
                        >
                          Use Template →
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Card Meta Footer */}
                  <div className="mt-4 flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-bold text-neutral-900 group-hover:text-[#0033FF] transition-colors">
                        {template.title}
                      </h3>
                      <Badge variant="outline" className="text-[10px] font-semibold text-neutral-600">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px] font-medium text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Smartphone className="h-3 w-3" /> Mobile-ready
                      </span>
                      <span className="text-neutral-500 font-semibold">{template.goal}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Quick Preview Modal Walkthrough */}
      <Dialog
        open={previewTemplate !== null}
        onOpenChange={(open) => !open && setPreviewTemplate(null)}
      >
        {previewTemplate && (
          <DialogContent className="max-w-2xl bg-white p-6 rounded-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between pr-6">
                <div>
                  <DialogTitle className="font-display text-xl font-extrabold text-[#141414]">
                    {previewTemplate.title}
                  </DialogTitle>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Category: <strong className="text-neutral-800">{previewTemplate.category}</strong> • Goal: <strong className="text-[#0033FF]">{previewTemplate.goal}</strong>
                  </p>
                </div>
                <Badge className="bg-emerald-50 text-[#00C48C] border border-emerald-200 text-xs font-bold">
                  {previewTemplate.avgCvr}
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-5 pt-3">
              <div className="rounded-xl border border-neutral-200 bg-[#F7F8FA] p-6 space-y-3">
                <div className="h-3 w-24 rounded bg-blue-100" />
                <h4 className="font-display text-lg font-bold text-neutral-900">
                  Engineered Conversion Structure
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {previewTemplate.description}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="rounded-lg bg-white p-2 border border-neutral-200">
                    <span className="text-[10px] text-neutral-400 block font-bold">BOUNCE RATE</span>
                    <span className="font-display text-sm font-extrabold text-neutral-900">{previewTemplate.stats.bounceRate}</span>
                  </div>
                  <div className="rounded-lg bg-white p-2 border border-neutral-200">
                    <span className="text-[10px] text-neutral-400 block font-bold">MOBILE SCORE</span>
                    <span className="font-display text-sm font-extrabold text-[#00C48C]">{previewTemplate.stats.mobileScore}</span>
                  </div>
                  <div className="rounded-lg bg-white p-2 border border-neutral-200">
                    <span className="text-[10px] text-neutral-400 block font-bold">HISTORICAL LIFT</span>
                    <span className="font-display text-sm font-extrabold text-[#0033FF]">{previewTemplate.stats.avgLift}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Included CRO Blocks:
                </p>
                <div className="space-y-1.5 text-xs text-neutral-700">
                  {previewTemplate.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-[#00C48C]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                <Button
                  variant="outline"
                  onClick={() => setPreviewTemplate(null)}
                  className="text-xs"
                >
                  Close Preview
                </Button>
                <Link href={`/signup?template=${previewTemplate.id}`}>
                  <Button className="bg-[#0033FF] hover:bg-[#0025CC] text-white text-xs font-bold">
                    Start Customizing This Template <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* FINAL CONVERSION CTA BANNER                                   */}
      {/* ------------------------------------------------------------- */}
      <FinalCtaBanner />
    </div>
  );
}

