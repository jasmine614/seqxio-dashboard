import { useState, useEffect } from "react";
import { Calendar as NewCalendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useToast } from "@/components/ui/use-toast";
import { MediaFile } from "@/components/dashboard/UploadMediaModal";
import { Road, CreateRoadRequest } from "@shared/api";
import { RoadDetailsPanel } from "./RoadDetailsPanel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CalendarNoteModal } from "@/components/dashboard/CalendarNoteModal";
import { ScrollArea } from "@/components/ui/scroll-area";

// Interactive Map Component
export function InteractiveMap() {
  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] flex-1 min-h-[244px] w-full border border-[#E0E0E0]">
      <h3 className="text-xl font-medium tracking-tight text-black">Interactive Map</h3>
      <div className="relative flex-1 rounded-lg overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/c9690b37b21119ac8a712fb675a74be521572146?width=616"
          alt="Interactive Map"
          className="w-full h-full object-cover"
        />
        {/* Map Markers */}
        <div className="absolute top-12 left-4 w-6 h-6 bg-[#155234]/40 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">2</span>
        </div>
        <div className="absolute top-2 left-[150px] w-6 h-6 bg-[#FFAA2A]/40 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">6</span>
        </div>
        <div className="absolute top-8 right-12 w-9 h-9 bg-[#FF3939]/50 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">12</span>
        </div>
      </div>
    </div>
  );
}

// Calendar Component
export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setIsNoteModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] w-full min-h-[328px] border border-[#E0E0E0]">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold tracking-tight text-black">Calendar</h3>
        </div>
        <NewCalendar
          onChange={handleDateSelect}
          value={date}
        />
      </div>
      {date && 
        <CalendarNoteModal 
          isOpen={isNoteModalOpen} 
          onOpenChange={setIsNoteModalOpen} 
          date={date}
        />
      }
    </>
  );
}

interface RecentMediaProps {
    mediaItems: MediaFile[];
    onUploadClick: () => void;
}

const DEMO_MEDIA: MediaFile[] = [
    { id: 'demo-1', url: 'https://api.builder.io/api/v1/image/assets/TEMP/ae3ea0ebadce275085346740841b7a399cda06a2?width=209', type: 'photo', name: 'demo-photo-1.jpg', size: '1.2 MB' },
    { id: 'demo-2', url: 'https://api.builder.io/api/v1/image/assets/TEMP/db5ea06f2e63708c77c94149b3fb1c8b5ffe1a82?width=209', type: 'photo', name: 'demo-photo-2.jpg', size: '2.3 MB' },
    { id: 'demo-3', url: 'https://api.builder.io/api/v1/image/assets/TEMP/b95e03757042160a1ae8a88309b7701449ab353c?width=209', type: 'photo', name: 'demo-photo-3.jpg', size: '4.5 MB' },
    { id: 'demo-4', url: 'https://api.builder.io/api/v1/image/assets/TEMP/af38498e5efcd065058db974fda3c854adc35b43?width=209', type: 'photo', name: 'demo-photo-4.jpg', size: '3.1 MB' },
    { id: 'demo-5', url: 'https://api.builder.io/api/v1/image/assets/TEMP/39bea0370b686b6abe41042784904460cf484d7a?width=209', type: 'photo', name: 'demo-photo-5.jpg', size: '2.8 MB' },
    { id: 'demo-6', url: 'https://api.builder.io/api/v1/image/assets/TEMP/e3aa30a1948814b04a683c0f6c13bce38051b4ff?width=209', type: 'photo', name: 'demo-photo-6.jpg', size: '5.0 MB' },
    { id: 'demo-7', url: 'https://api.builder.io/api/v1/image/assets/TEMP/fae42277ab1f6cca09453939333ca402b070e36a?width=209', type: 'photo', name: 'demo-photo-7.jpg', size: '1.8 MB' },
    { id: 'demo-8', url: 'https://api.builder.io/api/v1/image/assets/TEMP/b543e7c792bd22ab44f6d0dce133e2397ed02bf3?width=194', type: 'photo', name: 'demo-photo-8.jpg', size: '2.1 MB' },
    { id: 'demo-9', url: 'https://api.builder.io/api/v1/image/assets/TEMP/f3550ade64661ae1bff5b79cf451b993e1745750?width=209', type: 'photo', name: 'demo-photo-9.jpg', size: '3.3 MB' },
    { id: 'demo-10', url: 'https://api.builder.io/api/v1/image/assets/TEMP/80c0a6b9e9013895614f237522b009f0ab75038c?width=209', type: 'photo', name: 'demo-photo-10.jpg', size: '4.2 MB' },
    { id: 'demo-11', url: 'https://api.builder.io/api/v1/image/assets/TEMP/31e9fb55eb3e001f6e9763af5d4bb00e8dd3bac1?width=258', type: 'photo', name: 'demo-photo-11.jpg', size: '2.7 MB' },
    { id: 'demo-12', url: 'https://plus.unsplash.com/premium_photo-1664303499354-9533d1c480d9?q=80&w=2832&auto=format&fit=crop', type: 'photo', name: 'demo-photo-12.jpg', size: '3.5 MB' },
];


