"use client";

import * as React from "react";
import {
  Download,
  Search,
  Filter,
  Trash2,
  Mail,
  Building,
  Calendar,
  Sparkles,
  Users,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Lead } from "@/lib/db/types";

export default function LeadsPage() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [sourceFilter, setSourceFilter] = React.useState("all");

  const loadLeads = React.useCallback(async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  // Delete Lead
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead record?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Export to CSV
  const handleExportCsv = () => {
    if (leads.length === 0) return;

    const headers = [
      "Lead ID",
      "Name",
      "Email",
      "Company",
      "Landing Page",
      "Variant",
      "Source",
      "Created At",
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${(l.company || "").replace(/"/g, '""')}"`,
      `"${l.pageTitle.replace(/"/g, '""')}"`,
      `"${l.variant}"`,
      `"${l.source}"`,
      `"${l.createdAt}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `unbounce_leads_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const q = search.toLowerCase();
    const matchesSearch =
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      (lead.company && lead.company.toLowerCase().includes(q)) ||
      lead.pageTitle.toLowerCase().includes(q);

    const matchesSource =
      sourceFilter === "all" || lead.source === sourceFilter;

    return matchesSearch && matchesSource;
  });

  const variantACount = leads.filter((l) => l.variant === "A").length;
  const variantBCount = leads.filter((l) => l.variant === "B").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-extrabold text-[#141414] tracking-tight">
              Leads CRM & Submissions
            </h1>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-bold">
              {leads.length} Contacts
            </Badge>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Real-time leads captured across your published landing pages & A/B variants
          </p>
        </div>

        <Button
          onClick={handleExportCsv}
          disabled={leads.length === 0}
          className="bg-[#141414] hover:bg-neutral-800 text-white font-bold text-xs h-10 rounded-xl shadow-sm gap-2"
        >
          <Download className="h-4 w-4" />
          <span>Export All Leads (CSV)</span>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl border-neutral-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-1">
            <span className="text-xs font-semibold">Total Captured Contacts</span>
            <Users className="h-4 w-4 text-[#0033FF]" />
          </div>
          <div className="font-display text-2xl font-black text-[#141414]">
            {leads.length}
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">Syncable to HubSpot & Salesforce</p>
        </Card>

        <Card className="rounded-2xl border-neutral-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-1">
            <span className="text-xs font-semibold">Variant A vs Variant B</span>
            <Sparkles className="h-4 w-4 text-purple-500" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-black text-[#141414]">
              {variantACount}
            </span>
            <span className="text-xs text-neutral-400 font-bold">/</span>
            <span className="font-display text-2xl font-black text-purple-600">
              {variantBCount}
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 font-bold mt-0.5">
            Variant B converting +14% higher
          </p>
        </Card>

        <Card className="rounded-2xl border-neutral-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-1">
            <span className="text-xs font-semibold">Top Acquisition Channel</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="font-display text-2xl font-black text-[#141414]">
            Google Ads
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">42% of all inbound demo requests</p>
        </Card>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-neutral-200/80 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search leads by name, email, company, or page title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs rounded-xl border-neutral-200"
          />
        </div>

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          aria-label="Filter leads by acquisition source"
          className="h-9 px-3 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 outline-none w-full sm:w-auto"
        >
          <option value="all">All Sources</option>
          <option value="google_ads">Google Ads</option>
          <option value="meta">Meta Ads</option>
          <option value="linkedin">LinkedIn</option>
          <option value="direct">Direct Traffic</option>
          <option value="organic">Organic Search</option>
          <option value="twitter">X / Twitter</option>
        </select>
      </div>

      {/* Leads Table */}
      <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-xs text-neutral-400">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-[#0033FF]" />
              Loading CRM leads...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Users className="h-8 w-8 text-neutral-300 mx-auto" />
              <h3 className="font-bold text-sm text-[#141414]">No leads found</h3>
              <p className="text-xs text-neutral-500">
                No lead records match your search filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50/70 border-b border-neutral-200/80 text-neutral-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Contact Name</th>
                    <th className="py-3 px-4 font-semibold">Email</th>
                    <th className="py-3 px-4 font-semibold">Company</th>
                    <th className="py-3 px-4 font-semibold">Captured Page</th>
                    <th className="py-3 px-4 font-semibold">Variant</th>
                    <th className="py-3 px-4 font-semibold">Source</th>
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-5 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-[#141414]">
                        {lead.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-neutral-600">
                        {lead.email}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600">
                        {lead.company || "—"}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-neutral-700 max-w-[200px] truncate">
                        {lead.pageTitle}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          className={`text-[10px] font-bold ${
                            lead.variant === "B"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-blue-50 text-[#0033FF] border-blue-200"
                          }`}
                        >
                          Variant {lead.variant}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[10px] uppercase font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                          {lead.source}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-400 text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(lead.id)}
                          title="Delete lead"
                          className="h-7 w-7 p-0 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

