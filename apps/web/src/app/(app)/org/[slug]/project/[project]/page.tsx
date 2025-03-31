export default async function Organization({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;

  return (
    <div className="space-y-4">
      <h1>Project {project}</h1>
    </div>
  );
}
