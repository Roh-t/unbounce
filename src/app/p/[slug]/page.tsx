import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import type { Data } from "@puckeditor/core";

import { getPageBySlug } from "@/lib/db/store";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureComponentIds } from "@/lib/builder/default-templates";
import { LiveLandingPage } from "@/components/public/LiveLandingPage";
import { ArrowLeft, Lock, FileQuestion, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found | Unbounce AI",
      description: "The requested landing page could not be found.",
    };
  }

  const rootProps = (page.contentJson?.root as { props?: { title?: string } } | undefined)?.props;
  const pageTitle = rootProps?.title || page.title;

  return {
    title: `${pageTitle} — Unbounce AI`,
    description: `High-converting landing page optimized with Unbounce AI Smart Traffic.`,
    openGraph: {
      title: pageTitle,
      description: "Optimized landing page powered by Unbounce AI.",
      type: "website",
    },
  };
}

export default async function PublicLandingPageRoute({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const qParams = await searchParams;

  const page = getPageBySlug(slug);

  // 1. 404 Handler
  if (!page) {
    return (
      <main className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/80 shadow-xl shadow-neutral-900/5 space-y-5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
            <FileQuestion className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-black text-[#141414] tracking-tight">
              Page Not Found
            </h1>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We couldn&apos;t find a published page for <code className="bg-neutral-100 px-1.5 py-0.5 rounded font-mono text-neutral-700">/p/{slug}</code>. It may have been unpublished or moved.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0033FF] hover:bg-[#0025CC] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Unbounce</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 2. Draft Check
  let isDraftPreview = false;
  if (page.status === "draft") {
    const isPreviewParam = qParams.preview === "1";
    const user = await getCurrentUser();

    if (!isPreviewParam || !user) {
      return (
        <main className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/80 shadow-xl shadow-neutral-900/5 space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
              <Lock className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-black text-[#141414] tracking-tight">
                Page Not Published Yet
              </h1>
              <p className="text-xs text-neutral-500 leading-relaxed">
                This page is currently saved as a draft in its workspace and is not accessible to public visitors.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#141414] hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Workspace Member Login</span>
              </Link>
            </div>
          </div>
        </main>
      );
    }

    isDraftPreview = true;
  }

  // 3. A/B Variant Assignment
  let assignedVariant: "A" | "B" = "A";

  const explicitVariant = qParams.variant;
  if (explicitVariant === "B") {
    assignedVariant = "B";
  } else if (explicitVariant === "A") {
    assignedVariant = "A";
  } else if (page.abTestEnabled && page.variantBJson) {
    // Read variant cookie if previously assigned to this visitor
    const cookieStore = await cookies();
    const cookieVar = cookieStore.get(`ub_var_${page.id}`)?.value;

    if (cookieVar === "A" || cookieVar === "B") {
      assignedVariant = cookieVar;
    } else {
      // Deterministic / percentage allocation based on splitPercent
      const splitPercent = typeof page.abSplitPercent === "number" ? page.abSplitPercent : 50;
      const roll = Math.random() * 100;
      assignedVariant = roll < splitPercent ? "A" : "B";
    }
  }

  // 4. Select JSON and guarantee component IDs
  const rawData =
    assignedVariant === "B" && page.variantBJson
      ? (page.variantBJson as unknown as Data)
      : (page.contentJson as unknown as Data);

  const cleanData = ensureComponentIds(rawData);

  return (
    <LiveLandingPage
      pageId={page.id}
      pageTitle={page.title}
      initialData={cleanData}
      variant={assignedVariant}
      isDraftPreview={isDraftPreview}
    />
  );
}
