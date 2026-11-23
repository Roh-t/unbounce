"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [demoLoading, setDemoLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handle1ClickDemo = async () => {
    setError(null);
    setDemoLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDemo: true }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Demo login failed");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to launch demo");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F7F8FA] p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Logo Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#141414] shadow-sm">
              <svg
                width="22"
                height="22"
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
                <circle cx="17.5" cy="6.5" r="2.5" fill="#0033FF" />
              </svg>
            </div>
            <span className="font-display text-2xl font-black tracking-tight text-[#141414]">
              unbounce
            </span>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#0033FF] border border-blue-200">
              AI
            </span>
          </Link>

          <h1 className="font-display text-2xl font-extrabold text-[#141414]">
            Welcome back
          </h1>
          <p className="text-xs text-neutral-500">
            Sign in to manage your high-converting landing pages & experiments
          </p>
        </div>

        {/* 1-Click Demo Workspace Button */}
        <div className="rounded-2xl border-2 border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 mb-1">
            <Sparkles className="h-4 w-4 text-emerald-600 animate-pulse" />
            <span>Instant Evaluator Demo</span>
          </div>
          <p className="text-[11px] text-emerald-700/80 mb-3">
            Explore with preloaded analytics, live pages, A/B tests & leads CRM.
          </p>
          <Button
            type="button"
            onClick={handle1ClickDemo}
            disabled={demoLoading || loading}
            className="w-full bg-[#00C48C] hover:bg-[#00A877] text-white font-bold text-xs h-10 shadow-sm"
          >
            {demoLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <span className="flex items-center gap-1.5">
                ⚡ 1-Click Demo Workspace (Alex Vance)
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            )}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase">
            <span className="bg-[#F7F8FA] px-2 text-neutral-400 font-medium tracking-wider">
              Or sign in with email
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-sm">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[#141414] mb-1.5"
              >
                Work Email
              </label>
              <Input
                id="email"
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-[#141414]"
                >
                  Password
                </label>
                <span className="text-[11px] text-[#0033FF] hover:underline cursor-pointer">
                  Forgot?
                </span>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || demoLoading}
              className="w-full h-11 bg-[#0033FF] hover:bg-[#0025CC] text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-500/20"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <span className="flex items-center gap-1.5">
                  Sign in to Workspace
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-neutral-100 text-center">
            <span className="text-[11px] text-neutral-500">
              Credentials for demo:{" "}
              <strong className="text-neutral-700">demo@unbounce.ai</strong> /{" "}
              <strong className="text-neutral-700">demo1234</strong>
            </span>
          </div>
        </div>

        {/* Footer Links */}
        <p className="text-center text-xs text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-[#0033FF] hover:underline"
          >
            Start 14-day free trial
          </Link>
        </p>

        <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>SOC-2 Type II Certified • 256-bit SSL Encryption</span>
        </div>
      </div>
    </div>
  );
}
