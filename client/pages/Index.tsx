import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { AddProjectModal } from "@/components/dashboard/AddProjectModal";
import { Button } from "@/components/ui/button";
import { Project, Road } from "@shared/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, AlertTriangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ProjectsFilterBar } from "@/components/dashboard/ProjectsFilterBar";
import { RoadDetailsPanel } from "@/components/dashboard/RoadDetailsPanel";
import { UploadMediaModal } from "@/components/dashboard/UploadMediaModal";
import { CalendarNoteModal } from "@/components/dashboard/CalendarNoteModal";
import { ProjectListSkeleton } from "@/components/dashboard/ProjectListSkeleton";
import ProjectDetailSheet from "@/components/dashboard/ProjectDetailSheet";

const STATUS_STYLES: { [key: string]: string } = {
    "On Track": "bg-green-100 text-green-800 border-green-200",
    "At Risk": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Off Track": "bg-red-100 text-red-800 border-red-200",
    "Completed": "bg-blue-100 text-blue-800 border-blue-200",
    "On Hold": "bg-gray-100 text-gray-800 border-gray-200",
    "Not Started": "bg-gray-100 text-gray-800 border-gray-200",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    "Delayed": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Critical": "bg-red-100 text-red-800 border-red-200",
};

const DEMO_PROJECTS: Project[] = [
    { id: 'proj-001', name: 'Uptown Route Collection', type: 'Route Collection', zone: 'Zone A', status: 'On Track', team: 'Crew A', startTime: '2023-11-25T08:00:00.000Z', roads: [{ id: 'road-1', name: 'Main St' }, { id: 'road-2', name: 'Oak Ave' }], issues: 0 },
    { id: 'proj-002', name: 'Westside Bulk Pickup', type: 'Bulk Pickup', zone: 'Zone B', status: 'At Risk', team: 'Crew B', startTime: '2023-11-25T09:30:00.000Z', roads: [{ id: 'road-3', name: 'Pine Ln' }, { id: 'road-4', name: 'Maple Dr' }, { id: 'road-5', name: 'Cedar Ct' }], issues: 2 },
    { id: 'proj-003', name: 'South End Special Cleanup', type: 'Special Cleanup', zone: 'Zone C', status: 'Delayed', team: 'Crew C', startTime: '2023-11-24T11:00:00.000Z', roads: [{ id: 'road-6', name: 'Elm Rd' }], issues: 1 },
    { id: 'proj-004', name: 'Downtown Dumping Response', type: 'Illegal Dumping Response', zone: 'Zone A', status: 'Critical', team: 'Unassigned', startTime: '2023-11-25T13:00:00.000Z', roads: [], issues: 5 },
    { id: 'proj-005', name: 'Greenwood Park Maintenance', type: 'Route Collection', zone: 'Zone B', status: 'Completed', team: 'Crew A', startTime: '2023-11-23T07:00:00.000Z', roads: [{ id: 'road-7', name: 'Park Ave' }], issues: 0 },
    { id: 'proj-006', name: 'Airport Runway Sweep', type: 'Special Cleanup', zone: 'Zone C', status: 'In Progress', team: 'Crew B', startTime: '2023-11-26T05:00:00.000Z', roads: [{ id: 'road-8', name: 'Runway Dr' }], issues: 0 },
];

