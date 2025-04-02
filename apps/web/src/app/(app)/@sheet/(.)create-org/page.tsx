import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content';

import { OrganizationForm } from '../../org/(form)/organization-form';

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  );
}
