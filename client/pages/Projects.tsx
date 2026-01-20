
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { AddProjectModal } from "@/components/dashboard/AddProjectModal";
import { Button } from "@/components/ui/button";
import { Project } from "@shared/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, TriangleAlert } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ProjectDetailSheet from "@/components/dashboard/ProjectDetailSheet";

const mockProjects: (Project & { issues?: { count: number } })[] = [
    {
        id: "1",
        name: "Uptown Route Collection",
        type: "Route Collection",
        zone: "Zone A",
        status: "On Track",
        assignedTeam: "Crew A",
        startDate: "2023-11-25T03:00:00.000Z",
        startTime: "3:00 AM",
        assignedRoads: ["Main St", "Oak Ave"],
        issues: undefined,
        priority: 'Normal',
        reqPhoto: true,
        allowNotes: true,
    },
    {
        id: "2",
        name: "Westside Bulk Pickup",
        type: "Bulk Pickup",
        zone: "Zone B",
        status: "At Risk",
        assignedTeam: "Crew B",
        startDate: "2023-11-25T04:30:00.000Z",
        startTime: "4:30 AM",
        assignedRoads: ["Pine Ln", "Maple Dr", "Cedar Ct"],
        issues: { count: 2 },
        priority: 'High',
        reqPhoto: true,
        allowNotes: true,
    },
    {
        id: "3",
        name: "South End Special Cleanup",
        type: "Special Cleanup",
        zone: "Zone C",
        status: "Delayed",
        assignedTeam: "Crew C",
        startDate: "2023-11-24T06:00:00.000Z",
        startTime: "6:00 AM",
        assignedRoads: ["Elm Rd"],
        issues: { count: 1 },
        priority: 'Normal',
        reqPhoto: false,
        allowNotes: true,
    },
    {
        id: "4",
        name: "Downtown Dumping Response",
        type: "Illegal Dumping Response",
        zone: "Zone A",
        status: "Critical",
        assignedTeam: "unassigned",
        startDate: "2023-11-25T08:00:00.000Z",
        startTime: "8:00 AM",
        assignedRoads: [],
        issues: { count: 5 },
        priority: 'Critical',
        reqPhoto: true,
        allowNotes: true,
    },
    {
        id: "5",
        name: "Airport Runway Sweep",
        type: "Special Cleanup",
        zone: "Zone C",
        status: "In Progress",
        assignedTeam: "Crew B",
        startDate: "2023-11-26T00:00:00.000Z",
        startTime: "12:00 AM",
        assignedRoads: ["Runway Dr"],
        issues: undefined,
        priority: 'High',
        reqPhoto: false,
        allowNotes: true,
    }
];

const statusStyles: { [key: string]: string } = {
  "On Track": "bg-green-100 text-green-800 border-green-200",
  "At Risk": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Delayed": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Critical": "bg-red-100 text-red-800 border-red-200",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
};

export default function Projects() {
  const [projects, setProjects] = useState<(Project & { issues?: { count: number } })[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    setProjects(mockProjects);
  }, []);

  const handleProjectAdd = (newProject: Project) => {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
  };

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
  };

  const formatStartTime = (date: string, time: string) => {
    const datePart = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    // The time is already formatted, so we can just use it directly.
    return `${datePart} · ${time}`;
  }

  return (
    <div className="flex gap-4 min-h-screen bg-white p-4">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        <TopBar onAddProject={() => setIsModalOpen(true)} />
        <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-[40px] font-medium text-black tracking-tighter">Projects</h1>
              <p className="text-xl text-gray-500 tracking-tight">Here you can manage all active and completed projects.</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-primary text-white rounded-[15px] font-medium px-5 py-3 text-base">
              + Add Project
            </Button>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
                <div>
                    <label className="text-sm font-medium" htmlFor="status-filter">Status</label>
                    <Select>
                        <SelectTrigger className="w-[180px] bg-white mt-1" id="status-filter">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="on-track">On Track</SelectItem>
                            <SelectItem value="at-risk">At Risk</SelectItem>
                            <SelectItem value="delayed">Delayed</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-sm font-medium" htmlFor="zone-filter">Zone</label>
                    <Select>
                        <SelectTrigger className="w-[180px] bg-white mt-1" id="zone-filter">
                            <SelectValue placeholder="All zones" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All zones</SelectItem>
                            <SelectItem value="zone-a">Zone A</SelectItem>
                            <SelectItem value="zone-b">Zone B</SelectItem>
                            <SelectItem value="zone-c">Zone C</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <ToggleGroup type="single" defaultValue="active" className="bg-muted p-1 rounded-md text-muted-foreground">
                    <ToggleGroupItem value="active" aria-label="Active" className="data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm px-3 py-1.5 text-sm font-medium">Active</ToggleGroupItem>
                    <ToggleGroupItem value="all" aria-label="All" className="data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm px-3 py-1.5 text-sm font-medium">All</ToggleGroupItem>
                </ToggleGroup>
            </div>
        </div>

          <div className="bg-white rounded-lg border border-[#E0E0E0]">
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-0">
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
                  {projects.map((project) => (
                    <TableRow key={project.id} className="hover:bg-gray-50 group border-t">
                      <TableCell className="p-4 align-middle pl-6 font-medium">
                        <button className="text-black hover:underline font-medium text-left" onClick={() => handleViewProject(project)}>{project.name}</button>
                        <p className="text-sm text-muted-foreground font-normal">{project.type} · {project.zone}</p>
                      </TableCell>
                      <TableCell className="p-4 align-middle">
                        <Badge className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-normal border-2 ${statusStyles[project.status] || ''}`}>{project.status}</Badge>
                      </TableCell>
                      <TableCell className="p-4 align-middle">{project.assignedTeam === 'unassigned' ? <span className="text-yellow-600 font-medium">Unassigned</span> : project.assignedTeam}</TableCell>
                      <TableCell className="p-4 align-middle">{formatStartTime(project.startDate, project.startTime)}</TableCell>
                      <TableCell className="p-4 align-middle">
                        <div className="flex flex-wrap items-center gap-1">
                          {project.assignedRoads?.slice(0, 2).map(road => <Badge key={road} variant="secondary" className="font-normal cursor-pointer hover:bg-gray-200">{road}</Badge>)}
                          {project.assignedRoads && project.assignedRoads.length > 2 && <Badge variant={'outline'} className="text-foreground font-normal cursor-default">+{project.assignedRoads.length - 2} more</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="p-4 align-middle">
                        {project.issues && project.issues.count > 0 && (
                            <button className="flex items-center gap-1.5 text-red-600">
                                <TriangleAlert className="h-4 w-4" />
                                <span className="font-medium">{project.issues.count}</span>
                            </button>
                        )}
                      </TableCell>
                      <TableCell className="p-4 align-middle text-right pr-6">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <EllipsisVertical className="h-4 w-4" />
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleViewProject(project)}>View Project</DropdownMenuItem>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
      <AddProjectModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} onProjectAdd={handleProjectAdd} />
      {selectedProject && (
        <ProjectDetailSheet project={selectedProject} isOpen={!!selectedProject} onOpenChange={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
