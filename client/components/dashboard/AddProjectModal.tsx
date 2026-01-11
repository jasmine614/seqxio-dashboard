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
import { Loader2, Check, CalendarDays, Clock } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useToast } from "@/components/ui/use-toast";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
import { Project, CreateProjectRequest } from "@shared/api";

const STEPS = [
  { id: "01", name: "Details" },
  { id: "02", name: "Location" },
  { id: "03", name: "Assignment" },
];

const ROAD_OPTIONS: Option[] = [
    { value: "main-st", label: "Main St" },
    { value: "oak-ave", label: "Oak Ave" },
    { value: "pine-ln", label: "Pine Ln" },
    { value: "maple-dr", label: "Maple Dr" },
    { value: "cedar-ct", label: "Cedar Ct" },
    { value: "elm-rd", label: "Elm Rd" },
];

const TEAM_OPTIONS: Option[] = [
    { value: "crew-a", label: "Crew A" },
    { value: "crew-b", label: "Crew B" },
    { value: "crew-c", label: "Crew C" },
    { value: "unassigned", label: "Unassigned" },
];

interface AddProjectModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onProjectAdd: (project: Project) => void;
}

export function AddProjectModal({ isOpen, onOpenChange, onProjectAdd }: AddProjectModalProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Form State
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [status, setStatus] = useState("On Track");
  const [zone, setZone] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [locationTab, setLocationTab] = useState("address");
  const [address, setAddress] = useState("");
  const [siteNotes, setSiteNotes] = useState("");
  const [mapPin, setMapPin] = useState<{lat: number, lng: number} | null>(null);
  const [assignedRoads, setAssignedRoads] = useState<string[]>([]);
  const [assignedTeam, setAssignedTeam] = useState("");
  const [priority, setPriority] = useState<"Normal" | "High" | "Critical">("Normal");
  const [reqPhoto, setReqPhoto] = useState(false);
  const [allowNotes, setAllowNotes] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsDirty(false);
      setErrors({});
      setProjectName("");
      setProjectType("");
      setStatus("On Track");
      setZone("");
      setStartDate(new Date());
      setDuration("");
      setLocationTab("address");
      setAddress("");
      setSiteNotes("");
      setMapPin(null);
      setAssignedRoads([]);
      setAssignedTeam("");
      setPriority("Normal");
      setReqPhoto(false);
      setAllowNotes(false);
      setIsSubmitting(false);
      setSubmitError(null);
      
      const now = new Date();
      const minutes = now.getMinutes();
      const roundedMinutes = Math.ceil(minutes / 15) * 15;
      const roundedDate = new Date(now.setMinutes(roundedMinutes));
      setStartTime(roundedDate.toTimeString().slice(0, 5));
    }
  }, [isOpen]);

  const validateStep = (currentStep: number) => {
    let newErrors: { [key: string]: string } = {};
    if (currentStep === 1) {
      if (!projectName) newErrors.projectName = "Project name is required.";
      if (!projectType) newErrors.projectType = "Select a project type.";
      if (!status) newErrors.status = "Select a status.";
      if (!zone) newErrors.zone = "Select a zone.";
      if (!startDate) newErrors.startDate = "Select a start date.";
      if (!startTime) newErrors.startTime = "Select a start time.";
    } else if (currentStep === 2) {
      if (locationTab === 'address' && !address) newErrors.address = "Enter a valid address.";
      else if (locationTab === 'map' && !mapPin) newErrors.map = "Click on the map to drop a pin.";
    } else if (currentStep === 3) {
      if (!assignedTeam) newErrors.assignedTeam = "Select a team.";
      if (!priority) newErrors.priority = "Priority is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => setStep((s) => s - 1);

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
  
  const handleCreateProject = async () => {
      if(!validateStep(3)) return;
      
      setIsSubmitting(true);
      setSubmitError(null);

      const projectData: CreateProjectRequest = {
        name: projectName,
        type: projectType,
        status,
        zone,
        startDate: startDate!.toISOString(),
        startTime,
        duration,
        address: locationTab === 'address' ? address : undefined,
        mapPin: locationTab === 'map' ? mapPin! : undefined,
        siteNotes,
        assignedRoads,
        assignedTeam,
        priority,
        reqPhoto,
        allowNotes,
      };

      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        });

        if (!response.ok) {
          throw new Error('Failed to create project');
        }

        const newProject: Project = await response.json();
        
        onProjectAdd(newProject);
        toast({
            variant: "success",
            title: "Project created",
            description: `"${newProject.name}" was added to today’s operations.`,
            action: <Button variant="link" className="p-0">View project</Button>
        });
        onOpenChange(false);

      } catch (error) {
        setSubmitError("Couldn’t create project. Check your connection and try again.");
      } finally {
        setIsSubmitting(false);
      }
  }

  const renderFooter = () => {
    const isDisabled = isSubmitting;
    const buttonClass = "rounded-[15px] font-medium px-5 py-3";
    switch (step) {
      case 1:
        return (
          <div className="flex w-full justify-end space-x-2">
            <Button variant="outline" onClick={handleCloseAttempt} disabled={isDisabled} className={buttonClass}>Cancel</Button>
            <Button onClick={handleNext} disabled={isDisabled} className={cn(buttonClass, "bg-gradient-primary text-white")}>Next: Location</Button>
          </div>
        );
      case 2:
        return (
          <div className="flex w-full justify-between">
            <Button variant="outline" onClick={handleBack} disabled={isDisabled} className={buttonClass}>Back</Button>
            <Button onClick={handleNext} disabled={isDisabled} className={cn(buttonClass, "bg-gradient-primary text-white")}>Next: Assignment</Button>
          </div>
        );
      case 3:
        return (
          <div className="flex w-full justify-between">
            <Button variant="outline" onClick={handleBack} disabled={isDisabled} className={buttonClass}>Back</Button>
            <Button onClick={handleCreateProject} disabled={isDisabled} className={cn(buttonClass, "bg-gradient-primary text-white")}>
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : "Create Project"}
            </Button>
          </div>
        );
      default: return null;
    }
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleCloseAttempt}>
        <SheetContent className="flex flex-col w-full sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>Add Project</SheetTitle>
            <SheetDescription>
              Create a new collection project and assign it to today’s operations.
            </SheetDescription>
          </SheetHeader>

          <div className="px-6 pb-4 border-b">
              <div className="flex justify-around">
                {STEPS.map((s, index) => (
                    <div key={s.id} className="flex items-center gap-2">
                        <div className={cn('h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-all', {
                            'border-2 border-primary text-primary': index + 1 < step,
                            'bg-primary text-primary-foreground': index + 1 === step,
                            'bg-muted text-muted-foreground': index + 1 > step
                        })}>
                            {index + 1 < step ? <Check className="h-4 w-4" /> : s.id}
                        </div>
                        <span className={cn('text-sm font-medium transition-all', {
                            'text-primary': index + 1 <= step,
                            'text-muted-foreground': index + 1 > step
                        })}>
                            {s.name}
                        </span>
                    </div>
                ))}
              </div>
          </div>

          {submitError && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive p-3 rounded-md m-6 mb-0 text-sm">
                <h4 className="font-semibold">Couldn’t create project</h4>
                <p>{submitError}</p>
                <Button variant="link" className="p-0 h-auto mt-1" onClick={handleCreateProject}>Retry</Button>
            </div>
           )}

          <div className={`flex-1 overflow-y-auto p-6 ${isSubmitting ? 'opacity-50' : ''}`}>
            <fieldset disabled={isSubmitting}>
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="font-semibold text-lg">Project Details</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="project-name">Project Name*</Label>
                                <Input id="project-name" placeholder="e.g., Uptown Alley Cleanup" value={projectName} onChange={(e) => handleFieldChange(setProjectName, 'projectName')(e.target.value)} />
                                {errors.projectName && <p className="text-sm text-destructive">{errors.projectName}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="project-type">Project Type*</Label>
                                <Select value={projectType} onValueChange={handleFieldChange(setProjectType, 'projectType')}>
                                    <SelectTrigger id="project-type"><SelectValue placeholder="Select a type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="route-collection">Route Collection</SelectItem>
                                        <SelectItem value="bulk-pickup">Bulk Pickup</SelectItem>
                                        <SelectItem value="missed-pickup">Missed Pickup Follow-up</SelectItem>
                                        <SelectItem value="special-cleanup">Special Cleanup</SelectItem>
                                        <SelectItem value="dumping-response">Illegal Dumping Response</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.projectType && <p className="text-sm text-destructive">{errors.projectType}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Status*</Label>
                            <SegmentedControl
                                options={[{value: 'On Track', label: 'On Track'}, {value: 'On Hold', label: 'On Hold'}, {value: 'At Risk', label: 'At Risk'}]}
                                value={status}
                                onChange={handleFieldChange(setStatus, 'status')}
                            />
                            {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zone">Zone / Area*</Label>
                            <Select value={zone} onValueChange={handleFieldChange(setZone, 'zone')}>
                                <SelectTrigger id="zone"><SelectValue placeholder="Select a zone" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="zone-a">Zone A</SelectItem>
                                    <SelectItem value="zone-b">Zone B</SelectItem>
                                    <SelectItem value="zone-c">Zone C</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.zone ? <p className="text-sm text-destructive">{errors.zone}</p> : <p className="text-sm text-muted-foreground">Used for reporting and map filtering.</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="start-date">Start Date*</Label>
                                <div className="relative">
                                    <Input id="start-date" type="date" value={startDate?.toISOString().split('T')[0]} onChange={(e) => handleFieldChange(setStartDate, 'startDate')(new Date(e.target.value))} className="pr-8"/>
                                    <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                </div>
                                {errors.startDate && <p className="text-sm text-destructive">{errors.startDate}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="start-time">Start Time*</Label>
                                <div className="relative">
                                    <Input id="start-time" type="time" value={startTime} onChange={(e) => handleFieldChange(setStartTime, 'startTime')(e.target.value)} className="pr-8" />
                                    <Clock className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                </div>
                                {errors.startTime && <p className="text-sm text-destructive">{errors.startTime}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration">Expected Duration</Label>
                            <Select value={duration} onValueChange={handleFieldChange(setDuration)}>
                                <SelectTrigger id="duration"><SelectValue placeholder="Select duration" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1hr">1 hr</SelectItem>
                                    <SelectItem value="2hr">2 hrs</SelectItem>
                                    <SelectItem value="4hr">4 hrs</SelectItem>
                                    <SelectItem value="6hr">6 hrs</SelectItem>
                                    <SelectItem value="fullday">Full day</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-muted-foreground">Used to flag delays if work runs long.</p>
                        </div>
                    </div>
                </div>
                )}
                {step === 2 && (
                     <div className="space-y-6">
                        <h3 className="font-semibold text-lg">Project Location</h3>
                        <Tabs value={locationTab} onValueChange={(value) => {setLocationTab(value); setIsDirty(true);}} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="address">Address</TabsTrigger>
                                <TabsTrigger value="map">Select on Map</TabsTrigger>
                            </TabsList>
                            <TabsContent value="address" className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address / Location*</Label>
                                    <Input id="address" placeholder="Start typing an address..." value={address} onChange={(e) => handleFieldChange(setAddress, 'address')(e.target.value)}/>
                                    {errors.address ? <p className="text-sm text-destructive">{errors.address}</p> : <p className="text-sm text-muted-foreground">This will be used to place the project on the map.</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="site-notes">Site Notes (optional)</Label>
                                    <Textarea id="site-notes" placeholder="Gate code, access notes, landmarks..." value={siteNotes} onChange={(e) => handleFieldChange(setSiteNotes)(e.target.value)} />
                                </div>
                            </TabsContent>
                            <TabsContent value="map" className="space-y-4 pt-4">
                                <p className="text-sm text-center text-muted-foreground">Click on the map to drop a pin for this project location.</p>
                                <div className="h-48 bg-muted rounded-md flex items-center justify-center border cursor-pointer" onClick={() => {setMapPin({lat: 35.227, lng: -80.843}); setIsDirty(true); handleFieldChange(() => {}, 'map')();}}>
                                    {mapPin ? (
                                        <p className="text-sm font-medium text-primary">Pin placed at {mapPin.lat.toFixed(3)}, {mapPin.lng.toFixed(3)}</p>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No location selected yet.</p>
                                    )}
                                </div>
                                {errors.map && <p className="text-sm text-destructive text-center">{errors.map}</p>}
                                <Button variant="secondary" className="w-full">Use current map view</Button>
                                <p className="text-sm text-muted-foreground text-center">Uses the same area currently visible on the dashboard map.</p>
                            </TabsContent>
                        </Tabs>
                    </div>
                )}
                {step === 3 && (
                    <div className="space-y-6">
                        <h3 className="font-semibold text-lg">Assignment & Tracking</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Assign Road(s) (optional)</Label>
                                <MultiSelect
                                    options={ROAD_OPTIONS}
                                    selected={assignedRoads}
                                    onChange={setAssignedRoads}
                                    placeholder="Search roads..."
                                />
                                <p className="text-sm text-muted-foreground">Roads help group projects for crews and reporting.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="crew">Assign Team*</Label>
                                <Select value={assignedTeam} onValueChange={handleFieldChange(setAssignedTeam, 'assignedTeam')}>
                                    <SelectTrigger id="crew"><SelectValue placeholder="Select a team" /></SelectTrigger>
                                    <SelectContent>
                                        {TEAM_OPTIONS.map(opt => (
                                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.assignedTeam ? <p className="text-sm text-destructive">{errors.assignedTeam}</p> : <p className="text-sm text-muted-foreground">Leave blank to create an unassigned project.</p>}
                            </div>
                             <div className="space-y-2">
                                <Label>Priority*</Label>
                                <SegmentedControl
                                    options={[{value: 'Normal', label: 'Normal'}, {value: 'High', label: 'High'}, {value: 'Critical', label: 'Critical'}]}
                                    value={priority}
                                    onChange={handleFieldChange(setPriority, 'priority')}
                                />
                                {errors.priority && <p className="text-sm text-destructive">{errors.priority}</p>}
                            </div>
                            <div className="space-y-3 pt-2">
                                <Label>Tracking Options</Label>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="req-photo" checked={reqPhoto} onCheckedChange={handleFieldChange(setReqPhoto)} />
                                    <Label htmlFor="req-photo" className="font-normal">Require photo evidence before completion</Label>
                                </div>
                                 <div className="flex items-center space-x-2">
                                    <Checkbox id="allow-notes" checked={allowNotes} onCheckedChange={handleFieldChange(setAllowNotes)} />
                                    <Label htmlFor="allow-notes" className="font-normal">Allow crew to add notes and issue flags</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </fieldset>
          </div>

          <SheetFooter className="border-t pt-4">
            {renderFooter()}
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
       <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Discard project draft?</AlertDialogTitle>
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
