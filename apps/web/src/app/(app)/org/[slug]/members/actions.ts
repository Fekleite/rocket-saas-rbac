'use server';

import { Role, roleSchema } from '@rocket-saas/auth';

import { getCurrentOrg } from '@/auth/auth';

import { removeMember } from '@/http/members/remove-member';
import { updateMember } from '@/http/members/update-member';
import { revokeInvite } from '@/http/invites/revoke-invite';
import { createInvite } from '@/http/invites/create-invite';
import { HTTPError } from 'ky';
import { z } from 'zod';

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

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg();

  await revokeInvite({
    org: currentOrg!,
    inviteId,
  });
}

const inviteSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail address.' }),
  role: roleSchema,
});

export async function createInviteAction(data: FormData) {
  const currentOrg = await getCurrentOrg();
  const result = inviteSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { email, role } = result.data;

  try {
    await createInvite({
      params: {
        org: currentOrg!,
      },
      body: {
        email,
        role,
      },
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();

      return { success: false, message, errors: null };
    }

    console.error(err);

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    };
  }

  return {
    success: true,
    message: 'Successfully created the invite.',
    errors: null,
  };
}
