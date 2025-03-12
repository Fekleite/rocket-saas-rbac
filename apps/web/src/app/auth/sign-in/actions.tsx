'use server';

import { signInWithPassword } from '@/http/auth/sign-in-with-password';

export async function signInWithEmailAndPassword(data: FormData) {
  const { email, password } = Object.fromEntries(data);

  const result = await signInWithPassword({
    body: {
      email: String(email),
      password: String(password),
    },
  });

  console.log(result);
}
