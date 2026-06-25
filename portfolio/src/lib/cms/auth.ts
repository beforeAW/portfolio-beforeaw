import type { NextRequest } from 'next/server';

export const ADMIN_SESSION_COOKIE_NAME = 'cms_admin_session';

export function getAdminToken(): string {
  return process.env.CMS_ADMIN_TOKEN ?? '';
}

export function hasAdminTokenConfigured(): boolean {
  return getAdminToken().length > 0;
}

export function isValidAdminPassword(password: string): boolean {
  const adminToken = getAdminToken();
  return adminToken.length > 0 && password === adminToken;
}

export function isAuthorizedRequest(request: NextRequest): boolean {
  const adminToken = getAdminToken();

  if (!adminToken) {
    return false;
  }

  const headerToken = request.headers.get('x-cms-token');
  const cookieToken = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  return headerToken === adminToken || cookieToken === adminToken;
}