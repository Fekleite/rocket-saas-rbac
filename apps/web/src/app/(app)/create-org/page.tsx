import { Header } from '@/components/header';

import { OrganizationForm } from '../org/(form)/organization-form';

export default function CreateOrganization() {
  return (
    <div className="space-y-4">
      <Header />

      <main className="mx-auto max-w-[1280px] space-y-4 px-4">
        <h1 className="text-2xl font-bold">Create organization</h1>

        <OrganizationForm />
      </main>
    </div>
  );
}
