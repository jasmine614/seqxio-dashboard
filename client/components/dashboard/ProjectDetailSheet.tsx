
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { MoreVertical, X, AlertTriangle, Eye, MapPin as MapPinIcon, MessageSquare, Camera, UserPlus, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Project, MapPin } from '@shared/api';

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
    if(!dateString) return 'Not set';
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${formattedDate} · ${formattedTime}`;
};

export default function ProjectDetailSheet({ project, isOpen, onOpenChange }: { project: Project & {issues?: {count: number}}, isOpen: boolean, onOpenChange: (isOpen: boolean) => void}) {
  const navigate = useNavigate();
  const [pins, setPins] = useState<MapPin[]>([]);

  useEffect(() => {
    if (isOpen && project) {
      fetch('/api/map/pins')
        .then(res => res.json())
        .then((allPins: MapPin[]) => {
          const projectPins = allPins.filter(pin => pin.linkedProjectId === project.id);
          setPins(projectPins);
        })
        .catch(console.error);
    }
  }, [isOpen, project]);

  const handleViewOnMap = (pin: MapPin) => {
    onOpenChange(false); // Close the sheet
    navigate(`/map?pin=${pin.id}&lat=${pin.lat}&lng=${pin.lng}&zoom=18`);
  };

  const handleAddPin = () => {
    onOpenChange(false); // Close the sheet
    navigate(`/map?newPin=true&projectId=${project.id}`);
  };

  const handleActionClick = (action: string) => {
    toast(`${action} modal not implemented yet.`);
  };

  if (!isOpen || !project) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-4xl flex flex-col">
        <SheetHeader className="sticky top-0 bg-white z-10 pt-4 pr-12">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <SheetTitle className="text-2xl">{project.name}</SheetTitle>
                    <SheetDescription className="text-base text-gray-500">
                        {project.type} · {project.zone}
                    </SheetDescription>
                </div>
                 <Badge variant="outline" className={cn("text-base", STATUS_STYLES[project.status])}>
                    {project.status}
                </Badge>
            </div>
             <SheetClose asChild>
                <Button variant="ghost" size="icon" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <X className="h-6 w-6" />
                </Button>
             </SheetClose>
        </SheetHeader>
        
        <div className="sticky top-[calc(theme(spacing.16))] bg-white z-10 py-4 border-b">
            <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => handleActionClick("Reassign team")}>Reassign team</Button>
                <Button variant="secondary" onClick={handleAddPin}>Add Pin</Button>
                {project.status !== 'Completed' && (
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
                                {project.assignedTeam === 'unassigned' ? (
                                    <div className="flex items-center gap-2 mt-1">
                                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                        <p className="text-yellow-600 font-medium">Unassigned</p>
                                        <p className="text-xs text-gray-500">Assign a team to begin work.</p>
                                    </div>
                                ) : <p className="mt-1">{project.assignedTeam}</p>}
                            </div>
                            <div>
                                <h4 className="font-medium text-sm text-gray-500">Start Time</h4>
                                <p className="mt-1">{formatStartTime(project.startDate)}</p>
                            </div>
                             <div>
                                <h4 className="font-medium text-sm text-gray-500">Priority</h4>
                                <p className="mt-1">{project.priority}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className='flex items-center'><MapPinIcon className="mr-2 h-5 w-5"/>Linked Pins</CardTitle>
                    <Button variant='secondary' size='sm' onClick={handleAddPin}>+ Add Pin</Button>
                  </CardHeader>
                  <CardContent>
                    {pins.length > 0 ? (
                      <ul className="space-y-3">
                        {pins.map(pin => (
                          <li key={pin.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                            <div>
                                <p className="font-semibold">{pin.title}</p>
                                <p className="text-sm text-gray-500 capitalize">{pin.type} - {pin.priority}</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => handleViewOnMap(pin)}><Eye className="mr-2 h-4 w-4"/>View on map</Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <p>No pins are linked to this project yet.</p>
                        <Button variant="secondary" className="mt-2" onClick={handleAddPin}>Add Pin</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {project.issues && project.issues.count > 0 && (
                    <Card>
                        <CardHeader><CardTitle>Issues</CardTitle></CardHeader>
                        <CardContent>
                           <p>Issues section not implemented yet.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
