'use server';

import { signInWithPassword } from '@/http/auth/sign-in-with-password';

export async function signInWithEmailAndPassword(
  previousState: unknown,
  data: FormData
) {
  const { email, password } = Object.fromEntries(data);

  const result = await signInWithPassword({
    body: {
      email: String(email),
      password: String(password),
    },
  });

  return result;
}
