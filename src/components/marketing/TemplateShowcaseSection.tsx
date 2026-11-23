"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Eye,
  Smartphone,
  Check,
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

const CATEGORIES = ["All", "SaaS", "Lead Gen", "Agency", "Ecommerce", "Events"] as const;

export function TemplateShowcaseSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [previewTemplate, setPreviewTemplate] = React.useState<TemplateItem | null>(null);

  // Show top 6 templates on homepage
  const showcaseTemplates = React.useMemo(() => {
    const list = TEMPLATES_DATA.slice(0, 6);
    if (selectedCategory === "All") return list;
    return TEMPLATES_DATA.filter((t) => t.category === selectedCategory).slice(0, 6);
  }, [selectedCategory]);

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28 border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <Badge
              variant="outline"
              className="border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-bold text-[#0033FF]"
            >
              BATTLE-TESTED TEMPLATES
            </Badge>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#141414] sm:text-5xl">
              Start with a template{" "}
              <span className="text-[#0033FF]">engineered to convert.</span>
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              Every template is pre-structured with optimal conversion scent, high mobile Quality Scores, and ready-to-publish lead capture forms.
            </p>
          </div>

          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0033FF] hover:text-[#0025CC] transition-colors self-start md:self-end"
          >
            Explore all 100+ templates <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filter Category Pills */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-neutral-100 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-[#141414] text-white shadow-xs"
                  : "bg-[#F7F8FA] text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {showcaseTemplates.map((template) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs transition-all hover:-translate-y-1 hover:border-[#0033FF]/40 hover:shadow-xl"
              >
                {/* Top Miniature Browser Mockup Frame */}
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-neutral-200 bg-[#F7F8FA]">
                  {/* Miniature Chrome Bar */}
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

                  {/* Top-Right Conversion Rate Badge */}
                  <div className="absolute top-8 right-2.5 z-10">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-[#00C48C] border border-emerald-200 shadow-2xs">
                      {template.avgCvr}
                    </span>
                  </div>

                  {/* Rendered Miniature Page Visual Canvas (Tailored per Template) */}
                  <div className="p-4 space-y-2 text-left">
                    {template.previewType === "saas" && (
                      <div className="space-y-2">
                        <div className="h-2 w-16 rounded bg-blue-100" />
                        <div className="h-4 w-4/5 rounded bg-neutral-900 font-display" />
                        <div className="h-2 w-3/5 rounded bg-neutral-300" />
                        <div className="mt-3 flex items-center gap-2">
                          <div className="h-6 w-24 rounded bg-[#0033FF]" />
                          <div className="h-6 w-16 rounded border border-neutral-300 bg-white" />
                        </div>
                        <div className="mt-3 rounded-lg border border-neutral-200 bg-white p-2 shadow-2xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="h-1.5 w-12 rounded bg-neutral-400" />
                            <span className="h-1.5 w-8 rounded bg-emerald-400" />
                          </div>
                          <div className="h-6 w-full rounded bg-blue-50" />
                        </div>
                      </div>
                    )}

                    {template.previewType === "leadgen" && (
                      <div className="space-y-2">
                        <div className="h-2 w-16 rounded bg-rose-100" />
                        <div className="h-4 w-5/6 rounded bg-neutral-900" />
                        <div className="h-2 w-2/3 rounded bg-neutral-300" />
                        <div className="mt-2 rounded-lg border border-neutral-200 bg-white p-2.5 shadow-2xs space-y-1.5">
                          <div className="flex items-center gap-1">
                            <div className="h-1 flex-1 rounded bg-[#FF4F38]" />
                            <div className="h-1 flex-1 rounded bg-neutral-200" />
                            <div className="h-1 flex-1 rounded bg-neutral-200" />
                          </div>
                          <div className="h-5 w-full rounded border border-neutral-200 bg-neutral-50" />
                          <div className="h-6 w-full rounded bg-[#FF4F38]" />
                        </div>
                      </div>
                    )}

                    {template.previewType === "agency" && (
                      <div className="space-y-2">
                        <div className="h-2 w-20 rounded bg-amber-100" />
                        <div className="h-4 w-4/5 rounded bg-neutral-900" />
                        <div className="h-2 w-1/2 rounded bg-neutral-300" />
                        <div className="mt-2 grid grid-cols-2 gap-1.5">
                          <div className="rounded border border-neutral-200 bg-white p-2">
                            <div className="h-2 w-8 rounded bg-neutral-800" />
                            <div className="mt-1 h-1 w-12 rounded bg-neutral-300" />
                          </div>
                          <div className="rounded border border-neutral-200 bg-white p-2">
                            <div className="h-2 w-8 rounded bg-[#0033FF]" />
                            <div className="mt-1 h-1 w-12 rounded bg-neutral-300" />
                          </div>
                        </div>
                        <div className="mt-2 h-6 w-full rounded bg-[#141414]" />
                      </div>
                    )}

                    {template.previewType === "ecom" && (
                      <div className="space-y-2">
                        <div className="h-2 w-16 rounded bg-emerald-100" />
                        <div className="h-4 w-3/4 rounded bg-neutral-900" />
                        <div className="mt-2 grid grid-cols-3 gap-1">
                          <div className="h-10 rounded bg-neutral-200" />
                          <div className="h-10 rounded bg-neutral-200" />
                          <div className="h-10 rounded bg-neutral-200" />
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="h-3 w-12 rounded bg-neutral-800" />
                          <div className="h-6 w-24 rounded bg-[#00C48C]" />
                        </div>
                      </div>
                    )}

                    {template.previewType === "events" && (
                      <div className="space-y-2">
                        <div className="h-2 w-20 rounded bg-purple-100" />
                        <div className="h-4 w-5/6 rounded bg-neutral-900" />
                        <div className="rounded bg-neutral-900 p-2 text-white flex justify-around">
                          <div className="h-3 w-4 rounded bg-white/40" />
                          <div className="h-3 w-4 rounded bg-white/40" />
                          <div className="h-3 w-4 rounded bg-white/40" />
                        </div>
                        <div className="mt-2 h-6 w-full rounded bg-[#7928CA]" />
                      </div>
                    )}

                    {template.previewType === "consulting" && (
                      <div className="space-y-2">
                        <div className="h-2 w-16 rounded bg-blue-100" />
                        <div className="h-4 w-4/5 rounded bg-neutral-900" />
                        <div className="h-2 w-2/3 rounded bg-neutral-300" />
                        <div className="mt-2 rounded border border-neutral-200 bg-white p-2">
                          <div className="h-2 w-24 rounded bg-neutral-800 mb-1" />
                          <div className="h-5 w-full rounded bg-[#0033FF]" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Smooth Hover Action Overlay */}
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
                  <div className="flex items-center gap-1.5 pt-1 text-[11px] font-medium text-neutral-400">
                    <Smartphone className="h-3 w-3 text-neutral-500" />
                    <span>Mobile-ready • AI customizable</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

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
                    Category: <strong className="text-neutral-800">{previewTemplate.category}</strong> • Predicted Lift: <strong className="text-[#00C48C]">{previewTemplate.stats.avgLift}</strong>
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
    </section>
  );
}
