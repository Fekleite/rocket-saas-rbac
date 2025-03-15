import { api } from '@/http/api-client';

interface SignUpRequest {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

type SignUpResponse = void;

export async function signUp(request: SignUpRequest): Promise<SignUpResponse> {
  const { name, email, password } = request.body;

  await api.post('users', {
    json: {
      name,
      email,
      password,
    },
  });
}
