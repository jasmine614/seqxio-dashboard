
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Point from "@arcgis/core/geometry/Point.js";
import { CreateMapPinRequest, MapPin } from "@shared/api";
import { Upload, Link, MapPin as MapPinIcon, Trash2, CheckCircle } from "lucide-react";


interface PinDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  location?: Point | null;
  pin?: MapPin | null;
  linkedProjectId?: string;
  onSave?: (pinData: CreateMapPinRequest) => void;
  onResolve?: (pinId: string) => void;
  onDelete?: (pinId: string) => void;
  onReposition?: (pin: MapPin) => void;
  onCenter?: (location: Point) => void;
}

export function PinDrawer({
  isOpen,
  onOpenChange,
  location,
  pin,
  linkedProjectId: prefilledProjectId,
  onSave,
  onResolve,
  onDelete,
  onReposition,
  onCenter,
}: PinDrawerProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('General note');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Open');
  const [notes, setNotes] = useState('');
  const [linkedProjectId, setLinkedProjectId] = useState('');
  const [linkedRoadId, setLinkedRoadId] = useState('');
  const [linkedTeamId, setLinkedTeamId] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  const isEditMode = !!pin;

  useEffect(() => {
    if (isOpen) {
        if (pin) {
            setTitle(pin.title);
            setType(pin.type);
            setPriority(pin.priority);
            setStatus(pin.status);
            setNotes(pin.notes || '');
            setLinkedProjectId(pin.linkedProjectId || '');
            setLinkedRoadId(pin.linkedRoadId || '');
            setLinkedTeamId(pin.linkedTeamId || '');
            setPhotoUrls(pin.photoUrls || []);
        } else {
            setTitle('');
            setType('General note');
            setPriority('Medium');
            setStatus('Open');
            setNotes('');
            setLinkedProjectId(prefilledProjectId || '');
            setLinkedRoadId('');
            setLinkedTeamId('');
            setPhotoUrls([]);
        }
    }
  }, [pin, isOpen, prefilledProjectId]);

  const handleSave = () => {
    if (!onSave || (!location && !pin)) return;

    const pinData: CreateMapPinRequest = {
      title,
      type: type as any,
      priority: priority as any,
      status: status as any,
      lat: pin?.lat || location!.latitude,
      lng: pin?.lng || location!.longitude,
      notes,
      linkedProjectId,
      linkedRoadId,
      linkedTeamId,
      photoUrls,
    };
    onSave(pinData);
  };

  const handleResolve = () => {
    if (pin && onResolve) {
      onResolve(pin.id);
    }
  };

  const handleDelete = () => {
    if (pin && onDelete) {
      onDelete(pin.id);
    }
  };

  const handleReposition = () => {
    if(pin && onReposition) {
      onReposition(pin);
    }
  };
  
  const handleCenter = () => {
    const point = pin ? new Point({ latitude: pin.lat, longitude: pin.lng }) : location;
    if (point && onCenter) {
      onCenter(point);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Placeholder for upload logic
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setPhotoUrls(prev => [...prev, ...fileArray]);
    }
  };


  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>{isEditMode ? "Pin Details" : "Create Pin"}</SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "View and manage the details of this pin."
              : "Create a new pin on the map to mark a location of interest."}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 pr-6">
          <div className="grid gap-6 py-6">
            {/* Main Details */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} className="col-span-3" required/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Overflow">Overflow</SelectItem>
                  <SelectItem value="Missed pickup">Missed pickup</SelectItem>
                  <SelectItem value="Illegal dumping">Illegal dumping</SelectItem>
                  <SelectItem value="Blocked access">Blocked access</SelectItem>
                  <SelectItem value="Equipment issue">Equipment issue</SelectItem>
                  <SelectItem value="Safety hazard">Safety hazard</SelectItem>
                  <SelectItem value="General note">General note</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {isEditMode && (<div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In progress">In progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>)}

            {/* Location Section */}
            <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
              <h4 className="font-medium text-sm">Location</h4>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right col-span-1">Lat/Lng</Label>
                <p className="col-span-3 text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {pin ? `${pin.lat.toFixed(6)}, ${pin.lng.toFixed(6)}` : location ? `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}` : ''}
                </p>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <div/>
                  <div className="col-span-3 flex gap-2">
                    <Button variant="outline" size='sm' onClick={handleReposition} disabled={!isEditMode}>
                      <MapPinIcon className="mr-2 h-4 w-4" /> Reposition
                    </Button>
                    <Button variant="outline" size='sm' onClick={handleCenter}>
                      Center map
                    </Button>
                  </div>
              </div>
            </div>
            
            {/* Linking Section */}
            <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
              <h4 className="font-medium text-sm flex items-center"><Link className="h-4 w-4 mr-2"/>Link (Optional)</h4>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link-project" className="text-right">
                  Project
                </Label>
                <Input id="link-project" value={linkedProjectId} onChange={e => setLinkedProjectId(e.target.value)} placeholder="Search projects..." className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link-road" className="text-right">
                  Road
                </Label>
                <Input id="link-road" value={linkedRoadId} onChange={e => setLinkedRoadId(e.target.value)} placeholder="Search roads..." className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link-team" className="text-right">
                  Team
                </Label>
                <Input id="link-team" value={linkedTeamId} onChange={e => setLinkedTeamId(e.target.value)} placeholder="Search teams..." className="col-span-3" />
              </div>
            </div>
            
            {/* Notes and Photos */}
            <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
              <h4 className="font-medium text-sm">Notes & Photos (Optional)</h4>
              <Textarea placeholder="Add notes..." value={notes} onChange={e => setNotes(e.target.value)} />
              <div className="flex flex-col gap-2">
                  <Label htmlFor="photo-upload">Add photos</Label>
                   <Input id="photo-upload" type="file" multiple onChange={handlePhotoUpload} className="hidden" />
                   <Button asChild variant='outline'>
                     <label htmlFor="photo-upload" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Files
                     </label>
                  </Button>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {photoUrls.map(url => <img key={url} src={url} className="h-16 w-16 rounded object-cover"/>)}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className="pt-4">
          {isEditMode ? (
            <div className="flex w-full justify-between">
              <Button variant="destructive" onClick={handleDelete}><Trash2 className="mr-2 h-4 w-4"/>Delete</Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleResolve} disabled={status === 'Resolved'}><CheckCircle className="mr-2 h-4 w-4"/>
                  {status === 'Resolved' ? 'Resolved' : 'Mark as resolved'}
                </Button>
                 <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          ) : (
             <div className="flex w-full justify-end">
                <Button type="submit" onClick={handleSave} disabled={!title}>Create Pin</Button>
             </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
