import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { auth } from '@/http/middlewares/auth';
import { prisma } from '@/lib/prisma';
import { getUserPermissions } from '@/utils/get-user-permissions';
import { UnauthorizedError } from '../_errors/unauthorized-error';
import { BadRequestError } from '../_errors/bad-request-error';

export async function getProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:orgSlug/projects/:projectSlug',
      {
        schema: {
          tags: ['projects'],
          summary: 'Get a project details',
          security: [{ bearerAuth: [] }],
          params: z.object({
            orgSlug: z.string(),
            projectSlug: z.string(),
          }),
          response: {
            200: z.object({
              name: z.string(),
              id: z.string().uuid(),
              slug: z.string(),
              avatarUrl: z.string().url().nullable(),
              ownerId: z.string().uuid(),
              organizationId: z.string().uuid(),
              description: z.string(),
              owner: z.object({
                name: z.string().nullable(),
                id: z.string().uuid(),
                avatarUrl: z.string().url().nullable(),
                email: z.string().email(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { orgSlug, projectSlug } = request.params;
        const { organization, membership } =
          await request.getUserMembership(orgSlug);
        const userId = await request.getCurrentUserId();

        const { cannot } = getUserPermissions(userId, membership.role);

        if (cannot('get', 'Project')) {
          throw new UnauthorizedError(
            "You're not allowed to see this project."
          );
        }

        const project = await prisma.project.findUnique({
          select: {
            id: true,
            name: true,
            description: true,
            slug: true,
            ownerId: true,
            avatarUrl: true,
            organizationId: true,
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            slug: projectSlug,
            organizationId: organization.id,
          },
        });

        if (!project) {
          throw new BadRequestError('Project not found.');
        }

        return reply.status(200).send(project);
      }
    );
}
