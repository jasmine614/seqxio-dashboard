/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export interface Project {
  id: string;
  name: string;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Critical' | 'In Progress' | 'Completed';
  team: string;
  time: string;
  day: number;
  roads: string[];
}

export type CreateProjectRequest = Omit<Project, 'id' | 'status'>;

export interface Note {
  id: string;
  title: string;
  type: 'General' | 'Maintenance' | 'Safety';
  date: string; // ISO string
  project: string; // Project ID
  team: string; // Team ID
  details: string;
  visibility: 'Team' | 'Everyone';
  priority: 'Low' | 'Medium' | 'High';
  notifyTeam: boolean;
}

export type CreateNoteRequest = Omit<Note, 'id'>;
