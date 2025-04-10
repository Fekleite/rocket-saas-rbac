import { Role } from '@rocket-saas/auth';
import { api } from '../api-client';

interface GetInviteParams {
  inviteId: string;
}

interface GetInviteResponse {
  id: string;
  role: Role;
  email: string;
  createdAt: string;
  organization: {
    name: string;
  };
  author: {
    id: string;
    name: string | null;
    avatarUrl: string | null;
  } | null;
}

export async function getInvite({ inviteId }: GetInviteParams) {
  const result = await api.get<GetInviteResponse>(`invites/${inviteId}`).json();

  return result;
}
