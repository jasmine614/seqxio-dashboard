import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreVertical, Circle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const zones = [
    { name: 'North', roads: 120, projects: 12, color: '#FF0000' },
    { name: 'South', roads: 85, projects: 8, color: '#0000FF' },
    { name: 'East', roads: 150, projects: 15, color: '#008000' },
    { name: 'West', roads: 95, projects: 9, color: '#FFFF00' },
];

const ZoneEditModal = ({ isOpen, onOpenChange, zone }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{zone ? 'Edit Zone' : 'Add Zone'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="zone-name">Zone name</Label>
                        <Input id="zone-name" defaultValue={zone?.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zone-color">Color tag</Label>
                        <Input id="zone-color" type="color" defaultValue={zone?.color || '#000000'} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zone-description">Description</Label>
                        <Textarea id="zone-description" defaultValue={zone?.description} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const ZonesSettings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingZone, setEditingZone] = useState(null);

    const handleAddZone = () => {
        setEditingZone(null);
        setIsModalOpen(true);
    }

    const handleEditZone = (zone) => {
        setEditingZone(zone);
        setIsModalOpen(true);
    }

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Zones</CardTitle>
            <Button onClick={handleAddZone}>Add zone</Button>
        </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Zone Name</TableHead>
              <TableHead>Roads Count</TableHead>
              <TableHead>Active Projects</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zones.map((zone) => (
              <TableRow key={zone.name}>
                <TableCell className="flex items-center gap-2">
                    <Circle size={16} color={zone.color} fill={zone.color} /> 
                    {zone.name}
                </TableCell>
                <TableCell>{zone.roads}</TableCell>
                <TableCell>{zone.projects}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEditZone(zone)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <ZoneEditModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} zone={editingZone} />
    </Card>
  );
}
