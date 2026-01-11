import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function ProjectDetails({ id, open, onClose }: { id: string, open: boolean, onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
        </DialogHeader>
        <p>Showing details for project ID: {id}</p>
      </DialogContent>
    </Dialog>
  );
}
