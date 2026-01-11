import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const auditLogs = [
    { user: 'John Doe', action: 'Updated project', target: 'Project #123', date: '2023-11-28T10:00:00Z' },
    { user: 'Jane Smith', action: 'Created note', target: 'Note on Project #456', date: '2023-11-28T11:30:00Z' },
    { user: 'Admin', action: 'Deactivated team', target: 'Crew C', date: '2023-11-27T15:00:00Z' },
]

export const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="allowed-domains">Allowed domains</Label>
            <Input id="allowed-domains" placeholder="example.com, company.com" />
             <p className="text-sm text-muted-foreground">
                Optional. Users will only be able to sign up with emails from these domains.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session timeout (minutes)</Label>
            <Input id="session-timeout" type="number" defaultValue={120} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="2fa">Two-factor authentication</Label>
            <Switch id="2fa" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>Recent security-related activity in your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Date/Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.target}</TableCell>
                  <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
