import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { CreateOrgForm } from '../../create-org/create-org-form';

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <CreateOrgForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
