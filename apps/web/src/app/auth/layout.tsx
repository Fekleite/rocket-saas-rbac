import { redirect } from 'next/navigation';

import { isAuthenticated } from '@/auth/auth';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await isAuthenticated();

  if (isAuth) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  );
}
