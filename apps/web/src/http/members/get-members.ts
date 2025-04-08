import { Role } from '@rocket-saas/auth';

import { api } from '../api-client';

interface GetMembersParams {
  org: string;
}

interface Member {
  id: string;
  userId: string;
  role: Role;
  name: string | null;
  email: string;
  avatarUrl: string | null;
}

type GetMembersResponse = Member[];

export async function getMembers({ org }: GetMembersParams) {
  const result = await api
    .get<GetMembersResponse>(`organizations/${org}/members`)
    .json();

  return result;
}
