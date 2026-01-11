import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockAssignments = [
    {
        id: 'proj-123',
        name: 'Westside Bulk Pickup',
        status: 'In Progress',
        startTime: '8:00 AM',
        issues: 1
    },
    {
        id: 'proj-456',
        name: 'Downtown Cleanup',
        status: 'Not Started',
        startTime: '1:00 PM',
        issues: 0
    }
];

const getStatusVariant = (status) => {
    if (status === 'In Progress') return 'default';
    if (status === 'Completed') return 'success';
    return 'secondary';
}

export const TodaysAssignmentsCard = ({ team }) => {
    const assignments = team.assignment ? mockAssignments : [];

    return (
        <Card>
            <CardHeader className="flex-row justify-between items-center">
                <CardTitle>Today's Assignments</CardTitle>
                <Button variant="outline" size="sm">Assign project</Button>
            </CardHeader>
            <CardContent>
                {assignments.length > 0 ? (
                    <div className="space-y-4">
                        {assignments.map(proj => (
                            <div key={proj.id} className="flex justify-between items-center">
                                <div>
                                    <button className="font-medium hover:underline">{proj.name}</button>
                                    <p className="text-sm text-muted-foreground">Started at {proj.startTime}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    {proj.issues > 0 && <span className="text-destructive text-sm font-medium">{proj.issues} issue(s)</span>}
                                    <Badge variant={getStatusVariant(proj.status)}>{proj.status}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-6">No projects assigned today.</p>
                )}
            </CardContent>
        </Card>
    );
}
