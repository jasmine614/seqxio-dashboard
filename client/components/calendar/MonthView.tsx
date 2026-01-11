const ProjectItem = ({ project }) => (
    <div className="w-full rounded bg-blue-100 px-2 py-1 text-xs">
        <p className="font-semibold truncate">{project.name}</p>
        <p className="text-muted-foreground truncate">{project.team}</p>
    </div>
);

const NoteItem = ({ note }) => (
    <div className="w-full rounded bg-yellow-100 px-2 py-1 text-xs">
        <p className="font-semibold truncate">{note.title}</p>
        <p className="text-muted-foreground truncate">{note.project}</p>
    </div>
);

export function MonthView({ daysInMonth = [], onDayClick }) {
    return (
        <div className="grid grid-cols-7 gap-px bg-gray-200 border-t border-l border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-2 text-center text-sm font-semibold text-gray-600 bg-gray-50 border-b border-r border-gray-200">{day}</div>
            ))}
            {daysInMonth.map((dayData, i) => (
                <div key={i} onClick={() => onDayClick && onDayClick(dayData)} className="relative min-h-[120px] bg-white p-2 border-b border-r border-gray-200 flex flex-col items-start gap-1 cursor-pointer hover:bg-gray-50">
                    <span className="font-semibold">{dayData.day}</span>
                    <div className="w-full flex-1 flex flex-col items-start gap-1 overflow-hidden">
                        {dayData.projects.map(p => <ProjectItem key={p.id} project={p} />)}
                        {dayData.notes.map(n => <NoteItem key={n.id} note={n} />)}
                    </div>
                </div>
            ))}
        </div>
    );
}