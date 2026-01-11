import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ReviewStep() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review & Export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Report Title</h3>
            <p className="text-muted-foreground">Weekly Operations Summary · Nov 18–Nov 25</p>
          </div>
          <div>
            <h3 className="font-medium">Date Range</h3>
            <p className="text-muted-foreground">November 18, 2023 - November 25, 2023</p>
          </div>
          <div>
            <h3 className="font-medium">Filters</h3>
            <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Zone: All zones</Badge>
                <Badge variant="secondary">Team: All teams</Badge>
                <Badge variant="secondary">Status: All</Badge>
                <Badge variant="secondary">Project Type: All</Badge>
            </div>
          </div>
          <div>
            <h3 className="font-medium">Included Sections</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Executive Summary</li>
              <li>KPIs</li>
              <li>Collection Trend</li>
              <li>Projects Needing Attention</li>
              <li>Issues Breakdown</li>
              <li>Team Performance</li>
              <li>Hotspot Roads</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Save as template</Button>
        <Button variant="secondary">Export CSV</Button>
        <Button>Export PDF</Button>
      </div>
    </div>
  );
}
