
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, X, AlertTriangle, MessageSquare, Camera, UserPlus, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_STYLES: { [key: string]: string } = {
  "On Track": "bg-green-100 text-green-800 border-green-200",
  "At Risk": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Delayed: "bg-orange-100 text-orange-800 border-orange-200",
  "Off Track": "bg-red-100 text-red-800 border-red-200",
  Critical: "bg-red-100 text-red-800 border-red-200",
  Completed: "bg-gray-100 text-gray-800 border-gray-200",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
};

const formatStartTime = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${formattedDate} · ${formattedTime}`;
};

const DUMMY_PROJECT = {
    name: 'Westside Bulk Pickup',
    type: 'Bulk Pickup',
    zone: 'Zone B',
    status: 'At Risk',
    team: 'Crew B',
    startTime: '2023-11-25T09:30:00.000Z',
    expectedDuration: '2h 30m',
    priority: 'High',
    lastUpdated: '2 hours ago',
    address: '123 Main St, Charlotte, NC',
    roads: [{ id: 'road-3', name: 'Pine Ln' }, { id: 'road-4', name: 'Maple Dr' }, { id: 'road-5', name: 'Cedar Ct' }],
    issues: 2,
    hasIssues: true
};

const DUMMY_ACTIVITY = [
    { icon: AlertTriangle, text: 'Status updated to At Risk', time: '10:14 AM' },
    { icon: MessageSquare, text: 'Resident reported overflow near curb', time: '9:52 AM' },
    { icon: Camera, text: 'Photo uploaded (Issue)', time: '9:31 AM' },
    { icon: UserPlus, text: 'Crew B assigned', time: '8:58 AM' },
];

const DUMMY_NOTES = [
    { title: 'Resident reported overflow', type: 'General', team: 'Crew B', time: 'Nov 25 · 9:52 AM', preview: 'Resident on Pine Ln called to report a large pile of unbagged leaves near the curb.' },
    { title: 'Delayed start', type: 'Crew / Staffing', team: 'Crew B', time: 'Nov 25 · 8:30 AM', preview: 'Morning equipment check took longer than expected.' },
];

const DUMMY_PHOTOS = [
    { id: 'photo-1', url: 'https://api.builder.io/api/v1/image/assets/TEMP/e0939fde-6126-47a3-8588-144f8dc68c85', isIssue: true, badge: 'Issue' },
    { id: 'photo-2', url: 'https://api.builder.io/api/v1/image/assets/TEMP/e0939fde-6126-47a3-8588-144f8dc68c85', isIssue: false, badge: 'Before' },
    { id: 'photo-3', url: 'https://api.builder.io/api/v1/image/assets/TEMP/e0939fde-6126-47a3-8588-144f8dc68c85', isIssue: false, badge: 'After' },
    { id: 'photo-4', url: 'https://api.builder.io/api/v1/image/assets/TEMP/e0939fde-6126-47a3-8588-144f8dc68c85', isIssue: false, badge: null },
];

const DUMMY_ISSUES = [
    { title: 'Overflowing bin', source: 'Photo', road: 'Pine Ln', created: 'Nov 25 · 9:31 AM', status: 'Open' },
    { title: 'Unbagged leaves', source: 'Note', road: 'Pine Ln', created: 'Nov 25 · 9:52 AM', status: 'Open' },
];


export default function ProjectDetailSheet({ project, isOpen, onOpenChange }) {
  const displayProject = project || DUMMY_PROJECT;

  const handleActionClick = (action: string) => {
    toast(`${action} modal not implemented yet.`);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-4xl flex flex-col">
        <SheetHeader className="sticky top-0 bg-white z-10 pt-4 pr-12">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <SheetTitle className="text-2xl">{displayProject.name}</SheetTitle>
                    <SheetDescription className="text-base text-gray-500">
                        {displayProject.type} · {displayProject.zone}
                    </SheetDescription>
                </div>
                 <Badge variant="outline" className={cn("text-base", STATUS_STYLES[displayProject.status])}>
                    {displayProject.status}
                </Badge>
            </div>
             <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
            </SheetClose>
        </SheetHeader>
        
        <div className="sticky top-[calc(theme(spacing.16))] bg-white z-10 py-4 border-b">
            <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => handleActionClick("Reassign team")}>Reassign team</Button>
                <Button variant="secondary" onClick={() => handleActionClick("Add note")}>Add note</Button>
                <Button variant="secondary" onClick={() => handleActionClick("Add photos")}>Add photos</Button>
                {displayProject.status !== 'Completed' && (
                    <Button onClick={() => handleActionClick("Mark complete")}>Mark complete</Button>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleActionClick("Archive")}>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4 bg-gray-50">
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Project Snapshot</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <div>
                                <h4 className="font-medium text-sm text-gray-500">Assigned Team</h4>
                                {displayProject.team === 'Unassigned' ? (
                                    <div className="flex items-center gap-2 mt-1">
                                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                        <p className="text-yellow-600 font-medium">Unassigned</p>
                                        <p className="text-xs text-gray-500">Assign a team to begin work.</p>
                                    </div>
                                ) : <p className="mt-1">{displayProject.team}</p>}
                            </div>
                            <div>
                                <h4 className="font-medium text-sm text-gray-500">Start Time</h4>
                                <p className="mt-1">{formatStartTime(displayProject.startTime)}</p>
                            </div>
                             <div>
                                <h4 className="font-medium text-sm text-gray-500">Expected Duration</h4>
                                <p className="mt-1">{displayProject.expectedDuration || 'Not set'}</p>
                            </div>
                             <div>
                                <h4 className="font-medium text-sm text-gray-500">Priority</h4>
                                <p className="mt-1">{displayProject.priority}</p>
                            </div>
                             <div>
                                <h4 className="font-medium text-sm text-gray-500">Last Updated</h4>
                                <p className="mt-1">{displayProject.lastUpdated}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Location & Roads</CardTitle></CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-sm text-gray-500 mb-1">Address</h4>
                                <p>{displayProject.address}</p>
                                <Button variant="link" className="-ml-3" onClick={() => toast('Opening map...')}>View on map</Button>
                            </div>
                             <div>
                                <h4 className="font-medium text-sm text-gray-500 mb-2">Roads</h4>
                                {displayProject.roads.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {displayProject.roads.slice(0, 6).map(road => (
                                            <Badge key={road.id} variant="secondary" className="cursor-pointer hover:bg-gray-200">{road.name}</Badge>
                                        ))}
                                        {displayProject.roads.length > 6 && <Badge variant="outline">+{displayProject.roads.length - 6} more</Badge>}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No roads linked to this project yet. <Button variant="link" disabled>Add road</Button></p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader><CardTitle>Today's Activity</CardTitle></CardHeader>
                    <CardContent>
                       {DUMMY_ACTIVITY.length > 0 ? (
                            <ul className="space-y-4">
                                {DUMMY_ACTIVITY.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="bg-gray-100 rounded-full p-2">
                                            <item.icon className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <p>{item.text}</p>
                                        </div>
                                        <p className="text-sm text-gray-500 whitespace-nowrap">{item.time}</p>
                                    </li>
                                ))}
                            </ul>
                       ) : (
                           <p className="text-center text-gray-500 py-4">No activity recorded yet.</p>
                       )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
                    <CardContent>
                        {DUMMY_NOTES.length > 0 ? (
                            <div className="space-y-4">
                                {DUMMY_NOTES.map((note, index) => (
                                    <div key={index} className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium">{note.title}</p>
                                            <p className="text-sm text-gray-500">{note.type} · {note.team} · {note.time}</p>
                                            <p className="text-sm mt-1">{note.preview}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleActionClick('Edit note')}><Pencil className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleActionClick('Delete note')}><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-4">
                                <p>No notes added for this project yet.</p>
                                <Button variant="secondary" className="mt-2" onClick={() => handleActionClick('Add note')}>Add note</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Photos & Evidence</CardTitle></CardHeader>
                    <CardContent>
                         {DUMMY_PHOTOS.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {DUMMY_PHOTOS.map(photo => (
                                    <div key={photo.id} className="relative group cursor-pointer" onClick={() => handleActionClick('View photo')}>
                                        <img src={photo.url} alt="" className="rounded-lg object-cover aspect-square" />
                                        {photo.isIssue && <div className="absolute top-1 right-1 bg-red-500 rounded-full p-1">
                                            <AlertTriangle className="h-3 w-3 text-white" />
                                        </div>}
                                        {photo.badge && <Badge className="absolute bottom-2 left-2" variant={photo.isIssue ? "destructive" : "secondary"}>{photo.badge}</Badge>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <div className="text-center text-gray-500 py-4">
                                <p>No photos uploaded yet.</p>
                                <Button variant="secondary" className="mt-2" onClick={() => handleActionClick('Add photos')}>Add photos</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {displayProject.hasIssues && (
                    <Card>
                        <CardHeader><CardTitle>Issues</CardTitle></CardHeader>
                        <CardContent>
                            {DUMMY_ISSUES.length > 0 ? (
                                <div className="space-y-4">
                                    {DUMMY_ISSUES.map((issue, index) => (
                                        <div key={index} className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium">{issue.title}</p>
                                                <p className="text-sm text-gray-500">Source: {issue.source} · Road: {issue.road} · Created: {issue.created}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant={issue.status === 'Open' ? 'destructive' : 'outline'}>{issue.status}</Badge>
                                                {issue.status === 'Open' && <Button variant="secondary" size="sm" onClick={() => handleActionClick('Mark resolved')}>Mark resolved</Button>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-4">No open issues.</p>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
