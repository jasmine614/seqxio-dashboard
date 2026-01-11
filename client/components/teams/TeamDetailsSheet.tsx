import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TeamSnapshotCard } from './TeamSnapshotCard';
import { LiveLocationCard } from './LiveLocationCard';
import { TodaysAssignmentsCard } from './TodaysAssignmentsCard';
import { TeamActivityCard } from './TeamActivityCard';
import { TeamNotesCard } from './TeamNotesCard';
import { TeamIssuesCard } from './TeamIssuesCard';

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case 'On Duty':
      return 'success';
    case 'Off Duty':
      return 'secondary';
    case 'Needs Attention':
      return 'destructive';
    default:
      return 'default';
  }
};

export const TeamDetailsSheet = ({ open, onOpenChange, team }) => {
    if (!team) return null;

    const isAdmin = true; // Assume admin for now

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:w-[480px] p-0 flex flex-col">
                {/* Sticky Header */}
                <SheetHeader className="p-6 border-b sticky top-0 bg-background z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <SheetTitle className="text-2xl font-medium">{team.name}</SheetTitle>
                            <p className="text-muted-foreground">
                                {team.zone} · {team.memberCount} members
                            </p>
                        </div>
                        <SheetClose />
                    </div>
                    <div className="mt-2">
                         <Badge variant={getStatusBadgeVariant(team.status)}>{team.status}</Badge>
                    </div>
                </SheetHeader>

                {/* Sticky Action Bar */}
                <div className="p-4 border-b sticky top-[120px] bg-background z-10">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <Button variant="secondary">Assign project</Button>
                            <Button variant="secondary">Add note</Button>
                            <Button variant="secondary">View on map</Button>
                        </div>
                        {isAdmin && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit team</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Deactivate team</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                    <TeamSnapshotCard team={team} />
                    <LiveLocationCard team={team} />
                    <TodaysAssignmentsCard team={team} />
                    <TeamActivityCard />
                    <TeamNotesCard />
                    <TeamIssuesCard team={team} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
