import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimeSeriesChartProps {
  data: any[];
  view: 'daily' | 'weekly';
  unit: 'lbs' | 'tons';
  onViewChange: (view: 'daily' | 'weekly') => void;
  onUnitChange: (unit: 'lbs' | 'tons') => void;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md">
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-muted-foreground">{`${payload[0].value} ${payload[0].payload.unit}`}</p>
           <p className="text-xs text-muted-foreground">{`${payload[0].payload.projects} projects`}</p>
        </div>
      );
    }
    return null;
  };

export function TimeSeriesChart({ data, view, unit, onViewChange, onUnitChange }: TimeSeriesChartProps) {
  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Collection Trend</CardTitle>
            <div className="flex items-center gap-2">
                <ToggleGroup type="single" value={view} onValueChange={(value) => onViewChange(value as any)} className="h-7 bg-gray-100 p-0.5 rounded-md">
                    <ToggleGroupItem value="daily" className="text-xs px-2 h-full data-[state=on]:bg-white rounded-sm">Daily</ToggleGroupItem>
                    <ToggleGroupItem value="weekly" className="text-xs px-2 h-full data-[state=on]:bg-white rounded-sm">Weekly</ToggleGroupItem>
                </ToggleGroup>
                 <ToggleGroup type="single" value={unit} onValueChange={(value) => onUnitChange(value as any)} className="h-7 bg-gray-100 p-0.5 rounded-md">
                    <ToggleGroupItem value="lbs" className="text-xs px-2 h-full data-[state=on]:bg-white rounded-sm">lbs</ToggleGroupItem>
                    <ToggleGroupItem value="tons" className="text-xs px-2 h-full data-[state=on]:bg-white rounded-sm">tons</ToggleGroupItem>
                </ToggleGroup>
            </div>
        </CardHeader>
        <CardContent className="h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156, 163, 175, 0.2)' }}/>
                    <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
