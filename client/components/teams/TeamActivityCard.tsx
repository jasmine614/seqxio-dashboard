import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Truck, StickyNote } from 'lucide-react';

const mockActivity = [
    {
        icon: <Truck size={16} className="text-muted-foreground" />,
        text: 'Project assigned: Westside Bulk Pickup',
        timestamp: '9:05 AM'
    },
    {
        icon: <StickyNote size={16} className="text-muted-foreground" />,
        text: 'Note added: Route change due to construction',
        timestamp: '8:44 AM'
    },
    {
        icon: <CheckCircle size={16} className="text-muted-foreground" />,
        text: 'Status changed to On Duty',
        timestamp: '7:58 AM'
    },
];

export const TeamActivityCard = () => {
    const activities = mockActivity;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
                {activities.length > 0 ? (
                    <div className="space-y-4">
                        {activities.map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="mt-1">{item.icon}</div>
                                <div className="flex-1">
                                    <p className="text-sm">{item.text}</p>
                                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-6">No recent activity.</p>
                )}
            </CardContent>
        </Card>
    );
}
