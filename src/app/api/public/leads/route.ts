import { NextResponse } from "next/server";
import { z } from "zod";
import { recordPublicLead } from "@/lib/db/store";

const leadSchema = z.object({
  pageId: z.string().min(1),
  variant: z.enum(["A", "B"]).default("A"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid lead payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const lead = recordPublicLead({
      pageId: parsed.data.pageId,
      variant: parsed.data.variant,
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      source: parsed.data.source || "direct",
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
