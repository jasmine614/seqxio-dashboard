import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

const SegmentedControlContext = React.createContext<{
    value: string;
    onChange: (value: string) => void;
}>({ value: '', onChange: () => {} });

const SegmentedControl = React.forwardRef<
    React.ElementRef<typeof ToggleGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
        options: { value: string; label: React.ReactNode }[];
        onChange: (value: string) => void;
    }
>(({ className, value, onChange, options, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
        ref={ref}
        type="single"
        value={value}
        onValueChange={(val) => {
            if (val) onChange(val);
        }}
        className={cn(
            "inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
            className
        )}
        {...props}
    >
        <SegmentedControlContext.Provider value={{ value, onChange }}>
            {options.map((option) => (
                <SegmentedControlItem key={option.value} value={option.value}>
                    {option.label}
                </SegmentedControlItem>
            ))}
        </SegmentedControlContext.Provider>
    </ToggleGroupPrimitive.Root>
));
SegmentedControl.displayName = "SegmentedControl";

const SegmentedControlItem = React.forwardRef<
    React.ElementRef<typeof ToggleGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
    return (
        <ToggleGroupPrimitive.Item
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    );
});
SegmentedControlItem.displayName = "SegmentedControlItem";

export { SegmentedControl, SegmentedControlItem };
