import { api } from '@/http/api-client';

interface GetMembershipParams {
  org: string;
}

export async function shutdownOrganization({ org }: GetMembershipParams) {
  await api.delete(`organizations/${org}`);
}
