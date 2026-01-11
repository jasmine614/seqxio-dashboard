import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function TeamDetails({ id, open, onClose }: { id: string, open: boolean, onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team Details</DialogTitle>
        </DialogHeader>
        <p>Showing details for team ID: {id}</p>
      </DialogContent>
    </Dialog>
  );
}
