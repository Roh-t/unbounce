"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("[Unbounce AI Global Error]:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-6 selection:bg-[#0033FF] selection:text-white">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/90 shadow-2xl shadow-neutral-900/5 text-center space-y-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 border border-red-200 text-red-600">
          <AlertCircle className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-2xl font-black text-[#141414] tracking-tight">
            Something Unexpected Happened
          </h1>
          <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto">
            Our application encountered a temporary runtime state. You can reload this view or return to the main dashboard.
          </p>
          {error?.message && (
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 font-mono text-[11px] text-neutral-600 text-left overflow-x-auto max-h-24">
              {error.message}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="button"
            onClick={() => reset()}
            className="flex-1 h-11 text-xs font-bold rounded-xl bg-[#0033FF] hover:bg-[#0025CC] text-white shadow-md shadow-blue-500/20 gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>

          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full h-11 text-xs font-bold rounded-xl border-neutral-200 hover:bg-neutral-50 gap-2"
            >
              <Home className="h-4 w-4 text-neutral-500" />
              <span>Back Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
