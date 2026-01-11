import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const LiveLocationCard = ({ team }) => {
    // A simple placeholder for a map preview
    const renderMapPreview = () => {
        if (!team.location || team.location.stale) {
            return (
                <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground text-center px-4">Location unavailable for this team.</p>
                </div>
            );
        }
        return (
            <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Map preview placeholder</p>
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Live Location</CardTitle>
            </CardHeader>
            <CardContent>
                {renderMapPreview()}
                {team.location && !team.location.stale && (
                    <div className="mt-4">
                        <p className="text-muted-foreground">
                            Last known area: <span className="font-medium text-foreground">{team.zone}</span>
                        </p>
                        <Button variant="outline" className="w-full mt-4">
                            Open in live map
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
