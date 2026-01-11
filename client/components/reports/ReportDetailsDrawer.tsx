import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Report {
    title: string;
    type: string;
    dateRange: string;
    createdBy: string;
    createdAt: string;
    filters: {
        zone: string;
        team: string;
        status: string;
        projectType: string;
    };
    sections: string[];
}


interface ReportDetailsDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  report: Report | null;
}

export function ReportDetailsDrawer({ isOpen, onOpenChange, report }: ReportDetailsDrawerProps) {
  if (!report) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Report Details</SheetTitle>
          <SheetDescription>{report.title}</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-6">
            <div>
                <h4 className="font-medium mb-2">Report Metadata</h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                    <p><strong>Type:</strong> {report.type}</p>
                    <p><strong>Date Range:</strong> {report.dateRange}</p>
                    <p><strong>Created By:</strong> {report.createdBy}</p>
                    <p><strong>Created At:</strong> {new Date(report.createdAt).toLocaleString()}</p>
                </div>
            </div>
             <div>
                <h4 className="font-medium mb-2">Filters Used</h4>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Zone: {report.filters.zone}</Badge>
                    <Badge variant="secondary">Team: {report.filters.team}</Badge>
                    <Badge variant="secondary">Status: {report.filters.status}</Badge>
                    <Badge variant="secondary">Project Type: {report.filters.projectType}</Badge>
                </div>
            </div>
             <div>
                <h4 className="font-medium mb-2">Included Sections</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {report.sections.map(section => <li key={section}>{section}</li>)}
                </ul>
            </div>
        </div>
        <SheetFooter className="mt-6">
            <div className="flex flex-col gap-2 w-full">
                <Button>Download PDF</Button>
                <Button variant="secondary">Download CSV</Button>
                <Button variant="outline">Duplicate Report</Button>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
