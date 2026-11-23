import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPageById } from "@/lib/db/store";
import { getCurrentUser } from "@/lib/auth/session";
import { PageBuilderStudio } from "@/components/editor/PageBuilderStudio";

export const metadata = {
  title: "Visual Studio Canvas — Unbounce AI",
  description: "Drag-and-drop landing page builder with live A/B variant testing.",
};

export default async function EditorPage({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const page = getPageById(pageId, user.id);

  if (!page) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-800 text-neutral-400">
            <Layers className="h-6 w-6" />
          </div>
          <h2 className="font-display text-xl font-bold text-white">Page Not Found</h2>
          <p className="text-xs text-neutral-400">
            The landing page you requested does not exist or belongs to another workspace.
          </p>
          <Link href="/dashboard/pages">
            <Button className="bg-[#0033FF] hover:bg-[#0025CC] text-white font-bold text-xs rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              <span>Return to Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <PageBuilderStudio initialPage={page} />;
}
