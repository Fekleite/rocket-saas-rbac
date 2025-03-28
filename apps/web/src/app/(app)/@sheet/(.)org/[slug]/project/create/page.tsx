import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content';

import { CreateProjectForm } from '@/app/(app)/org/[slug]/project/create/create-project-form';

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <CreateProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  );
}
