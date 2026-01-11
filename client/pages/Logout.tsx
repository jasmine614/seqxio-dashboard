import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";

export default function Logout() {
  return (
    <div className="flex gap-4 min-h-screen bg-white p-4">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg">
          <h1 className="text-[40px] font-medium text-black mb-4 tracking-tight">Logout</h1>
          <p className="text-xl text-[#7B9182] font-light tracking-tight">
            You have been logged out.
          </p>
        </div>
      </main>
    </div>
  );
}