// Recent Media Component
export function RecentMedia({ mediaItems, onUploadClick }: RecentMediaProps) {

  const combinedMedia = [
    ...mediaItems,
    ...DEMO_MEDIA.filter(demoItem => !mediaItems.some(item => item.id === demoItem.id))
  ].slice(0, 12);

  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] flex-1 min-h-[328px] w-full border border-[#E0E0E0]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium tracking-tight text-black">Recent Media</h3>
        <button
          className="flex items-center gap-2 px-5 py-2 border border-[#E0E0E0] bg-white text-[#155234] rounded-[15px] font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
          onClick={onUploadClick}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#155234"/>
          </svg>
          <span className="text-.base font-medium text-[#155234] tracking-tight">Upload</span>
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 flex-1">
        {combinedMedia.map((media) => (
          <div key={media.id} className="relative aspect-square rounded bg-gray-200 overflow-hidden">
            <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface AddRoadModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onRoadAdd: (road: Road) => void;
}

const initialFormState = {
    roadName: '',
    zone: '',
    roadType: 'Residential',
    priority: 'Normal' as 'Low' | 'Normal' | 'High',
    defineCoverage: false,
};

function AddRoadModal({ isOpen, onOpenChange, onRoadAdd }: AddRoadModalProps) {
  const { toast } = useToast();
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.roadName) newErrors.roadName = 'Road name is required.';
    if (!formState.zone) newErrors.zone = 'Select a zone.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddRoad = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    const newRoad: CreateRoadRequest = {
        name: formState.roadName,
        zone: formState.zone,
        type: formState.roadType,
        priority: formState.priority,
        coverage: formState.defineCoverage ? { mock: true } : undefined,
    };

    try {
      const response = await fetch('/api/roads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoad),
      });

      if (!response.ok) {
        throw new Error('Failed to add road');
      }

      const createdRoad: Road = await response.json();
      
      onRoadAdd(createdRoad);
      toast({
        title: 'Road added',
        description: `"${createdRoad.name}" is now available for tracking.`,
      });
      onOpenChange(false);

    } catch (err) {
      setErrors({ form: 'Couldn’t add road. Please try again.' })
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
        setFormState(initialFormState);
        setErrors({});
    }
  }, [isOpen]);

  const handleFieldChange = (field: keyof typeof formState, value: any) => {
    setFormState(prevState => ({ ...prevState, [field]: value }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Road</SheetTitle>
          <SheetDescription>Add a road to track collection status and activity.</SheetDescription>
        </SheetHeader>
        
        {errors.form && (
             <div className="bg-destructive/10 border border-destructive/50 text-destructive p-3 rounded-md my-4 text-sm">
                <h4 className="font-semibold">Couldn’t add road</h4>
                <p>{errors.form}</p>
                <Button variant="link" className="p-0 h-auto mt-1" onClick={handleAddRoad}>Retry</Button>
            </div>
        )}

        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="road-name">Road Name*</Label>
            <Input id="road-name" placeholder="e.g., Independence Blvd" value={formState.roadName} onChange={(e) => handleFieldChange('roadName', e.target.value)} />
            {errors.roadName && <p className="text-sm text-destructive">{errors.roadName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="zone">Zone / Area*</Label>
            <Select value={formState.zone} onValueChange={(value) => handleFieldChange('zone', value)}>
              <SelectTrigger id="zone"><SelectValue placeholder="Select a zone" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="zone-a">Zone A</SelectItem>
                <SelectItem value="zone-b">Zone B</SelectItem>
                <SelectItem value="zone-c">Zone C</SelectItem>
              </SelectContent>
            </Select>
            {errors.zone ? <p className="text-sm text-destructive">{errors.zone}</p> : <p className="text-sm text-muted-foreground">Used for filtering, reporting, and map views.</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="road-type">Road Type</Label>
            <Select value={formState.roadType} onValueChange={(value) => handleFieldChange('roadType', value)}>
              <SelectTrigger id="road-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <SegmentedControl
                options={[{value: 'Low', label: 'Low'}, {value: 'Normal', label: 'Normal'}, {value: 'High', label: 'High'}]}
                value={formState.priority}
                onChange={(val) => handleFieldChange('priority', val as 'Low' | 'Normal' | 'High')}
            />
            <p className="text-sm text-muted-foreground">Priority helps determine attention when issues occur.</p>
          </div>

          <div className="space-y-4">
              <div className="flex items-center space-x-2">
                  <Checkbox id="define-coverage" checked={formState.defineCoverage} onCheckedChange={(checked) => handleFieldChange('defineCoverage', Boolean(checked))} />
                  <Label htmlFor="define-coverage" className="font-normal">Define coverage area on map</Label>
              </div>
              {formState.defineCoverage && (
                  <div className="p-4 border rounded-md space-y-3">
                      <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                          <p className="text-sm text-muted-foreground">Map preview placeholder</p>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">Draw or mark the road area for reference (optional for demo).</p>
                      <div className="flex justify-end space-x-2">
                          <Button variant="ghost">Clear</Button>
                          <Button variant="secondary">Save area</Button>
                      </div>
                  </div>
              )}
          </div>
        </div>

        <SheetFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
          <Button onClick={handleAddRoad} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Road'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// Roads List Component
export function RoadsList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [roads, setRoads] = useState<Road[]>([]);
  const [selectedRoad, setSelectedRoad] = useState<Road | null>(null);

  useEffect(() => {
    const fetchRoads = async () => {
        try {
            const response = await fetch('/api/roads');
            if (response.ok) {
                const data = await response.json();
                setRoads(data);
            }
        } catch (error) {
            console.error("Failed to fetch roads", error);
        }
    };
    fetchRoads();
  }, []);

  const handleRoadClick = (road: Road) => {
    setSelectedRoad(road);
    setIsDetailsPanelOpen(true);
  };

  const handleRoadAdd = (newRoad: Road) => {
    setRoads(prevRoads => [newRoad, ...prevRoads]);
  };

  const getStatusColor = (status: Road['status']) => {
    switch (status) {
      case 'Critical': return 'bg-red-500';
      case 'Attention': return 'bg-yellow-500';
      case 'On Track': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusTooltip = (status: Road['status']) => {
      switch (status) {
          case 'Critical': return 'Critical issue';
          case 'Attention': return 'Attention required';
          case 'On Track': return 'On Track';
          default: return 'Unknown status';
      }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] flex-1 min-h-0 border border-[#E0E0E0]">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium tracking-tight text-black">Roads</h3>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full px-4 py-2 border-gray-300"
            onClick={() => setIsAddModalOpen(true)}
          >
             <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#155234"/>
            </svg>
            <span className="text-sm font-medium">New</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 -mr-4 pr-4">
            <div className="flex flex-col h-full">
            {roads.length > 0 ? (
                roads.map((road) => (
                <div 
                    key={road.id} 
                    className="flex items-center justify-between py-2 px-2 -mx-2 rounded-md cursor-pointer hover:bg-gray-100 group"
                    onClick={() => handleRoadClick(road)}
                >
                    <Tooltip>
                        <TooltipTrigger className="truncate text-left">
                            <span className="text-base font-medium text-black tracking-tight truncate pr-2">{road.name}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{road.name}</p>
                        </TooltipContent>
                    </Tooltip>
                    <div className="flex items-center gap-2">
                        {road.issues && road.issues.length > 0 && <Badge variant="secondary">Issues</Badge>}
                        <Tooltip>
                            <TooltipTrigger>
                            <div className={cn("w-3 h-3 rounded-full group-hover:animate-pulse", getStatusColor(road.status))}></div>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>{getStatusTooltip(road.status)}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-center text-muted-foreground">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6M9 19H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-4m-6 0v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>
                    <h4 className="font-semibold text-lg">No roads added yet</h4>
                    <p className="text-sm">Add roads to monitor collection status and activity.</p>
                    <Button className="mt-4" onClick={() => setIsAddModalOpen(true)}>+ Add Road</Button>
                </div>
            )}
            </div>
        </ScrollArea>

        <AddRoadModal isOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen} onRoadAdd={handleRoadAdd} />
        <RoadDetailsPanel road={selectedRoad} isOpen={isDetailsPanelOpen} onOpenChange={setIsDetailsPanelOpen} />
      </div>
    </TooltipProvider>
  );
}


// Time Tracker Component
export function TimeTracker() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(true);
    setTime(0);
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');
  };

  return (
    <div className="flex flex-col justify-between p-4 bg-gradient-to-br from-[#030603] to-[#024C02] rounded-[15px] h-[224px] relative overflow-hidden"
      style={{
        backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/7bfc782dbe954083afb3e77a3ed5dd34a5f5a7c0?width=530')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h3 className="text-xl font-medium text-white tracking-tight">Time Tracker</h3>
      <p className="text-[40px] font-medium text-white text-center leading-none tracking-tighter">
        {formatTime(time)}
      </p>
      <div className="flex items-center justify-center gap-2">
        {!isActive ? (
          <button onClick={handleStart} className="w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform">
            <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="27.5" cy="27.5" r="24.75" fill="#227D53" stroke="#227D53" strokeWidth="5.5"/>
              <path d="M20 18L38 27.5L20 37V18Z" fill="white"/>
            </svg>
          </button>
        ) : (
          <>
            <button onClick={handlePauseResume} className="w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform">
              {isPaused ? (
                <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="27.5" cy="27.5" r="24.75" fill="#227D53" stroke="#227D53" strokeWidth="5.5"/>
                  <path d="M20 18L38 27.5L20 37V18Z" fill="white"/>
                </svg>
              ) : (
                <svg width="45" height="45" viewBox="0 0 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.0312 0C9.87 0 0 10.08 0 22.5C0 34.92 9.87 45 22.0312 45C34.1925 45 44.0625 34.92 44.0625 22.5C44.0625 10.08 34.1925 0 22.0312 0ZM19.8281 31.5H15.4219V13.5H19.8281V31.5ZM28.6406 31.5H24.2344V13.5H28.6406V31.5Z" fill="white"/>
                </svg>
              )}
            </button>
            <button onClick={handleStop} className="w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform">
              <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="27.5" cy="27.5" r="24.75" fill="#DA383A" stroke="#DA383A" strokeWidth="5.5"/>
                <rect x="17" y="18" width="19" height="19" rx="2" fill="white"/>
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
