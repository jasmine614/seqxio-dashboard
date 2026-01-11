import { useQuery } from 'react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fetchProject = async (id) => {
    const res = await fetch(`/api/projects/${id}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
}

export function ProjectDetails({ id }) {
    const { data: project, isLoading } = useQuery(['project', id], () => fetchProject(id));

    if (isLoading) return <div>Loading...</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <Badge>{project.status}</Badge>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-500">{project.team} · {project.time}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {project.roads.map(r => <Badge key={r} variant="secondary">{r}</Badge>)}
                </div>
                <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">View details</Button>
                    <Button variant="outline" size="sm">Add note</Button>
                </div>
            </CardContent>
        </Card>
    );
}
