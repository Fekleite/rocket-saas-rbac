import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content';

import { CreateOrgForm } from '../../create-org/create-org-form';

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <CreateOrgForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  );
}
