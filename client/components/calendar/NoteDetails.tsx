import { useQuery } from 'react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fetchNote = async (id) => {
    const res = await fetch(`/api/notes/${id}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
}

export function NoteDetails({ id }) {
    const { data: note, isLoading } = useQuery(['note', id], () => fetchNote(id));

    if (isLoading) return <div>Loading...</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-500">{note.type} · {note.project} · {note.team}</p>
                <p>{note.details}</p>
            </CardContent>
        </Card>
    );
}