const formatStartTime = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${formattedDate} · ${formattedTime}`;
};

type UserRole = 'viewer' | 'dispatcher' | 'admin';

export default function Index() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoad, setSelectedRoad] = useState<Road | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState<'complete' | 'archive' | null>(null);
  const [userRole] = useState<UserRole>('admin'); // Mock user role

  // Filter state
  const [statusFilter, setStatusFilter] = useState(() => localStorage.getItem('projects_statusFilter') || 'all');
  const [zoneFilter, setZoneFilter] = useState(() => localStorage.getItem('projects_zoneFilter') || 'all');
  const [viewFilter, setViewFilter] = useState(() => localStorage.getItem('projects_viewFilter') || 'active');

  const fetchProjects = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => { // Simulate API call
        setAllProjects(DEMO_PROJECTS);
        setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => { localStorage.setItem('projects_statusFilter', statusFilter); }, [statusFilter]);
  useEffect(() => { localStorage.setItem('projects_zoneFilter', zoneFilter); }, [zoneFilter]);
  useEffect(() => { localStorage.setItem('projects_viewFilter', viewFilter); }, [viewFilter]);

  const handleProjectAdd = (newProject: Project) => {
    setAllProjects(prev => [newProject, ...prev]);
  };
  
  const handleRoadClick = (road: Road) => {
      setSelectedRoad(road);
      setIsDetailsPanelOpen(true);
  }
  
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsSheetOpen(true);
  }

  const handleActionClick = (project: Project, action: 'note' | 'upload' | 'complete' | 'archive') => {
    setSelectedProject(project);
    if (action === 'note') setNoteModalOpen(true);
    else if (action === 'upload') setUploadModalOpen(true);
    else setDialogOpen(action);
  }

  const handleClearFilters = () => {
      setStatusFilter('all');
      setZoneFilter('all');
      setViewFilter('active');
  }

  const handleMarkComplete = () => {
    if (!selectedProject) return;
    setAllProjects(allProjects.map(p => p.id === selectedProject.id ? { ...p, status: 'Completed' } : p));
    setDialogOpen(null);
  }

  const handleArchive = () => {
      if (!selectedProject) return;
      setAllProjects(allProjects.filter(p => p.id !== selectedProject.id));
      setDialogOpen(null);
  }

  const filteredProjects = useMemo(() => {
    return allProjects.filter(p => {
        const statusMatch = statusFilter === 'all' || p.status.toLowerCase().replace(' ', '-') === statusFilter;
        const zoneMatch = zoneFilter === 'all' || p.zone.toLowerCase().replace(' ', '-') === zoneFilter;
        const viewMatch = viewFilter === 'all' || (viewFilter === 'active' && p.status !== 'Completed');
        return statusMatch && zoneMatch && viewMatch;
    });
  }, [allProjects, statusFilter, zoneFilter, viewFilter]);

  const renderContent = () => {
    if (isLoading) return <ProjectListSkeleton />;

    if (error) {
      return (
        <div className="text-center py-12 px-6 bg-white rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-700">Unable to load projects</h3>
          <p className="text-red-600 my-2">Please try again.</p>
          <Button onClick={fetchProjects} variant="destructive" size="sm">Retry</Button>
        </div>
      );
    }

    if (allProjects.length === 0) {
        return (
             <div className="text-center py-20 px-6 bg-white rounded-lg border-2 border-dashed">
                <h3 className="text-xl font-semibold text-gray-800">No projects yet</h3>
                <p className="text-gray-500 my-2">Create your first project to begin tracking collection work.</p>
                {userRole !== 'viewer' && 
                    <Button onClick={() => setIsModalOpen(true)} className="mt-4 bg-gradient-primary text-white rounded-[15px] font-medium px-5 py-3 text-base">
                        + Add Project
                    </Button>}
            </div>
        );
    }

    if (filteredProjects.length === 0) {
        return (
             <div className="text-center py-20 px-6 bg-white rounded-lg border">
                <h3 className="text-lg font-semibold">No projects match your current filters.</h3>
                <Button variant="link" onClick={handleClearFilters}>Clear filters</Button>
            </div>
        );
    }

    return (
      <div className="bg-white rounded-lg border border-[#E0E0E0]">
        <Table>
            <TableHeader><TableRow>
                <TableHead className="pl-6">Project Name</TableHead>
                <TableHead>Status</TableHead><TableHead>Assigned Team</TableHead>
                <TableHead>Start Time</TableHead><TableHead>Roads</TableHead>
                <TableHead>Issues</TableHead>
                <TableHead className="w-[100px] text-right pr-6">Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
                {filteredProjects.map((project) => {
                const roadsToShow = project.roads.slice(0, 2);
                const remainingRoads = project.roads.length - roadsToShow.length;
                return (
                    <TableRow key={project.id} className="hover:bg-gray-50 group">
                    <TableCell className="pl-6 font-medium">
                        <button onClick={() => handleProjectClick(project)} className="text-black hover:underline font-medium text-left">
                            {project.name}
                        </button>
                        <p className="text-sm text-muted-foreground font-normal">{project.type} · {project.zone}</p>
                    </TableCell>
                    <TableCell><Badge variant="outline" className={cn("font-normal border-2", STATUS_STYLES[project.status])}>{project.status}</Badge></TableCell>
                    <TableCell>{project.team === 'Unassigned' ? <span className="text-yellow-600 font-medium">Unassigned</span> : project.team}</TableCell>
                    <TableCell>{formatStartTime(project.startTime)}</TableCell>
                    <TableCell><div className="flex flex-wrap items-center gap-1">
                        {roadsToShow.map(road => (
                            <Badge key={road.id} variant="secondary" className="font-normal cursor-pointer hover:bg-gray-200" onClick={() => handleRoadClick(road)}>{road.name}</Badge>
                        ))}
                        {remainingRoads > 0 && (
                            <Tooltip><TooltipTrigger><Badge variant="outline" className="font-normal cursor-default">+{remainingRoads} more</Badge></TooltipTrigger>
                            <TooltipContent>{project.roads.slice(2).map(r => <p key={r.id}>{r.name}</p>)}</TooltipContent></Tooltip>
                        )}
                    </div></TableCell>
                    <TableCell>{project.issues > 0 && (
                        <Tooltip><TooltipTrigger className="flex items-center gap-1.5 text-red-600"><AlertTriangle className="h-4 w-4" /><span className="font-medium">{project.issues}</span></TooltipTrigger>
                        <TooltipContent><p>{project.issues} open issues linked to this project</p></TooltipContent></Tooltip>
                    )}</TableCell>
                    <TableCell className="text-right pr-6"><div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {userRole !== 'viewer' && <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Open menu</span><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onSelect={() => handleProjectClick(project)}>View details</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert('Reassign team drawer not implemented yet.')}>Reassign team</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleActionClick(project, 'note')}>Add note</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleActionClick(project, 'upload')}>Add photos</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {(project.status === 'In Progress' || project.status === 'Delayed') && <DropdownMenuItem onClick={() => handleActionClick(project, 'complete')}>Mark complete</DropdownMenuItem>}
                                <DropdownMenuItem className="text-red-600" onClick={() => handleActionClick(project, 'archive')}>Archive</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>}
                    </div></TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex gap-4 min-h-screen bg-white p-4">
        <div className="hidden lg:block"><Sidebar /></div>
        <main className="flex-1 flex flex-col gap-4 overflow-hidden">
          <TopBar />
          <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-[40px] font-medium text-black tracking-tighter">Projects</h1>
                <p className="text-xl text-gray-500 tracking-tight">Here you can manage all active and completed projects.</p>
              </div>
              {userRole !== 'viewer' && <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-primary text-white rounded-[15px] font-medium px-5 py-3 text-base">+ Add Project</Button>}
            </div>
            
            <ProjectsFilterBar status={statusFilter} onStatusChange={setStatusFilter} zone={zoneFilter} onZoneChange={setZoneFilter} view={viewFilter} onViewChange={setViewFilter} />
            {renderContent()}
          </div>
        </main>
        
        <AddProjectModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} onProjectAdd={handleProjectAdd} />
        <RoadDetailsPanel road={selectedRoad} isOpen={isDetailsPanelOpen} onOpenChange={setIsDetailsPanelOpen} />
        <ProjectDetailSheet project={selectedProject} isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
        <CalendarNoteModal isOpen={isNoteModalOpen} onOpenChange={setNoteModalOpen} date={new Date()} />
        <UploadMediaModal isOpen={isUploadModalOpen} onOpenChange={setUploadModalOpen} projectId={selectedProject?.id} />

        <AlertDialog open={dialogOpen !== null} onOpenChange={() => setDialogOpen(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogOpen === 'complete' ? 'Mark project as complete?' : 'Archive project?'}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogOpen === 'complete' ? 'This project will be marked as completed and removed from active views.' : 'Archived projects are hidden from active views but can be restored later.'}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {dialogOpen === 'complete' ? 
                        <AlertDialogAction onClick={handleMarkComplete}>Mark Complete</AlertDialogAction> : 
                        <AlertDialogAction onClick={handleArchive} className="bg-red-600 hover:bg-red-700">Archive</AlertDialogAction>}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}
