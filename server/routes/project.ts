
import { RequestHandler } from "express";
import { CreateProjectRequest, Project } from "@shared/api";

// This is a mock database. In a real application, you would use a real database.
const projects: Project[] = [
    { id: '1', name: 'Westside Bulk Pickup', status: 'At Risk', team: 'Crew B', time: '9:30 AM', day: 25, roads: ['Pine Ln', 'Maple Dr'] },
    { id: '2', name: 'Eastside Recycling', status: 'On Track', team: 'Crew A', time: '8:00 AM', day: 25, roads: ['Oak St'] },
    { id: '3', name: 'Downtown Sweeping', status: 'Completed', team: 'Crew C', time: '11:00 AM', day: 25, roads: [] },
    { id: '4', name: 'South Park Organics', status: 'Delayed', team: 'Crew D', time: '1:00 PM', day: 25, roads: ['Elm St', 'Birch Rd'] },
];

export const createProject: RequestHandler = (req, res) => {
  const { body } = req;
  const newProject: Project = {
    id: Date.now().toString(),
    status: "On Track",
    ...(body as CreateProjectRequest),
  };
  projects.push(newProject);
  res.status(201).json(newProject);
};

export const getProjects: RequestHandler = (req, res) => {
  res.json(projects);
};

export const getProjectById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const project = projects.find((p) => p.id === id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
};
