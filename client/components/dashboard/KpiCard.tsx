import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface KpiCardProps {
  title: string;
  value: string;
  subtext: string;
  unit?: string;
  unitOptions?: string[];
  onUnitChange?: (unit: string) => void;
}

export function KpiCard({ title, value, subtext, unit, unitOptions, onUnitChange }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {unitOptions && onUnitChange && (
          <ToggleGroup type="single" defaultValue={unit} onValueChange={onUnitChange} className="h-7 -my-1 -mr-2 bg-gray-100 p-0.5 rounded-md">
            {unitOptions.map(option => (
              <ToggleGroupItem key={option} value={option} className="text-xs px-1.5 h-full data-[state=on]:bg-white rounded-sm">
                {option}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}{unit && <span className="text-base font-normal text-muted-foreground">{unit}</span>}</div>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </CardContent>
    </Card>
  );
}
