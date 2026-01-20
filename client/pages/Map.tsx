import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from "@/components/dashboard/Sidebar";
import { MapSidebar } from "@/components/map/MapSidebar";
import TopBar from "@/components/dashboard/TopBar";
import Map from "@arcgis/core/Map.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import Point from "@arcgis/core/geometry/Point.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import { PinDrawer } from "@/components/map/PinDrawer";
import { AreaDrawer } from "@/components/map/AreaDrawer";
import { Button } from "@/components/ui/button";
import { CreateMapPinRequest, CreateServiceAreaRequest, MapPin, ServiceArea } from "@shared/api";

const samplePins: MapPin[] = [
    { id: '1', title: 'Overflowing Bin', type: 'Overflow', priority: 'High', status: 'Open', lat: 35.2271, lng: -80.8431, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', title: 'Missed Pickup', type: 'Missed pickup', priority: 'Medium', status: 'In progress', lat: 35.2282, lng: -80.8445, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '3', title: 'Illegal Dumping', type: 'Illegal dumping', priority: 'High', status: 'Open', lat: 35.2265, lng: -80.8411, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '4', title: 'Blocked Access', type: 'Blocked access', priority: 'Low', status: 'Resolved', lat: 35.2251, lng: -80.8456, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '5', title: 'Equipment Issue', type: 'Equipment issue', priority: 'Medium', status: 'Open', lat: 35.2291, lng: -80.8462, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];


export default function MapPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewDiv = useRef<HTMLDivElement>(null);
  const viewRef = useRef<SceneView | null>(null);
  const sketchRef = useRef<Sketch | null>(null);
  const pinLayerRef = useRef<GraphicsLayer | null>(null);
  const areaLayerRef = useRef<GraphicsLayer | null>(null);
  const isPinDropModeRef = useRef(false);
  
  const [pins, setPins] = useState<MapPin[]>(samplePins);
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);

  const [isPinDropMode, setIsPinDropMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAreaDrawerOpen, setIsAreaDrawerOpen] = useState(false);
  const [pinLocation, setPinLocation] = useState<Point | null>(null);
  const [areaGeometry, setAreaGeometry] = useState<Polygon | null>(null);
  const [prefilledProjectId, setPrefilledProjectId] = useState<string | undefined>(undefined);

  const addPinToMap = useCallback((pin: MapPin) => {
    if (!pinLayerRef.current) return;
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
    pinLayerRef.current.add(graphic);
  }, []);

  const addAreaToMap = (area: ServiceArea) => {
    if (!areaLayerRef.current) return;
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
    areaLayerRef.current.add(graphic);
  };

  useEffect(() => {
    isPinDropModeRef.current = isPinDropMode;
    if (viewDiv.current) {
      if (isPinDropMode) {
        viewDiv.current.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="black" stroke="white" stroke-width="1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>') 16 30, auto`;
      } else {
        viewDiv.current.style.cursor = "default";
      }
    }
  }, [isPinDropMode]);

  const handleAddPinClick = useCallback(() => {
    setSelectedPin(null);
    setPinLocation(null);
    setIsPinDropMode(true);
    setPrefilledProjectId(undefined);
  }, []);
  const handleDrawAreaClick = useCallback(() => sketchRef.current?.create("polygon"), []);

  const handleSavePin = (pinData: CreateMapPinRequest) => {
    const isUpdating = !!selectedPin;

    if (isUpdating) {
        const updatedPin = { ...selectedPin, ...pinData, updatedAt: new Date().toISOString() };
        setPins(pins.map(p => p.id === updatedPin.id ? updatedPin : p));
    } else {
        const newPin: MapPin = {
            id: (Math.random() * 10000).toString(),
            ...pinData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setPins([...pins, newPin]);
        addPinToMap(newPin);
    }
    setIsDrawerOpen(false);
    setSelectedPin(null);
    setPrefilledProjectId(undefined);
  };
  
  const handleResolvePin = async (pinId: string) => {
    const response = await fetch(`/api/map/pins/${pinId}/resolve`, { method: 'POST' });
    if (response.ok) {
       const resolvedPin = await response.json();
      setPins(pins.map(p => p.id === resolvedPin.id ? resolvedPin : p));
      const graphic = pinLayerRef.current?.graphics.find(g => g.attributes.id === pinId);
      if(graphic) {
        (graphic.symbol as any).color = [100, 100, 100]; // Gray out resolved pin
         Object.assign(graphic.attributes, resolvedPin);
      }
    }
  };

  const handleDeletePin = (pinId: string) => {
      setPins(pins.filter(p => p.id !== pinId));
      const graphic = pinLayerRef.current?.graphics.find(g => g.attributes.id === pinId);
      if (graphic) pinLayerRef.current?.remove(graphic);
      setIsDrawerOpen(false);
      setSelectedPin(null);
  };

  const handleSaveArea = async (areaData: CreateServiceAreaRequest) => {
    const response = await fetch("/api/map/areas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(areaData),
    });
    const newArea = await response.json();
    addAreaToMap(newArea);
  };

  const handlePinClick = useCallback((pin: MapPin) => {
    setSelectedPin(pin);
    setIsDrawerOpen(true);
    setPrefilledProjectId(pin.linkedProjectId);
    viewRef.current?.goTo({ center: [pin.lng, pin.lat], zoom: 15 }, { duration: 1000 });
  }, []);

  useEffect(() => {
    let view: SceneView | null = null;

    if (viewDiv.current) {
      const map = new Map({ basemap: "streets-vector", ground: "world-elevation" });
      pinLayerRef.current = new GraphicsLayer();
      areaLayerRef.current = new GraphicsLayer();
      map.addMany([pinLayerRef.current, areaLayerRef.current]);

      const initialCenter: [number, number] = [-80.8431, 35.2271];
      const initialZoom = 12;

      view = new SceneView({
        container: viewDiv.current,
        map: map,
        center: initialCenter,
        zoom: initialZoom,
        camera: { position: { x: initialCenter[0], y: 35.15, z: 5000 }, tilt: 65 },
      });

      viewRef.current = view;

      const sketch = new Sketch({ layer: areaLayerRef.current, view });
      sketchRef.current = sketch;

      sketch.on("create", (event) => {
        if (event.state === "complete") {
          setAreaGeometry(event.graphic.geometry as Polygon);
          setIsAreaDrawerOpen(true);
          areaLayerRef.current?.remove(event.graphic);
        }
      });

      const clickHandler = view.on("click", (event) => {
        if (isPinDropModeRef.current) {
          event.stopPropagation();
          setPinLocation(new Point({ longitude: event.mapPoint.longitude, latitude: event.mapPoint.latitude }));
          setSelectedPin(null);
          setIsDrawerOpen(true);
          setIsPinDropMode(false);
        } else {
           view.hitTest(event).then(({ results }) => {
            const graphicResult = results.find(r => r.graphic.layer === pinLayerRef.current);
            if (graphicResult) {
              handlePinClick(graphicResult.graphic.attributes as MapPin);
            }
          });
        }
      });

      // Promise.all([
      //   fetch("/api/map/pins").then(res => res.json()),
      //   fetch("/api/map/areas").then(res => res.json())
      // ]).then(([fetchedPins, fetchedAreas]) => {
      //   setPins(fetchedPins);
      //   fetchedPins.forEach(addPinToMap);
      //   fetchedAreas.forEach(addAreaToMap);

        // Handle query params after pins are loaded
        const pinId = searchParams.get('pin');
        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');
        const zoom = searchParams.get('zoom');
        const newPin = searchParams.get('newPin');
        const projectId = searchParams.get('projectId');

        if (pinId) {
          const pinToSelect = samplePins.find(p => p.id === pinId);
          if (pinToSelect) {
            handlePinClick(pinToSelect);
          }
        } else if (lat && lng) {
           view?.goTo({
            center: [parseFloat(lng), parseFloat(lat)],
            zoom: zoom ? parseInt(zoom) : 18
          });
        }

        if (newPin === 'true') {
            setIsPinDropMode(true);
            if (projectId) {
                setPrefilledProjectId(projectId);
            }
        }
        
        // Clean up URL
        if(searchParams.toString() !== ''){
            navigate('/map', { replace: true });
        }
      // });

      samplePins.forEach(addPinToMap);

      return () => {
        clickHandler.remove();
        sketch.destroy();
        view?.destroy();
      };
    }
  }, [addPinToMap, handlePinClick, searchParams, navigate]);

  return (
    <div className="flex gap-4 min-h-screen bg-white p-4">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-[40px] font-medium text-black tracking-tighter">Map</h1>
                <p className="text-xl text-gray-500 tracking-tight">View all projects and roads on the interactive map.</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddPinClick}>Add pin</Button>
                <Button onClick={handleDrawAreaClick} variant="secondary">Draw area</Button>
              </div>
            </div>
            <div className="flex-1 flex gap-6 overflow-hidden">
              <MapSidebar pins={pins} onPinClick={handlePinClick} />
              <div ref={viewDiv} className="flex-1 h-full rounded-lg overflow-hidden" />
            </div>
        </div>
        <PinDrawer 
          isOpen={isDrawerOpen} 
          onOpenChange={(isOpen) => {
            if(!isOpen) {
                setSelectedPin(null);
                setPrefilledProjectId(undefined);
            }
            setIsDrawerOpen(isOpen);
          }} 
          location={pinLocation} 
          pin={selectedPin}
          linkedProjectId={prefilledProjectId}
          onSave={handleSavePin}
          onResolve={handleResolvePin}
          onDelete={handleDeletePin}
        />
        <AreaDrawer isOpen={isAreaDrawerOpen} onOpenChange={setIsAreaDrawerOpen} geometry={areaGeometry} onSave={handleSaveArea} />
      </main>
    </div>
  );
}
