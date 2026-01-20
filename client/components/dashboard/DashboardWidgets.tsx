import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { RoadDetailsPanel } from "./RoadDetailsPanel";
import { Road, MapPin, ServiceArea, CreateRoadRequest } from "@shared/api";
import Map from "@arcgis/core/Map.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import Point from "@arcgis/core/geometry/Point.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import { AddRoadSheet } from "./AddRoadSheet";
import { Button } from "@/components/ui/button";
import { UploadMediaSheet } from "./UploadMediaSheet";
import { CalendarNoteModal } from "./CalendarNoteModal";

const samplePins: MapPin[] = [
    { id: '1', title: 'Overflowing Bin', type: 'Overflow', priority: 'High', status: 'Open', lat: 35.2271, lng: -80.8431, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', title: 'Missed Pickup', type: 'Missed pickup', priority: 'Medium', status: 'In progress', lat: 35.2282, lng: -80.8445, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '3', title: 'Illegal Dumping', type: 'Illegal dumping', priority: 'High', status: 'Open', lat: 35.2265, lng: -80.8411, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '4', title: 'Blocked Access', type: 'Blocked access', priority: 'Low', status: 'Resolved', lat: 35.2251, lng: -80.8456, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '5', title: 'Equipment Issue', type: 'Equipment issue', priority: 'Medium', status: 'Open', lat: 35.2291, lng: -80.8462, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const sampleRoads: Road[] = [
    { id: "1", name: "Maple Street", status: "On Track", type: "Residential", priority: "Normal", coverage: "Full" },
    { id: "2", name: "Oak Avenue", status: "Attention", type: "Residential", priority: "High", coverage: "Partial" },
    { id: "3", name: "Pine Lane", status: "Critical", type: "Commercial", priority: "High", coverage: "Full" },
    { id: "4", name: "Cedar Boulevard", status: "On Track", type: "Highway", priority: "Normal", coverage: "Full" },
    { id: "5", name: "Elm Drive", status: "Attention", type: "Mixed", priority: "Low", coverage: "None" },
];

// Interactive Map Component
export function InteractiveMap() {
  const viewDiv = useRef<HTMLDivElement>(null);
  
  const addPinToMap = useCallback((pin: MapPin, layer: GraphicsLayer) => {
    if (!layer) return;
    const point = new Point({ longitude: pin.lng, latitude: pin.lat });
    const graphic = new Graphic({
      geometry: point,
      symbol: {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: { color: [255, 255, 255], width: 2 },
      },
      attributes: { id: pin.id, ...pin },
    });
    layer.add(graphic);
  }, []);

  const addAreaToMap = (area: ServiceArea, layer: GraphicsLayer) => {
    if (!layer) return;
    const polygon = new Polygon(area.geometry);
    const graphic = new Graphic({
      geometry: polygon,
      symbol: {
        type: "simple-fill",
        color: [51, 153, 255, 0.4],
        outline: { color: [255, 255, 255], width: 1 },
      },
      attributes: area,
    });
    layer.add(graphic);
  };

  useEffect(() => {
    let view: SceneView | null = null;

    if (viewDiv.current) {
      const map = new Map({ basemap: "streets-vector", ground: "world-elevation" });
      const pinLayer = new GraphicsLayer();
      const areaLayer = new GraphicsLayer();
      map.addMany([pinLayer, areaLayer]);

      view = new SceneView({
        container: viewDiv.current,
        map: map,
        center: [-80.8431, 35.2271],
        zoom: 12,
        camera: { position: { x: -80.8431, y: 35.15, z: 5000 }, tilt: 65 },
        interaction: {
          browserTouchPanEnabled: false,
          mouseWheelZoomEnabled: false,
          dragEnabled: false,
          doubleClickZoomEnabled: false
        }
      });
      
      view.ui.components = [];
      
      // Promise.all([
      //   fetch("/api/map/pins").then(res => res.json()),
      //   fetch("/api/map/areas").then(res => res.json())
      // ]).then(([fetchedPins, fetchedAreas]) => {
      //   fetchedPins.forEach((pin: MapPin) => addPinToMap(pin, pinLayer));
      //   fetchedAreas.forEach((area: ServiceArea) => addAreaToMap(area, areaLayer));
      // });

      samplePins.forEach((pin) => addPinToMap(pin, pinLayer));

      return () => {
        view?.destroy();
      };
    }
  }, [addPinToMap, addAreaToMap]);

  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] flex-1 min-h-[244px] w-full border border-[#E0E0E0]">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium tracking-tight text-black">Interactive Map</h3>
            <Link to="/map" className="flex items-center gap-2 px-3 py-1 border border-[#E0E0E0] bg-white text-[#155234] rounded-md font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-expand"><path d="m21 21-6-6m6 6v-4.5m0 4.5h-4.5"/><path d="M3 3l6 6m-6-6v4.5m0-4.5h4.5"/><path d="M21 3l-6 6m6-6v4.5m0-4.5h-4.5"/><path d="M3 21l6-6m-6 6v-4.5m0 4.5h-4.5"/></svg>
            </Link>
        </div>
      <Link to="/map" className="relative flex-1 rounded-lg overflow-.hidden">
        <div ref={viewDiv} className="w-full h-full" />
      </Link>
    </div>
  );
}

