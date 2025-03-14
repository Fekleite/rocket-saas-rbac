import { NextRequest, NextResponse } from 'next/server';
import { cookies as nextCookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookies = await nextCookies();
  cookies.delete('token');

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = '/auth/sign-in';
  redirectUrl.search = '';

  return NextResponse.redirect(redirectUrl);
}
