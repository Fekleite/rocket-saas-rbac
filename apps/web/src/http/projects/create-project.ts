import { api } from '@/http/api-client';

interface CreateProjectRequest {
  body: {
    name: string;
    description: string;
  };
  params: {
    org: string;
  };
}

interface CreateProjectResponse {
  projectId: string;
}

export async function createProject(request: CreateProjectRequest) {
  const { name, description } = request.body;
  const { org } = request.params;

  await api.post<CreateProjectResponse>(`organizations/${org}/projects`, {
    json: {
      name,
      description,
    },
  });
}
