import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CalendarNoteModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  date: Date;
}

export function CalendarNoteModal({ isOpen, onOpenChange, date }: CalendarNoteModalProps) {
  const { toast } = useToast();
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [noteType, setNoteType] = useState("General");
  const [details, setDetails] = useState("");
  const [linkToProject, setLinkToProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [linkToRoad, setLinkToRoad] = useState(false);
  const [selectedRoad, setSelectedRoad] = useState("");
  const [linkToZone, setLinkToZone] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");
  const [visibility, setVisibility] = useState("all_members");
  const [priority, setPriority] = useState("Normal");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setIsDirty(false);
      setErrors({});
      setTitle("");
      setNoteType("General");
      setDetails("");
      setLinkToProject(false);
      setSelectedProject("");
      setLinkToRoad(false);
      setSelectedRoad("");
      setLinkToZone(false);
      setSelectedZone("");
      setVisibility("all_members");
      setPriority("Normal");
      setIsSubmitting(false);
      setSubmitError(null);
    }
  }, [isOpen]);

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "Title is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCloseAttempt = () => {
    if (isSubmitting) return;
    if (isDirty) {
      setShowCancelConfirm(true);
    } else {
      onOpenChange(false);
    }
  };
  
  const handleFieldChange = (setter: any, fieldName?: string) => (value: any) => {
    setter(value);
    if (!isDirty) setIsDirty(true);
    if (fieldName && errors[fieldName]) {
        setErrors(prev => ({...prev, [fieldName]: undefined}));
    }
  }

  const handleReset = () => {
    setShowCancelConfirm(false);
    onOpenChange(false);
  }

  const handleSaveNote = async () => {
      if(!validate()) return;

      setIsSubmitting(true);
      setSubmitError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example error handling
      // setSubmitError("Please try again.");
      // setIsSubmitting(false);
      // return;

      toast({
          variant: "success",
          title: "Note added",
          description: `Calendar note saved for ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.`,
          action: <Button variant="link" className="p-0">View</Button>
      });
      onOpenChange(false);
  }

  const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleCloseAttempt}>
        <SheetContent className="flex flex-col w-full sm:max-w-lg">
          <SheetHeader className="pr-10">
            <SheetTitle>Add Calendar Note</SheetTitle>
            <SheetDescription>
              Add an operational note for this date.
            </SheetDescription>
             <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={handleCloseAttempt}>
                <X className="h-4 w-4" />
             </Button>
          </SheetHeader>
          
          <div className="border-t -mx-6 px-6 py-4">
            <p className="font-medium">{formattedDate}</p>
            <Button variant="link" className="p-0 h-auto text-sm">Change date</Button>
          </div>

          {submitError && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive p-3 rounded-md text-sm my-4">
                <h4 className="font-semibold">Couldn’t save note</h4>
                <p>{submitError}</p>
                <Button variant="link" className="p-0 h-auto mt-1 text-destructive" onClick={handleSaveNote}>Retry</Button>
            </div>
           )}

          <div className={`flex-1 overflow-y-auto -mx-6 px-6 ${isSubmitting ? 'opacity-50' : ''}`}>
            <fieldset disabled={isSubmitting} className="space-y-6">
                
                {/* Note Content */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title*</Label>
                        <Input id="title" placeholder="e.g., Holiday schedule adjustment" value={title} onChange={(e) => handleFieldChange(setTitle, 'title')(e.target.value)} />
                         {errors.title ? <p className="text-sm text-destructive">{errors.title}</p> : <p className="text-sm text-muted-foreground">Short summary shown on the calendar.</p>}
                    </div>

                     <div className="space-y-2">
                        <Label>Type*</Label>
                        <SegmentedControl
                            options={[
                                {value: 'General', label: 'General'}, 
                                {value: 'Service Disruption', label: 'Disruption'}, 
                                {value: 'Crew / Staffing', label: 'Staffing'},
                                {value: 'Equipment', label: 'Equipment'},
                                {value: 'Weather', label: 'Weather'},
                                {value: 'Reminder', label: 'Reminder'}
                            ]}
                            value={noteType}
                            onChange={(val) => handleFieldChange(setNoteType)(val as string)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="details">Details</Label>
                        <Textarea id="details" placeholder="Add details for the team..." value={details} onChange={(e) => handleFieldChange(setDetails)(e.target.value)} maxLength={500} />
                        <p className="text-sm text-muted-foreground text-right">{details.length} / 500</p>
                    </div>
                </div>

                {/* Link to Operations */}
                <div className="space-y-4">
                    <Label>Link this note to</Label>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="link-project" checked={linkToProject} onCheckedChange={handleFieldChange(setLinkToProject)} />
                                <Label htmlFor="link-project" className="font-normal">Project</Label>
                            </div>
                            {linkToProject && (
                                <Select value={selectedProject} onValueChange={handleFieldChange(setSelectedProject, 'project')}>
                                    <SelectTrigger><SelectValue placeholder="Select a project..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="route-collection-1">Route Collection - Uptown</SelectItem>
                                        <SelectItem value="bulk-pickup-2">Bulk Pickup - Westside</SelectItem>
                                        <SelectItem value="special-cleanup-3">Special Cleanup - South End</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                        <div className="space-y-2">
                           <div className="flex items-center space-x-2">
                                <Checkbox id="link-road" checked={linkToRoad} onCheckedChange={handleFieldChange(setLinkToRoad)} />
                                <Label htmlFor="link-road" className="font-normal">Road</Label>
                            </div>
                            {linkToRoad && (
                                <Select value={selectedRoad} onValueChange={handleFieldChange(setSelectedRoad, 'road')}>
                                    <SelectTrigger><SelectValue placeholder="Select a road..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="main-st">Main St</SelectItem>
                                        <SelectItem value="oak-ave">Oak Ave</SelectItem>
                                        <SelectItem value="pine-ln">Pine Ln</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="link-zone" checked={linkToZone} onCheckedChange={handleFieldChange(setLinkToZone)} />
                                <Label htmlFor="link-zone" className="font-normal">Zone</Label>
                            </div>
                             {linkToZone && (
                                <Select value={selectedZone} onValueChange={handleFieldChange(setSelectedZone, 'zone')}>
                                    <SelectTrigger><SelectValue placeholder="Select a zone..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="uptown">Uptown</SelectItem>
                                        <SelectItem value="westside">Westside</SelectItem>
                                        <SelectItem value="south-end">South End</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Linked notes appear in related views for context.</p>
                </div>

                {/* Visibility & Priority */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Visibility</Label>
                         <RadioGroup value={visibility} onValueChange={handleFieldChange(setVisibility, 'visibility')} className="gap-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all_members" id="all_members" />
                                <Label htmlFor="all_members" className="font-normal">All team members</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dispatch_admins" id="dispatch_admins" />
                                <Label htmlFor="dispatch_admins" className="font-normal">Dispatchers & admins only</Label>
                            </div>
                        </RadioGroup>
                         <p className="text-sm text-muted-foreground">Controls who can see this note on the calendar.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Priority</Label>
                        <SegmentedControl
                            options={[{value: 'Normal', label: 'Normal'}, {value: 'Important', label: 'Important'}]}
                            value={priority}
                            onChange={(val) => handleFieldChange(setPriority)(val as string)}
                        />
                        {priority === 'Important' && <p className="text-sm text-muted-foreground">Important notes display with a bold dot or warning icon on calendar.</p>}
                    </div>
                </div>
            </fieldset>
          </div>

          <SheetFooter className="border-t pt-4">
             <div className="flex w-full justify-end space-x-2">
                <Button variant="outline" onClick={handleCloseAttempt} disabled={isSubmitting}>Cancel</Button>
                <Button onClick={handleSaveNote} disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Note"}
                </Button>
              </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

       <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Discard note draft?</AlertDialogTitle>
                <AlertDialogDescription>Your changes will not be saved.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Keep Editing</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleReset}>Discard</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
