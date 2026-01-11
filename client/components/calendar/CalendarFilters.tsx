import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

export function CalendarFilters({ contentType, onContentTypeChange }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div>
        <Label htmlFor="zone-select">Zone</Label>
        <Select>
          <SelectTrigger id="zone-select" className="w-[180px]">
            <SelectValue placeholder="All zones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All zones</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="team-select">Team</Label>
        <Select>
          <SelectTrigger id="team-select" className="w-[180px]">
            <SelectValue placeholder="All teams" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All teams</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="status-select">Status</Label>
        <Select>
          <SelectTrigger id="status-select" className="w-[180px]">
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
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Label>Show</Label>
        <ToggleGroup type="single" value={contentType} onValueChange={onContentTypeChange}>
          <ToggleGroupItem value="projects">Projects</ToggleGroupItem>
          <ToggleGroupItem value="notes">Notes</ToggleGroupItem>
          <ToggleGroupItem value="both">Both</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
