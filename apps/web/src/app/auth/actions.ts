'use server';

import { env } from '@rocket-saas/env';
import { redirect } from 'next/navigation';

export async function signInWithGithub() {
  const githubSignInURL = new URL(
    env.NEXT_PUBLIC_GITHUB_SIGN_IN_PATHNAME,
    env.NEXT_PUBLIC_GITHUB_SIGN_IN_ORIGIN
  );

  githubSignInURL.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  githubSignInURL.searchParams.set('redirect_uri', env.GITHUB_REDIRECT_URI);
  githubSignInURL.searchParams.set('scope', 'user');

  redirect(githubSignInURL.toString());
}
