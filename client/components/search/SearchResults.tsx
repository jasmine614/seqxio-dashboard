import { CommandGroup, CommandItem } from "@/components/ui/command";
import { projects, roads, teams } from "@/lib/search-data";
import { useDebounce } from "use-debounce";

export const SearchResults = ({ query, filter }) => {
    const [debouncedQuery] = useDebounce(query, 300);

    const filteredProjects = projects.filter(project => 
        project.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const filteredRoads = roads.filter(road =>
        road.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    if (debouncedQuery.length < 2) return null;

    return (
        <>
            { (filter === "All" || filter === "Projects") && filteredProjects.length > 0 &&
                <CommandGroup heading="Projects">
                    {filteredProjects.map(project => (
                        <CommandItem key={project.id} onSelect={() => console.log(`Selected project ${project.id}`)}>
                            {project.name}
                            <span className="ml-auto text-muted-foreground">{project.status} · {project.zone} · {project.team}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            }
            { (filter === "All" || filter === "Roads") && filteredRoads.length > 0 &&
                <CommandGroup heading="Roads">
                    {filteredRoads.map(road => (
                        <CommandItem key={road.id} onSelect={() => console.log(`Selected road ${road.id}`)}>
                            {road.name}
                            <span className="ml-auto text-muted-foreground">{road.zone} · {road.issues} open issues</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            }
            { (filter === "All" || filter === "Teams") && filteredTeams.length > 0 &&
                <CommandGroup heading="Teams">
                    {filteredTeams.map(team => (
                        <CommandItem key={team.id} onSelect={() => console.log(`Selected team ${team.id}`)}>
                            {team.name}
                            <span className="ml-auto text-muted-foreground">{team.status} · {team.zone} · {team.assignment}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            }
        </>
    );
}
