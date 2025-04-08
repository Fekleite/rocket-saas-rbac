import { Role } from '@rocket-saas/auth';

import { api } from '../api-client';

interface UpdateMemberRequest {
  body: {
    role: Role;
  };
  params: {
    org: string;
    memberId: string;
  };
}

export async function updateMember(request: UpdateMemberRequest) {
  const { role } = request.body;
  const { org, memberId } = request.params;

  await api.put(`organizations/${org}/members/${memberId}`, {
    json: { role },
  });
}
