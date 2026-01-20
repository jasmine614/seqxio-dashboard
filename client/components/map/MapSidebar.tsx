
import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "@shared/api";

interface MapSidebarProps {
  pins: MapPin[];
  onPinClick: (pin: MapPin) => void;
}

export function MapSidebar({ pins, onPinClick }: MapSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredPins = useMemo(() => {
    return pins.filter(pin => {
      const matchesSearch = pin.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || pin.status === statusFilter;
      const matchesType = typeFilter === 'All' || pin.type === typeFilter;
      const matchesPriority = priorityFilter === 'All' || pin.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });
  }, [pins, searchTerm, statusFilter, typeFilter, priorityFilter]);

  return (
    <aside className="w-96 bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">Pins</h2>
      </div>
      <div className="p-4 space-y-4">
        <Input placeholder="Search pins..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <div className="grid grid-cols-3 gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
               <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Overflow">Overflow</SelectItem>
                <SelectItem value="Missed pickup">Missed pickup</SelectItem>
                <SelectItem value="Illegal dumping">Illegal dumping</SelectItem>
                <SelectItem value="Blocked access">Blocked access</SelectItem>
                <SelectItem value="Equipment issue">Equipment issue</SelectItem>
                <SelectItem value="Safety hazard">Safety hazard</SelectItem>
                <SelectItem value="General note">General note</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Priorities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredPins.map(pin => (
          <div key={pin.id} className="p-4 border-b hover:bg-gray-50 cursor-pointer" onClick={() => onPinClick(pin)}>
            <div className="flex justify-between">
              <h3 className="font-semibold">{pin.title}</h3>
              <span className={`px-2 py-0.5 text-xs rounded-full ${pin.priority === 'High' ? 'bg-red-200 text-red-800' : pin.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{pin.priority}</span>
            </div>
            <p className="text-sm text-gray-500">{pin.type}</p>
            <p className="text-xs text-gray-400 mt-1">{new Date(pin.createdAt).toLocaleDateString()}</p>
            {pin.linkedProjectId && <p className="text-xs text-blue-500 mt-1">Project: {pin.linkedProjectId}</p>}
          </div>
        ))}
      </div>
    </aside>
  );
}
