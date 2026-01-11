import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stepper } from "@/components/reports/Stepper";
import { BasicsStep } from "@/components/reports/steps/BasicsStep";
import { SectionsStep } from "@/components/reports/steps/SectionsStep";
import { ReviewStep } from "@/components/reports/steps/ReviewStep";

const steps = [
  {
    label: "Basics",
    component: BasicsStep,
  },
  {
    label: "Sections",
    component: SectionsStep,
  },
  {
    label: "Review & Export",
    component: ReviewStep,
  },
];

export default function Reports() {
  return (
    <div className="flex gap-4 min-h-screen bg-white p-4">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-[40px] font-medium text-black tracking-tight">Reports</h1>
              <p className="text-xl text-[#7B9182] font-light tracking-tight">
                Generate and export standardized operational reports.
              </p>
            </div>
            <div className="flex gap-2">
                <Button>Create report</Button>
            </div>
          </div>
          <Tabs defaultValue="generate">
            <TabsList>
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="generate" className="mt-4">
              <Stepper steps={steps} />
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              {/* Reports History Table will go here */}
              <div className="p-4 bg-white rounded-lg border">History tab content</div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
