import Image from 'next/image';
import { Slash } from 'lucide-react';

import logoIcon from '@/assets/rocketseat-logo.svg';

import { ability } from '@/auth/auth';

import { ProfileButton } from './profile-button';
import { OrganizationSwitcher } from './organization-switcher';

export async function Header() {
  const permissions = await ability();

  return (
    <header className="py-4">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image src={logoIcon} className="h-6" alt="Rocketseat" />

          <Slash className="text-border size-3 -rotate-[24deg]" />

          <OrganizationSwitcher />

          {permissions?.can('get', 'Project') && 'Projetos'}
        </div>

        <div className="flex items-center gap-4">
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
