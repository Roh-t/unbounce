"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { FOOTER_COLUMNS, AI_RESEARCH_PILLS } from "@/lib/marketing-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="w-full bg-[#141414] text-white">
      {/* Top Banner / Newsletter Section */}
      <div className="border-b border-[#262626]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {/* Left Brand Summary */}
            <div className="max-w-xl space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0033FF] shadow-sm">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M3 5H21L14 13V18L10 20V13L3 5Z"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="17.5" cy="6.5" r="2" fill="#FF4F38" />
                  </svg>
                </div>
                <span className="font-display text-2xl font-black tracking-tight text-white">
                  unbounce
                </span>
                <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/30">
                  AI
                </span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-400">
                The next-generation landing page and CRO platform engineered for sub-second edge speeds, prompt-to-page AI generation, and autonomous smart traffic optimization.
              </p>
            </div>

            {/* Newsletter Subscribe */}
            <div className="w-full max-w-md space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Get weekly conversion rate breakdowns
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2"
              >
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  className="h-10 border-[#333333] bg-[#1F1F1F] text-sm text-white placeholder:text-neutral-500 focus-visible:border-[#0033FF] focus-visible:ring-[#0033FF]/30"
                />
                <Button className="h-10 shrink-0 bg-[#0033FF] px-4 font-bold text-white hover:bg-[#0025CC]">
                  Subscribe
                </Button>
              </form>
              <p className="text-[11px] text-neutral-500">
                No spam. Unsubscribe anytime. Read by 45,000+ top marketers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navigation Grid */}
      <div className="border-b border-[#262626]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="space-y-4">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                  {column.title}
                </h4>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-white"
                      >
                        <span>{link.label}</span>
                        {link.badge && (
                          <span
                            className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                              link.badge === "New"
                                ? "bg-[#0033FF]/30 text-blue-300 border border-blue-500/40"
                                : link.badge === "Operational"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-neutral-800 text-neutral-300"
                            }`}
                          >
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* "Research Us with AI" Interactive Strip */}
      <div className="border-b border-[#262626] bg-[#0E0E0E]">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#0033FF]" />
              <span className="text-xs font-semibold text-neutral-300">
                Research our platform using your favorite AI assistant:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {AI_RESEARCH_PILLS.map((pill) => (
                <a
                  key={pill.name}
                  href={pill.prompt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-1 text-[11px] font-medium text-neutral-300 transition-all hover:border-[#0033FF] hover:bg-[#222222] hover:text-white"
                >
                  <span>Ask {pill.name}</span>
                  <ExternalLink className="h-3 w-3 text-neutral-500" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-neutral-500">
          {/* Copyright */}
          <div>
            © 2026 Unbounce AI, Inc. All rights reserved. Built for high-growth CRO teams.
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-neutral-400 font-medium">
              All systems operational (100% uptime)
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/security" className="hover:text-white transition-colors">
              Security & Compliance
            </Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

