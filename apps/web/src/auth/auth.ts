import { cookies as nextCookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { defineAbilityFor } from '@rocket-saas/auth';

import { getProfile } from '@/http/auth/get-profile';
import { getMembership } from '@/http/organizations/get-membership';

export async function isAuthenticated() {
  const cookies = await nextCookies();

  return !!cookies.get('token')?.value;
}

export async function auth() {
  const cookies = await nextCookies();
  const token = cookies.get('token')?.value;

  if (!token) {
    redirect('/auth/sign-in');
  }

  try {
    const user = await getProfile();

    return user;
  } catch (error) {
    console.error(error);
  }

  redirect('/api/auth/sign-out');
}

export async function getCurrentOrg() {
  const cookies = await nextCookies();

  return cookies.get('org')?.value ?? null;
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg();

  if (!org) {
    return null;
  }

  const membership = await getMembership({ org });

  return membership;
}

export async function ability() {
  const membership = await getCurrentMembership();

  if (!membership) {
    return null;
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  });

  return ability;
}
