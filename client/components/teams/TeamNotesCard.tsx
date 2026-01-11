import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from 'lucide-react';

const mockNotes = [
    {
        id: 'note-1',
        title: 'Route change due to construction',
        type: 'Info',
        project: 'Westside Bulk Pickup',
        timestamp: '2023-12-05T08:44:00Z',
        preview: 'Detour via 5th street to avoid the closure on Main.'
    },
    {
        id: 'note-2',
        title: 'Equipment malfunction',
        type: 'Maintenance',
        project: 'No project',
        timestamp: '2023-12-04T14:20:00Z',
        preview: 'Reported issue with the hydraulic lift on Truck #3.'
    }
];

export const TeamNotesCard = () => {
    const notes = mockNotes;

    return (
        <Card>
            <CardHeader className="flex-row justify-between items-center">
                <CardTitle>Notes</CardTitle>
                <Button variant="outline" size="sm">Add note</Button>
            </CardHeader>
            <CardContent>
                 {notes.length > 0 ? (
                    <div className="space-y-4">
                        {notes.map(note => (
                             <div key={note.id} className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="font-medium">{note.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {note.type} &middot; {note.project} &middot; {new Date(note.timestamp).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm mt-1">{note.preview}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                                    <MoreHorizontal size={18} />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-6">No notes for this team yet.</p>
                )}
            </CardContent>
        </Card>
    );
}
