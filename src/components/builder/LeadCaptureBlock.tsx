"use client";

import * as React from "react";
import { CheckCircle2, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLivePageContext } from "@/lib/builder/live-page-context";

export interface LeadCaptureBlockProps {
  headline?: string;
  subheadline?: string;
  buttonText?: string;
  showCompanyField?: "yes" | "no";
  privacyNote?: string;
  accentColor?: "blue" | "emerald" | "coral";
  pageId?: string;
  pageTitle?: string;
  variant?: "A" | "B";
  isEditMode?: boolean;
}

export function LeadCaptureBlock({
  headline = "Get Instant VIP Access",
  subheadline = "Join 15,000+ modern growth leaders scaling with high conversion velocity.",
  buttonText = "Claim Your Spot Now",
  showCompanyField = "yes",
  privacyNote = "No spam ever. 1-click unsubscribe at any time.",
  accentColor = "blue",
  pageId,
  pageTitle = "Landing Page",
  variant = "A",
  isEditMode = true,
}: LeadCaptureBlockProps) {
  const liveCtx = useLivePageContext();
  const isLive = liveCtx.isLive || (!isEditMode && Boolean(pageId));
  const effectivePageId = liveCtx.pageId || pageId || "demo_page";
  const effectiveVariant = liveCtx.variant || variant || "A";

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (!isLive) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let source = "direct";
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        source = params.get("utm_source") || params.get("source") || "direct";
      }

      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: effectivePageId,
          variant: effectiveVariant,
          name: name.trim(),
          email: email.trim(),
          company: showCompanyField === "yes" && company.trim() ? company.trim() : undefined,
          source,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getAccentButtonClasses = () => {
    switch (accentColor) {
      case "emerald":
        return "bg-[#00C48C] hover:bg-[#00A877] text-white shadow-emerald-500/20";
      case "coral":
        return "bg-[#FF4F38] hover:bg-[#E53A24] text-white shadow-red-500/20";
      case "blue":
      default:
        return "bg-[#0033FF] hover:bg-[#0025CC] text-white shadow-blue-500/20";
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto my-8 p-6 sm:p-8 rounded-3xl border border-neutral-200/90 bg-white shadow-xl shadow-neutral-900/5 relative overflow-hidden">
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          accentColor === "emerald"
            ? "bg-[#00C48C]"
            : accentColor === "coral"
            ? "bg-[#FF4F38]"
            : "bg-[#0033FF]"
        }`}
      />

      {submitted ? (
        <div className="py-8 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="font-display text-xl font-extrabold text-[#141414]">
            ✓ Success! We&apos;ve received your request.
          </h3>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto">
            Check your inbox shortly for your confirmation and private access link.
          </p>
          {!isLive && (
            <button
              onClick={() => setSubmitted(false)}
              className="text-[11px] text-[#0033FF] underline mt-2 inline-block font-medium"
            >
              Reset Form Preview
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <div className="text-center space-y-1.5">
            <h3 className="font-display text-2xl font-black tracking-tight text-[#141414]">
              {headline}
            </h3>
            {subheadline && (
              <p className="text-xs text-neutral-500 leading-relaxed">
                {subheadline}
              </p>
            )}
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <Input
                type="text"
                required
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 text-xs rounded-xl border-neutral-200 bg-neutral-50/50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Work Email
              </label>
              <Input
                type="email"
                required
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 text-xs rounded-xl border-neutral-200 bg-neutral-50/50 focus:bg-white"
              />
            </div>

            {showCompanyField === "yes" && (
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Company / Organization
                </label>
                <Input
                  type="text"
                  placeholder="Acme Growth Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-10 text-xs rounded-xl border-neutral-200 bg-neutral-50/50 focus:bg-white"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className={`w-full h-11 text-xs font-bold rounded-xl transition-all shadow-md ${getAccentButtonClasses()}`}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <span className="flex items-center gap-1.5 justify-center">
                  <span>{buttonText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </Button>
          </form>

          {privacyNote && (
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 text-center">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>{privacyNote}</span>
            </div>
          )}

          {!isLive && (
            <div className="pt-1 text-center">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-500">
                ⚡ Preview Mode — Forms capture real leads when published
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
