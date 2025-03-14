import { getCookie } from 'cookies-next';
import ky from 'ky';

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
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
