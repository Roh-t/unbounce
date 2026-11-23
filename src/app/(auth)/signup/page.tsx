"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check, ShieldCheck, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");
  const planParam = searchParams.get("plan");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [workspaceName, setWorkspaceName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [demoLoading, setDemoLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          workspaceName: workspaceName || `${fullName.split(" ")[0]}'s Workspace`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create account");
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
            Start your 14-day free trial
          </h1>
          <p className="text-xs text-neutral-500">
            No credit card required • Instant access to AI Builder & Smart Traffic
          </p>

          {(planParam || templateParam) && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {planParam && (
                <Badge className="bg-blue-50 text-[#0033FF] border border-blue-200 hover:bg-blue-50 text-[10px] font-bold">
                  Selected Plan: {planParam.toUpperCase()}
                </Badge>
              )}
              {templateParam && (
                <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 text-[10px] font-bold">
                  Template: {templateParam}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* 1-Click Demo Shortcut */}
        <div className="rounded-2xl border-2 border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 mb-1">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>Skip Sign Up With Instant Demo</span>
          </div>
          <p className="text-[11px] text-emerald-700/80 mb-2.5">
            Hop directly into the pre-populated SaaS workspace.
          </p>
          <Button
            type="button"
            onClick={handle1ClickDemo}
            disabled={demoLoading || loading}
            className="w-full bg-[#00C48C] hover:bg-[#00A877] text-white font-bold text-xs h-9 shadow-sm"
          >
            {demoLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <span className="flex items-center gap-1.5">
                ⚡ Jump straight into Demo Workspace
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            )}
          </Button>
        </div>

        {/* Signup Card */}
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
                htmlFor="fullName"
                className="block text-xs font-semibold text-[#141414] mb-1.5"
              >
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                required
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div>
              <label
                htmlFor="workspace"
                className="block text-xs font-semibold text-[#141414] mb-1.5"
              >
                Company / Workspace Name
              </label>
              <Input
                id="workspace"
                type="text"
                placeholder="Acme Growth Labs"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="h-10 text-xs rounded-xl"
              />
            </div>

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
                placeholder="jane@acme.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#141414] mb-1.5"
              >
                Password (min. 6 characters)
              </label>
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
                  Create My Free Workspace
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </Button>
          </form>

          {/* Trial Value Bullets */}
          <div className="mt-5 pt-4 border-t border-neutral-100 space-y-2">
            {[
              "Unlimited AI Page Generation prompts",
              "Smart Traffic™ multi-armed bandit routing",
              "A/B testing with instant statistical significance",
              "Cancel anytime with 1 click",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-600">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <p className="text-center text-xs text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[#0033FF] hover:underline"
          >
            Sign in
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

export default function SignupPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#F7F8FA]" />}>
      <SignupForm />
    </React.Suspense>
  );
}
