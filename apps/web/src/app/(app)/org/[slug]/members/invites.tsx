import { ability, getCurrentOrg } from '@/auth/auth';

import { RevokeInviteButton } from '@/components/revoke-invite-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import { getInvites } from '@/http/invites/get-invites';

import { revokeInviteAction } from './actions';
import { CreateInviteForm } from './create-invite-form';

export async function Invites() {
  const currentOrg = await getCurrentOrg();
  const permissions = await ability();

  const invites = await getInvites({ org: currentOrg! });

  return (
    <div className="space-y-4">
      {permissions?.can('create', 'Invite') && (
        <Card>
          <CardHeader>
            <CardTitle>Invite member</CardTitle>
          </CardHeader>

          <CardContent>
            <CreateInviteForm />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Invites</h2>

        <div className="rounded border">
          <Table>
            <TableBody>
              {invites.map((invite) => {
                return (
                  <TableRow key={invite.id}>
                    <TableCell className="py-2.5">
                      <span className="text-muted-foreground">
                        {invite.email}
                      </span>
                    </TableCell>

                    <TableCell className="py-2.5 font-medium">
                      {invite.role}
                    </TableCell>

                    <TableCell className="py-2.5">
                      <div className="flex justify-end">
                        {permissions?.can('delete', 'Invite') && (
                          <RevokeInviteButton
                            revokeInviteAction={revokeInviteAction.bind(
                              null,
                              invite.id
                            )}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

              {invites.length === 0 && (
                <TableRow>
                  <TableCell className="text-muted-foreground text-center">
                    No invites found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
