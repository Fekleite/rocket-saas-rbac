import { api } from '../api-client';

interface RevokeInviteParams {
  org: string;
  inviteId: string;
}

export async function revokeInvite({ org, inviteId }: RevokeInviteParams) {
  await api.delete(`organizations/${org}/invites/${inviteId}`);
}
