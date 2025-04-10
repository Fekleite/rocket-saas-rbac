import { Role } from '@rocket-saas/auth';
import { api } from '../api-client';

interface GetInvitesParams {
  org: string;
}

interface Invite {
  id: string;
  role: Role;
  email: string;
  createdAt: string;
  author: {
    id: string;
    name: string | null;
  } | null;
}

type GetInvitesResponse = Invite[];

export async function getInvites({ org }: GetInvitesParams) {
  const result = await api
    .get<GetInvitesResponse>(`organizations/${org}/invites`)
    .json();

  return result;
}
