import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import MetricCards from "@/components/dashboard/MetricCards";
import ProjectProgress from "@/components/dashboard/ProjectProgress";
import DatePickerWithRange from "@/components/dashboard/DateRangePicker";
import {
  InteractiveMap,
  Calendar,
  RecentMedia,
  RoadsList,
  TimeTracker,
} from "@/components/dashboard/DashboardWidgets";
import { AddProjectModal } from "@/components/dashboard/AddProjectModal";
import { UploadMediaModal, MediaFile } from "@/components/dashboard/UploadMediaModal";

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

const INITIAL_MEDIA_ITEMS: MediaFile[] = [
    { id: '1', url: 'https://images.unsplash.com/photo-1622396481328-9c1b782dd46e?q=80&w=2940&auto=format&fit=crop', type: 'photo', name: 'photo-1.jpg', size: '4.1 MB' },
    { id: '2', url: 'https://plus.unsplash.com/premium_photo-1664303499354-9533d1c480d9?q=80&w=2832&auto=format&fit=crop', type: 'photo', name: 'photo-2.jpg', size: '3.2 MB' },
    { id: '3', url: 'https://images.unsplash.com/photo-1599580506462-801b69417038?q=80&w=2864&auto=format&fit=crop', type: 'photo', name: 'photo-3.jpg', size: '5.8 MB' },
    { id: '4', url: 'https://plus.unsplash.com/premium_photo-1661413341369-8086a6a2a47a?q=80&w=2940&auto=format&fit=crop', type: 'photo', name: 'photo-4.jpg', size: '2.5 MB' },
];

export default function Dashboard() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isUploadMediaModalOpen, setIsUploadMediaModalOpen] = useState(false);
  const [projectProgressData, setProjectProgressData] = useState(INITIAL_PROJECT_PROGRESS);
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [mediaItems, setMediaItems] = useState<MediaFile[]>(INITIAL_MEDIA_ITEMS);

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
  
  const handleUploadComplete = (newMedia: MediaFile[]) => {
      setMediaItems(prevMedia => [...newMedia, ...prevMedia]);
  }

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
              <DatePickerWithRange />
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
              <RecentMedia 
                mediaItems={mediaItems}
                onUploadClick={() => setIsUploadMediaModalOpen(true)} 
              />
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

      <UploadMediaModal
        isOpen={isUploadMediaModalOpen}
        onOpenChange={setIsUploadMediaModalOpen}
        onUploadComplete={handleUploadComplete}
      />

    </div>
  );
}
