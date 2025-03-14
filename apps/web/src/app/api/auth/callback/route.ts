import { NextRequest, NextResponse } from 'next/server';
import { cookies as nextCookies } from 'next/headers';

import { signInWithGithub } from '@/http/auth/sign-in-with-github';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code was not found' },
      { status: 400 }
    );
  }

  const { token } = await signInWithGithub({ body: { code } });

  const cookies = await nextCookies();
  cookies.set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = '/';
  redirectUrl.search = '';

  return NextResponse.redirect(redirectUrl);
}
