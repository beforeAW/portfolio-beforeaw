import { NextRequest, NextResponse } from 'next/server';
import { readSiteContent, writeSiteContent } from '@/lib/cms/content';
import { normalizeSiteContent } from '@/lib/cms/schema';
import { isAuthorizedRequest } from '@/lib/cms/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const content = await readSiteContent();
  return NextResponse.json(content, { status: 200 });
}

export async function PUT(request: NextRequest) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as unknown;
    const content = normalizeSiteContent(body);
    const savedContent = await writeSiteContent(content);

    return NextResponse.json(savedContent, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body or save failure' }, { status: 400 });
  }
}