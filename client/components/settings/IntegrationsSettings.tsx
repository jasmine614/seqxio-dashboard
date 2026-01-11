import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const IntegrationsSettings = () => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Data & Integrations</CardTitle>
            <CardDescription>
                Manage connections to external services.
            </CardDescription>
        </CardHeader>
      <CardContent className="divide-y divide-gray-200">
        <div className="py-4 flex items-center justify-between">
            <div>
                <h4 className="font-medium">ArcGIS</h4>
                <p className="text-sm text-muted-foreground">Not connected</p>
            </div>
            <Button variant="outline">Connect</Button>
        </div>
         <div className="py-4 flex items-center justify-between">
            <div>
                <h4 className="font-medium">Storage (Photos)</h4>
                <p className="text-sm text-muted-foreground">Connected to Google Cloud</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">View Details</Button>
                <Button variant="destructive">Disconnect</Button>
            </div>
        </div>
         <div className="py-4 flex items-center justify-between">
            <div>
                <h4 className="font-medium">Webhooks</h4>
                <p className="text-sm text-muted-foreground">No webhooks configured</p>
            </div>
            <Button variant="outline">Add webhook</Button>
        </div>
      </CardContent>
    </Card>
  );
}
