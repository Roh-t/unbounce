import { NextResponse } from "next/server";
import { z } from "zod";
import { recordPageView } from "@/lib/db/store";

const trackSchema = z.object({
  pageId: z.string().min(1),
  variant: z.enum(["A", "B"]).default("A"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = trackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid tracking payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const page = recordPageView(parsed.data.pageId, parsed.data.variant);
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
