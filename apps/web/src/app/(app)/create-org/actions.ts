'use server';

import { z } from 'zod';
import { HTTPError } from 'ky';

import { createOrganization } from '@/http/organizations/create-organization';

const createOrganizationSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Please, incluide at least 4 characters.' }),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

            return domainRegex.test(value);
          }

          return true;
        },
        {
          message: 'Please, enter a valid domain.',
        }
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false;
      }

      return true;
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    }
  );

export async function createOrganizationAction(formData: FormData) {
  const result = createOrganizationSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data;

  try {
    await createOrganization({
      body: {
        name,
        domain,
        shouldAttachUsersByDomain,
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
    message: 'Successfully saved the organization.',
    errors: null,
  };
}
