import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { getAnalytics } from '@/lib/db/store';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = getAnalytics(user.id);
  return NextResponse.json(data);
}

