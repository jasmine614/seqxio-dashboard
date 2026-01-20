
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { UploadStep } from './UploadStep'; // Will be created next

interface UploadMediaSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onUploadComplete: (newMedia: string[]) => void;
}

type AttachTo = "project" | "road";
type PhotoType = "Before" | "During" | "After" | "Issue";

export function UploadMediaSheet({ isOpen, onOpenChange, onUploadComplete }: UploadMediaSheetProps) {
  const [step, setStep] = useState(1);
  const [attachTo, setAttachTo] = useState<AttachTo>("project");
  const [projectId, setProjectId] = useState<string | null>(null);
  const [roadId, setRoadId] = useState<string | null>(null);
  const [photoType, setPhotoType] = useState<PhotoType>("During");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState({
    attachTo: false,
    projectOrRoad: false,
    photoType: false,
  });

  const validateStep1 = () => {
    const newErrors = {
      attachTo: !attachTo,
      projectOrRoad: (attachTo === "project" && !projectId) || (attachTo === "road" && !roadId),
      photoType: !photoType,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };
  
  const handleBack = () => setStep(1);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl flex flex-col">
        <SheetHeader>
          <SheetTitle>Upload Photos</SheetTitle>
          <SheetDescription>Attach proof of work to a project or road.</SheetDescription>
        </SheetHeader>
        
        {step === 1 && (
          <div className="flex-1 overflow-y-auto -mx-6 px-6 py-6 space-y-8">
            <div>
              <Label className="font-semibold">Choose Context*</Label>
              <RadioGroup value={attachTo} onValueChange={(value: AttachTo) => setAttachTo(value)} className="mt-2">
                <div className="flex items-center space-x-2"><RadioGroupItem value="project" id="project" /><Label htmlFor="project" className="font-normal">Project</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="road" id="road" /><Label htmlFor="road" className="font-normal">Road</Label></div>
              </RadioGroup>
              {errors.attachTo && <p className="text-red-500 text-sm mt-1">Select where to attach these photos.</p>}
            </div>

            {attachTo === "project" ? (
              <div className="space-y-2">
                <Label htmlFor="project-select">Project*</Label>
                <Select onValueChange={setProjectId}><SelectTrigger><SelectValue placeholder="Search projects..." /></SelectTrigger><SelectContent> {/* Mock projects */ }<SelectItem value="proj1">Project Alpha</SelectItem><SelectItem value="proj2">Project Beta</SelectItem></SelectContent></Select>
                {errors.projectOrRoad && <p className="text-red-500 text-sm mt-1">Select a project.</p>}
                <p className="text-sm text-muted-foreground">Photos will appear in the project record and Recent Photos.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="road-select">Road*</Label>
                <Select onValueChange={setRoadId}><SelectTrigger><SelectValue placeholder="Search roads..." /></SelectTrigger><SelectContent> {/* Mock roads */ }<SelectItem value="road1">N Tryon St</SelectItem><SelectItem value="road2">S Tryon St</SelectItem></SelectContent></Select>
                {errors.projectOrRoad && <p className="text-red-500 text-sm mt-1">Select a road.</p>}
                <p className="text-sm text-muted-foreground">Use this when a photo relates to a location more than a single project.</p>
              </div>
            )}

            <div className="space-y-2">
              <Label>Photo Type*</Label>
              <ToggleGroup type="single" value={photoType} onValueChange={(v: PhotoType) => v && setPhotoType(v)} className="justify-start">
                  <ToggleGroupItem value="Before">Before</ToggleGroupItem>
                  <ToggleGroupItem value="During">During</ToggleGroupItem>
                  <ToggleGroupItem value="After">After</ToggleGroupItem>
                  <ToggleGroupItem value="Issue">Issue</ToggleGroupItem>
              </ToggleGroup>
              {errors.photoType && <p className="text-red-500 text-sm mt-1">Select a photo type.</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" placeholder="Add a short note (optional)..." value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>
        )}

        {step === 2 && (
            <UploadStep onBack={handleBack} onUploadComplete={onUploadComplete} />
        )}

        <SheetFooter>
            {step === 1 && (
                <>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleNext}>Next: Upload</Button>
                </>
            )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
