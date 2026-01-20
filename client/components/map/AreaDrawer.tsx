
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import { CreateServiceAreaRequest, ServiceArea } from "@shared/api";

interface AreaDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  geometry?: Polygon | null;
  area?: ServiceArea | null;
  onSave?: (areaData: CreateServiceAreaRequest) => void;
  onUpdate?: (areaId: string, areaData: Partial<CreateServiceAreaRequest>) => void;
  onArchive?: (areaId: string) => void;
}

export function AreaDrawer({
  isOpen,
  onOpenChange,
  geometry,
  area,
  onSave,
  onUpdate,
  onArchive,
}: AreaDrawerProps) {

  const isEditMode = !!area;

  const handleSave = () => {
    if (isEditMode || !onSave || !geometry) return;

    const areaData: CreateServiceAreaRequest = {
      name: (document.getElementById("name") as HTMLInputElement)?.value || "New Area",
      type: (document.querySelector("[data-radix-collection-item]") as HTMLElement)?.innerText || "Residential",
      zone: "Zone A",
      geometry: geometry.toJSON(),
    };
    onSave(areaData);
    onOpenChange(false);
  };

  const handleUpdate = () => {
    if (area && onUpdate) {
      const updatedData: Partial<CreateServiceAreaRequest> = {
        name: (document.getElementById("name") as HTMLInputElement)?.value,
        type: (document.querySelector("[data-radix-collection-item]") as HTMLElement)?.innerText,
      };
      onUpdate(area.id, updatedData);
      onOpenChange(false);
    }
  };

  const handleArchive = () => {
    if (area && onArchive) {
      onArchive(area.id);
      onOpenChange(false);
    }
  };

  const name = isEditMode ? area.name : "New Area";
  const type = isEditMode ? area.type.toLowerCase() : "residential";

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{isEditMode ? "Area Details" : "Save Area"}</SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "View and manage the details of this service area."
              : "Save the drawn area to your projects."}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue={name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select defaultValue={type}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          {isEditMode ? (
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleArchive}>Archive</Button>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </div>
          ) : (
            <Button type="submit" onClick={handleSave}>Save Area</Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
