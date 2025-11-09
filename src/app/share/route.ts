import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { authServer } from '@/libs/auth/server';
import { logger } from '@/libs/logger';

/**
 * Validates that the redirect path is safe (relative, no protocol, no double slashes)
 * Prevents open redirect vulnerabilities
 */
function validateRedirectPath(path: string): boolean {
  // Must be a relative path starting with /
  if (!path.startsWith('/')) {
    return false;
  }

  // Must not contain protocol (http:, https:, etc.)
  if (path.includes('://')) {
    return false;
  }

  // Must not contain double slashes (except after protocol, but we already checked that)
  if (path.includes('//')) {
    return false;
  }

  // Must not be empty or just a slash (we want a specific path)
  if (path === '/' || path.trim() === '') {
    return false;
  }

  return true;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectPath = searchParams.get('redirect');

  if (!redirectPath) {
    logger.info('No redirect path provided');
    redirect('/');
  }

  if (!validateRedirectPath(redirectPath)) {
    logger.info('Invalid redirect path provided');
    redirect('/');
  }

  const session = await authServer.api.getSession({
    headers: await headers(),
  });

  if (session) {
    logger.info(`Redirecting to: ${redirectPath}`);
    redirect(redirectPath);
  }

  const cookieStore = await cookies();
  cookieStore.set('_pl_share_redirect', redirectPath, {
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  logger.info('Cookie set. Redirecting to: /');
  redirect('/');
}
