'use server';

import { Role } from '@rocket-saas/auth';

import { getCurrentOrg } from '@/auth/auth';

import { removeMember } from '@/http/members/remove-member';
import { updateMember } from '@/http/members/update-member';

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg();

  await removeMember({
    org: currentOrg!,
    memberId,
  });
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg();

  await updateMember({
    params: {
      org: currentOrg!,
      memberId,
    },
    body: {
      role,
    },
  });
}
