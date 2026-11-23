"use client";

import * as React from "react";
import Link from "next/link";
import {
  Building,
  Globe,
  Key,
  Webhook,
  Check,
  Copy,
  Shield,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import type { User } from "@/lib/db/types";

export default function SettingsPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const [workspaceName, setWorkspaceName] = React.useState("");
  const [copiedKey, setCopiedKey] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  // Integrations state
  const [integrations, setIntegrations] = React.useState({
    hubspot: true,
    salesforce: false,
    klaviyo: true,
    zapier: true,
    webhooks: true,
  });

  React.useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setWorkspaceName(data.user.workspaceName);
        }
      } catch (err) {
        console.error("Failed to load user settings:", err);
      }
    }
    loadUser();
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const apiKey = "cro_live_99f8a2b34d98e104ca841b96";

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#141414] tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Manage your organization profile, custom publishing domains, integrations, and API access
        </p>
      </div>

      {/* 1. Workspace Profile Card */}
      <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs">
        <CardHeader className="border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-[#0033FF]" />
            <CardTitle className="text-sm font-bold text-[#141414]">
              Organization & Plan
            </CardTitle>
          </div>
          <p className="text-xs text-neutral-400">
            Configure your team workspace name and review your active subscription tier
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#141414] mb-1.5">
                  Workspace Name
                </label>
                <Input
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="h-10 text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#141414] mb-1.5">
                  Account Owner Email
                </label>
                <Input
                  disabled
                  value={user?.email || "demo@unbounce.ai"}
                  className="h-10 text-xs rounded-xl bg-neutral-50 text-neutral-500"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#141414]">
                    Active Plan: {user?.plan || "Experiment"}
                  </span>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                    Active
                  </Badge>
                </div>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Unlimited AI prompts • 50,000 monthly visitors • Multi-armed bandit testing
                </p>
              </div>

              <Link href="/pricing">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs font-bold rounded-lg border-neutral-300 hover:bg-neutral-100"
                >
                  Change Plan
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between pt-2">
              {saved && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Workspace settings updated!</span>
                </div>
              )}
              <div className="ml-auto">
                <Button
                  type="submit"
                  className="bg-[#0033FF] hover:bg-[#0025CC] text-white font-bold text-xs h-9 rounded-xl gap-1.5"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 2. Custom Domain Verification */}
      <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs">
        <CardHeader className="border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#0033FF]" />
            <CardTitle className="text-sm font-bold text-[#141414]">
              Custom Domains & CNAME Routing
            </CardTitle>
          </div>
          <p className="text-xs text-neutral-400">
            Publish landing pages on your own brand subdomain with automatic SSL
          </p>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          <div className="rounded-xl border border-neutral-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#141414]">
                  pages.growthlab.io
                </span>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                  ✓ Verified & SSL Active
                </Badge>
              </div>
              <span className="text-[11px] text-neutral-400">Target: cname.unbounce.edge</span>
            </div>

            <div className="bg-neutral-50 p-3 rounded-lg text-xs font-mono text-neutral-600 flex items-center justify-between">
              <span>CNAME &nbsp; pages &nbsp;→&nbsp; edge-ingress.unbounce.ai</span>
              <span className="text-emerald-600 font-sans font-bold text-[10px]">Connected</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="e.g. go.yourcompany.com"
              className="h-9 text-xs rounded-xl"
            />
            <Button
              variant="outline"
              size="sm"
              className="h-9 text-xs font-bold rounded-xl whitespace-nowrap"
            >
              Add Domain
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3. Integrations & Lead Sync */}
      <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs">
        <CardHeader className="border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2">
            <Webhook className="h-4 w-4 text-[#0033FF]" />
            <CardTitle className="text-sm font-bold text-[#141414]">
              Marketing & CRM Integrations
            </CardTitle>
          </div>
          <p className="text-xs text-neutral-400">
            Automatically push captured leads into your downstream sales stack
          </p>
        </CardHeader>

        <CardContent className="pt-6 space-y-4 divide-y divide-neutral-100">
          {[
            {
              id: "hubspot",
              name: "HubSpot CRM",
              desc: "Instant contact creation and deal attribution",
              connected: integrations.hubspot,
            },
            {
              id: "salesforce",
              name: "Salesforce Cloud",
              desc: "Enterprise lead routing and campaign tracking",
              connected: integrations.salesforce,
            },
            {
              id: "klaviyo",
              name: "Klaviyo DTC",
              desc: "Sync emails and phone numbers to welcome flows",
              connected: integrations.klaviyo,
            },
            {
              id: "zapier",
              name: "Zapier & Webhooks",
              desc: "Connect to 5,000+ apps with JSON payloads",
              connected: integrations.zapier,
            },
          ].map((item) => (
            <div key={item.id} className="pt-4 first:pt-0 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#141414]">{item.name}</h4>
                <p className="text-[11px] text-neutral-400">{item.desc}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-bold ${
                    item.connected ? "text-emerald-600" : "text-neutral-400"
                  }`}
                >
                  {item.connected ? "Connected" : "Disconnected"}
                </span>
                <Switch
                  checked={item.connected}
                  onCheckedChange={(val) =>
                    setIntegrations((prev) => ({ ...prev, [item.id]: val }))
                  }
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 4. API Keys & Webhooks */}
      <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs">
        <CardHeader className="border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-[#0033FF]" />
            <CardTitle className="text-sm font-bold text-[#141414]">
              Developer API Keys & MCP Endpoints
            </CardTitle>
          </div>
          <p className="text-xs text-neutral-400">
            Use this key to authorize custom programmatic page creation and MCP tools
          </p>
        </CardHeader>

        <CardContent className="pt-6 space-y-3">
          <label className="block text-xs font-semibold text-[#141414]">
            Production API Key
          </label>
          <div className="flex items-center gap-2">
            <Input
              readOnly
              type="password"
              value={apiKey}
              className="h-10 text-xs font-mono rounded-xl bg-neutral-50"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleCopyKey}
              className="h-10 text-xs font-bold rounded-xl gap-1.5 shrink-0"
            >
              {copiedKey ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Key</span>
                </>
              )}
            </Button>
          </div>
          <p className="text-[11px] text-neutral-400">
            Never expose this key on client-side applications. Keep it secure in server environment variables.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

