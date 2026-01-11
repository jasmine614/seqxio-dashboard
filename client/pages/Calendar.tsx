import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { DateNavigator } from "@/components/calendar/DateNavigator";
import { CalendarFilters } from "@/components/calendar/CalendarFilters";
import { MonthView } from "@/components/calendar/MonthView";
import { WeekView } from "@/components/calendar/WeekView";
import { DayView } from "@/components/calendar/DayView";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Pencil, Trash2 } from 'lucide-react';
import { Project, Note, CreateNoteRequest } from '@shared/api';

const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch('/api/calendar/projects');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const fetchNotes = async (): Promise<Note[]> => {
  const res = await fetch('/api/calendar/notes');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const createNote = async (newNote: CreateNoteRequest): Promise<Note> => {
    const res = await fetch('/api/calendar/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const updateNote = async (updatedNote: Note): Promise<Note> => {
    const res = await fetch(`/api/calendar/notes/${updatedNote.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const deleteNote = async (noteId: string): Promise<void> => {
    const res = await fetch(`/api/calendar/notes/${noteId}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
};

const generateDaysInMonth = (projects: Project[] = [], notes: Note[] = []) => {
    const days = Array.from({ length: 31 }, (_, i) => ({ day: i + 1, projects: [], notes: [] }));
    projects.forEach(p => {
      if (p.day > 0 && p.day <= 31) {
        days[p.day - 1].projects.push(p);
      }
    });
    notes.forEach(n => {
      if (n.day > 0 && n.day <= 31) {
        days[n.day - 1].notes.push(n);
      }
    });
    return days;
}

const getFullDate = (day) => {
    const date = new Date(2023, 10, day);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function Calendar() {
  const queryClient = useQueryClient();
  const [view, setView] = useState('month');
  const [contentType, setContentType] = useState('both');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDayPanelOpen, setIsDayPanelOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isAddNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [isEditNoteModalOpen, setEditNoteModalOpen] = useState(false);
  const [isDeleteNoteAlertOpen, setDeleteNoteAlertOpen] = useState(false);
  const [noteData, setNoteData] = useState<Partial<CreateNoteRequest>>({});
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  
  const { data: projects = [] } = useQuery('projects', fetchProjects);
  const { data: notes = [] } = useQuery('notes', fetchNotes);

  const createNoteMutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
      setAddNoteModalOpen(false);
    },
  });

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
      setEditNoteModalOpen(false);
    },
  });

  const deleteNoteMutation = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
      setDeleteNoteAlertOpen(false);
    },
  });

  const daysInMonth = generateDaysInMonth(projects, notes);

  const handleDayClick = (day) => {
      setSelectedDay(day);
      setIsDayPanelOpen(true);
  }

  const handleAddNoteClick = (project: Project | null = null) => {
      setNoteData({
          date: selectedDay ? getFullDate(selectedDay.day) : new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
          project: project ? project.name : '',
          team: project ? project.team : ''
      });
      setAddNoteModalOpen(true);
  }
  
  const handleEditNoteClick = (note: Note) => {
      setSelectedNote(note);
      setEditNoteModalOpen(true);
  }

  const handleDeleteNoteClick = (note: Note) => {
      setSelectedNote(note);
      setDeleteNoteAlertOpen(true);
  }
  
  const handleSaveNote = (e) => {
      e.preventDefault();
      createNoteMutation.mutate(noteData as CreateNoteRequest);
  }
  
  const handleUpdateNote = (e) => {
      e.preventDefault();
      if(selectedNote) {
          updateNoteMutation.mutate(selectedNote);
      }
  }

  const handleDeleteNote = () => {
      if(selectedNote) {
        deleteNoteMutation.mutate(selectedNote.id);
      }
  }
  
  const handlePrev = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    } else if (view === 'week') {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
    }
  }

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    } else if (view === 'week') {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
    }
  }

  return (
    <div className="flex gap-4 min-h-screen bg-white p-4">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg">
          <CalendarHeader view={view} onViewChange={setView} onAddNote={handleAddNoteClick} />
          <DateNavigator currentDate={currentDate} onPrev={handlePrev} onNext={handleNext} />
          <CalendarFilters contentType={contentType} onContentTypeChange={setContentType} />
          
          {view === 'month' && <MonthView daysInMonth={daysInMonth} onDayClick={handleDayClick} />}
          {view === 'week' && <WeekView currentDate={currentDate} projects={projects} notes={notes} />}
          {view === 'day' && <DayView currentDate={currentDate} projects={projects} notes={notes} />}
        </div>
        
        <Sheet open={isDayPanelOpen} onOpenChange={setIsDayPanelOpen}>
            <SheetContent className="w-full max-w-lg flex flex-col">
                {selectedDay && (
                  <>
                    <SheetHeader className="pr-12">
                        <SheetTitle className="text-xl">{getFullDate(selectedDay.day)}</SheetTitle>
                         <SheetClose asChild>
                            <Button variant="ghost" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"><X className="h-6 w-6" /></Button>
                        </SheetClose>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4 bg-gray-50 space-y-4">
                        <Card>
                             <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Scheduled Projects</CardTitle><Button size="sm" onClick={() => handleAddNoteClick()}>Add Note</Button></CardHeader>
                            <CardContent>
                                {selectedDay.projects.length > 0 ? (
                                    <div className="space-y-4">
                                        {selectedDay.projects.map(p => (
                                            <div key={p.id} className="p-4 rounded-lg border bg-white">
                                                <div className="flex justify-between">
                                                    <p className="font-semibold">{p.name}</p>
                                                    <Badge>{p.status}</Badge>
                                                </div>
                                                <p className="text-sm text-gray-500">{p.team} · {p.time}</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {p.roads.map(r => <Badge key={r} variant="secondary">{r}</Badge>)}
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    <Button variant="outline" size="sm">View details</Button>
                                                    <Button variant="outline" size="sm" onClick={() => handleAddNoteClick(p)}>Add note</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 py-4">No projects scheduled for this day.</p>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
                            <CardContent>
                                {selectedDay.notes.length > 0 ? (
                                    <div className="space-y-4">
                                        {selectedDay.notes.map(n => (
                                            <div key={n.id} className="p-4 rounded-lg border bg-white">
                                                <p className="font-semibold">{n.title}</p>
                                                <p className="text-sm text-gray-500">{n.type} · {n.project} · {n.team}</p>
                                                 <div className="flex items-center gap-2 mt-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEditNoteClick(n)}><Pencil className="h-4 w-4" /></Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteNoteClick(n)}><Trash2 className="h-4 w-4" /></Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 py-4">No notes for this day.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                    </>
                )}
            </SheetContent>
        </Sheet>

        <Dialog open={isAddNoteModalOpen} onOpenChange={setAddNoteModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSaveNote}>
                    <DialogHeader>
                        <DialogTitle>Add Note</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input id="title" value={noteData.title || ''} onChange={e => setNoteData({...noteData, title: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">Type</Label>
                             <Select onValueChange={value => setNoteData({...noteData, type: value as any})}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="General">General</SelectItem>
                                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                                    <SelectItem value="Safety">Safety</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">Date</Label>
                            <Input id="date" value={noteData.date} readOnly className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project" className="text-right">Linked Project</Label>
                            <Input id="project" value={noteData.project} onChange={e => setNoteData({...noteData, project: e.target.value})} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="team" className="text-right">Team</Label>
                            <Input id="team" value={noteData.team} onChange={e => setNoteData({...noteData, team: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="details" className="text-right">Details</Label>
                            <Textarea id="details" value={noteData.details || ''} onChange={e => setNoteData({...noteData, details: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="visibility" className="text-right">Visibility</Label>
                             <Select onValueChange={value => setNoteData({...noteData, visibility: value as any})}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select visibility" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Team">Team</SelectItem>
                                    <SelectItem value="Everyone">Everyone</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="priority" className="text-right">Priority</Label>
                             <Select onValueChange={value => setNoteData({...noteData, priority: value as any})}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="flex items-center space-x-2 mt-2 justify-end">
                            <Switch id="notify-team" checked={noteData.notifyTeam} onCheckedChange={checked => setNoteData({...noteData, notifyTeam: checked})} />
                            <Label htmlFor="notify-team">Notify team</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setAddNoteModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        {selectedNote && (
        <>
            <Dialog open={isEditNoteModalOpen} onOpenChange={setEditNoteModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                     <form onSubmit={handleUpdateNote}>
                        <DialogHeader>
                            <DialogTitle>Edit Note</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title-edit" className="text-right">Title</Label>
                                <Input id="title-edit" value={selectedNote.title} onChange={e => setSelectedNote({...selectedNote, title: e.target.value})} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type-edit" className="text-right">Type</Label>
                                 <Select value={selectedNote.type} onValueChange={value => setSelectedNote({...selectedNote, type: value as any})}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="General">General</SelectItem>
                                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                                        <SelectItem value="Safety">Safety</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date-edit" className="text-right">Date</Label>
                                <Input id="date-edit" value={getFullDate(selectedNote.day)} readOnly className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="project-edit" className="text-right">Linked Project</Label>
                                <Input id="project-edit" value={selectedNote.project} onChange={e => setSelectedNote({...selectedNote, project: e.target.value})} className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="team-edit" className="text-right">Team</Label>
                                <Input id="team-edit" value={selectedNote.team} onChange={e => setSelectedNote({...selectedNote, team: e.target.value})} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="details-edit" className="text-right">Details</Label>
                                <Textarea id="details-edit" value={selectedNote.details} onChange={e => setSelectedNote({...selectedNote, details: e.target.value})} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="visibility-edit" className="text-right">Visibility</Label>
                                 <Select value={selectedNote.visibility} onValueChange={value => setSelectedNote({...selectedNote, visibility: value as any})}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Team">Team</SelectItem>
                                        <SelectItem value="Everyone">Everyone</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="priority-edit" className="text-right">Priority</Label>
                                 <Select value={selectedNote.priority} onValueChange={value => setSelectedNote({...selectedNote, priority: value as any})}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="flex items-center space-x-2 mt-2 justify-end">
                                <Switch id="notify-team-edit" checked={selectedNote.notifyTeam} onCheckedChange={checked => setSelectedNote({...selectedNote, notifyTeam: checked})} />
                                <Label htmlFor="notify-team-edit">Notify team</Label>
                            </div>
                        </div>
                        <DialogFooter>
                             <Button type="button" variant="outline" onClick={() => setEditNoteModalOpen(false)}>Cancel</Button>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteNoteAlertOpen} onOpenChange={setDeleteNoteAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this note?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the note.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteNote}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
        )}

      </main>
    </div>
  );
}
