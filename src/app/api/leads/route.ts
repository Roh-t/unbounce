import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { getLeads, createLead } from '@/lib/db/store';

// GET: Authenticated user viewing leads
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const leads = getLeads(user.id);
  return NextResponse.json({ leads });
}

// POST: Public lead capture submission (from published landing page)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pageId, pageTitle, name, email, company, source, variant } = body;

    if (!pageId || !email || !name) {
      return NextResponse.json(
        { error: 'pageId, name, and email are required' },
        { status: 400 }
      );
    }

    const lead = createLead({
      pageId,
      pageTitle: pageTitle || 'Landing Page',
      name,
      email,
      company: company || undefined,
      source: source || 'direct',
      variant: variant === 'B' ? 'B' : 'A',
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

