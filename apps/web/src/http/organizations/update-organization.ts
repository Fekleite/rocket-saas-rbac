import { api } from '@/http/api-client';

interface UpdateOrganizationRequest {
  body: {
    name: string;
    domain: string | null;
    shouldAttachUsersByDomain: boolean;
  };
  params: {
    org: string;
  };
}

export async function updateOrganization(request: UpdateOrganizationRequest) {
  const { name, domain, shouldAttachUsersByDomain } = request.body;
  const { org } = request.params;

  await api.put(`organizations/${org}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  });
}
