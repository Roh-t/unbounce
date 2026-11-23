import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { getPages, createPage } from '@/lib/db/store';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pages = getPages(user.id);
  return NextResponse.json({ pages });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, templateId } = body;

    if (!title) {
      return NextResponse.json({ error: 'Page title is required' }, { status: 400 });
    }

    const page = createPage({
      userId: user.id,
      title,
      category: category || 'SaaS',
      templateId,
    });

    return NextResponse.json({ page }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

