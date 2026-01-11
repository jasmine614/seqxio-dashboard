import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProjectItem = ({ project }) => (
  <div className="p-4 rounded-lg border bg-white">
      <div className="flex justify-between">
          <p className="font-semibold">{project.name}</p>
          <Badge>{project.status}</Badge>
      </div>
      <p className="text-sm text-gray-500">{project.team} · {project.time}</p>
  </div>
);

const NoteItem = ({ note }) => (
  <div className="p-4 rounded-lg border bg-white">
      <p className="font-semibold">{note.title}</p>
      <p className="text-sm text-gray-500">{note.type} · {note.project} · {note.team}</p>
  </div>
);

export function DayView({ currentDate, projects = [], notes = [] }) {
    const dayProjects = projects.filter(p => {
        const projDate = new Date(p.startDate);
        return projDate.getDate() === currentDate.getDate() && projDate.getMonth() === currentDate.getMonth();
    });
    const dayNotes = notes.filter(n => {
        const noteDate = new Date(n.date);
        return noteDate.getDate() === currentDate.getDate() && noteDate.getMonth() === currentDate.getMonth();
    });

  return (
    <div className="mt-4 space-y-4">
        <h2 className="text-2xl font-bold">{currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
        <Card>
            <CardHeader><CardTitle>Projects</CardTitle></CardHeader>
            <CardContent className="space-y-2">
                {dayProjects.length > 0 ? (
                    dayProjects.map(p => <ProjectItem key={p.id} project={p} />)
                ) : (
                    <p className="text-center text-gray-500 py-4">No projects scheduled for this day.</p>
                )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
            <CardContent className="space-y-2">
                 {dayNotes.length > 0 ? (
                    dayNotes.map(n => <NoteItem key={n.id} note={n} />)
                ) : (
                    <p className="text-center text-gray-500 py-4">No notes for this day.</p>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
