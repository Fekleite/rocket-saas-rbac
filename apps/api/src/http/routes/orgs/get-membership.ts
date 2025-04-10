import { roleSchema } from '@rocket-saas/auth';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { auth } from '@/http/middlewares/auth';

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/membership',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Get user membership on organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              id: z.string(),
              role: roleSchema,
              organizationId: z.string(),
              userId: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params;
        const { membership } = await request.getUserMembership(slug);

        return reply.status(200).send(membership);
      }
    );
}
