import { api } from '@/http/api-client';

interface GetProfileResponse {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('profile').json();

  return response;
}
