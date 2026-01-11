import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Road } from "@shared/api";

interface RoadDetailsPanelProps {
  road: Road | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const statusConfig: { [key in Road["status"]]: { label: string; color: string; explanation: string } } = {
  "On Track": { label: "On Track", color: "bg-green-500", explanation: "No active issues reported." },
  "Attention": { label: "Attention", color: "bg-yellow-500", explanation: "Minor delays or notes reported today." },
  "Critical": { label: "Critical", color: "bg-red-500", explanation: "Active issues require immediate attention." },
};

export function RoadDetailsPanel({ road, isOpen, onOpenChange }: RoadDetailsPanelProps) {
  if (!road) return null;

  const status = statusConfig[road.status];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-6">
          <div className="flex justify-between items-start">
            <div>
                <SheetTitle className="text-2xl font-bold">{road.name}</SheetTitle>
                <SheetDescription className="text-md text-muted-foreground">{road.zone}</SheetDescription>
            </div>
            <Badge className={`${status.color} text-white`}>{status.label}</Badge>
          </div>
        </SheetHeader>
        
        <div className="space-y-8">
            {/* Status Summary */}
            <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <div className="text-sm">
                    <p><span className={`font-semibold ${status.color.replace('bg', 'text')}`}>{status.label}:</span> {status.explanation}</p>
                    <p className="text-xs text-muted-foreground mt-1">Updated 12 minutes ago</p>
                </div>
            </div>

            <Separator />

            {/* Today's Activity */}
            <div>
                <h4 className="font-semibold mb-2">Today’s Activity</h4>
                <div className="text-sm text-muted-foreground">
                    No active projects on this road today.
                </div>
            </div>

            <Separator />

            {/* Recent Photos */}
            <div>
                 <h4 className="font-semibold mb-2">Recent Photos</h4>
                 <div className="text-sm text-muted-foreground">
                    No photos added for this road yet.
                 </div>
                 <Button variant="outline" size="sm" className="mt-2">Add Photo</Button>
            </div>

            <Separator />

            {/* Notes & Alerts */}
            <div>
                 <h4 className="font-semibold mb-2">Notes & Alerts</h4>
                 <div className="text-sm text-muted-foreground">
                    No notes or alerts for this road.
                 </div>
                 <Button variant="outline" size="sm" className="mt-2">Add Note</Button>
            </div>
        </div>

        <SheetFooter className="mt-8">
            <Button variant="outline">Assign to Project</Button>
            {road.status !== 'On Track' && <Button variant="destructive">Mark Issue Resolved</Button>}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
