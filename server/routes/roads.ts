
import { RequestHandler } from "express";
import { Road, CreateRoadRequest } from "@shared/api";
import { v4 as uuidv4 } from 'uuid';

// Mock database with more detailed road data for demo
const roads: Road[] = [
    { id: uuidv4(), name: 'N Tryon St', zone: 'Zone A', type: 'Commercial', priority: 'High', status: 'Critical', coverage: 'Full', geometry: [[-80.8431, 35.2271], [-80.8431, 35.2281], [-80.8431, 35.2291]] },
    { id: uuidv4(), name: 'S Tryon St', zone: 'Zone A', type: 'Commercial', priority: 'High', status: 'Critical', coverage: 'Full', geometry: [[-80.8431, 35.2261], [-80.8431, 35.2251], [-80.8431, 35.2241]] },
    { id: uuidv4(), name: 'Independence Blvd', zone: 'Zone B', type: 'Mixed', priority: 'Normal', status: 'Attention', coverage: 'Full', geometry: [[-80.8231, 35.2171], [-80.8221, 35.2171], [-80.8211, 35.2171]] },
    { id: uuidv4(), name: 'Wilkinson Blvd', zone: 'Zone B', type: 'Residential', priority: 'Normal', status: 'On Track', coverage: 'Full', geometry: [[-80.8831, 35.2071], [-80.8841, 35.2071], [-80.8851, 35.2071]] },
    { id: uuidv4(), name: 'Freedom Dr', zone: 'Zone C', type: 'Residential', priority: 'High', status: 'Critical', coverage: 'Full', geometry: [[-80.8731, 35.2371], [-80.8731, 35.2381], [-80.8731, 35.2391]] },
    { id: uuidv4(), name: 'South Blvd', zone: 'Zone C', type: 'Mixed', priority: 'Low', status: 'On Track', coverage: 'Full', geometry: [[-80.8531, 35.1871], [-80.8531, 35.1861], [-80.8531, 35.1851]] },
    { id: uuidv4(), name: 'Central Ave', zone: 'Zone A', type: 'Mixed', priority: 'High', status: 'Critical', coverage: 'Full', geometry: [[-80.8031, 35.2271], [-80.8021, 35.2271], [-80.8011, 35.2271]] },
    { id: uuidv4(), name: 'Eastway Dr', zone: 'Zone B', type: 'Residential', priority: 'Normal', status: 'Attention', coverage: 'Full', geometry: [[-80.7831, 35.2471], [-80.7831, 35.2481], [-80.7831, 35.2491]] },
    { id: uuidv4(), name: 'Plaza Rd', zone: 'Zone A', type: 'Commercial', priority: 'Normal', status: 'On Track', coverage: 'Full', geometry: [[-80.7931, 35.2371], [-80.7921, 35.2371], [-80.7911, 35.2371]] },
    { id: uuidv4(), name: 'Sharon Rd', zone: 'Zone C', type: 'Residential', priority: 'Low', status: 'On Track', coverage: 'Full', geometry: [[-80.8531, 35.1571], [-80.8541, 35.1571], [-80.8551, 35.1571]] },
    { id: uuidv4(), name: 'Park Rd', zone: 'Zone B', type: 'Mixed', priority: 'Normal', status: 'On Track', coverage: 'Full', geometry: [[-80.8531, 35.1771], [-80.8541, 35.1771], [-80.8551, 35.1771]] },
    { id: uuidv4(), name: 'Providence Rd', zone: 'Zone C', type: 'Residential', priority: 'High', status: 'Attention', coverage: 'Full', geometry: [[-80.8231, 35.1971], [-80.8231, 35.1961], [-80.8231, 35.1951]] },
];

export const getRoads: RequestHandler = (req, res) => {
  res.json(roads);
};

export const createRoad: RequestHandler = (req, res) => {
    const { name, zone, type, priority, coverage, geometry } = req.body as CreateRoadRequest;

    if (!name || !zone) {
        return res.status(400).json({ message: 'Road name and zone are required.' });
    }

    const newRoad: Road = {
        id: uuidv4(),
        name,
        zone,
        type,
        priority,
        status: 'On Track',
        coverage,
        geometry
    };

    roads.unshift(newRoad);

    res.status(201).json(newRoad);
};
