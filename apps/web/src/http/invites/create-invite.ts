import { Role } from '@rocket-saas/auth';
import { api } from '../api-client';

interface CreateInviteRequest {
  params: { org: string };
  body: {
    email: string;
    role: Role;
  };
}

interface CreateInviteResponse {
  inviteId: string;
}

export async function createInvite(request: CreateInviteRequest) {
  const { org } = request.params;
  const { email, role } = request.body;

  await api.post<CreateInviteResponse>(`organizations/${org}/invites`, {
    json: {
      email,
      role,
    },
  });
}
