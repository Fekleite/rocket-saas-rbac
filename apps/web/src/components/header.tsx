import Image from 'next/image';

import logoIcon from '@/assets/rocketseat-logo.svg';

import { ProfileButton } from './profile-button';

export function Header() {
  return (
    <header className="py-4">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={logoIcon} className="h-6" alt="Rocketseat" />
        </div>

        <div className="flex items-center gap-4">
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
