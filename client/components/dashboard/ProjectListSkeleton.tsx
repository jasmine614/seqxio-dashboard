
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProjectListSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-[#E0E0E0]">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="pl-6">Project Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Team</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Roads</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead className="w-[100px] text-right pr-6">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 6 }).map((_, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 group">
                        <TableCell className="pl-6">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-4 w-32 mt-2" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-6 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-20" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-32" />
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-6 w-16" />
                            </div>
                        </TableCell>
                        <TableCell>
                             <Skeleton className="h-5 w-10" />
                        </TableCell>
                        <TableCell className="text-right pr-6">
                            <Skeleton className="h-8 w-8 ml-auto" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}
