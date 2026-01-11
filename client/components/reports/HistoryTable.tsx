import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical, FileText, File } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ReportDetailsDrawer } from "./ReportDetailsDrawer";

const reports = [
  {
    title: "Weekly Operations Summary · Nov 18–Nov 25",
    type: "Weekly Operations Summary",
    dateRange: "Nov 18, 2023 - Nov 25, 2023",
    createdBy: "Admin",
    createdAt: "2023-11-25T14:30:00Z",
    filters: {
        zone: "All zones",
        team: "All teams",
        status: "All",
        projectType: "All",
    },
    sections: [
        "Executive Summary",
        "KPIs",
        "Collection Trend",
        "Projects Needing Attention",
        "Issues Breakdown",
        "Team Performance",
        "Hotspot Roads",
    ]
  },
    {
    title: "Monthly Performance Summary · Oct 2023",
    type: "Monthly Performance Summary",
    dateRange: "Oct 1, 2023 - Oct 31, 2023",
    createdBy: "Admin",
    createdAt: "2023-11-01T10:00:00Z",
    filters: {
        zone: "Zone 3",
        team: "All teams",
        status: "Completed",
        projectType: "All",
    },
    sections: [
        "Executive Summary",
        "KPIs",
        "Collection Trend",
        "Team Performance",
    ]
  },
  {
    title: "Issues & Incidents Summary · Nov 2023",
    type: "Issues & Incidents Summary",
    dateRange: "Nov 1, 2023 - Nov 30, 2023",
    createdBy: "Dispatcher",
    createdAt: "2023-12-01T11:00:00Z",
    filters: {
        zone: "All zones",
        team: "Crew B",
        status: "All",
        projectType: "All",
    },
    sections: [
        "Issues Breakdown",
        "Hotspot Roads",
    ]
  },
];

export function HistoryTable() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleViewSummary = (report) => {
    setSelectedReport(report);
    setIsDrawerOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Report Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date Range</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Exports</TableHead>
            <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {reports.map((report) => (
            <TableRow key={report.title}>
                <TableCell className="font-medium">{report.title}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.dateRange}</TableCell>
                <TableCell>{report.createdBy}</TableCell>
                <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="flex gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground cursor-pointer" />
                    <File className="h-5 w-5 text-muted-foreground cursor-pointer" />
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreVertical className="h-5 w-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleViewSummary(report)}>View summary</DropdownMenuItem>
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
                            <DropdownMenuItem>Download CSV</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
        <ReportDetailsDrawer 
            isOpen={isDrawerOpen} 
            onOpenChange={setIsDrawerOpen} 
            report={selectedReport} 
        />
    </div>
  );
}
