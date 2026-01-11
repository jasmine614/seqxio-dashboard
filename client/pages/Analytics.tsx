import { useState } from 'react';
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import DatePickerWithRange from "@/components/dashboard/DateRangePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { PieChartComponent } from "@/components/dashboard/PieChart";
import { BarListChart } from "@/components/dashboard/BarListChart";
import { Leaderboard } from "@/components/dashboard/Leaderboard";

const dailyData = [
    { name: 'Mon', value: 400, projects: 5, unit: 'tons' },
    { name: 'Tue', value: 300, projects: 4, unit: 'tons' },
    { name: 'Wed', value: 200, projects: 3, unit: 'tons' },
    { name: 'Thu', value: 278, projects: 4, unit: 'tons' },
    { name: 'Fri', value: 189, projects: 2, unit: 'tons' },
    { name: 'Sat', value: 239, projects: 3, unit: 'tons' },
    { name: 'Sun', value: 349, projects: 5, unit: 'tons' },
  ];

  const weeklyData = [
    { name: 'Week 1', value: 2400, projects: 25, unit: 'tons' },
    { name: 'Week 2', value: 1398, projects: 20, unit: 'tons' },
    { name: 'Week 3', value: 9800, projects: 30, unit: 'tons' },
    { name: 'Week 4', value: 3908, projects: 28, unit: 'tons' },
  ];

const onTimeData = [
    { name: 'On time', value: 78 },
    { name: 'Late', value: 8 },
    { name: 'In progress', value: 14 },
  ];

const issueData = [
    { name: 'Overflow', value: 32 },
    { name: 'Missed pickup', value: 24 },
    { name: 'Illegal dumping', value: 18 },
    { name: 'Road blocked', value: 12 },
    { name: 'Equipment', value: 8 },
    { name: 'Weather', value: 4 },
    { name: 'Other', value: 2 },
];

const teamData = [
    { name: 'Crew A', value: 128 },
    { name: 'Crew B', value: 112 },
    { name: 'Crew C', value: 98 },
    { name: 'Crew D', value: 84 },
    { name: 'Crew E', value: 72 },
];

const zoneData = [
  { name: 'Zone 1', value: '4.2k', metric: 'tons' },
  { name: 'Zone 2', value: '3.8k', metric: 'tons' },
  { name: 'Zone 3', value: '3.1k', metric: 'tons' },
  { name: 'Zone 4', value: '2.9k', metric: 'tons' },
  { name: 'Zone 5', value: '2.5k', metric: 'tons' },
];

const teamEfficiencyData = [
  { name: 'Crew A', value: '2h 10m', metric: 'avg time' },
  { name: 'Crew B', value: '2h 15m', metric: 'avg time' },
  { name: 'Crew C', value: '2h 20m', metric: 'avg time' },
  { name: 'Crew D', value: '2h 25m', metric: 'avg time' },
  { name: 'Crew E', value: '2h 30m', metric: 'avg time' },
];

export default function Analytics() {
  const [zone, setZone] = useState("all");
  const [team, setTeam] = useState("all");
  const [projectType, setProjectType] = useState("all");
  const [status, setStatus] = useState("all");
  const [compare, setCompare] = useState(false);
  const [wasteUnit, setWasteUnit] = useState('tons');
  const [chartView, setChartView] = useState('daily');
  const [chartUnit, setChartUnit] = useState('tons');

  const filters = {
    zone,
    team,
    projectType,
    status,
  };

  const activeFilters = Object.entries(filters).filter(([, value]) => value !== 'all');

  const clearFilters = () => {
    setZone("all");
    setTeam("all");
    setProjectType("all");
    setStatus("all");
  };

  const chartData = chartView === 'daily' ? dailyData : weeklyData;
  const scaledChartData = chartData.map(d => ({
      ...d,
      value: chartUnit === 'lbs' ? d.value * 2000 : d.value,
      unit: chartUnit
  }));

  return (
    <div className="flex gap-4 min-h-screen bg-white p-4">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
            <div>
              <h1 className="text-[40px] font-medium text-black tracking-tight">Analytics</h1>
              <p className="text-xl text-[#7B9182] font-light tracking-tight">
                Track operational performance across projects, teams, and zones.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <DatePickerWithRange className="w-auto" />
              <div className="flex items-center space-x-2">
                <Checkbox id="compare" checked={compare} onCheckedChange={() => setCompare(!compare)} />
                <Label htmlFor="compare" className="font-normal">Compare to previous period</Label>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="py-4 border-y">
            <div className="flex flex-wrap items-center gap-4">
                <Select value={zone} onValueChange={setZone}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All zones" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All zones</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={team} onValueChange={setTeam}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All teams" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All teams</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                         <SelectItem value="all">All types</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                         <SelectItem value="all">All</SelectItem>
                         <SelectItem value="on-track">On Track</SelectItem>
                         <SelectItem value="at-risk">At Risk</SelectItem>
                         <SelectItem value="delayed">Delayed</SelectItem>
                         <SelectItem value="critical">Critical</SelectItem>
                         <SelectItem value="in-progress">In Progress</SelectItem>
                         <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
                {activeFilters.length > 0 && (
                  <Button variant="link" onClick={clearFilters}>Clear filters</Button>
                )}
            </div>
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {activeFilters.map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1 bg-gray-200 rounded-full px-2 py-1 text-sm">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}: {value}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full"
                      onClick={() => {
                        if (key === 'zone') setZone('all');
                        if (key === 'team') setTeam('all');
                        if (key === 'projectType') setProjectType('all');
                        if (key === 'status') setStatus('all');
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* KPI Summary Row */}
          <div className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <KpiCard 
                    title="Collected Waste"
                    value={wasteUnit === 'tons' ? "1,284.6" : "2,569,200"}
                    subtext="+200 vs previous period"
                    unit={wasteUnit}
                    unitOptions={['tons', 'lbs']}
                    onUnitChange={setWasteUnit}
                />
                <KpiCard 
                    title="Projects Completed"
                    value="86"
                    subtext="92% on-time"
                />
                <KpiCard 
                    title="Avg Completion Time"
                    value="2h 14m"
                    subtext="-8m vs previous period"
                />
                <KpiCard 
                    title="Open Issues"
                    value="12"
                    subtext="Top source: Road hazards"
                />
                 <KpiCard 
                    title="Unassigned Projects"
                    value="3"
                    subtext="Needs dispatch action"
                />
                <KpiCard 
                    title="Active Crews"
                    value="3 / 5"
                    subtext="2 crews currently in field"
                />
            </div>
          </div>

          {/* Main Analytics Grid */}
          <div className="py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TimeSeriesChart 
                data={scaledChartData} 
                view={chartView} 
                unit={chartUnit} 
                onViewChange={setChartView} 
                onUnitChange={setChartUnit}
              />
              <PieChartComponent 
                title="On-Time Completion" 
                data={onTimeData} 
              />
              <BarListChart 
                title="Issue Sources" 
                data={issueData} 
              />
              <BarListChart 
                title="Team Efficiency (Avg Completion Time)" 
                data={teamData} 
              />
            </div>
          </div>

          {/* Leaderboards / Tables */}
          <div className="py-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Leaderboard title="Top Performing Zones (by waste collected)" data={zoneData} />
                <Leaderboard title="Most Efficient Teams (by completion time)" data={teamEfficiencyData} />
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
