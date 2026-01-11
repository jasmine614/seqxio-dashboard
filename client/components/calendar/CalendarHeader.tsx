import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function CalendarHeader({ view, onViewChange, onAddNote }) {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h1 className="text-4xl font-bold text-black tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">View projects and notes by date.</p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onAddNote}>Add note</Button>
        <Button variant="secondary">Today</Button>
        <ToggleGroup type="single" value={view} onValueChange={onViewChange} className="ml-4">
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
