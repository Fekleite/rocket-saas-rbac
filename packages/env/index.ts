import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    API_PORT: z.coerce.number().default(3333),

    DATABASE_URL: z.string().url(),

    JWT_SECRET: z.string(),

    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GITHUB_REDIRECT_URI: z.string().url(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: z.string().url(),

    NEXT_PUBLIC_GITHUB_SIGN_IN_ORIGIN: z.string().url(),
    NEXT_PUBLIC_GITHUB_SIGN_IN_PATHNAME: z.string(),
  },
  runtimeEnv: {
    API_PORT: process.env.PORT,

    DATABASE_URL: process.env.DATABASE_URL,

    JWT_SECRET: process.env.JWT_SECRET,

    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_REDIRECT_URI: process.env.GITHUB_REDIRECT_URI,

    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

    NEXT_PUBLIC_GITHUB_SIGN_IN_ORIGIN:
      process.env.NEXT_PUBLIC_GITHUB_SIGN_IN_ORIGIN,
    NEXT_PUBLIC_GITHUB_SIGN_IN_PATHNAME:
      process.env.NEXT_PUBLIC_GITHUB_SIGN_IN_PATHNAME,
  },
  emptyStringAsUndefined: true,
});
