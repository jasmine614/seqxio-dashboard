import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const DisplaySettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Units</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Waste units</Label>
            <RadioGroup defaultValue="lbs" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lbs" id="lbs" />
                <Label htmlFor="lbs">lbs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tons" id="tons" />
                <Label htmlFor="tons">tons</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time format</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <RadioGroup defaultValue="12-hour" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="12-hour" id="12-hour" />
                <Label htmlFor="12-hour">12-hour</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="24-hour" id="24-hour" />
                <Label htmlFor="24-hour">24-hour</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

        <Card>
            <CardHeader>
                <CardTitle>Theme</CardTitle>
            </CardHeader>
            <CardContent>
                <Select defaultValue="system">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    </div>
  );
}
