import { api } from '@/http/api-client';

interface ShutdownOrganizationParams {
  org: string;
}

export async function shutdownOrganization({
  org,
}: ShutdownOrganizationParams) {
  await api.delete(`organizations/${org}`);
}
