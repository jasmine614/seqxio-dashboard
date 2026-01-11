import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const MapSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Map defaults</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Default map view</Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select a default view" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="zone1">Zone 1</SelectItem>
                    <SelectItem value="zone2">Zone 2</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Default layers</Label>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="workers-layer">Workers</Label>
                    <Switch id="workers-layer" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="projects-layer">Projects</Label>
                    <Switch id="projects-layer" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="roads-layer">Roads</Label>
                    <Switch id="roads-layer" />
                </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Worker tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Refresh interval</Label>
            <Select defaultValue="15s">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5s">5s</SelectItem>
                    <SelectItem value="15s">15s</SelectItem>
                    <SelectItem value="30s">30s</SelectItem>
                    <SelectItem value="60s">60s</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tracking privacy</Label>
             <Select defaultValue="exact">
                <SelectTrigger>
                    <SelectValue placeholder="Select privacy level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="exact">Show exact location</SelectItem>
                    <SelectItem value="approximate">Show approximate location</SelectItem>
                    <SelectItem value="onduty">Show only when on duty</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
