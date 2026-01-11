import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const teams = [
    { name: 'Crew A', zone: 'North', members: 4, status: 'Active' },
    { name: 'Crew B', zone: 'South', members: 5, status: 'Active' },
    { name: 'Crew C', zone: 'East', members: 3, status: 'Inactive' },
];

const TeamEditModal = ({ isOpen, onOpenChange, team }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{team ? 'Edit Team' : 'Add Team'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="team-name">Team name</Label>
                        <Input id="team-name" defaultValue={team?.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="team-zone">Default zone</Label>
                        <Input id="team-zone" defaultValue={team?.zone} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="team-active">Active</Label>
                        <Switch id="team-active" defaultChecked={team?.status === 'Active'} />
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

export const TeamSettings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeam, setEditingTeam] = useState(null);

    const handleAddTeam = () => {
        setEditingTeam(null);
        setIsModalOpen(true);
    }

    const handleEditTeam = (team) => {
        setEditingTeam(team);
        setIsModalOpen(true);
    }

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Teams</CardTitle>
            <Button onClick={handleAddTeam}>Add team</Button>
        </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team name</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.name}>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.zone}</TableCell>
                <TableCell>{team.members}</TableCell>
                <TableCell>{team.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEditTeam(team)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <TeamEditModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} team={editingTeam} />
    </Card>
  );
}
