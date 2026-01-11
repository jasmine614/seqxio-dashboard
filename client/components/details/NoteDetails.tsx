import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function NoteDetails({ id, open, onClose }: { id: string, open: boolean, onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Note Details</DialogTitle>
        </DialogHeader>
        <p>Showing details for note ID: {id}</p>
      </DialogContent>
    </Dialog>
  );
}
