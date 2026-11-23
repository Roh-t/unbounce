import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { deleteLead } from '@/lib/db/store';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const success = deleteLead(id, user.id);
  if (!success) {
    return NextResponse.json({ error: 'Lead not found or unauthorized' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

