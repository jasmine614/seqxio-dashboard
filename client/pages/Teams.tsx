import { useState } from 'react';
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { MoreVertical, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { TeamDetailsSheet } from '@/components/teams/TeamDetailsSheet';

// Mock Data reflecting the detailed requirements
const mockTeams = [
  {
    id: 'crew-a',
    name: 'Crew A',
    zone: 'North',
    memberCount: 4,
    status: 'On Duty',
    assignment: {
      name: 'Westside Bulk Pickup',
      startTime: '8:00 AM',
    },
    location: {
      lastPing: '4 min ago',
      stale: false,
    },
    issues: 2,
  },
  {
    id: 'crew-b',
    name: 'Crew B',
    zone: 'South',
    memberCount: 5,
    status: 'Off Duty',
    assignment: null,
    location: {
      lastPing: '2 hours ago',
      stale: false,
    },
    issues: 0,
  },
  {
    id: 'crew-c',
    name: 'Crew C',
    zone: 'East',
    memberCount: 3,
    status: 'Needs Attention',
    assignment: {
      name: 'Downtown Cleanup',
      startTime: '9:30 AM',
    },
    location: {
      lastPing: '45 min ago',
      stale: true,
    },
    issues: 1,
  },
];

// Helper to determine badge color based on status
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

export default function TeamsPage() {
    const [zone, setZone] = useState('all');
    const [status, setStatus] = useState('all');
    const [search, setSearch] = useState('');
    const [liveOnly, setLiveOnly] = useState(false);
    const [isTeamSheetOpen, setIsTeamSheetOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const handleTeamClick = (team) => {
        setSelectedTeam(team);
        setIsTeamSheetOpen(true);
    };

    return (
        <div className="flex gap-4 min-h-screen bg-white p-4">
            <div className="hidden lg:block">
                <Sidebar />
            </div>
            <main className="flex-1 flex flex-col gap-4 overflow-hidden">
                <TopBar />
                <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-[40px] font-medium text-black tracking-tight">Teams</h1>
                            <p className="text-xl text-[#7B9182] font-light tracking-tight">
                                Track crews, assignments, and operational status.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <div className="flex items-center space-x-2">
                                <Switch id="live-only" checked={liveOnly} onCheckedChange={setLiveOnly} />
                                <Label htmlFor="live-only">Live only</Label>
                            </div>
                            <Button>Add team</Button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-2 mb-4">
                        <Select value={zone} onValueChange={setZone}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="All zones" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All zones</SelectItem>
                                <SelectItem value="north">North</SelectItem>
                                <SelectItem value="south">South</SelectItem>
                                <SelectItem value="east">East</SelectItem>
                                <SelectItem value="west">West</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="on-duty">On Duty</SelectItem>
                                <SelectItem value="off-duty">Off Duty</SelectItem>
                                <SelectItem value="needs-attention">Needs Attention</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            placeholder="Search teams or members…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1"
                        />
                    </div>

                    {/* Teams List Table */}
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Team</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Current Assignment</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Issues</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockTeams.map((team) => (
                                        <TableRow key={team.id}>
                                            <TableCell className="font-medium">
                                                <button onClick={() => handleTeamClick(team)} className="text-left hover:underline">
                                                    <div>{team.name}</div>
                                                    <div className="text-sm text-muted-foreground">{team.zone} · {team.memberCount} members</div>
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusBadgeVariant(team.status)}>{team.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {team.assignment ? (
                                                    <div>
                                                        <button className="hover:underline">{team.assignment.name}</button>
                                                        <div className="text-sm text-muted-foreground">{team.assignment.startTime}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">No active assignment</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    {team.location.stale && <AlertCircle className="h-4 w-4 text-amber-500" />}
                                                    <span>{team.location.stale ? 'Stale location' : `Last ping: ${team.location.lastPing}`}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {team.issues > 0 && (
                                                    <div className="flex items-center gap-1 font-medium text-destructive">
                                                        <AlertCircle className="h-4 w-4" />
                                                        <span>{team.issues}</span>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View team details</DropdownMenuItem>
                                                        <DropdownMenuItem>Assign project</DropdownMenuItem>
                                                        <DropdownMenuItem>Add note</DropdownMenuItem>
                                                        <DropdownMenuItem>{team.status === 'On Duty' ? 'Mark Off Duty' : 'Mark On Duty'}</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <TeamDetailsSheet open={isTeamSheetOpen} onOpenChange={setIsTeamSheetOpen} team={selectedTeam} />
                </div>
            </main>
        </div>
    );
}
