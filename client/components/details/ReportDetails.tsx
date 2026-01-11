import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function ReportDetails({ id, open, onClose }: { id: string, open: boolean, onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Details</DialogTitle>
        </DialogHeader>
        <p>Showing details for report ID: {id}</p>
      </DialogContent>
    </Dialog>
  );
}
