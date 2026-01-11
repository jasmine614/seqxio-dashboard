
export interface DemoResponse {
  message: string;
}

export interface Road {
  id: string;
  name: string;
  zone: string;
  type: string;
  priority: 'Low' | 'Normal' | 'High';
  status: 'On Track' | 'Attention' | 'Critical';
  lastActivity: string;
  issues?: any[]; 
  coverage?: any;
}

export type CreateRoadRequest = Omit<Road, 'id' | 'status' | 'lastActivity'>;

export interface CalendarNote {
  id: string;
  date: string; // ISO date string
  project: string;
  team: string;
  title: string;
  type: string;
  details: string;
  visibility: string;
  priority: 'Normal' | 'Important';
  notifyTeam: boolean;
}

export type CreateCalendarNoteRequest = Omit<CalendarNote, 'id'>;
