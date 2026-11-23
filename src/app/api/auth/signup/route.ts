import { NextResponse } from 'next/server';
import { getUserByEmail, createUser } from '@/lib/db/store';
import { hashPassword, createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth/session';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, workspaceName } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const newUser = createUser({
      name,
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      workspaceName: workspaceName || `${name.split(' ')[0]}'s Workspace`,
      plan: 'Experiment',
    });

    const token = createSessionToken(newUser);
    const res = NextResponse.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        workspaceName: newUser.workspaceName,
        plan: newUser.plan,
      },
    });

    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

