
import { RequestHandler } from "express";
import { Project, CalendarNote, CreateCalendarNoteRequest } from "@shared/api";

// Mock data
let projects: Project[] = [
    { id: '1', name: 'Westside Bulk Pickup', status: 'At Risk', team: 'Crew B', time: '9:30 AM', day: 25, roads: ['Pine Ln', 'Maple Dr'] },
    { id: '2', name: 'Eastside Recycling', status: 'On Track', team: 'Crew A', time: '8:00 AM', day: 25, roads: ['Oak St'] },
    { id: '3', name: 'Downtown Sweeping', status: 'Completed', team: 'Crew C', time: '11:00 AM', day: 25, roads: [] },
    { id: '4', name: 'South Park Organics', status: 'Delayed', team: 'Crew D', time: '1:00 PM', day: 25, roads: ['Elm St', 'Birch Rd'] },
];

// RESTORED MOCK DATA: Please note that this data has been restored from memory and may not be completely accurate.
let notes: CalendarNote[] = [
    { id: 'note-1', day: 25, title: 'Team meeting', description: 'Discuss project status' },
    { id: 'note-2', day: 25, title: 'Equipment maintenance', description: 'Check all vehicles' },
];

// --- Route Handlers ---

export const getProjects: RequestHandler = (req, res) => {
  res.json(projects);
};

export const getNotes: RequestHandler = (req, res) => {
  res.json(notes);
};

export const createNote: RequestHandler = (req, res) => {
  const { body }: { body: CreateCalendarNoteRequest } = req;
  
  const newNote: CalendarNote = {
    id: `note-${Date.now()}`,
    ...body,
  };
  
  notes.unshift(newNote); // Add to the beginning of the array
  res.status(201).json(newNote);
};

export const updateNote: RequestHandler = (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex(n => n.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], ...req.body };
    res.json(notes[index]);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
};

export const deleteNote: RequestHandler = (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex(n => n.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
};

export const getNote: RequestHandler = (req, res) => {
    const { id } = req.params;
    const note = notes.find(n => n.id === id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: "Note not found" });
    }
};
