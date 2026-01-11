import { useDetailsView } from "@/lib/DetailsViewProvider";
import { ProjectDetails } from "./ProjectDetails";
import { NoteDetails } from "./NoteDetails";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function DetailsPanel() {
  const { view, id, close } = useDetailsView();

  return (
    <Sheet open={!!view} onOpenChange={close}>
      <SheetContent className="w-full max-w-lg flex flex-col">
        <SheetHeader className="pr-12">
          <SheetTitle className="text-xl">Details</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <X className="h-6 w-6" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4 bg-gray-50 space-y-4">
          {view === 'project' && <ProjectDetails id={id} />}
          {view === 'note' && <NoteDetails id={id} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
