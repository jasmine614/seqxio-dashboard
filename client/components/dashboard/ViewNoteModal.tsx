
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, X, Trash2, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { CalendarNote } from "@shared/api";
import { CalendarNoteModal } from './CalendarNoteModal'; // To edit

interface ViewNoteModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  note: CalendarNote;
  onNoteUpdate: (note: CalendarNote) => void;
  onNoteDelete: (noteId: string) => void;
}

export function ViewNoteModal({ isOpen, onOpenChange, note, onNoteUpdate, onNoteDelete }: ViewNoteModalProps) {
  const { toast } = useToast();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/calendar/notes/${note.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      onNoteDelete(note.id);
      toast({ variant: "success", title: "Note deleted" });
      setShowDeleteConfirm(false);
      onOpenChange(false);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not delete note." });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
      onOpenChange(false); // Close view modal
      setEditModalOpen(true);
  }

  const formattedDate = new Date(note.date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="flex flex-col w-full sm:max-w-lg">
          <SheetHeader className="pr-10">
            <SheetTitle>{note.title}</SheetTitle>
            <SheetDescription>Note for {formattedDate}</SheetDescription>
             <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
             </Button>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4 space-y-4">
              <InfoItem label="Project" value={note.project} />
              <InfoItem label="Team" value={note.team} />
              <InfoItem label="Type" value={note.type} />
              <InfoItem label="Priority" value={note.priority} />
              <InfoItem label="Visibility" value={note.visibility} />
              {note.details && <InfoItem label="Details" value={note.details} />}
          </div>

          <SheetFooter className="border-t pt-4 flex justify-between items-center">
             <div>
                 <Button variant="ghost" size="icon" onClick={() => setShowDeleteConfirm(true)} disabled={isDeleting}>
                     <Trash2 className="h-4 w-4" />
                 </Button>
             </div>
             <div className="space-x-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                <Button onClick={handleEdit}><Edit className="mr-2 h-4 w-4" />Edit</Button>
              </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Delete this note?</AlertDialogTitle>
                <AlertDialogDescription>This action is permanent and cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...</> : "Delete"}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

       {isEditModalOpen && (
            <CalendarNoteModal
                isOpen={isEditModalOpen}
                onOpenChange={setEditModalOpen}
                date={new Date(note.date)}
                onNoteAdd={(updatedNote) => {
                    onNoteUpdate(updatedNote);
                    setEditModalOpen(false);
                }}
                existingNote={note} // Pass the existing note to the modal
            />
        )}
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    )
}
