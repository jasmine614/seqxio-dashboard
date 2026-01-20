
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CreateRoadRequest } from "@shared/api";
import { InteractiveCoverageMap } from "./InteractiveCoverageMap";

interface AddRoadSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddRoad: (road: CreateRoadRequest) => void;
}

const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];
const roadTypes: CreateRoadRequest['type'][] = ["Residential", "Commercial", "Highway", "Mixed"];
const priorities: CreateRoadRequest['priority'][] = ["Low", "Normal", "High"];

export function AddRoadSheet({ isOpen, onOpenChange, onAddRoad }: AddRoadSheetProps) {
  const [roadName, setRoadName] = useState("");
  const [zone, setZone] = useState<string>("");
  const [roadType, setRoadType] = useState<CreateRoadRequest['type']>("Residential");
  const [priority, setPriority] = useState<CreateRoadRequest['priority']>("Normal");
  const [defineCoverage, setDefineCoverage] = useState(false);
  const [geometry, setGeometry] = useState<any | null>(null);

  const handleAddRoad = () => {
    const newRoad: CreateRoadRequest = {
      name: roadName,
      zone,
      type: roadType,
      status: "On Track",
      priority,
      coverage: defineCoverage ? "Partial" : "Full",
      geometry
    };
    onAddRoad(newRoad);
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Add Road</SheetTitle>
          <SheetDescription>Add a road to track collection status and activity.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="road-name">Road Name*</Label>
            <Input id="road-name" placeholder="e.g., Independence Blvd" value={roadName} onChange={(e) => setRoadName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zone">Zone / Area*</Label>
            <Select onValueChange={setZone} value={zone}>
              <SelectTrigger id="zone">
                <SelectValue placeholder="Select a zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map(z => <SelectItem key={z} value={z}>{z}</SelectItem>)}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Used for filtering, reporting, and map views.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="road-type">Road Type</Label>
            <Select onValueChange={setRoadType} value={roadType}>
                <SelectTrigger id="road-type">
                    <SelectValue placeholder="Select a road type" />
                </SelectTrigger>
                <SelectContent>
                    {roadTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Priority</Label>
            <ToggleGroup type="single" value={priority} onValueChange={(value: CreateRoadRequest['priority']) => value && setPriority(value)} className="justify-start">
              {priorities.map(p => <ToggleGroupItem key={p} value={p}>{p}</ToggleGroupItem>)}
            </ToggleGroup>
            <p className="text-sm text-muted-foreground">Priority helps determine attention when issues occur.</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="define-coverage" checked={defineCoverage} onCheckedChange={(checked) => setDefineCoverage(!!checked)} />
              <Label htmlFor="define-coverage" className="font-normal">Define coverage area on map</Label>
            </div>
            {defineCoverage && (
                <div className="h-64 rounded-lg overflow-hidden relative">
                    <InteractiveCoverageMap onGeometryChange={setGeometry} />
                </div>
            )}
          </div>
        </div>
        <SheetFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAddRoad}>Add Road</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
