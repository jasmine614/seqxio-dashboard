import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import MetricCards from '@/components/dashboard/MetricCards';
import ProjectProgress from '@/components/dashboard/ProjectProgress';
import { InteractiveMap, Calendar, RecentPhotos, RoadsList, TimeTracker } from '@/components/dashboard/DashboardWidgets';

export default function Dashboard() {
  return (
    <div className="flex gap-4 min-h-screen bg-white p-4">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Top Bar */}
        <TopBar />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header Section with Action Buttons */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-[40px] font-medium text-black mb-4 tracking-tight">Dashboard</h1>
              <p className="text-xl text-[#7B9182] font-light tracking-tight">
                Monitor and manage waste collection operations in real-time.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-5 py-4 bg-gradient-primary text-white rounded-[25px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white"/>
                </svg>
                Add Project
              </button>
              <button className="px-5 py-4 border border-[#155234] text-[#155234] rounded-[25px] font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                Import Data
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="mb-8">
            <MetricCards />
          </div>

          {/* Two Column Section - Project Progress and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <ProjectProgress />
            <InteractiveMap />
          </div>

          {/* Three Column Section - Calendar, Recent Photos, and Roads */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {/* Calendar and Photos Column */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              <Calendar />
              <RecentPhotos />
            </div>

            {/* Right Column - Roads and Time Tracker */}
            <div className="flex flex-col gap-4">
              <RoadsList />
              <TimeTracker />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
