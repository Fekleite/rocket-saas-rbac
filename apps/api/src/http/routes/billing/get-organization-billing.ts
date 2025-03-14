import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { auth } from '@/http/middlewares/auth';
import { getUserPermissions } from '@/utils/get-user-permissions';
import { UnauthorizedError } from '../_errors/unauthorized-error';
import { prisma } from '@/lib/prisma';

export async function getOrganizationBilling(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/billing',
      {
        schema: {
          tags: ['billing'],
          summary: 'Get billing details from an organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              billing: z.object({
                seats: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                projects: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                total: z.number(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params;
        const { organization, membership } =
          await request.getUserMembership(slug);
        const userId = await request.getCurrentUserId();

        const { cannot } = getUserPermissions(userId, membership.role);

        if (cannot('get', 'Billing')) {
          throw new UnauthorizedError(
            "You're not allowed to get billing details from this organization."
          );
        }

        const [amountOfMembers, amountOfProjects] = await prisma.$transaction([
          prisma.member.count({
            where: {
              organizationId: organization.id,
              role: { not: 'BILLING' },
            },
          }),
          prisma.project.count({
            where: {
              organizationId: organization.id,
            },
          }),
        ]);

        const SEAT_UNIT_VALUE = 10;
        const PROJECT_UNIT_VALUE = 20;

        return reply.status(200).send({
          billing: {
            seats: {
              amount: amountOfMembers,
              unit: SEAT_UNIT_VALUE,
              price: amountOfMembers * SEAT_UNIT_VALUE,
            },
            projects: {
              amount: amountOfProjects,
              unit: PROJECT_UNIT_VALUE,
              price: amountOfProjects * PROJECT_UNIT_VALUE,
            },
            total:
              amountOfMembers * SEAT_UNIT_VALUE +
              amountOfProjects * PROJECT_UNIT_VALUE,
          },
        });
      }
    );
}
