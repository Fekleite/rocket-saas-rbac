import { Header } from '@/components/header';

export default async function Organization({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;

  return (
    <div>
      <Header />

      <main className="mx-auto max-w-[1280px] px-4">Project {project}</main>
    </div>
  );
}
