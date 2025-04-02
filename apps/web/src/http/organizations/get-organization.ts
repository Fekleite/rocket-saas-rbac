import { api } from '@/http/api-client';

interface GetOrganizationParams {
  org: string;
}

interface GetOrganizationResponse {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  shouldAttachUsersByDomain: boolean;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export async function getOrganization({ org }: GetOrganizationParams) {
  const response = await api
    .get<GetOrganizationResponse>(`organizations/${org}`)
    .json();

  return response;
}
