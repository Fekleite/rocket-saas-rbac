import { api } from '@/http/api-client';

interface SignInWithGithubRequest {
  body: {
    code: string;
  };
}

interface SignInWithGithubResponse {
  token: string;
}

export async function signInWithGithub(request: SignInWithGithubRequest) {
  const { code } = request.body;

  const response = await api
    .post<SignInWithGithubResponse>('sessions/github', {
      json: {
        code,
      },
    })
    .json();

  return response;
}
