import { ChevronsUpDown, PlusCircle } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { getOrganizations } from '@/http/organizations/get-organizations';
import { getCurrentOrg } from '@/auth/auth';

export async function OrganizationSwitcher() {
  const organizations = await getOrganizations();

  const currentOrgSlug = await getCurrentOrg();
  const currentOrganization = organizations.find(
    (org) => org.slug === currentOrgSlug
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {currentOrganization ? (
          <>
            <Avatar className="size-4 shrink-0">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}

              <AvatarFallback />
            </Avatar>

            <span className="truncate text-left">
              {currentOrganization.name}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Select organization</span>
        )}

        <ChevronsUpDown className="text-muted-foreground ml-auto size-4 shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>

          {organizations.map((org) => {
            return (
              <DropdownMenuItem key={org.id} asChild>
                <Link href={`/org/${org.slug}`}>
                  <Avatar className="size-4">
                    {org.avatarUrl && <AvatarImage src={org.avatarUrl} />}
                    <AvatarFallback />
                  </Avatar>

                  <span className="line-clamp-1">{org.name}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/create-org">
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
