import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';

export const NotificationsSettings = () => {
  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    const formattedHours = hours.toString().padStart(2, '0');
    return `${formattedHours}:${minutes}`;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>In-app notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="project-status-changes">Project status changes</Label>
            <Switch id="project-status-changes" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="new-notes">New notes linked to my team</Label>
            <Switch id="new-notes" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="new-issue">New issue flagged</Label>
            <Switch id="new-issue" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="project-assigned">Project assigned/reassigned</Label>
            <Switch id="project-assigned" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="daily-digest">Daily digest</Label>
            <Switch id="daily-digest" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="weekly-summary">Weekly summary</Label>
            <Switch id="weekly-summary" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quiet hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <Label htmlFor="quiet-hours-enabled">Enable quiet hours</Label>
                <Switch id="quiet-hours-enabled" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                        {timeOptions.map(time => (
                            <SelectItem key={`start-${time}`} value={time}>{time}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                        {timeOptions.map(time => (
                            <SelectItem key={`end-${time}`} value={time}>{time}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-wrap gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <Button key={day} variant="outline" size="sm">{day}</Button>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
