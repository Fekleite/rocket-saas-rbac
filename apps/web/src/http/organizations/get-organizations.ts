import { api } from '@/http/api-client';

interface Organization {
  id: string;
  name: string;
  slug: string;
  avatarUrl: string | null;
}

type GetOrganizationsResponse = Organization[];

export async function getOrganizations() {
  const response = await api
    .get<GetOrganizationsResponse>('organizations')
    .json();

  return response;
}
