"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  LayoutTemplate,
  Palette,
  BellRing,
  Cpu,
  Split,
  RefreshCw,
  Boxes,
  Briefcase,
  Cloud,
  ShoppingCart,
  Users,
  Store,
  Award,
  BarChart3,
  Eye,
  BookOpen,
  Newspaper,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PRODUCT_NAV,
  SOLUTIONS_NAV,
  RESOURCES_NAV,
  NavLinkItem,
} from "@/lib/marketing-nav";

// Map icon string names to Lucide icons
const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  LayoutTemplate,
  Palette,
  BellRing,
  Cpu,
  Split,
  RefreshCw,
  Boxes,
  Briefcase,
  Cloud,
  ShoppingCart,
  Users,
  Store,
  Award,
  BarChart3,
  Eye,
  BookOpen,
  Newspaper,
};

function BrandLogo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 outline-none">
      {/* Precision Geometric Funnel & Conversion Emblem */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#141414] shadow-sm transition-transform duration-200 group-hover:scale-105">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          {/* Top funnel bar */}
          <path
            d="M3 5H21L14 13V18L10 20V13L3 5Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* High-conversion spark dot */}
          <circle cx="17.5" cy="6.5" r="2.5" fill="#0033FF" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="#FF4F38" />
        </svg>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="font-display text-[22px] font-extrabold tracking-tight text-[#141414]">
          unbounce
        </span>
        <Badge
          variant="secondary"
          className="rounded-full bg-blue-50 px-1.5 py-0.2 text-[10px] font-bold tracking-wide text-[#0033FF] border border-blue-200"
        >
          AI
        </Badge>
      </div>
    </Link>
  );
}

function NavItemIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] || Sparkles;
  return <Icon className="h-4 w-4 shrink-0 text-[#0033FF]" />;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const [ribbonDismissed, setRibbonDismissed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  // Scroll detection for navbar elevation
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  React.useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Slim Top Announcement Ribbon */}
      {!ribbonDismissed && (
        <aside aria-label="Announcement" className="relative flex h-9 items-center justify-center bg-[#141414] px-4 text-xs font-medium text-white transition-all">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#0033FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              NEW
            </span>
            <span>
              Prompt-to-Page AI Builder & Autonomous Smart Traffic is now live!
            </span>
            <Link
              href="/features/ai-builder"
              className="inline-flex items-center font-semibold text-blue-300 hover:text-white hover:underline ml-1"
            >
              Explore feature <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          <button
            onClick={() => setRibbonDismissed(true)}
            aria-label="Dismiss banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </aside>
      )}

      {/* Main Sticky Navbar */}
      <nav
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? "border-b border-neutral-200/90 bg-white/95 backdrop-blur-md shadow-xs"
            : "border-b border-neutral-100 bg-white"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <BrandLogo />
          </div>

          {/* Center: Desktop Navigation */}
          <div
            className="hidden items-center gap-1 lg:flex"
            onMouseLeave={() => setActiveMenu(null)}
          >
            {/* Product (Mega-Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("product")}
            >
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === "product" ? null : "product")
                }
                className={`flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${
                  activeMenu === "product"
                    ? "text-[#0033FF]"
                    : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                Product
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeMenu === "product" ? "rotate-180 text-[#0033FF]" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeMenu === "product" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.99 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-1/2 top-full mt-2 w-[860px] -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl ring-1 ring-black/5"
                  >
                    <div className="grid grid-cols-12 gap-6">
                      {/* Column 1: Create & Build */}
                      <div className="col-span-4 space-y-3">
                        <div className="border-b border-neutral-100 pb-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            {PRODUCT_NAV.build.title}
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            {PRODUCT_NAV.build.description}
                          </p>
                        </div>
                        <div className="space-y-1">
                          {PRODUCT_NAV.build.items.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-50"
                            >
                              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#0033FF] group-hover:bg-[#0033FF] group-hover:text-white transition-colors">
                                <NavItemIcon name={item.iconName} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-semibold text-neutral-900 group-hover:text-[#0033FF]">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="rounded-full bg-blue-100 px-1.5 py-0.2 text-[9px] font-bold text-[#0033FF]">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] leading-tight text-neutral-500 line-clamp-2 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Optimize & Convert */}
                      <div className="col-span-4 space-y-3">
                        <div className="border-b border-neutral-100 pb-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            {PRODUCT_NAV.optimize.title}
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            {PRODUCT_NAV.optimize.description}
                          </p>
                        </div>
                        <div className="space-y-1">
                          {PRODUCT_NAV.optimize.items.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-50"
                            >
                              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-[#00C48C] group-hover:bg-[#00C48C] group-hover:text-white transition-colors">
                                <NavItemIcon name={item.iconName} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-semibold text-neutral-900 group-hover:text-[#0033FF]">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="rounded-full bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-[#00C48C]">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] leading-tight text-neutral-500 line-clamp-2 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Featured Promo Card */}
                      <div className="col-span-4">
                        <div className="flex h-full flex-col justify-between rounded-xl bg-gradient-to-br from-[#141414] to-[#1F1F1F] p-5 text-white shadow-md">
                          <div className="space-y-2">
                            <span className="inline-block rounded-full bg-[#0033FF] px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white">
                              {PRODUCT_NAV.featured.tag}
                            </span>
                            <h4 className="font-display text-sm font-bold leading-snug">
                              {PRODUCT_NAV.featured.title}
                            </h4>
                            <p className="text-xs leading-relaxed text-neutral-300">
                              {PRODUCT_NAV.featured.description}
                            </p>
                          </div>
                          <div className="pt-4">
                            <Link
                              href={PRODUCT_NAV.featured.href}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-neutral-900 transition-colors hover:bg-neutral-100"
                            >
                              {PRODUCT_NAV.featured.ctaText}
                              <ArrowRight className="h-3.5 w-3.5 text-[#0033FF]" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("solutions")}
            >
              <button
                onClick={() =>
                  setActiveMenu(
                    activeMenu === "solutions" ? null : "solutions"
                  )
                }
                className={`flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${
                  activeMenu === "solutions"
                    ? "text-[#0033FF]"
                    : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                Solutions
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeMenu === "solutions"
                      ? "rotate-180 text-[#0033FF]"
                      : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeMenu === "solutions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.99 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-2 w-[520px] rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl ring-1 ring-black/5"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {SOLUTIONS_NAV.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="group flex items-start gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-neutral-50"
                        >
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 group-hover:bg-[#0033FF] group-hover:text-white transition-colors">
                            <NavItemIcon name={item.iconName} />
                          </div>
                          <div>
                            <span className="block text-xs font-semibold text-neutral-900 group-hover:text-[#0033FF]">
                              {item.title}
                            </span>
                            <span className="block text-[11px] leading-tight text-neutral-500 line-clamp-2 mt-0.5">
                              {item.description}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pricing (Direct Link) */}
            <Link
              href="/pricing"
              className="rounded-md px-3.5 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
            >
              Pricing
            </Link>

            {/* Resources (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu("resources")}
            >
              <button
                onClick={() =>
                  setActiveMenu(
                    activeMenu === "resources" ? null : "resources"
                  )
                }
                className={`flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${
                  activeMenu === "resources"
                    ? "text-[#0033FF]"
                    : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                Resources
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeMenu === "resources"
                      ? "rotate-180 text-[#0033FF]"
                      : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeMenu === "resources" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.99 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-2 w-[440px] rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl ring-1 ring-black/5"
                  >
                    <div className="space-y-1">
                      {RESOURCES_NAV.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-neutral-50"
                        >
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#0033FF] group-hover:bg-[#0033FF] group-hover:text-white transition-colors">
                            <NavItemIcon name={item.iconName} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold text-neutral-900 group-hover:text-[#0033FF]">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="rounded-full bg-amber-100 px-1.5 py-0.2 text-[9px] font-bold text-amber-800">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="block text-[11px] leading-tight text-neutral-500 mt-0.5">
                              {item.description}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Auth / Conversion CTAs */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/login"
              className="text-sm font-semibold text-neutral-700 transition-colors hover:text-[#0033FF]"
            >
              Log in
            </Link>

            <Link href="/signup">
              <Button className="h-10 rounded-lg bg-[#0033FF] px-5 font-bold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#0025CC] hover:shadow-md">
                Start building for free
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger (< lg) */}
          <div className="flex lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                aria-label="Open mobile navigation drawer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-0 text-neutral-800 hover:bg-neutral-100 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex w-full max-w-sm flex-col justify-between overflow-y-auto bg-white p-6"
              >
                <div className="space-y-6">
                  <SheetHeader className="text-left">
                    <SheetTitle>
                      <BrandLogo />
                    </SheetTitle>
                  </SheetHeader>

                  {/* Accordion Nav for Mobile */}
                  <Accordion className="w-full">
                    {/* Product */}
                    <AccordionItem value="product" className="border-b border-neutral-100">
                      <AccordionTrigger className="py-3 text-sm font-bold text-neutral-800">
                        Product
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          Create & Build
                        </p>
                        {PRODUCT_NAV.build.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2.5 text-xs text-neutral-600 hover:text-[#0033FF]"
                          >
                            <NavItemIcon name={item.iconName} />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                        <p className="pt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          Optimize & Convert
                        </p>
                        {PRODUCT_NAV.optimize.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2.5 text-xs text-neutral-600 hover:text-[#0033FF]"
                          >
                            <NavItemIcon name={item.iconName} />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Solutions */}
                    <AccordionItem value="solutions" className="border-b border-neutral-100">
                      <AccordionTrigger className="py-3 text-sm font-bold text-neutral-800">
                        Solutions
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2.5 pt-1">
                        {SOLUTIONS_NAV.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2.5 text-xs text-neutral-600 hover:text-[#0033FF]"
                          >
                            <NavItemIcon name={item.iconName} />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Resources */}
                    <AccordionItem value="resources" className="border-b border-neutral-100">
                      <AccordionTrigger className="py-3 text-sm font-bold text-neutral-800">
                        Resources
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2.5 pt-1">
                        {RESOURCES_NAV.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2.5 text-xs text-neutral-600 hover:text-[#0033FF]"
                          >
                            <NavItemIcon name={item.iconName} />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Direct Link: Pricing */}
                  <div className="py-2">
                    <Link
                      href="/pricing"
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm font-bold text-neutral-800 hover:text-[#0033FF]"
                    >
                      Pricing & Plans
                    </Link>
                  </div>
                </div>

                {/* Sticky Mobile Bottom Auth / CTA */}
                <div className="border-t border-neutral-100 pt-4 space-y-2.5">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="w-full block">
                    <Button variant="outline" className="w-full font-semibold">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileOpen(false)} className="w-full block">
                    <Button className="w-full bg-[#0033FF] hover:bg-[#0025CC] font-bold text-white">
                      Start building for free
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

