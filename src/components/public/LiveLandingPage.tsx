"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Render, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";

import { puckConfig } from "@/lib/builder/puck-config";
import { LivePageProvider } from "@/lib/builder/live-page-context";
import { Sparkles, X, ArrowLeft, ExternalLink } from "lucide-react";

interface LiveLandingPageProps {
  pageId: string;
  pageTitle: string;
  initialData: Data;
  variant: "A" | "B";
  isDraftPreview?: boolean;
}

function applyDtr(data: Data, searchParams: URLSearchParams): Data {
  const kw = searchParams.get("kw") || searchParams.get("keyword") || "";
  const hasParams = searchParams.size > 0;
  if (!kw && !hasParams) return data;

  const rawJson = JSON.stringify(data);
  let replaced = rawJson;

  if (kw) {
    replaced = replaced.replace(/\{\{kw\}\}/gi, kw).replace(/\{\{keyword\}\}/gi, kw);
  }

  searchParams.forEach((val, key) => {
    const reg = new RegExp(`\\{\\{${key}\\}\\}`, "gi");
    replaced = replaced.replace(reg, val);
  });

  try {
    return JSON.parse(replaced);
  } catch {
    return data;
  }
}

export function LiveLandingPage({
  pageId,
  pageTitle,
  initialData,
  variant,
  isDraftPreview = false,
}: LiveLandingPageProps) {
  const searchParams = useSearchParams();
  const [showBadge, setShowBadge] = React.useState(true);

  // Dynamic Text Replacement
  const processedData = React.useMemo(() => {
    return applyDtr(initialData, searchParams);
  }, [initialData, searchParams]);

  // Record page view once per mount
  const hasTracked = React.useRef(false);
  React.useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    fetch("/api/public/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageId, variant }),
    }).catch((err) => {
      console.warn("View tracking failed silently:", err);
    });
  }, [pageId, variant]);

  return (
    <LivePageProvider value={{ isLive: true, pageId, pageTitle, variant }}>
      <main className="min-h-screen bg-white text-[#141414] relative selection:bg-[#0033FF] selection:text-white">
        {/* Draft Preview Header Bar */}
        {isDraftPreview && (
          <aside
            aria-label="Draft Preview Notice"
            className="sticky top-0 z-50 w-full bg-amber-500 text-black px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-black animate-pulse" />
              <span>
                <strong>Draft Preview Mode:</strong> This page is not yet published to the public edge.
              </span>
            </div>
            <Link
              href={`/editor/${pageId}`}
              className="inline-flex items-center gap-1 bg-black text-white hover:bg-neutral-800 px-3 py-1 rounded-lg text-xs font-bold transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Editor</span>
            </Link>
          </aside>
        )}

        {/* Puck Live Page Render */}
        <div className="w-full">
          <Render config={puckConfig} data={processedData} />
        </div>

        {/* Floating "Built with Unbounce AI" Badge */}
        {showBadge && (
          <div className="fixed bottom-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 bg-[#141414] text-white pl-3 pr-2 py-1.5 rounded-full shadow-2xl border border-neutral-800 text-[11px] font-medium backdrop-blur-md">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-1.5 hover:text-[#00C48C] transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#0033FF]" />
                <span>
                  Built with <strong>Unbounce AI</strong>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-white/10 text-[9px] font-bold text-neutral-300">
                  Variant {variant}
                </span>
              </Link>
              <button
                type="button"
                aria-label="Dismiss badge"
                onClick={() => setShowBadge(false)}
                className="text-neutral-400 hover:text-white p-0.5 rounded-full transition-colors ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </main>
    </LivePageProvider>
  );
}
