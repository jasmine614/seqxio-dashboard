import { RequestHandler } from "express";
import { Project, Note } from "@shared/api";

let projects: Project[] = [
    { id: '1', name: 'Westside Bulk Pickup', status: 'At Risk', team: 'Crew B', time: '9:30 AM', day: 25, roads: ['Pine Ln', 'Maple Dr'] },
    { id: '2', name: 'Eastside Recycling', status: 'On Track', team: 'Crew A', time: '8:00 AM', day: 25, roads: ['Oak St'] },
    { id: '3', name: 'Downtown Sweeping', status: 'Completed', team: 'Crew C', time: '11:00 AM', day: 25, roads: [] },
    { id: '4', name: 'South Park Organics', status: 'Delayed', team: 'Crew D', time: '1:00 PM', day: 25, roads: ['Elm St', 'Birch Rd'] },
];

let notes: Note[] = [
    { id: '1', title: 'Overflow reported', type: 'General', day: 25, project: 'Westside Bulk Pickup', team: 'Crew B', time: '9:52 AM', visibility: 'Team', priority: 'Medium', details: 'An extra large pile of cardboard was left at the curb.' },
];

export const getProjects: RequestHandler = (req, res) => {
  res.json(projects);
};

export const getNotes: RequestHandler = (req, res) => {
  res.json(notes);
};

export const createNote: RequestHandler = (req, res) => {
  const newNote: Note = {
    id: (notes.length + 1).toString(),
    ...req.body,
  };
  notes.push(newNote);
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
