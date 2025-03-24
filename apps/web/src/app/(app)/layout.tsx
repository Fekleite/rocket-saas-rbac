import { redirect } from 'next/navigation';

import { isAuthenticated } from '@/auth/auth';

import { Header } from '@/components/header';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    redirect('/auth/sign-in');
  }

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-[1280px] px-4">{children}</main>
    </div>
  );
}
