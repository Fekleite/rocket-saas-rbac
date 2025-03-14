import { projectSchema } from '@rocket-saas/auth';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { auth } from '@/http/middlewares/auth';
import { getUserPermissions } from '@/utils/get-user-permissions';

import { BadRequestError } from '../_errors/bad-request-error';
import { UnauthorizedError } from '../_errors/unauthorized-error';

export async function updateProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/organizations/:slug/projects/:projectId',
      {
        schema: {
          tags: ['projects'],
          summary: 'Update a project',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            projectId: z.string().uuid(),
          }),
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId();
        const { slug, projectId } = request.params;
        const { membership, organization } =
          await request.getUserMembership(slug);
        const { name, description } = request.body;

        const project = await prisma.project.findUnique({
          where: {
            id: projectId,
            organizationId: organization.id,
          },
        });

        if (!project) {
          throw new BadRequestError('Project not found.');
        }

        const authProject = projectSchema.parse(project);

        const { cannot } = getUserPermissions(userId, membership.role);

        if (cannot('update', authProject)) {
          throw new UnauthorizedError(
            "You're not allowed to update this project."
          );
        }

        await prisma.project.update({
          where: {
            id: organization.id,
          },
          data: {
            name,
            description,
          },
        });

        return reply.status(204).send();
      }
    );
}
