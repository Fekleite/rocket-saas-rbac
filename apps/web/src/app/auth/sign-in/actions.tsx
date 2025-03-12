'use server';

import { z } from 'zod';

import { signInWithPassword } from '@/http/auth/sign-in-with-password';
import { HTTPError } from 'ky';

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
});

export async function signInWithEmailAndPassword(
  _: unknown,
  formData: FormData
) {
  const result = signInSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { email, password } = result.data;

  try {
    await signInWithPassword({
      body: {
        email,
        password,
      },
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
