"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  Copy,
  Check,
  ExternalLink,
  MoreVertical,
  Trash2,
  Edit,
  Sparkles,
  Layers,
  ArrowRight,
  Loader2,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { LandingPage } from "@/lib/db/types";

function PagesManager() {
  const searchParams = useSearchParams();
  const initialAction = searchParams.get("action");

  const [pages, setPages] = React.useState<LandingPage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [copiedSlug, setCopiedSlug] = React.useState<string | null>(null);

  // Create Modal State
  const [createOpen, setCreateOpen] = React.useState(initialAction === "create");
  const [newTitle, setNewTitle] = React.useState("");
  const [newCategory, setNewCategory] = React.useState("SaaS");
  const [creating, setCreating] = React.useState(false);
  const [createError, setCreateError] = React.useState<string | null>(null);

  // Fetch Pages
  const loadPages = React.useCallback(async () => {
    try {
      const res = await fetch("/api/pages");
      if (res.ok) {
        const data = await res.json();
        setPages(data.pages || []);
      }
    } catch (err) {
      console.error("Failed to load pages:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadPages();
  }, [loadPages]);

  // Handle Create Page
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setCreating(true);
    setCreateError(null);

    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          category: newCategory,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create page");
      }

      setPages((prev) => [data.page, ...prev]);
      setNewTitle("");
      setCreateOpen(false);
    } catch (err: unknown) {
      setCreateError(err instanceof Error ? err.message : "Creation failed");
    } finally {
      setCreating(false);
    }
  };

  // Toggle Page Status (Draft <-> Published)
  const handleToggleStatus = async (page: LandingPage) => {
    const nextStatus = page.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/pages/${page.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.ok) {
        setPages((prev) =>
          prev.map((p) => (p.id === page.id ? { ...p, status: nextStatus } : p))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Toggle A/B Test
  const handleToggleAB = async (page: LandingPage) => {
    const nextState = !page.abTestEnabled;
    try {
      const res = await fetch(`/api/pages/${page.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ abTestEnabled: nextState }),
      });

      if (res.ok) {
        setPages((prev) =>
          prev.map((p) => (p.id === page.id ? { ...p, abTestEnabled: nextState } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle A/B test:", err);
    }
  };

  // Duplicate Page
  const handleDuplicate = async (id: string) => {
    try {
      const res = await fetch(`/api/pages/${id}/duplicate`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setPages((prev) => [data.page, ...prev]);
      }
    } catch (err) {
      console.error("Failed to duplicate page:", err);
    }
  };

  // Delete Page
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this landing page? This cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPages((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete page:", err);
    }
  };

  // Copy live URL
  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  // Filtered pages
  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(search.toLowerCase()) ||
      page.slug.toLowerCase().includes(search.toLowerCase()) ||
      page.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || page.status === statusFilter;

    const matchesCategory =
      categoryFilter === "all" || page.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header & New Page Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[#141414] tracking-tight">
            Landing Pages
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Create, test, and manage high-converting landing pages & traffic variants
          </p>
        </div>

        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-[#0033FF] hover:bg-[#0025CC] text-white font-bold text-xs h-10 rounded-xl shadow-sm gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Page</span>
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-neutral-200/80 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search by page title, slug, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs rounded-xl border-neutral-200"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {["all", "published", "draft"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                statusFilter === status
                  ? "bg-[#141414] text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter pages by category"
          className="h-9 px-3 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 outline-none w-full sm:w-auto"
        >
          <option value="all">All Categories</option>
          <option value="SaaS">SaaS</option>
          <option value="Lead Gen">Lead Gen</option>
          <option value="Ecommerce">Ecommerce</option>
          <option value="Agency">Agency</option>
          <option value="Events">Events</option>
        </select>
      </div>

      {/* Pages Table */}
      <Card className="rounded-2xl border-neutral-200/80 bg-white shadow-xs overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-xs text-neutral-400">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-[#0033FF]" />
              Loading landing pages...
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm text-[#141414]">No pages found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                No landing pages match your search criteria. Try clearing filters or create a new page.
              </p>
              <Button
                onClick={() => setCreateOpen(true)}
                size="sm"
                className="bg-[#0033FF] hover:bg-[#0025CC] text-white font-bold text-xs rounded-xl"
              >
                Create Page
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50/70 border-b border-neutral-200/80 text-neutral-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Page Title & URL</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">A/B Testing</th>
                    <th className="py-3 px-4 font-semibold">Visitors</th>
                    <th className="py-3 px-4 font-semibold">Conversions</th>
                    <th className="py-3 px-4 font-semibold">CVR</th>
                    <th className="py-3 px-5 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredPages.map((page) => {
                    const cvr =
                      page.views > 0
                        ? ((page.conversions / page.views) * 100).toFixed(1)
                        : "0.0";

                    return (
                      <tr key={page.id} className="hover:bg-neutral-50/60 transition-colors">
                        {/* Title & Slug */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#141414] text-xs">
                              {page.title}
                            </span>
                            <Badge className="bg-blue-50 text-[#0033FF] border-blue-200 text-[9px] font-bold">
                              {page.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono mt-0.5">
                            <span>/p/{page.slug}</span>
                            <button
                              type="button"
                              onClick={() => handleCopyLink(page.slug)}
                              title="Copy URL"
                              className="text-neutral-400 hover:text-neutral-700"
                            >
                              {copiedSlug === page.slug ? (
                                <Check className="h-3 w-3 text-emerald-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(page)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                              page.status === "published"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                : "bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                page.status === "published"
                                  ? "bg-emerald-500"
                                  : "bg-neutral-400"
                              }`}
                            />
                            {page.status.toUpperCase()}
                          </button>
                        </td>

                        {/* A/B Test Toggle */}
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={() => handleToggleAB(page)}
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                              page.abTestEnabled
                                ? "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                                : "bg-neutral-50 text-neutral-400 border-neutral-200 hover:bg-neutral-100"
                            }`}
                          >
                            <Sparkles className="h-3 w-3 text-purple-500" />
                            <span>
                              {page.abTestEnabled ? "50/50 Split Active" : "Disabled"}
                            </span>
                          </button>
                        </td>

                        {/* Views */}
                        <td className="py-3.5 px-4 font-semibold text-neutral-700">
                          {page.views.toLocaleString()}
                        </td>

                        {/* Conversions */}
                        <td className="py-3.5 px-4 font-semibold text-neutral-700">
                          {page.conversions.toLocaleString()}
                        </td>

                        {/* CVR */}
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            {cvr}%
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-5 text-right space-x-1.5 whitespace-nowrap">
                          <Link href={`/editor/${page.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-[11px] font-bold rounded-lg border-neutral-200 hover:bg-neutral-100"
                            >
                              Edit
                            </Button>
                          </Link>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDuplicate(page.id)}
                            title="Duplicate page"
                            className="h-7 text-[11px] text-neutral-500 hover:bg-neutral-100 px-2 rounded-lg"
                          >
                            Copy
                          </Button>

                          <Link
                            href={page.status === "published" ? `/p/${page.slug}` : `/p/${page.slug}?preview=1`}
                            target="_blank"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              title={page.status === "published" ? "View Live Page" : "Preview Draft Page"}
                              className="h-7 text-[11px] text-[#0033FF] hover:bg-blue-50 px-2 rounded-lg gap-1 font-semibold"
                            >
                              <span>{page.status === "published" ? "Live" : "Preview"}</span>
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(page.id)}
                            title="Delete page"
                            className="h-7 text-[11px] text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Page Modal Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold text-[#141414]">
              Create New Landing Page
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-500">
              Give your new conversion page a title and category. You can customize the layout in the visual editor.
            </DialogDescription>
          </DialogHeader>

          {createError && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <span>{createError}</span>
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div>
              <label
                htmlFor="pageTitle"
                className="block text-xs font-semibold text-[#141414] mb-1.5"
              >
                Page Title
              </label>
              <Input
                id="pageTitle"
                required
                placeholder="e.g. Q4 Growth Acceleration Sprint"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div>
              <label
                htmlFor="pageCategory"
                className="block text-xs font-semibold text-[#141414] mb-1.5"
              >
                Industry Category
              </label>
              <select
                id="pageCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-700 outline-none"
              >
                <option value="SaaS">SaaS & B2B Software</option>
                <option value="Lead Gen">Lead Generation & Whitepapers</option>
                <option value="Ecommerce">Ecommerce & DTC Physical Goods</option>
                <option value="Agency">Agency Portfolio & Services</option>
                <option value="Events">Webinar & Event Registration</option>
                <option value="Consulting">Consulting & High-Ticket Booking</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                className="text-xs h-9 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={creating || !newTitle.trim()}
                className="bg-[#0033FF] hover:bg-[#0025CC] text-white font-bold text-xs h-9 rounded-xl"
              >
                {creating ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                ) : (
                  <Plus className="h-4 w-4 mr-1.5" />
                )}
                Create Page
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function PagesPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-xs text-neutral-400">Loading...</div>}>
      <PagesManager />
    </React.Suspense>
  );
}

