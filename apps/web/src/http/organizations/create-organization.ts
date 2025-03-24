import { api } from '@/http/api-client';

interface CreateOrganizationRequest {
  body: {
    name: string;
    domain: string | null;
    shouldAttachUsersByDomain: boolean;
  };
}

interface CreateOrganizationResponse {
  organizationId: string;
}

export async function createOrganization(request: CreateOrganizationRequest) {
  const { name, domain, shouldAttachUsersByDomain } = request.body;

  await api.post<CreateOrganizationResponse>('organizations', {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  });
}
