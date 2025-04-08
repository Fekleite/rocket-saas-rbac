'use client';

import { Role } from '@rocket-saas/auth';
import { ComponentProps } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UpdateMemberRoleSelectProps extends ComponentProps<typeof Select> {
  memberId: string;
  updateMemberRole(role: Role): Promise<void>;
}

export function UpdateMemberRoleSelect({
  memberId,
  updateMemberRole,
  ...props
}: UpdateMemberRoleSelectProps) {
  return (
    <Select onValueChange={updateMemberRole} {...props}>
      <SelectTrigger className="h-8 w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ADMIN">Admin</SelectItem>
        <SelectItem value="MEMBER">Member</SelectItem>
        <SelectItem value="BILLING">Billing</SelectItem>
      </SelectContent>
    </Select>
  );
}
