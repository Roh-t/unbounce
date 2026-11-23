"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Split,
  Eye,
  Loader2,
  Globe,
  Share2,
  Wand2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Puck, type Data, type Viewport } from "@puckeditor/core";
import "@puckeditor/core/puck.css";

import { puckConfig } from "@/lib/builder/puck-config";
import { getDefaultPuckData, ensureComponentIds } from "@/lib/builder/default-templates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { LandingPage } from "@/lib/db/types";

interface PageBuilderStudioProps {
  initialPage: LandingPage;
}

const customViewports: Viewport[] = [
  { width: 1280, label: "Desktop (1280px)" },
  { width: 768, label: "Tablet (768px)" },
  { width: 390, label: "Mobile (390px)" },
];

export function PageBuilderStudio({ initialPage }: PageBuilderStudioProps) {
  const [mounted, setMounted] = React.useState(false);
  const [page, setPage] = React.useState<LandingPage>(initialPage);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  const [title, setTitle] = React.useState(initialPage.title);
  const [activeVariant, setActiveVariant] = React.useState<"A" | "B">("A");

  // State for Variant A and Variant B data trees
  const [dataA, setDataA] = React.useState<Data>(() => {
    const raw = initialPage.contentJson as unknown as Data;
    const base = raw && Array.isArray(raw.content) ? raw : getDefaultPuckData(initialPage.category, initialPage.title);
    return ensureComponentIds(base);
  });

  const [dataB, setDataB] = React.useState<Data>(() => {
    const raw = initialPage.variantBJson as unknown as Data;
    if (raw && Array.isArray(raw.content)) return ensureComponentIds(raw);
    // Clone A if B is not yet created
    const fallback = initialPage.contentJson as unknown as Data;
    if (fallback && Array.isArray(fallback.content)) {
      return ensureComponentIds(JSON.parse(JSON.stringify(fallback)));
    }
    return ensureComponentIds(getDefaultPuckData(initialPage.category, initialPage.title));
  });

  // Action states
  const [saving, setSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [publishing, setPublishing] = React.useState(false);
  const [publishModalOpen, setPublishModalOpen] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);

  // AI Generator Modal state
  const [aiModalOpen, setAiModalOpen] = React.useState(false);
  const [aiPrompt, setAiPrompt] = React.useState("");
  const [aiTone, setAiTone] = React.useState<"bold" | "enterprise" | "friendly">("bold");
  const [aiGoal, setAiGoal] = React.useState<"lead-gen" | "demo" | "product-launch">("lead-gen");
  const [aiTarget, setAiTarget] = React.useState<"active" | "variantB">("active");
  const [aiGenerating, setAiGenerating] = React.useState(false);
  const [aiStep, setAiStep] = React.useState(1);
  const [aiSuccessNote, setAiSuccessNote] = React.useState<string | null>(null);

  // Active data based on selected variant
  const currentData = activeVariant === "A" ? dataA : dataB;

  // Track changes from Puck
  const handlePuckChange = (newData: Data) => {
    const safeData = ensureComponentIds(newData);
    if (activeVariant === "A") {
      setDataA(safeData);
    } else {
      setDataB(safeData);
    }
  };

  // Switch between variants
  const handleSwitchVariant = (variant: "A" | "B") => {
    if (variant === activeVariant) return;

    if (variant === "B") {
      // If variant B has no content yet, copy current Variant A as the base
      if (!dataB.content || dataB.content.length === 0) {
        setDataB(ensureComponentIds(JSON.parse(JSON.stringify(dataA))));
      }
    }
    setActiveVariant(variant);
  };

  // Save Draft
  const handleSaveDraft = async () => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/pages/${page.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          contentJson: dataA,
          variantBJson: dataB,
          abTestEnabled: activeVariant === "B" ? true : page.abTestEnabled,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setPage(result.page);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  // Publish Page
  const handlePublish = async () => {
    setPublishing(true);

    try {
      const res = await fetch(`/api/pages/${page.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          status: "published",
          contentJson: dataA,
          variantBJson: dataB,
          abTestEnabled: activeVariant === "B" ? true : page.abTestEnabled,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setPage(result.page);
        setPublishModalOpen(true);
      }
    } catch (err) {
      console.error("Publish failed:", err);
    } finally {
      setPublishing(false);
    }
  };

  // Handle AI Generation
  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setAiGenerating(true);
    setAiStep(1);

    const stepTimer1 = setTimeout(() => setAiStep(2), 700);
    const stepTimer2 = setTimeout(() => setAiStep(3), 1500);

    try {
      const res = await fetch("/api/ai/generate-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt.trim(),
          tone: aiTone,
          goal: aiGoal,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }

      const result = await res.json();
      const cleanGenerated = ensureComponentIds(result.data);

      if (aiTarget === "variantB") {
        setDataB(cleanGenerated);
        setActiveVariant("B");
        setAiSuccessNote("✨ Generated Variant B with AI! Ready for A/B testing.");
      } else {
        if (activeVariant === "A") {
          setDataA(cleanGenerated);
        } else {
          setDataB(cleanGenerated);
        }
        setAiSuccessNote(
          `✨ Generated ${result.mode === "gemini" ? "Gemini AI" : "Smart Engine"} page with 9 conversion blocks!`
        );
      }

      setAiModalOpen(false);
      setAiPrompt("");
      setTimeout(() => setAiSuccessNote(null), 4000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "AI generation failed");
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setAiGenerating(false);
      setAiStep(1);
    }
  };

  // Copy live URL
  const handleCopyUrl = () => {
    const liveUrl = `${window.location.origin}/p/${page.slug}`;
    navigator.clipboard.writeText(liveUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white select-none">
      {/* Sleek Custom Studio Top Bar */}
      <header className="h-14 bg-[#141414] border-b border-neutral-800 px-4 flex items-center justify-between shrink-0 z-50">
        {/* Left: Back & Editable Page Info */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard/pages">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-neutral-400 hover:text-white hover:bg-neutral-800 text-xs gap-1.5 px-2.5 rounded-lg"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Pages</span>
            </Button>
          </Link>

          <div className="h-4 w-px bg-neutral-800" />

          {/* Editable Title */}
          <div className="flex items-center gap-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8 text-xs font-bold bg-transparent border-transparent hover:border-neutral-700 focus:border-[#0033FF] focus:bg-neutral-800 text-white max-w-[220px] sm:max-w-xs transition-colors rounded-lg"
              title="Click to rename page"
            />
            <Badge
              className={`text-[9px] font-bold ${
                page.status === "published"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-neutral-800 text-neutral-400 border-neutral-700"
              }`}
            >
              {page.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Center: A/B Variant Switcher Studio */}
        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800 shadow-inner">
          <button
            type="button"
            onClick={() => handleSwitchVariant("A")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeVariant === "A"
                ? "bg-[#0033FF] text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>Variant A (Original)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchVariant("B")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeVariant === "B"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Split className="h-3 w-3" />
            <span>Variant B (Challenger)</span>
          </button>
        </div>

        {/* Right: Actions (Save Draft, Publish, Live Link) */}
        <div className="flex items-center gap-2">
          {/* AI Page Generator Trigger */}
          <Button
            type="button"
            size="sm"
            onClick={() => setAiModalOpen(true)}
            className="h-8 bg-gradient-to-r from-[#FF4F38] via-purple-600 to-[#0033FF] hover:opacity-90 text-white text-xs font-bold gap-1.5 px-3 rounded-lg shadow-sm shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>✨ AI Generate</span>
          </Button>

          {page.status === "published" && (
            <Link href={`/p/${page.slug}`} target="_blank">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-neutral-300 hover:text-white hover:bg-neutral-800 text-xs gap-1.5 px-2.5 rounded-lg"
                title="Preview live page in new tab"
              >
                <Eye className="h-3.5 w-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Live URL</span>
              </Button>
            </Link>
          )}

          {/* Save Draft Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={saving || publishing}
            className="h-8 border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold gap-1.5 rounded-lg"
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : saveSuccess ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Save className="h-3.5 w-3.5 text-neutral-400" />
            )}
            <span>{saveSuccess ? "Saved ✓" : "Save Draft"}</span>
          </Button>

          {/* Publish Button */}
          <Button
            type="button"
            size="sm"
            onClick={handlePublish}
            disabled={publishing || saving}
            className="h-8 bg-[#0033FF] hover:bg-[#0025CC] text-white text-xs font-bold gap-1.5 rounded-lg shadow-sm shadow-blue-500/20"
          >
            {publishing ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Globe className="h-3.5 w-3.5" />
            )}
            <span>Publish Page</span>
          </Button>
        </div>
      </header>

      {/* Success Notification Banner */}
      {aiSuccessNote && (
        <div className="bg-emerald-950 border-b border-emerald-800 px-4 py-2 text-center text-xs text-emerald-200 flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-1">
          <Check className="h-4 w-4 text-emerald-400" />
          <span className="font-semibold">{aiSuccessNote}</span>
        </div>
      )}

      {/* Variant Info Banner */}
      {activeVariant === "B" && (
        <div className="bg-purple-950/80 border-b border-purple-800/60 px-4 py-1.5 text-center text-xs text-purple-200 flex items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
          <span>
            <strong>Editing Variant B:</strong> Smart Traffic AI will split 50% of live visitors to this challenger variant.
          </span>
        </div>
      )}

      {/* Puck Drag-and-Drop Visual Studio Stage */}
      <div className="flex-1 w-full relative bg-neutral-900">
        {mounted ? (
          <Puck
            key={activeVariant}
            config={puckConfig}
            data={currentData}
            onChange={handlePuckChange}
            onPublish={handlePublish}
            viewports={customViewports}
          />
        ) : (
          <div className="h-full flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-7 w-7 text-[#0033FF] animate-spin" />
              <p className="text-xs text-neutral-400">Mounting Canvas...</p>
            </div>
          </div>
        )}
      </div>


      {/* Publish Success Dialog */}
      <Dialog open={publishModalOpen} onOpenChange={setPublishModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white text-[#141414] p-6">
          <DialogHeader className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <Globe className="h-6 w-6" />
            </div>
            <DialogTitle className="font-display text-xl font-black text-[#141414]">
              Your Page is Live!
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-500">
              Edge routing and global SSL provisioning completed. Traffic is ready to convert.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Live URL
              </label>
              <div className="flex items-center justify-between text-xs font-mono text-[#0033FF] break-all">
                <span>{typeof window !== "undefined" ? `${window.location.origin}/p/${page.slug}` : `/p/${page.slug}`}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleCopyUrl}
                className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs h-10 rounded-xl gap-2"
              >
                {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
              </Button>

              <Link href={`/p/${page.slug}`} target="_blank" className="flex-1">
                <Button
                  type="button"
                  className="w-full bg-[#0033FF] hover:bg-[#0025CC] text-white font-bold text-xs h-10 rounded-xl gap-2 shadow-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open Live Page</span>
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Page Generator Dialog */}
      <Dialog open={aiModalOpen} onOpenChange={(open) => !aiGenerating && setAiModalOpen(open)}>
        <DialogContent className="sm:max-w-xl rounded-3xl bg-white text-[#141414] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-red-500/10 border border-purple-500/20 text-purple-700 w-fit text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Unbounce AI Composer Engine</span>
            </div>
            <DialogTitle className="font-display text-2xl font-black text-[#141414] tracking-tight">
              1-Click AI Prompt-to-Page Generator
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-500 leading-relaxed">
              Describe your product, offer, or target audience. Our AI will compose a full 9-block high-converting landing page with persuasive copy, objection-busting FAQs, and conversion forms.
            </DialogDescription>
          </DialogHeader>

          {aiGenerating ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in">
              <div className="relative">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-[#FF4F38] via-purple-600 to-[#0033FF] animate-spin flex items-center justify-center shadow-xl shadow-purple-500/25 opacity-90" />
                <div className="absolute inset-1 bg-white rounded-[22px] flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2 max-w-sm">
                <h4 className="font-display text-base font-bold text-[#141414]">
                  {aiStep === 1 && "Step 1/3: Analyzing offer and conversion positioning..."}
                  {aiStep === 2 && "Step 2/3: Composing persuasive headlines and proof copy..."}
                  {aiStep === 3 && "Step 3/3: Assembling Puck component tree and layout..."}
                </h4>
                <p className="text-xs text-neutral-400">
                  Synthesizing 9 conversion blocks tailored specifically to your audience.
                </p>
              </div>

              <div className="w-48 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF4F38] to-[#0033FF] transition-all duration-500 rounded-full"
                  style={{ width: `${(aiStep / 3) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-5 pt-3">
              {/* Quick Example Chips */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                  Quick Prompt Templates
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "AI CRM for Real Estate Agents",
                    "Modern Dental Clinic Implant Offer",
                    "B2B Cybersecurity Audit",
                    "DTC Organic Skincare Launch",
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setAiPrompt(chip)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors border border-neutral-200/60"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Textarea */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block">
                  Describe Your Offer or Campaign
                </label>
                <Textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g., An autonomous AI SDR tool for B2B SaaS teams that books qualified demos directly into Google Calendar..."
                  className="min-h-[100px] text-xs rounded-xl border-neutral-200 focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF]"
                />
              </div>

              {/* Controls: Tone & Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tone */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block">
                    Copywriting Tone
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: "bold", label: "Bold" },
                      { id: "enterprise", label: "Enterprise" },
                      { id: "friendly", label: "Friendly" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setAiTone(t.id as "bold" | "enterprise" | "friendly")}
                        className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all border ${
                          aiTone === t.id
                            ? "bg-[#141414] text-white border-[#141414]"
                            : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conversion Goal */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block">
                    Conversion Goal
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: "lead-gen", label: "Leads" },
                      { id: "demo", label: "Demo" },
                      { id: "product-launch", label: "Launch" },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setAiGoal(g.id as "lead-gen" | "demo" | "product-launch")}
                        className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all border ${
                          aiGoal === g.id
                            ? "bg-[#0033FF] text-white border-[#0033FF]"
                            : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Target Destination Choice */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider block">
                  Generate Into
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAiTarget("active")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      aiTarget === "active"
                        ? "border-[#0033FF] bg-blue-50/50 shadow-sm"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#141414]">
                      Replace Active Variant ({activeVariant})
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      Overrides the current canvas with new blocks
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAiTarget("variantB")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      aiTarget === "variantB"
                        ? "border-purple-600 bg-purple-50/50 shadow-sm"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#141414] flex items-center gap-1">
                      <span>Generate as Variant B</span>
                      <Split className="h-3 w-3 text-purple-600" />
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      Creates a challenger page for Smart Traffic A/B testing
                    </div>
                  </button>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAiModalOpen(false)}
                  className="flex-1 h-11 text-xs font-bold rounded-xl border-neutral-200 hover:bg-neutral-100"
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={handleAiGenerate}
                  disabled={!aiPrompt.trim()}
                  className="flex-1 h-11 text-xs font-bold rounded-xl bg-gradient-to-r from-[#FF4F38] via-purple-600 to-[#0033FF] hover:opacity-90 text-white shadow-md shadow-purple-500/20"
                >
                  <Sparkles className="h-4 w-4 mr-1.5" />
                  <span>Generate Page with AI</span>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
