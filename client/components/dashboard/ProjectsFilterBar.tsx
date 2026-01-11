
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SegmentedControl } from "@/components/ui/segmented-control";

interface ProjectsFilterBarProps {
  status: string;
  onStatusChange: (status: string) => void;
  zone: string;
  onZoneChange: (zone: string) => void;
  view: string;
  onViewChange: (view: string) => void;
}

const ZONE_OPTIONS = [
  { value: "all", label: "All zones" },
  { value: "zone-a", label: "Zone A" },
  { value: "zone-b", label: "Zone B" },
  { value: "zone-c", label: "Zone C" },
];

export function ProjectsFilterBar({
  status,
  onStatusChange,
  zone,
  onZoneChange,
  view,
  onViewChange,
}: ProjectsFilterBarProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <div>
          <Label htmlFor="status-filter" className="text-sm font-medium">Status</Label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger id="status-filter" className="w-[180px] bg-white mt-1">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="zone-filter" className="text-sm font-medium">Zone</Label>
          <Select value={zone} onValueChange={onZoneChange}>
            <SelectTrigger id="zone-filter" className="w-[180px] bg-white mt-1">
              <SelectValue placeholder="All zones" />
            </SelectTrigger>
            <SelectContent>
              {ZONE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <SegmentedControl
          options={[
            { value: "active", label: "Active" },
            { value: "all", label: "All" },
          ]}
          value={view}
          onChange={onViewChange}
        />
      </div>
    </div>
  );
}
