import { useDetailsView } from "@/lib/DetailsViewProvider";
import { ProjectDetails } from "./ProjectDetails";
import { NoteDetails } from "./NoteDetails";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function DetailsPanel() {
  const { view, id, close } = useDetailsView();

  return (
    <Sheet open={!!view} onOpenChange={close}>
      <SheetContent className="w-full max-w-lg flex flex-col">
        <SheetHeader className="pr-12">
          <SheetTitle className="text-xl">Details</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4 bg-gray-50 space-y-4">
          {view === 'project' && <ProjectDetails id={id} />}
          {view === 'note' && <NoteDetails id={id} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
