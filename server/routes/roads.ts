import { RequestHandler } from "express";
import { Road, CreateRoadRequest } from "@shared/api";
import { v4 as uuidv4 } from 'uuid';

// Mock database with more detailed road data for demo
const roads: Road[] = [
    { id: uuidv4(), name: 'N Tryon St', zone: 'Zone A', type: 'Commercial', priority: 'High', status: 'Critical' },
    { id: uuidv4(), name: 'S Tryon St', zone: 'Zone A', type: 'Commercial', priority: 'High', status: 'Critical' },
    { id: uuidv4(), name: 'Independence Blvd', zone: 'Zone B', type: 'Mixed', priority: 'Normal', status: 'Attention' },
    { id: uuidv4(), name: 'Wilkinson Blvd', zone: 'Zone B', type: 'Residential', priority: 'Normal', status: 'On Track' },
    { id: uuidv4(), name: 'Freedom Dr', zone: 'Zone C', type: 'Residential', priority: 'High', status: 'Critical' },
    { id: uuidv4(), name: 'South Blvd', zone: 'Zone C', type: 'Mixed', priority: 'Low', status: 'On Track' },
    { id: uuidv4(), name: 'Central Ave', zone: 'Zone A', type: 'Mixed', priority: 'High', status: 'Critical' },
    { id: uuidv4(), name: 'Eastway Dr', zone: 'Zone B', type: 'Residential', priority: 'Normal', status: 'Attention' },
    { id: uuidv4(), name: 'Plaza Rd', zone: 'Zone A', type: 'Commercial', priority: 'Normal', status: 'On Track' },
    { id: uuidv4(), name: 'Sharon Rd', zone: 'Zone C', type: 'Residential', priority: 'Low', status: 'On Track' },
    { id: uuidv4(), name: 'Park Rd', zone: 'Zone B', type: 'Mixed', priority: 'Normal', status: 'On Track' },
    { id: uuidv4(), name: 'Providence Rd', zone: 'Zone C', type: 'Residential', priority: 'High', status: 'Attention' },
];

export const getRoads: RequestHandler = (req, res) => {
  res.json(roads);
};

export const createRoad: RequestHandler = (req, res) => {
    const { name, zone, type, priority, coverage } = req.body as CreateRoadRequest;

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
        coverage
    };

    roads.unshift(newRoad); // Add to the beginning of the list

    res.status(201).json(newRoad);
};
