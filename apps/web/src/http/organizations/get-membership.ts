import { Role } from '@rocket-saas/auth';

import { api } from '@/http/api-client';

interface GetMembershipResponse {
  id: string;
  role: Role;
  organizationId: string;
  userId: string;
}

interface GetMembershipParams {
  org: string;
}

export async function getMembership({ org }: GetMembershipParams) {
  const result = await api
    .get<GetMembershipResponse>(`organizations/${org}/membership`)
    .json();

  return result;
}
