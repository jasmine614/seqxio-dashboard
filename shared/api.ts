
export interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "On Track" | "At Risk" | "Off Track";
  assignee: string;
  description: string;
}

export type CreateProjectRequest = Omit<Project, "id" | "status">;

export interface DemoResponse {
  message: string;
}

export interface MapPin {
  id: string;
  title: string;
  type: "Overflow" | "Missed pickup" | "Illegal dumping" | "Blocked access" | "Equipment issue" | "Safety hazard" | "General note";
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In progress" | "Resolved";
  lat: number;
  lng: number;
  linkedProjectId?: string;
  linkedRoadId?: string;
  linkedTeamId?: string;
  notes?: string;
  photoUrls?: string[];
  createdAt: string; // Using string for ISO 8601 date format
  updatedAt: string;
}

export type CreateMapPinRequest = Omit<MapPin, "id" | "createdAt" | "updatedAt">;

export interface ServiceArea {
  id: string;
  name: string;
  areaType: "Serviced" | "Needs service" | "Restricted";
  zone: string;
  status: "Active" | "Archived";
  geometry: any; // Using 'any' for GeoJSON structure for simplicity
  linkedProjectId?: string;
  assignedTeamId?: string;
  notes?: string;
  createdAt: string; // Using string for ISO 8601 date format
  updatedAt: string;
}

export type CreateServiceAreaRequest = Omit<ServiceArea, "id" | "createdAt" | "updatedAt">;

export interface Road {
  id: string;
  name: string;
  type: "Residential" | "Commercial" | "Highway" | "Mixed";
  status: "Critical" | "Attention" | "On Track";
  priority: "Low" | "Normal" | "High";
  coverage: "Full" | "Partial" | "None";
  zone?: string;
  geometry?: any;
}

export type CreateRoadRequest = Omit<Road, "id">;
