import { BarChart, Bar, YAxis, XAxis, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BarListChartProps {
  title: string;
  data: any[];
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md">
          <p className="font-semibold">{`${payload[0].payload.name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

export function BarListChart({ title, data }: BarListChartProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" scale="band" width={100} tick={{fontSize: 12}}/>
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156, 163, 175, 0.2)' }}/>
                    <Bar dataKey="value" fill="#8884d8" barSize={20} radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
