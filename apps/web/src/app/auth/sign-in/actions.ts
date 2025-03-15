'use server';

import { z } from 'zod';
import { HTTPError } from 'ky';
import { cookies as nextCookies } from 'next/headers';

import { signInWithPassword } from '@/http/auth/sign-in-with-password';

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
});

export async function signInWithEmailAndPassword(formData: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { email, password } = result.data;

  try {
    const { token } = await signInWithPassword({
      body: {
        email,
        password,
      },
    });

    const cookies = await nextCookies();
    cookies.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json();

      return { success: false, message, errors: null };
    }

    console.error(error);

    return {
      success: false,
      message: 'Unexpected error. try again in a few minutes.',
      errors: null,
    };
  }

  return { success: true, message: null, errors: null };
}
