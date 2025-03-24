import { Header } from '@/components/header';

import { CreateOrgForm } from './create-org-form';

export default function CreateOrganization() {
  return (
    <div className="space-y-4">
      <Header />

      <main className="mx-auto max-w-[1280px] px-4">
        <h1 className="text-2xl font-bold">Create organization</h1>

        <CreateOrgForm />
      </main>
    </div>
  );
}
