import { RequestHandler } from "express";
import { CreateProjectRequest, Project } from "@shared/api";

// This is a mock database. In a real application, you would use a real database.
const projects: Project[] = [];

export const createProject: RequestHandler = (req, res) => {
  const { body } = req;
  const newProject: Project = {
    id: Date.now().toString(),
    status: "Not Started",
    ...(body as CreateProjectRequest),
  };
  projects.push(newProject);
  res.status(201).json(newProject);
};

export const getProjects: RequestHandler = (req, res) => {
  res.json(projects);
};

export const getProject: RequestHandler = (req, res) => {
  const { id } = req.params;
  const project = projects.find((p) => p.id === id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
};
