import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { duplicatePage } from '@/lib/db/store';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const duplicated = duplicatePage(id, user.id);
  if (!duplicated) {
    return NextResponse.json({ error: 'Original page not found' }, { status: 404 });
  }

  return NextResponse.json({ page: duplicated }, { status: 201 });
}

