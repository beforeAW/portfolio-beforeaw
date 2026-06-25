import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE_NAME,
  hasAdminTokenConfigured,
  isValidAdminPassword,
} from '@/lib/cms/auth';

export async function POST(request: NextRequest) {
  if (!hasAdminTokenConfigured()) {
    return NextResponse.json(
      { error: 'CMS_ADMIN_TOKEN is not configured on the server.' },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as { password?: string };
    const password = typeof body.password === 'string' ? body.password : '';

    if (!isValidAdminPassword(password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE_NAME,
      value: password,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}