import { useState } from 'react';
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/button";
import { HelpCard } from "@/components/help/HelpCard";
import { ContactCard } from "@/components/help/ContactCard";
import { FeedbackModal } from "@/components/help/FeedbackModal";
import { SupportModal } from "@/components/help/SupportModal";
import { LayoutDashboard, ClipboardList, Calendar, BarChart2, RefreshCw, WifiOff, ShieldOff, Clock } from "lucide-react";
import { 
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger 
} from "@/components/ui/accordion";

type UserRole = 'viewer' | 'dispatcher' | 'admin';

export default function Help() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportType, setSupportType] = useState('question');
  const [userRole] = useState<UserRole>('viewer'); // Mock user role

  const handleSupportClick = (type: string) => {
    setSupportType(type);
    setIsSupportModalOpen(true);
  };

  const quickHelpCards = [
    {
        icon: <LayoutDashboard className="h-8 w-8 text-gray-500" />,
        title: "Monitor today’s work",
        description: "View active projects, crews, and locations in real time.",
        ctaText: "Go to Dashboard",
        ctaLink: "/",
    },
    {
        icon: <ClipboardList className="h-8 w-8 text-gray-500" />,
        title: "Manage projects",
        description: "View project status, add notes, upload photos, and resolve issues.",
        ctaText: "Go to Projects",
        ctaLink: "/projects",
    },
    {
        icon: <Calendar className="h-8 w-8 text-gray-500" />,
        title: "Coordinate schedules",
        description: "View scheduled work and add operational notes by date.",
        ctaText: "Go to Calendar",
        ctaLink: "/calendar",
    },
    {
        icon: <BarChart2 className="h-8 w-8 text-gray-500" />,
        title: "Review performance",
        description: "Track trends, issues, and team performance over time.",
        ctaText: "Go to Analytics",
        ctaLink: "/analytics",
        adminOnly: true,
    },
  ];

  const howToItems = [
      {
          title: "How to create and manage a project",
          steps: [
              "Go to Projects",
              "Click Add Project",
              "Assign a team",
              "Monitor status and add notes/photos as needed",
          ]
      },
      {
          title: "How to assign a project to a team",
          steps: [
              "Open Teams",
              "Select a team",
              "Click Assign Project",
              "Choose project and confirm",
          ]
      },
      {
          title: "How to add an operational note",
          steps: [
              "Click Add Note from Dashboard, Calendar, Project, or Team",
              "Select project and team",
              "Add details and save",
          ]
      },
      {
          title: "How to handle issues",
          steps: [
              "Identify flagged projects, teams, or roads",
              "Open details sheet",
              "Review notes/photos",
              "Mark issue resolved when complete",
          ]
      },
      {
          title: "How to track crews in real time",
          steps: [
              "Open Dashboard",
              "Use the map to view active teams",
              "Click a team or road for details",
          ]
      },
  ];

  const faqItems = [
    {
        question: "Why can’t I see a team’s live location?",
        answer: "Location may be unavailable if the team is off duty or hasn’t checked in recently.",
    },
    {
        question: "What does ‘Needs Attention’ mean?",
        answer: "It indicates delays, open issues, or missing information.",
    },
    {
        question: "Who can see notes I add?",
        answer: "Visibility depends on the note’s visibility setting (team-only, admins, or everyone).",
    },
    {
        question: "Why can’t I mark a project as complete?",
        answer: "Some projects require evidence or assigned teams before completion.",
        adminOnly: true,
    },
    {
        question: "How are issues created?",
        answer: "Issues can be flagged from photos, notes, or system rules.",
    },
  ];

  const troubleshootingItems = [
      { 
          icon: <RefreshCw className="h-5 w-5 text-gray-500"/>, 
          title: "Data not updating?", 
          description: "Try refreshing the page or checking your filters."
      },
      { 
          icon: <WifiOff className="h-5 w-5 text-gray-500"/>, 
          title: "Map not loading?", 
          description: "Check your internet connection and map settings."
      },
      { 
          icon: <ShieldOff className="h-5 w-5 text-gray-500"/>, 
          title: "Can’t perform an action?", 
          description: "You may not have permission for that action."
      },
      { 
          icon: <Clock className="h-5 w-5 text-gray-500"/>, 
          title: "Seeing outdated information?", 
          description: "Confirm your date range and filters."
      },
  ];

  const visibleQuickHelpCards = quickHelpCards.filter(card => !card.adminOnly || userRole === 'admin');
  const visibleFaqItems = faqItems.filter(item => !item.adminOnly || userRole === 'admin');

  return (
    <div className="flex gap-4 min-h-screen bg-white p-4">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-[40px] font-medium text-black tracking-tight">Help</h1>
              <p className="text-xl text-[#7B9182] font-light tracking-tight">
                Find answers, learn key workflows, or contact support.
              </p>
            </div>
            <Button variant="outline" onClick={() => setIsFeedbackModalOpen(true)}>Give feedback</Button>
          </div>

          {/* Page Content */}
          <div className="space-y-12 max-w-4xl mx-auto">
            {/* Quick Help Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Quick Help</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleQuickHelpCards.map((card, index) => <HelpCard key={index} {...card} />)}
              </div>
            </section>

            {/* Guided How-To's Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Guided How-To’s</h2>
              <Accordion type="single" collapsible className="w-full">
                {howToItems.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>
                            <ol className="list-decimal list-inside space-y-2">
                                {item.steps.map((step, i) => <li key={i}>{step}</li>)}
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
              <Accordion type="single" collapsible className="w-full">
                {visibleFaqItems.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Troubleshooting Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
              <div className="space-y-4">
                  {troubleshootingItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border">
                          {item.icon}
                          <div>
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
            </section>

            {/* Contact & Support Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact & Support</h2>
              <ContactCard onContact={handleSupportClick} />
            </section>
          </div>
        </div>
      </main>
      <FeedbackModal isOpen={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen} />
      <SupportModal isOpen={isSupportModalOpen} onOpenChange={setIsSupportModalOpen} defaultType={supportType} />
    </div>
  );
}
