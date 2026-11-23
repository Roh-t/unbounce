"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  Plus,
  LogOut,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/lib/db/types";

interface DashboardSidebarProps {
  user: User;
  onOpenCreateModal?: () => void;
}

export function DashboardSidebar({ user, onOpenCreateModal }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = React.useState(false);

  const navItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      label: "Landing Pages",
      href: "/dashboard/pages",
      icon: FileText,
      active: pathname.startsWith("/dashboard/pages"),
    },
    {
      label: "Leads CRM",
      href: "/dashboard/leads",
      icon: Users,
      active: pathname.startsWith("/dashboard/leads"),
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      active: pathname.startsWith("/dashboard/analytics"),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      active: pathname.startsWith("/dashboard/settings"),
    },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      // Ignore
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
      {/* Top Section */}
      <div className="p-4 space-y-4">
        {/* Workspace Brand / Selector */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#141414] shadow-sm">
              <svg
                width="16"
                height="16"
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
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm font-black text-[#141414] tracking-tight">
                  unbounce
                </span>
                <span className="rounded bg-blue-50 px-1 py-0.2 text-[9px] font-bold text-[#0033FF] border border-blue-200">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium truncate max-w-[120px]">
                {user.workspaceName}
              </span>
            </div>
          </Link>

          <Badge className="bg-emerald-50 text-[#00C48C] border border-emerald-200 text-[9px] font-bold px-1.5 py-0.5">
            {user.plan}
          </Badge>
        </div>

        {/* Quick Action: Create New Page */}
        <Link href="/dashboard/pages?action=create">
          <Button
            type="button"
            onClick={onOpenCreateModal}
            className="w-full bg-[#0033FF] hover:bg-[#0025CC] text-white font-bold text-xs h-9 rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Page</span>
          </Button>
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-1 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  item.active
                    ? "bg-[#0033FF]/10 text-[#0033FF] font-bold"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-[#141414]"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    item.active ? "text-[#0033FF]" : "text-neutral-400"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 space-y-3 border-t border-neutral-100">
        {/* Live Site Preview Quick Link */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between text-[11px] text-neutral-500 hover:text-[#141414] px-2 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
            <span>View Marketing Site</span>
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">↗</span>
        </Link>

        {/* User Card */}
        <div className="flex items-center justify-between bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/60">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-8 rounded-full bg-[#141414] text-white flex items-center justify-center text-xs font-black shrink-0">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#141414] truncate">
                {user.name}
              </p>
              <p className="text-[10px] text-neutral-400 truncate">
                {user.email}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={loggingOut}
            title="Sign out"
            className="h-7 w-7 p-0 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}

