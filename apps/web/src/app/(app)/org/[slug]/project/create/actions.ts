'use server';

import { z } from 'zod';
import { HTTPError } from 'ky';

import { getCurrentOrg } from '@/auth/auth';

import { createProject } from '@/http/projects/create-project';

const createProjectSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, include at least 4 characters.' }),
  description: z.string().min(1, { message: 'Please, provide a description.' }),
});

export async function createProjectAction(formData: FormData) {
  const result = createProjectSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { name, description } = result.data;

  const org = await getCurrentOrg();

  try {
    await createProject({
      body: {
        name,
        description,
      },
      params: {
        org: org!,
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

  return {
    success: true,
    message: 'Successfully saved the project.',
    errors: null,
  };
}
