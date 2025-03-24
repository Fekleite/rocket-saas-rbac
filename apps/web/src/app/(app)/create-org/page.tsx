import { CreateOrgForm } from './create-org-form';

export default function CreateOrganization() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create organization</h1>

      <CreateOrgForm />
    </div>
  );
}
