import Link from "next/link";
import {
  Sparkles,
  Layers,
  Cpu,
  Split,
  BellRing,
  Boxes,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FinalCtaBanner } from "@/components/marketing/FinalCtaBanner";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white text-[#141414]">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION                                                  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white pt-16 pb-14 sm:pt-20 sm:pb-20 text-center border-b border-neutral-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50/70 px-3.5 py-1 text-xs font-bold text-[#0033FF]"
          >
            PLATFORM ARCHITECTURE & CAPABILITIES
          </Badge>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#141414]">
            Everything you need to build, test, and scale{" "}
            <span className="text-[#0033FF]">landing pages that convert.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-neutral-600 leading-relaxed">
            Rebuilt from first principles with sub-second edge runtimes, generative AI prompt engines, and autonomous traffic routing.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/signup">
              <Button className="h-12 bg-[#0033FF] hover:bg-[#0025CC] text-white font-bold px-8 rounded-xl shadow-sm">
                Start building for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="h-12 px-6 font-semibold rounded-xl">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6 CORE PILLARS SECTION                                        */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Pillar 1: AI Prompt-to-Page Generator */}
        <div id="ai-builder" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0033FF] border border-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              01 / GENERATIVE AI
            </div>
            <h2 className="font-display text-3xl font-extrabold text-[#141414]">
              Prompt-to-Page AI Generator
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Describe your offer, campaign goal, and target persona. Our LLM engine outputs complete semantic landing pages, persuasive conversion copy, customized forms, and branded color palettes in 5 seconds.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Persuasive headline generation optimized for Google Ads Quality Score
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Automated multi-step form creation with smart qualification fields
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                One-click AI copy rewrites and tone shifts directly in the canvas
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 rounded-2xl border border-neutral-200 bg-[#F7F8FA] p-6 shadow-sm">
            <div className="rounded-xl border border-neutral-800 bg-[#141414] p-5 text-white space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                <span className="font-mono text-neutral-400">Prompt Console</span>
                <span className="text-[#00C48C] font-bold">● Active</span>
              </div>
              <p className="font-mono text-xs text-blue-300">
                &gt; Generate high-converting B2B SaaS demo page with ROI calculator...
              </p>
              <div className="rounded bg-neutral-900 p-3 text-xs text-neutral-300 space-y-1">
                <p className="text-emerald-400">✓ 4 conversion sections created</p>
                <p className="text-emerald-400">✓ Form fields mapped to HubSpot</p>
                <p className="text-emerald-400">✓ Sub-second edge HTML validated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 2: Drag-and-Drop Studio */}
        <div id="builder" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl border border-neutral-200 bg-[#F7F8FA] p-6 shadow-sm">
            <div className="rounded-xl border border-neutral-300 bg-white p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-neutral-100 pb-2">
                <span className="font-bold text-neutral-800">Visual Studio Canvas</span>
                <span className="font-mono text-xs text-[#0033FF]">Snap Grid: 8px</span>
              </div>
              <div className="h-28 rounded-lg border-2 border-dashed border-[#0033FF] bg-blue-50/50 flex flex-col items-center justify-center text-xs text-[#0033FF] font-bold">
                <span>Selected: Primary Conversion CTA Button</span>
                <span className="text-[10px] text-neutral-500 font-normal">Padding: 16px • Radius: 12px</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#00C48C] border border-emerald-200">
              <Layers className="h-3.5 w-3.5" />
              02 / VISUAL FREEDOM
            </div>
            <h2 className="font-display text-3xl font-extrabold text-[#141414]">
              Pixel-Level Drag-and-Drop Canvas
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              No rigid coordinate bugs. Our modern component canvas gives you precision control over padding, typography, colors, animations, and custom HTML/JS embeds with responsive tablet and mobile views.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Independent mobile layout editing without breaking desktop view
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Built-in snap grids, alignment guides, and flexbox auto-stacking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Reusable custom component blocks across all workspace pages
              </li>
            </ul>
          </div>
        </div>

        {/* Pillar 3: Smart Traffic AI */}
        <div id="smart-traffic" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0033FF] border border-blue-200">
              <Cpu className="h-3.5 w-3.5" />
              03 / AUTONOMOUS CRO
            </div>
            <h2 className="font-display text-3xl font-extrabold text-[#141414]">
              Smart Traffic™ Multi-Armed Bandit
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Stop sending every visitor to the same page. Smart Traffic uses multi-armed bandit machine learning to analyze visitor intent, device, geolocation, and referrer—automatically routing them to the variant most likely to convert.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Starts optimizing with as few as 50 visits
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Delivers an average 30% conversion rate lift over static pages
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Zero wasted ad budget on underperforming variants
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 rounded-2xl border border-neutral-200 bg-[#F7F8FA] p-6 shadow-sm">
            <div className="rounded-xl border border-emerald-300 bg-white p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800">Smart Traffic Routing Model</span>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-[#00C48C]">+34% Conv Lift</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Variant A (Quick Form)</span>
                  <span className="font-bold text-[#00C48C]">68% auto-routed</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full bg-[#00C48C]" style={{ width: "68%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 4: A/B Testing & DTR */}
        <div id="ab-testing" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl border border-neutral-200 bg-[#F7F8FA] p-6 shadow-sm">
            <div className="rounded-xl border border-neutral-300 bg-white p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800">Dynamic Text Replacement</span>
                <span className="font-mono text-[10px] text-blue-600">?kw=crm-for-agencies</span>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-xs text-[#0033FF] font-bold">
                Headline dynamically matched: &quot;The Best CRM for Client Agencies&quot;
              </div>
            </div>
          </div>
          <div id="dynamic-text" className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">
              <Split className="h-3.5 w-3.5" />
              04 / CONVERSION ACCELERATION
            </div>
            <h2 className="font-display text-3xl font-extrabold text-[#141414]">
              1-Click A/B Testing & Dynamic Text Replacement
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Launch rigorous statistical split tests with zero client-side flickering. Match Google Ads search terms directly to your page headlines in real-time, achieving 10/10 Quality Scores and lowering ad costs.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Zero-flicker edge SSR variant rendering
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Slash Google Ads Cost-per-Click by 30-45% with DTR
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Real-time statistical significance confidence meter
              </li>
            </ul>
          </div>
        </div>

        {/* Pillar 5: Popups & Sticky Bars */}
        <div id="popups" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-[#FF4F38] border border-rose-200">
              <BellRing className="h-3.5 w-3.5" />
              05 / ON-PAGE CRO
            </div>
            <h2 className="font-display text-3xl font-extrabold text-[#141414]">
              Targeted Popups & Sticky Promotional Bars
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Capture abandoning traffic before they leave. Set up exit-intent popups, scroll-depth slide-ins, and sticky top/bottom promotional notification bars with customized discount countdowns.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Mouse exit-intent trigger technology for desktop
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Percentage scroll-depth and timed delay triggers
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Target specific URL parameters or referral domains
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 rounded-2xl border border-neutral-200 bg-[#F7F8FA] p-6 shadow-sm">
            <div className="rounded-xl border border-neutral-800 bg-[#141414] p-5 text-white space-y-3">
              <span className="text-[10px] font-bold uppercase text-amber-400">Exit-Intent Trigger Demo</span>
              <h4 className="font-display text-base font-bold">Wait! Claim 20% Off Before You Leave</h4>
              <p className="text-xs text-neutral-400">Save your spot today and receive full onboarding support.</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="bg-[#FF4F38] text-white font-bold text-xs">
                  Claim Discount
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 6: Integrations, Webhooks & MCP */}
        <div id="integrations" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl border border-neutral-200 bg-[#F7F8FA] p-6 shadow-sm">
            <div className="rounded-xl border border-neutral-300 bg-white p-5 shadow-xs space-y-3">
              <span className="text-xs font-bold text-neutral-800 block">Lead Dispatch Webhook Stream</span>
              <div className="space-y-1.5 font-mono text-[11px] text-neutral-600 bg-neutral-50 p-3 rounded-lg">
                <p className="text-emerald-600">&gt; POST https://api.hubspot.com/leads (200 OK)</p>
                <p className="text-blue-600">&gt; Webhook dispatched to Zapier (200 OK)</p>
                <p className="text-purple-600">&gt; Slack #sales-alerts notified (200 OK)</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 border border-purple-200">
              <Boxes className="h-3.5 w-3.5" />
              06 / WORKFLOW CONNECTIVITY
            </div>
            <h2 className="font-display text-3xl font-extrabold text-[#141414]">
              Seamless Integrations, Webhooks & MCP Server
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Every captured lead is instantly synced to your CRM, email provider, and analytics stack. Connect directly to HubSpot, Salesforce, Klaviyo, Zapier, Make, and Claude/AI MCP workflows.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Direct zero-code integrations with 50+ marketing tools
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                Instant outbound webhooks with retry logic & signature verification
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                CSV export, UTM tracking, and full analytics event streams
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* "HOW WE COMPARE" BENCHMARK COMPARISON TABLE                  */}
      {/* ------------------------------------------------------------- */}
      <section id="compare" className="bg-[#F7F8FA] py-20 border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <Badge variant="outline" className="text-xs font-bold text-[#0033FF] border-blue-200 bg-blue-50/70">
              ARCHITECTURAL SCORECARD
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#141414]">
              How Unbounce AI compares to legacy page builders
            </h2>
            <p className="text-sm text-neutral-600">
              See why high-growth marketing teams and top paid media agencies are making the switch.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-xs max-w-4xl mx-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="p-4 font-bold text-neutral-800 w-1/3">Core Capability</th>
                  <th className="p-4 font-bold text-[#0033FF] text-center">Unbounce AI</th>
                  <th className="p-4 font-bold text-neutral-500 text-center">Legacy Unbounce / Instapage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Mobile Edge Page Load Speed</td>
                  <td className="p-4 text-center font-bold text-[#00C48C]">&lt; 0.8s (100/100 Lighthouse)</td>
                  <td className="p-4 text-center text-neutral-500">3.5s – 5.8s (45-65 Lighthouse)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">AI Page & Copy Generation</td>
                  <td className="p-4 text-center font-bold text-[#0033FF]">Full Prompt-to-Page Layout + Forms</td>
                  <td className="p-4 text-center text-neutral-500">Basic side modal text generator</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">A/B Testing Traffic Allocation</td>
                  <td className="p-4 text-center font-bold text-[#00C48C]">Autonomous Multi-Armed Bandit</td>
                  <td className="p-4 text-center text-neutral-500">Manual 50/50 split testing</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Builder Canvas Engine</td>
                  <td className="p-4 text-center font-bold text-neutral-900">Modern Responsive Flexbox Grid</td>
                  <td className="p-4 text-center text-neutral-500">2012 Absolute Coordinates</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-800">Pricing Transparency</td>
                  <td className="p-4 text-center font-bold text-[#00C48C]">Predictable scaling, no lockouts</td>
                  <td className="p-4 text-center text-neutral-500">Aggressive visitor caps & upselling</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FINAL CONVERSION CTA BANNER                                   */}
      {/* ------------------------------------------------------------- */}
      <FinalCtaBanner />
    </div>
  );
}

