import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProjectItem = ({ project }) => (
  <div className="p-2 rounded-md border">
    <p className="font-semibold">{project.name}</p>
    <p className="text-sm text-muted-foreground">{project.team}</p>
    <Badge>{project.status}</Badge>
  </div>
);

const NoteItem = ({ note }) => (
  <div className="p-2 rounded-md border bg-blue-50">
    <p className="font-semibold">{note.title}</p>
    <p className="text-sm text-muted-foreground">{note.project}</p>
  </div>
);

export function WeekView({ currentDate, projects = [], notes = [] }) {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const days = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  const getEventsForDay = (day) => {
    const date = day.getDate();
    const month = day.getMonth(); // Note: getMonth() is 0-indexed
    // This is a simplified matching. You might need a more robust date matching logic.
    const dayProjects = projects.filter(p => {
        const projDate = new Date(p.startDate); // Assuming `startDate` property
        return projDate.getDate() === date && projDate.getMonth() === month;
    });
    const dayNotes = notes.filter(n => {
        const noteDate = new Date(n.date); // Assuming `date` property
        return noteDate.getDate() === date && noteDate.getMonth() === month;
    });
    return { dayProjects, dayNotes };
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mt-4">
      {days.map((day, i) => {
        const { dayProjects, dayNotes } = getEventsForDay(day);
        return (
          <div key={i} className="border rounded-lg p-2 bg-white">
            <h3 className="font-semibold text-center">{day.toLocaleDateString('en-US', { weekday: 'short' })}</h3>
            <p className="text-center text-sm text-muted-foreground mb-2">{day.getDate()}</p>
            <div className="space-y-2">
                {(dayProjects.length === 0 && dayNotes.length === 0) && <p className="text-xs text-center text-muted-foreground">No events</p>}
                {dayProjects.map(p => <ProjectItem key={p.id} project={p} />)}
                {dayNotes.map(n => <NoteItem key={n.id} note={n} />)}
            </div>
          </div>
        )
      })}
    </div>
  );
}
