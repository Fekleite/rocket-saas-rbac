import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';
import { fastify } from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { createAccount } from './routes/auth/create-account';
import { authenticateWithPassword } from './routes/auth/authenticate-with-password';
import { getProfile } from './routes/auth/get-profile';
import { requestPasswordRecover } from './routes/auth/request-password-recover';
import { resetPassword } from './routes/auth/reset-password';
import { authenticateWithGithub } from './routes/auth/authenticate-with-github';

import { errorHandler } from './error-handler';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(errorHandler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Rocket SaaS RBAC',
      description: 'full-stack SaaS app with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.register(fastifyCors);
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
});

app.register(createAccount);
app.register(authenticateWithPassword);
app.register(getProfile);
app.register(requestPasswordRecover);
app.register(resetPassword);
app.register(authenticateWithGithub);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!');
});
