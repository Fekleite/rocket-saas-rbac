import { getCookie } from 'cookies-next';
import ky from 'ky';
import { env } from '@rocket-saas/env';

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let token: string | undefined;

        if (typeof window !== 'undefined') {
          token = await getCookie('token');
        } else {
          const { cookies: nextCookies } = await import('next/headers');

          const cookies = await nextCookies();
          token = cookies.get('token')?.value;
        }

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});
