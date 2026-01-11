import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function RoadDetails({ id, open, onClose }: { id: string, open: boolean, onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Road Details</DialogTitle>
        </DialogHeader>
        <p>Showing details for road ID: {id}</p>
      </DialogContent>
    </Dialog>
  );
}
