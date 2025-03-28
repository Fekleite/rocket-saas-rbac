import { api } from '@/http/api-client';

interface Project {
  id: string;
  name: string;
  description: string;
  slug: string;
  avatarUrl: string | null;
  createdAt: string;
  ownerId: string;
  organizationId: string;
  owner: {
    id: string;
    name: string | null;
    avatarUrl: string | null;
    email: string;
  };
}

type GetProjectsResponse = Project[];

interface GetProjectsParams {
  org: string;
}

export async function getProjects({ org }: GetProjectsParams) {
  const response = await api
    .get<GetProjectsResponse>(`organizations/${org}/projects`)
    .json();

  return response;
}
