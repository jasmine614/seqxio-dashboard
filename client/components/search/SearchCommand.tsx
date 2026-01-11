import * as React from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { SearchResults } from "./SearchResults";

const groups = [
    {
        name: "Quick Links",
        actions: [
            { title: "Dashboard", href: "/" },
            { title: "Projects", href: "/projects" },
            { title: "Calendar", href: "/calendar" },
            { title: "Analytics", href: "/analytics" },
            { title: "Reports", href: "/reports" },
        ]
    },
    {
        name: "Recent Searches",
        actions: [
            { title: "Project X", href: "/projects/1" },
            { title: "Road A", href: "/roads/1" },
            { title: "Team B", href: "/teams/1" },
        ]
    }
];

const filters = ["All", "Projects", "Roads", "Teams"];

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState("All");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const openSearch = () => {
      setOpen(true)
  }

  return (
    <>
        <CommandPrimitive className="relative bg-transparent visible">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-[25px] w-full max-w-sm" onClick={openSearch} cmdk-input-wrapper="">
                <Search className="w-5 h-5 text-gray-500" />
                <span className="text-base text-[#444] tracking-tight placeholder:text-[#444]">
                    Search projects, roads, teams…
                </span>
            </div>
        </CommandPrimitive>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." value={query} onValueChange={setQuery} />
        <div className="flex items-center border-b px-3">
            {filters.map(f => (
                <Button
                    key={f}
                    variant={filter === f ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilter(f)}
                >
                    {f}
                </Button>
            ))}
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {query.length < 2 &&
            groups.map((group, i) => (
                <CommandGroup key={group.name} heading={group.name}>
                    {group.actions.map((action) => (
                        <CommandItem key={action.href} onSelect={() => (window.location.href = action.href)}>
                            {action.title}
                        </CommandItem>
                    ))}
                </CommandGroup>
            ))}
          <SearchResults query={query} filter={filter} />
        </CommandList>
      </CommandDialog>
    </>
  );
}
