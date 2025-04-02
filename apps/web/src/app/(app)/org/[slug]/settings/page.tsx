import { ability, getCurrentOrg } from '@/auth/auth';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShutdownOrganizationButton } from '@/components/shutdown-org-button';

import { OrganizationForm } from '../../(form)/organization-form';
import { getOrganization } from '@/http/organizations/get-organization';

export default async function Settings() {
  const permissions = await ability();
  const currentOrg = await getCurrentOrg();

  const canUpdateOrganization = permissions?.can('update', 'Organization');
  const canGetBilling = permissions?.can('get', 'Billing');
  const canShutdownOrganization = permissions?.can('delete', 'Organization');

  const organization = await getOrganization({ org: currentOrg! });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Organization settings</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationForm
                isUpdating
                initialData={{
                  name: organization.name,
                  domain: organization.domain,
                  shouldAttachUsersByDomain:
                    organization.shouldAttachUsersByDomain,
                }}
              />
            </CardContent>
          </Card>
        )}

        {canGetBilling && (
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Your billing details</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        )}

        {canShutdownOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Shutdown organization</CardTitle>
              <CardDescription>
                This will delete all organization data including all projects.
                You cannot undo this action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShutdownOrganizationButton />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
