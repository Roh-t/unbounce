"use client";

import * as React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  Eye,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Layers,
  ArrowRight,
  Filter,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LandingPage, DailyMetric, User } from "@/lib/db/types";

interface AnalyticsResponse {
  kpis: {
    totalVisitors: number;
    totalConversions: number;
    avgConversionRate: string;
    activePages: number;
    totalLeads: number;
  };
  metrics: DailyMetric[];
  topPages: {
    id: string;
    title: string;
    slug: string;
    status: string;
    views: number;
    conversions: number;
    cvr: string;
  }[];
}

export default function DashboardOverviewPage() {
  const [data, setData] = React.useState<AnalyticsResponse | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [meRes, analyticsRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/analytics"),
        ]);

        if (meRes.ok) {
          const meData = await meRes.json();
          setUser(meData.user);
        }

        if (analyticsRes.ok) {
          const aData = await analyticsRes.json();
          setData(aData);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-64 bg-neutral-200 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-neutral-200 rounded-2xl" />
          ))}
        </div>
        <div className="h-80 bg-neutral-200 rounded-2xl" />
      </div>
    );
  }

  const kpis = data?.kpis || {
    totalVisitors: 11580,
    totalConversions: 1715,
    avgConversionRate: "14.8%",
    activePages: 3,
    totalLeads: 8,
  };

  const chartData = data?.metrics || [];
  const topPages = data?.topPages || [];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
              Welcome back, {user?.name || "Growth Marketer"}
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Workspace
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Workspace: <strong className="text-neutral-700">{user?.workspaceName || "Growth Velocity Lab"}</strong> • Plan:{" "}
            <strong className="text-[#0033FF]">{user?.plan || "Experiment"}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/dashboard/pages?action=create">
            <Button className="bg-[#0033FF] hover:bg-[#0025CC] text-white font-bold text-xs h-10 rounded-xl shadow-sm gap-2">
              <Plus className="h-4 w-4" />
              <span>Create New Page</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Conversion KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Visitors */}
        <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold">Total Page Visitors</span>
              <div className="p-2 bg-blue-50 text-[#0033FF] rounded-xl">
                <Eye className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-black text-[#141414]">
                {kpis.totalVisitors.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                +18.4%
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">Across 14 active days</p>
          </CardContent>
        </Card>

        {/* Total Conversions */}
        <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold">Total Conversions</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-black text-[#141414]">
                {kpis.totalConversions.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                +24.1%
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">Forms & button goals met</p>
          </CardContent>
        </Card>

        {/* Average CVR */}
        <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold">Average Conversion Rate</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-black text-[#141414]">
                {kpis.avgConversionRate}
              </span>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                +3.2% vs baseline
              </Badge>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">Industry avg: 4.8%</p>
          </CardContent>
        </Card>

        {/* Active Leads */}
        <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold">CRM Leads</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-black text-[#141414]">
                {kpis.totalLeads}
              </span>
              <Link href="/dashboard/leads" className="text-[11px] font-bold text-[#0033FF] hover:underline">
                View CRM →
              </Link>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">Verified contacts captured</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart Section: 14-Day Performance */}
      <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-neutral-100">
          <div>
            <CardTitle className="text-base font-bold text-[#141414]">
              Traffic & Conversion Trajectory (Last 14 Days)
            </CardTitle>
            <p className="text-xs text-neutral-400 mt-0.5">
              Multi-armed bandit AI routing optimizing traffic between Variant A & Variant B
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold pt-2 sm:pt-0">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0033FF]" />
              <span className="text-neutral-600">Daily Visitors</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00C48C]" />
              <span className="text-neutral-600">Daily Conversions</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0033FF" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0033FF" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="conversionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C48C" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#00C48C" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  tickFormatter={(val: string) => val.slice(5)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-lg text-xs space-y-1">
                          <p className="font-bold text-[#141414]">{label}</p>
                          <p className="text-[#0033FF] font-semibold">
                            Visitors: {payload[0]?.value}
                          </p>
                          <p className="text-emerald-600 font-semibold">
                            Conversions: {payload[1]?.value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#0033FF"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#visitorsGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stroke="#00C48C"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#conversionsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Landing Pages Table Preview */}
      <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-neutral-100">
          <div>
            <CardTitle className="text-base font-bold text-[#141414]">
              High-Performing Landing Pages
            </CardTitle>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live pages ranked by conversion rate and aggregate traffic
            </p>
          </div>

          <Link href="/dashboard/pages">
            <Button variant="ghost" size="sm" className="text-xs font-bold text-[#0033FF] hover:bg-blue-50 gap-1">
              <span>View All Pages</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50/70 border-b border-neutral-200/80 text-neutral-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-5 font-semibold">Page Title & Slug</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Views</th>
                  <th className="py-3 px-4 font-semibold">Conversions</th>
                  <th className="py-3 px-4 font-semibold">CVR</th>
                  <th className="py-3 px-5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {topPages.map((page) => (
                  <tr key={page.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-[#141414]">{page.title}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        /p/{page.slug}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        className={`text-[10px] font-bold ${
                          page.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-neutral-100 text-neutral-600 border-neutral-200"
                        }`}
                      >
                        {page.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-neutral-700">
                      {page.views.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-neutral-700">
                      {page.conversions.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        {page.cvr}%
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right space-x-2">
                      <Link href={`/editor/${page.id}`}>
                        <Button variant="outline" size="sm" className="h-7 text-[11px] font-bold rounded-lg">
                          Edit
                        </Button>
                      </Link>
                      {page.status === "published" && (
                        <Link href={`/p/${page.slug}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-7 text-[11px] text-[#0033FF] hover:bg-blue-50 p-1 rounded-lg">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

