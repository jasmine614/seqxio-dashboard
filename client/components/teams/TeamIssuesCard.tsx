import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';

const mockIssues = [
    {
        id: 'issue-1',
        type: 'Safety Hazard',
        project: 'Westside Bulk Pickup',
        road: 'Oak Street',
        timestamp: '2023-12-05T10:15:00Z',
        status: 'Open'
    },
     {
        id: 'issue-2',
        type: 'Vehicle Maintenance',
        project: 'Downtown Cleanup',
        road: 'N/A',
        timestamp: '2023-12-05T11:00:00Z',
        status: 'Open'
    },
];

export const TeamIssuesCard = ({ team }) => {
    const issues = team.issues > 0 ? mockIssues.slice(0, team.issues) : [];

    // Card should only be visible if there are issues or status is 'Needs Attention'
    if (issues.length === 0 && team.status !== 'Needs Attention') {
        return null;
    }

    return (
        <Card className="border-destructive">
            <CardHeader>
                <CardTitle className="text-destructive">Open Issues</CardTitle>
            </CardHeader>
            <CardContent>
                 {issues.length > 0 ? (
                    <div className="space-y-4">
                        {issues.map(issue => (
                            <div key={issue.id} className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{issue.type}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Project: <button className="underline">{issue.project}</button>
                                    </p>
                                </div>
                               <div className="flex items-center gap-4">
                                     <Badge variant="destructive">{issue.status}</Badge>
                                     <Button variant="secondary" size="sm">View</Button>
                               </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-6">No open issues.</p>
                )}
            </CardContent>
        </Card>
    );
}
