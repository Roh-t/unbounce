import Link from "next/link";
import { ArrowLeft, Home, LayoutDashboard, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between selection:bg-[#0033FF] selection:text-white">
      {/* Top minimal bar */}
      <header className="w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-[#0033FF] flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
            U
          </div>
          <span className="font-display font-extrabold text-lg text-[#141414] tracking-tight">
            Unbounce<span className="text-[#0033FF]">AI</span>
          </span>
        </Link>
        <Link
          href="/dashboard"
          className="text-xs font-bold text-neutral-600 hover:text-[#0033FF] transition-colors"
        >
          Go to Dashboard →
        </Link>
      </header>

      {/* Main 404 Card */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/90 shadow-2xl shadow-neutral-900/5 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0033FF] text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>404 • Page Missing</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-4xl sm:text-5xl font-black text-[#141414] tracking-tight">
              Lost in Traffic?
            </h1>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto">
              The page you are looking for has either been unpublished, renamed, or never existed in this workspace.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/" className="flex-1">
              <Button
                variant="outline"
                className="w-full h-11 text-xs font-bold rounded-xl border-neutral-200 hover:bg-neutral-50 gap-2"
              >
                <Home className="h-4 w-4 text-neutral-500" />
                <span>Home Page</span>
              </Button>
            </Link>

            <Link href="/dashboard" className="flex-1">
              <Button className="w-full h-11 text-xs font-bold rounded-xl bg-[#0033FF] hover:bg-[#0025CC] text-white shadow-md shadow-blue-500/20 gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-4 text-xs font-medium text-neutral-400">
            <Link href="/templates" className="hover:text-[#141414] transition-colors">
              Templates
            </Link>
            <span>•</span>
            <Link href="/pricing" className="hover:text-[#141414] transition-colors">
              Pricing
            </Link>
            <span>•</span>
            <Link href="/features" className="hover:text-[#141414] transition-colors">
              Features
            </Link>
          </div>
        </div>
      </div>

      {/* Footer minimal */}
      <footer className="w-full py-4 text-center text-xs text-neutral-400 border-t border-neutral-200/60 bg-white">
        © 2026 Unbounce AI Inc. All rights reserved.
      </footer>
    </main>
  );
}
