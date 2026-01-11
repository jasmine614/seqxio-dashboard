import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DetailItem = ({ label, children }) => (
    <div className="flex justify-between items-center">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{children}</span>
    </div>
);

export const TeamSnapshotCard = ({ team }) => {
    // Assuming team lead is not in the base mock, so we add a placeholder
    const teamLead = 'Jane Doe'; 

    return (
        <Card>
            <CardHeader>
                <CardTitle>Team Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <DetailItem label="Status">
                    <span className={team.status === 'Needs Attention' ? 'text-destructive' : ''}>{team.status}</span>
                </DetailItem>
                <DetailItem label="Team Lead">{teamLead}</DetailItem>
                <DetailItem label="Last location ping">
                    {team.location.stale 
                        ? <span className="text-amber-500">Location not updated recently</span>
                        : team.location.lastPing
                    }
                </DetailItem>
                <DetailItem label="Active projects">{team.assignment ? 1 : 0}</DetailItem>
                <DetailItem label="Open issues">{team.issues}</DetailItem>
            </CardContent>
        </Card>
    );
}
