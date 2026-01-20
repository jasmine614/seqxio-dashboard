import { MapPin, ServiceArea, CreateMapPinRequest, CreateServiceAreaRequest } from "@shared/api";

// Mock data to simulate a Firestore database
let mockPins: MapPin[] = [
  {
    id: "pin-1",
    title: "Illegal dumping on 5th St",
    type: "Illegal dumping",
    priority: "High",
    status: "Open",
    lat: 35.2271, // Charlotte, NC
    lng: -80.8431,
    notes: "A large pile of construction debris.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "pin-2",
    title: "Missed pickup at South End",
    type: "Missed pickup",
    priority: "Medium",
    status: "In progress",
    lat: 35.222, // Slightly offset
    lng: -80.84,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let mockServiceAreas: ServiceArea[] = [
  {
    id: "area-1",
    name: "Uptown Zone",
    areaType: "Serviced",
    zone: "Zone A",
    status: "Active",
    geometry: {
      type: "polygon",
      rings: [
        [
          [-80.85, 35.23],
          [-80.84, 35.23],
          [-80.84, 35.22],
          [-80.85, 35.22],
          [-80.85, 35.23],
        ],
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// --- Mock Database Service ---

export const getMapPins = async (): Promise<MapPin[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Filter out resolved pins
  return mockPins.filter(p => p.status !== 'Resolved');
};

export const addMapPin = async (data: CreateMapPinRequest): Promise<MapPin> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const now = new Date().toISOString();
  const newPin: MapPin = {
    ...data,
    id: `pin-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
    status: "Open", // Default status
  };
  mockPins.push(newPin);
  return newPin;
};

export const updateMapPin = async (pinId: string, data: Partial<CreateMapPinRequest>): Promise<MapPin | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const pin = mockPins.find(p => p.id === pinId);
  if (pin) {
    Object.assign(pin, data, { updatedAt: new Date().toISOString() });
    return pin;
  }
  return null;
};

export const resolveMapPin = async (pinId: string): Promise<MapPin | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const pin = mockPins.find(p => p.id === pinId);
  if (pin) {
    pin.status = "Resolved";
    pin.updatedAt = new Date().toISOString();
  }
  return pin;
};

export const deleteMapPin = async (pinId: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockPins.findIndex(p => p.id === pinId);
    if (index > -1) {
        mockPins.splice(index, 1);
        return true;
    }
    return false;
};


export const getServiceAreas = async (): Promise<ServiceArea[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Filter out archived areas
  return mockServiceAreas.filter(a => a.status !== 'Archived');
};

export const addServiceArea = async (data: CreateServiceAreaRequest): Promise<ServiceArea> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const now = new Date().toISOString();
  const newArea: ServiceArea = {
    ...data,
    id: `area-${Date.now()}`,
    status: "Active", // Default status
    createdAt: now,
    updatedAt: now,
  };
  mockServiceAreas.push(newArea);
  return newArea;
};

export const updateServiceArea = async (areaId: string, data: Partial<CreateServiceAreaRequest>): Promise<ServiceArea | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const area = mockServiceAreas.find(a => a.id === areaId);
  if (area) {
    Object.assign(area, data, { updatedAt: new Date().toISOString() });
    return area;
  }
  return null;
};

export const archiveServiceArea = async (areaId: string): Promise<ServiceArea | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const area = mockServiceAreas.find(a => a.id === areaId);
  if (area) {
    area.status = "Archived";
    area.updatedAt = new Date().toISOString();
  }
  return area;
};
