import { XOctagon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface RevokeInviteButtonProps {
  revokeInviteAction(): Promise<void>;
}

export function RevokeInviteButton({
  revokeInviteAction,
}: RevokeInviteButtonProps) {
  return (
    <form action={revokeInviteAction}>
      <Button size="sm" variant="destructive">
        <XOctagon className="mr-2 size-4" />
        Revoke invite
      </Button>
    </form>
  );
}
