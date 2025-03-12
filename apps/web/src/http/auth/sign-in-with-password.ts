import { api } from '@/http/api-client';

interface SignInWithPasswordRequest {
  body: {
    email: string;
    password: string;
  };
}

interface SignInWithPasswordResponse {
  token: string;
}

export async function signInWithPassword(request: SignInWithPasswordRequest) {
  const { email, password } = request.body;

  const response = await api
    .post<SignInWithPasswordResponse>('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json();

  return response;
}
