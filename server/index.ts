
import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { createProject, getProjects, getProject } from "./routes/project";
import { getRoads, createRoad } from "./routes/roads";
import { getProjects as getCalendarProjects, getNotes, createNote, updateNote, deleteNote, getNote } from "./routes/calendar";


const getCalendarNotes = getNotes;


export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Project routes
  app.post("/api/projects", createProject);
  app.get("/api/projects", getProjects);
  app.get("/api/projects/:id", getProject);

  // Roads routes
  app.get("/api/roads", getRoads);
  app.post("/api/roads", createRoad);
  
  // Calendar routes
  app.get("/api/calendar/projects", getCalendarProjects);
  app.get("/api/calendar-notes", getCalendarNotes);
  app.post("/api/calendar-notes", createNote);
  app.put("/api/calendar-notes/:id", updateNote);
  app.delete("/api/calendar/notes/:id", deleteNote);
  app.get("/api/notes/:id", getNote);

  return app;
}
