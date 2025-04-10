import { api } from '../api-client';

interface GetInviteParams {
  inviteId: string;
}

export async function acceptInvite({ inviteId }: GetInviteParams) {
  await api.post(`invites/${inviteId}/accept`);
}
