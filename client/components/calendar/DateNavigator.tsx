import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DateNavigator({ currentDate, onPrev, onNext }) {
  return (
    <div className="flex justify-between items-center py-4 border-y">
      <div>
        <h2 className="text-2xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        {/* Optional subtext can go here */}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" onClick={onNext}>
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
