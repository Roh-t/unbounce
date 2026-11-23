"use client";

import * as React from "react";

export function TrustedLogosSection() {
  return (
    <section className="w-full border-y border-neutral-200/80 bg-[#F7F8FA] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Label */}
        <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          TRUSTED BY 15,000+ HIGH-GROWTH MARKETING TEAMS & TOP AGENCIES
        </p>

        {/* 7 Custom Crisp Monochrome Brand Wordmarks */}
        <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-4 lg:grid-cols-7 lg:gap-8">
          {/* 1. CampaignFlow */}
          <div className="group flex items-center gap-2 text-neutral-600 transition-all hover:text-[#0033FF] cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-800 transition-colors group-hover:text-[#0033FF]"
            >
              <rect x="2" y="4" width="20" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
              <path d="M7 12H17M13 8L17 12L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-display text-sm font-extrabold tracking-tight text-neutral-800 transition-colors group-hover:text-[#0033FF]">
              CampaignFlow
            </span>
          </div>

          {/* 2. Looma */}
          <div className="group flex items-center gap-2 text-neutral-600 transition-all hover:text-[#0033FF] cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-800 transition-colors group-hover:text-[#0033FF]"
            >
              <circle cx="9" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
              <circle cx="15" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="font-display text-sm font-extrabold tracking-tight text-neutral-800 transition-colors group-hover:text-[#0033FF]">
              Looma
            </span>
          </div>

          {/* 3. ZestPay */}
          <div className="group flex items-center gap-2 text-neutral-600 transition-all hover:text-[#0033FF] cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-800 transition-colors group-hover:text-[#0033FF]"
            >
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="font-display text-sm font-extrabold tracking-tight text-neutral-800 transition-colors group-hover:text-[#0033FF]">
              ZestPay
            </span>
          </div>

          {/* 4. Northstar */}
          <div className="group flex items-center gap-2 text-neutral-600 transition-all hover:text-[#0033FF] cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-800 transition-colors group-hover:text-[#0033FF]"
            >
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="font-display text-sm font-extrabold tracking-tight text-neutral-800 transition-colors group-hover:text-[#0033FF]">
              Northstar
            </span>
          </div>

          {/* 5. Kinetix */}
          <div className="group flex items-center gap-2 text-neutral-600 transition-all hover:text-[#0033FF] cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-800 transition-colors group-hover:text-[#0033FF]"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <polygon points="2 17 12 22 22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <polygon points="2 12 12 17 22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="font-display text-sm font-extrabold tracking-tight text-neutral-800 transition-colors group-hover:text-[#0033FF]">
              Kinetix
            </span>
          </div>

          {/* 6. Veloce */}
          <div className="group flex items-center gap-2 text-neutral-600 transition-all hover:text-[#0033FF] cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-800 transition-colors group-hover:text-[#0033FF]"
            >
              <path d="M4 14L12 6L20 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 18L12 13L17 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-display text-sm font-extrabold tracking-tight text-neutral-800 transition-colors group-hover:text-[#0033FF]">
              Veloce
            </span>
          </div>

          {/* 7. PeakScale */}
          <div className="group flex items-center gap-2 text-neutral-600 transition-all hover:text-[#0033FF] cursor-pointer col-span-2 sm:col-span-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-800 transition-colors group-hover:text-[#0033FF]"
            >
              <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="font-display text-sm font-extrabold tracking-tight text-neutral-800 transition-colors group-hover:text-[#0033FF]">
              PeakScale
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

