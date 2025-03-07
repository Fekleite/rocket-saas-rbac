import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { auth } from '@/http/middlewares/auth';
import { prisma } from '@/lib/prisma';
import { roleSchema } from '@rocket-saas/auth';

export async function getOrganizations(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Get organizations where is a member',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.array(
              z.object({
                name: z.string(),
                id: z.string().uuid(),
                slug: z.string(),
                avatarUrl: z.string().url().nullable(),
                role: roleSchema,
              })
            ),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId();

        const organizations = await prisma.organization.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            avatarUrl: true,
            members: {
              select: {
                role: true,
              },
              where: {
                userId,
              },
            },
          },
          where: {
            members: {
              some: {
                userId,
              },
            },
          },
        });

        const organizationsWithUserRole = organizations.map(
          ({ members, ...org }) => ({
            ...org,
            role: members[0].role,
          })
        );

        return reply.status(200).send(organizationsWithUserRole);
      }
    );
}
