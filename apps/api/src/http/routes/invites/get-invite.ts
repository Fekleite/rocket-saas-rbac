import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { BadRequestError } from '../_errors/bad-request-error';
import { roleSchema } from '@rocket-saas/auth';

export async function getInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/invites/:inviteId',
    {
      schema: {
        tags: ['invites'],
        summary: 'Get an invite',
        params: z.object({
          inviteId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            role: roleSchema,
            email: z.string().email(),
            createdAt: z.date(),
            organization: z.object({
              name: z.string(),
            }),
            author: z
              .object({
                id: z.string().uuid(),
                name: z.string().nullable(),
                avatarUrl: z.string().url().nullable(),
              })
              .nullable(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { inviteId } = request.params;

      const invite = await prisma.invite.findUnique({
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
          organization: {
            select: {
              name: true,
            },
          },
        },
        where: {
          id: inviteId,
        },
      });

      if (!invite) {
        throw new BadRequestError('Invite not found.');
      }

      return reply.send(invite);
    }
  );
}
