import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import MetricCards from "@/components/dashboard/MetricCards";
import ProjectProgress from "@/components/dashboard/ProjectProgress";
import DatePickerWithRange from "@/components/dashboard/DateRangePicker";
import {
  InteractiveMap,
  CalendarWidget as Calendar,
  RecentMedia,
  RoadsList,
  TimeTracker,
} from "@/components/dashboard/DashboardWidgets";
import { AddProjectModal } from "@/components/dashboard/AddProjectModal";

const INITIAL_PROJECT_PROGRESS = [
  { value: 10, name: 'Not Started' },
  { value: 19, name: 'Pending' },
  { value: 30, name: 'In Progress' },
  { value: 41, name: 'Completed' },
];

const INITIAL_METRICS = {
    totalProjects: 24,
    totalProjectsIncrease: 5,
    endedProjects: 10,
    endedProjectsIncrease: 6,
}

export default function Dashboard() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [projectProgressData, setProjectProgressData] = useState(INITIAL_PROJECT_PROGRESS);
  const [metrics, setMetrics] = useState(INITIAL_METRICS);

  const handleProjectCreate = (newProject: any) => {
    // 1. Update KPIs
    setMetrics(prevMetrics => ({
        ...prevMetrics,
        totalProjects: prevMetrics.totalProjects + 1,
        totalProjectsIncrease: prevMetrics.totalProjectsIncrease + 1, // Also increment the indicator
    }));

    // 2. Update Project Progress Chart
    setProjectProgressData(prevData => {
      return prevData.map(item => 
        item.name === 'Not Started' 
          ? { ...item, value: item.value + 1 } 
          : item
      );
    });
  };

  return (
    <div className="flex gap-4 min-h-screen bg-white p-4">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        <TopBar />

        <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8 pb-6 border-b border-[#E0E0E0]">
            <div className="flex-1">
              <h1 className="text-[40px] font-medium text-black mb-4 tracking-tight">
                Dashboard
              </h1>
              <p className="text-xl text-[#7B9182] font-light tracking-tight">
                Monitor and manage waste collection operations in real-time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* <DatePickerWithRange /> */}
              <button
                className="px-5 py-3 bg-gradient-primary text-white rounded-[15px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
                onClick={() => setIsAddProjectModalOpen(true)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" />
                </svg>
                Add Project
              </button>
              <button className="px-5 py-3 bg-white text-[#155234] rounded-[15px] font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                Import Data
              </button>
            </div>
          </div>

          <div className="mb-8">
            <MetricCards {...metrics} />
          </div>

          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProjectProgress data={projectProgressData} />
              <InteractiveMap />
              <Calendar />
              <RecentMedia />
            </div>

            <div className="flex flex-col gap-4 w-full xl:w-[384px] flex-shrink-0">
              <RoadsList />
              <TimeTracker />
            </div>
          </div>
        </div>
      </main>

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onOpenChange={setIsAddProjectModalOpen}
        onProjectCreate={handleProjectCreate}
      />

    </div>
  );
}
