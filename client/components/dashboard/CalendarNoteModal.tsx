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
import { cn } from "@/lib/utils";
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
  const [project, setProject] = useState("");
  const [team, setTeam] = useState("");
  const [notifyTeam, setNotifyTeam] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("General");
  const [details, setDetails] = useState("");
  const [visibility, setVisibility] = useState("team");
  const [priority, setPriority] = useState("Normal");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setIsDirty(false);
      setErrors({});
      setProject("");
      setTeam("");
      setNotifyTeam(false);
      setTitle("");
      setType("General");
      setDetails("");
      setVisibility("team");
      setPriority("Normal");
      setIsSubmitting(false);
      setSubmitError(null);
    }
  }, [isOpen]);

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!project) newErrors.project = "Select a project.";
    if (!team) newErrors.team = "Select a team.";
    if (!title) newErrors.title = "Title is required.";
    if (!visibility) newErrors.visibility = "Select a visibility option.";
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

      // Example of error handling
      // setSubmitError("Couldn’t save note. Please try again.");
      // setIsSubmitting(false);
      // return;

      toast({
          variant: "success",
          title: "Note added",
          description: `Saved for ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} and linked to project.`,
          action: <Button variant="link" className="p-0">View note</Button>
      });
      onOpenChange(false);
      setIsSubmitting(false);
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
            <div className="flex items-center justify-between">
                <div>
                    <Label className="text-xs text-muted-foreground">Date</Label>
                    <p className="font-medium">{formattedDate}</p>
                </div>
                <Button variant="link" className="p-0 h-auto">Change date</Button>
            </div>
          </div>

          {submitError && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive p-3 rounded-md text-sm">
                <h4 className="font-semibold">Couldn’t save note</h4>
                <p>{submitError}</p>
                <Button variant="link" className="p-0 h-auto mt-1" onClick={handleSaveNote}>Retry</Button>
            </div>
           )}

          <div className={`flex-1 overflow-y-auto -mx-6 px-6 ${isSubmitting ? 'opacity-50' : ''}`}>
            <fieldset disabled={isSubmitting} className="space-y-6">
                {/* Section 1 */}
                <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">LINK TO OPERATIONS*</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="project">Project*</Label>
                             <Select value={project} onValueChange={handleFieldChange(setProject, 'project')}>
                                <SelectTrigger id="project"><SelectValue placeholder="Search projects..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="route-collection-1">Route Collection - Uptown</SelectItem>
                                    <SelectItem value="bulk-pickup-2">Bulk Pickup - Westside</SelectItem>
                                    <SelectItem value="special-cleanup-3">Special Cleanup - South End</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.project ? <p className="text-sm text-destructive">{errors.project}</p> : <p className="text-sm text-muted-foreground">This note will appear in the project activity and calendar.</p>}
                            {project && (
                                <div className="text-xs text-muted-foreground bg-muted p-2 rounded-md">
                                    Route Collection · Uptown Zone · 8:00 AM · In Progress
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="team">Team*</Label>
                            <Select value={team} onValueChange={handleFieldChange(setTeam, 'team')}>
                                <SelectTrigger id="team"><SelectValue placeholder="Select a team..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="crew-a">Crew A – Uptown</SelectItem>
                                    <SelectItem value="crew-b">Crew B – West</SelectItem>
                                    <SelectItem value="crew-c">Crew C – South</SelectItem>
                                    <SelectItem value="dispatch">Dispatch</SelectItem>
                                    <SelectItem value="unassigned">Unassigned</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.team ? <p className="text-sm text-destructive">{errors.team}</p> : <p className="text-sm text-muted-foreground">Used to notify the right crew and filter notes by team.</p>}
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="notify-team" checked={notifyTeam} onCheckedChange={handleFieldChange(setNotifyTeam)} />
                            <Label htmlFor="notify-team" className="font-normal">Notify team</Label>
                        </div>
                        <p className="text-sm text-muted-foreground -mt-2">Sends an in-app notification to the selected team.</p>
                    </div>
                </div>

                {/* Section 2 */}
                <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">NOTE CONTENT</h3>
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
                                    {value: 'Service Disruption', label: 'Service Disruption'}, 
                                    {value: 'Crew / Staffing', label: 'Crew / Staffing'},
                                    {value: 'Equipment', label: 'Equipment'},
                                    {value: 'Weather', label: 'Weather'},
                                    {value: 'Reminder', label: 'Reminder'}
                                ]}
                                value={type}
                                onChange={(val) => handleFieldChange(setType)(val as string)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="details">Details (optional)</Label>
                            <Textarea id="details" placeholder="Add details for the team..." value={details} onChange={(e) => handleFieldChange(setDetails)(e.target.value)} maxLength={500} />
                            <p className="text-sm text-muted-foreground text-right">Optional. Keep it short and actionable. ({details.length} / 500)</p>
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">VISIBILITY & PRIORITY</h3>
                     <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Visibility*</Label>
                             <RadioGroup value={visibility} onValueChange={handleFieldChange(setVisibility, 'visibility')} className="gap-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="team" id="team" />
                                    <Label htmlFor="team" className="font-normal">Selected team only</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="dispatch" id="dispatch" />
                                    <Label htmlFor="dispatch" className="font-normal">All dispatchers & admins</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="everyone" id="everyone" />
                                    <Label htmlFor="everyone" className="font-normal">Everyone (all teams)</Label>
                                </div>
                            </RadioGroup>
                             {errors.visibility ? <p className="text-sm text-destructive mt-2">{errors.visibility}</p> : <p className="text-sm text-muted-foreground mt-2">Controls who can see this note on the calendar and project activity.</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Priority (optional)</Label>
                            <SegmentedControl
                                options={[{value: 'Normal', label: 'Normal'}, {value: 'Important', label: 'Important'}]}
                                value={priority}
                                onChange={(val) => handleFieldChange(setPriority)(val as string)}
                            />
                            {priority === 'Important' && <p className="text-sm text-muted-foreground">Important notes display a bold indicator on the calendar.</p>}
                        </div>
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
