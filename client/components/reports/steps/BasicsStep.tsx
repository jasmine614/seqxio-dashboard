import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePickerWithRange from "@/components/dashboard/DateRangePicker";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function BasicsStep() {
  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="report-type">Report Type*</Label>
                <Select>
                    <SelectTrigger id="report-type">
                        <SelectValue placeholder="Select a report type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="weekly">Weekly Operations Summary</SelectItem>
                        <SelectItem value="monthly">Monthly Performance Summary</SelectItem>
                        <SelectItem value="issues">Issues & Incidents Summary</SelectItem>
                        <SelectItem value="team">Team Performance Summary</SelectItem>
                        <SelectItem value="zone">Zone Summary</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Choose a standardized layout or start custom.</p>
            </div>
            <div className="space-y-2">
                <Label>Date Range*</Label>
                <DatePickerWithRange className="w-full" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="group-by">Group By</Label>
                <Select>
                    <SelectTrigger id="group-by">
                        <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="zone">Zone</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                        <SelectItem value="project-type">Project Type</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Filters</Label>
                <div className="flex flex-wrap gap-2">
                    <Select>
                        <SelectTrigger className="w-full md:w-auto">
                            <SelectValue placeholder="All zones" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All zones</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full md:w-auto">
                            <SelectValue placeholder="All teams" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All teams</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full md:w-auto">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="on-track">On Track</SelectItem>
                            <SelectItem value="at-risk">At Risk</SelectItem>
                            <SelectItem value="delayed">Delayed</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger className="w-full md:w-auto">
                            <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All types</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="report-title">Report Title*</Label>
            <Input id="report-title" placeholder="Weekly Operations Summary · Nov 18–Nov 25" />
        </div>

        <div className="flex items-center space-x-2">
            <Switch id="include-branding" defaultChecked />
            <Label htmlFor="include-branding">Include Branding</Label>
        </div>
        <p className="text-sm text-muted-foreground">Adds logo and standardized styling to PDF exports.</p>
    </div>
  );
}
