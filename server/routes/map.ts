
import { RequestHandler } from "express";
import {
  getMapPins,
  addMapPin,
  updateMapPin,
  resolveMapPin,
  deleteMapPin,
  getServiceAreas,
  addServiceArea,
  updateServiceArea,
  archiveServiceArea,
} from "../services/database";
import { CreateMapPinRequest, CreateServiceAreaRequest } from "@shared/api";

export const handleGetMapPins: RequestHandler = async (req, res) => {
  const pins = await getMapPins();
  res.json(pins);
};

export const handleAddMapPin: RequestHandler = async (req, res) => {
  const data: CreateMapPinRequest = req.body;
  const newPin = await addMapPin(data);
  res.status(201).json(newPin);
};

export const handleUpdateMapPin: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const data: Partial<CreateMapPinRequest> = req.body;
  const updatedPin = await updateMapPin(id, data);
  if (updatedPin) {
    res.json(updatedPin);
  } else {
    res.status(404).json({ message: "Pin not found" });
  }
};

export const handleResolveMapPin: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const resolvedPin = await resolveMapPin(id);
  if (resolvedPin) {
    res.json(resolvedPin);
  } else {
    res.status(404).json({ message: "Pin not found" });
  }
};

export const handleDeleteMapPin: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const success = await deleteMapPin(id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Pin not found" });
  }
};

export const handleGetServiceAreas: RequestHandler = async (req, res) => {
  const areas = await getServiceAreas();
  res.json(areas);
};

export const handleAddServiceArea: RequestHandler = async (req, res) => {
  const data: CreateServiceAreaRequest = req.body;
  const newArea = await addServiceArea(data);
  res.status(201).json(newArea);
};

export const handleUpdateServiceArea: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const data: Partial<CreateServiceAreaRequest> = req.body;
  const updatedArea = await updateServiceArea(id, data);
  if (updatedArea) {
    res.json(updatedArea);
  } else {
    res.status(404).json({ message: "Area not found" });
  }
};

export const handleArchiveServiceArea: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const success = await archiveServiceArea(id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Area not found" });
  }
};
