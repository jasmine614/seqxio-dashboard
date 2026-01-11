import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface UploadMediaModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  projectId?: string;
}

export function UploadMediaModal({ isOpen, onOpenChange }: UploadMediaModalProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload Photos</SheetTitle>
          <SheetDescription>
            Add photos to the project.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>Upload functionality will be implemented here.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
