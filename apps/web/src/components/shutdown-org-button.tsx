import { XCircle } from 'lucide-react';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { getCurrentOrg } from '@/auth/auth';
import { shutdownOrganization } from '@/http/organizations/shutdown-organization';

export function ShutdownOrganizationButton() {
  async function shutdownOrganizationAction() {
    'use server';

    const currentOrg = await getCurrentOrg();

    await shutdownOrganization({ org: currentOrg! });

    redirect('/');
  }

  return (
    <form action={shutdownOrganizationAction}>
      <Button type="submit" variant="destructive" className="w-56">
        <XCircle className="mr-2 size-4" />
        Shutdown organization
      </Button>
    </form>
  );
}
