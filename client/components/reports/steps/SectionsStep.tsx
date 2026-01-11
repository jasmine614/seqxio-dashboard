import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GripVertical } from "lucide-react";

const sections = [
  {
    title: "Executive Summary",
    description: "Key KPIs and short highlights",
  },
  {
    title: "KPIs",
    description: "Collected waste (lbs/tons), projects completed, on-time rate, open issues",
  },
  {
    title: "Collection Trend",
    description: "Chart of waste over time",
  },
  {
    title: "Projects Needing Attention",
    description: "Table of delayed/critical projects",
  },
  {
    title: "Issues Breakdown",
    description: "By type and by zone/team",
  },
  {
    title: "Team Performance",
    description: "Ranked table by completion time/issue rate",
  },
  {
    title: "Hotspot Roads",
    description: "Table of roads with repeat issues",
  },
];

export function SectionsStep() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">Choose what appears in the report.</p>
      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.title} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
              <div>
                <h3 className="font-medium">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch id={`section-${section.title}`} defaultChecked />
              <Label htmlFor={`section-${section.title}`}>Include</Label>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
