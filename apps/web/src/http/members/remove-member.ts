import { api } from '@/http/api-client';

interface RemoveMemberParams {
  org: string;
  memberId: string;
}

export async function removeMember({ org, memberId }: RemoveMemberParams) {
  await api.delete(`organizations/${org}/members/${memberId}`);
}