// Calendar Component
export function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] w-full min-h-[328px] border border-[#E0E0E0]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-tight text-black">Calendar</h3>
      </div>
      <Calendar onClickDay={handleDateSelect} value={date} />
      {date && <CalendarNoteModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} date={date} />}
    </div>
  );
}


// Recent Media Component
export function RecentMedia() {
  const { toast } = useToast();
  const [isUploadSheetOpen, setIsUploadSheetOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const [mediaItems, setMediaItems] = useState([
    'https://api.builder.io/api/v1/image/assets/TEMP/ae3ea0ebadce275085346740841b7a399cda06a2?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/db5ea06f2e63708c77c94149b3fb1c8b5ffe1a82?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/b95e03757042160a1ae8a88309b7701449ab353c?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/af38498e5efcd065058db974fda3c854adc35b43?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/39bea0370b686b6abe41042784904460cf484d7a?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/e3aa30a1948814b04a683c0f6c13bce38051b4ff?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/fae42277ab1f6cca094539333ca402b070e36a?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/b543e7c792bd22ab44f6d0dce133e2397ed02bf3?width=194',
    'https://api.builder.io/api/v1/image/assets/TEMP/f3550ade64661ae1bff5b79cf451b993e1745750?width=209',
    'https://api.builder.io/api/v1/image/assets/TEMP/80c0a6b9e9013895614f237522b009f0ab75038c?width=209',
    'https.googleapis.com/v0/b/app-storage-931e5.appspot.com/o/2024-07-25T14-11-20.211Z_3c8a70844907d8d0a91bd650c0bdfcccab79c22b?alt=media&token=26d1a6d4-8d9e-4e8c-843c-3e6181f08e50',
    'https://api.builder.io/api/v1/image/assets/TEMP/31e9fb55eb3e001f6e9763af5d4bb00e8dd3bac1?width=258',
  ]);

  const handleUploadComplete = (newMedia: string[]) => {
    setMediaItems(prevMedia => [...newMedia, ...prevMedia]);
    setIsUploadSheetOpen(false); // Close the sheet
    toast({ title: "Upload successful", description: "Your media has been added." });
  };

  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] flex-1 min-h-[328px] w-full border border-[#E0E0E0]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium tracking-tight text-black">Recent Media</h3>
        <div className="flex items-center gap-4">
            <Button variant="secondary" onClick={() => setIsGalleryOpen(true)}>
                View All
            </Button>
            <button
            className="flex items-center gap-2 px-5 py-2 border border-[#E0E0E0] bg-white text-[#155234] rounded-[15px] font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
            onClick={() => setIsUploadSheetOpen(true)}
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#155234"/>
                </svg>
                <span className="text-base font-medium text-[#155234] tracking-tight">Upload</span>
            </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 flex-1">
        {mediaItems.slice(0, 12).map((item, i) => (
          <div key={i} className="relative aspect-square rounded bg-gray-200 overflow-hidden">
            <img src={item} alt={`Media ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <UploadMediaSheet 
        isOpen={isUploadSheetOpen} 
        onOpenChange={setIsUploadSheetOpen} 
        onUploadComplete={handleUploadComplete}
      />

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-7xl">
            <DialogHeader>
                <DialogTitle>Media Gallery</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-h-[80vh] overflow-y-auto">
                {mediaItems.map((item, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                    <img src={item} alt={`Media ${i + 1}`} className="w-full h-full object-cover" />
                </div>
                ))}
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Roads List Component
export function RoadsList() {
  const [isAddRoadOpen, setIsAddRoadOpen] = useState(false);
  const [roads, setRoads] = useState<Road[]>(sampleRoads);
  const [selectedRoad, setSelectedRoad] = useState<Road | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // useEffect(() => {
  //   const fetchRoads = async () => {
  //       try {
  //           const response = await fetch('/api/roads');
  //           if(response.ok) {
  //               const data = await response.json();
  //               setRoads(data);
  //           }
  //       } catch (error) {
  //           console.error("Failed to fetch roads:", error);
  //       }
  //   };
  //   fetchRoads();
  // }, []);

  const getStatusColor = (status: Road["status"]) => {
    switch (status) {
      case 'Critical':
        return 'bg-[#DA383A]';
      case 'Attention':
        return 'bg-[#FFAA2A]';
      case 'On Track':
        return 'bg-[#227D53]';
      default:
        return 'bg-gray-400';
    }
  };

  const handleRoadClick = (road: Road) => {
    setSelectedRoad(road);
    setIsPanelOpen(true);
  };

  const handleAddRoad = (road: CreateRoadRequest) => {
    const newRoad: Road = {
        id: (Math.random() * 10000).toString(),
        ...road,
    };
    setRoads([newRoad, ...roads]);
  };

  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded-[15px] h-[550px] border border-[#E0E0E0]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium tracking-tight text-black">Roads</h3>
        <button
          className="flex items-center gap-2 px-5 py-2 border border-[#E0E0E0] bg-white text-[#155234] rounded-[15px] font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
          onClick={() => setIsAddRoadOpen(true)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#155234"/>
          </svg>
          <span className="text-base font-medium text-[#155234] tracking-tight">New</span>
        </button>
      </div>
      
      <div className="flex flex-col justify-between flex-1 overflow-y-auto">
        {roads.length > 0 ? (
          roads.map((road) => (
            <div key={road.id} className="flex items-center justify-between py-1 cursor-pointer hover:bg-gray-50" onClick={() => handleRoadClick(road)}>
              <span className="text-base text-black tracking-tight">{road.name}</span>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(road.status)}`}></div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center text-muted-foreground h-full">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6M9 19H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-4m-6 0v-6a2 2 0 012-2h2a2 2 0 012 2v6"></path></svg>
            <h4 className="font-semibold text-lg">No roads added yet</h4>
            <p className="text-sm">Add roads to monitor collection status and activity.</p>
            <Button className="mt-4" onClick={() => setIsAddRoadOpen(true)}>
              + Add Road
            </Button>
          </div>
        )}
      </div>

      <AddRoadSheet isOpen={isAddRoadOpen} onOpenChange={setIsAddRoadOpen} onAddRoad={handleAddRoad} />
      <RoadDetailsPanel road={selectedRoad} isOpen={isPanelOpen} onOpenChange={setIsPanelOpen} />
    </div>
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
                <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
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
