export const projects = [
    { id: 1, name: 'Project Alpha', status: 'Active', zone: 'North', team: 'Team A' },
    { id: 2, name: 'Project Beta', status: 'Completed', zone: 'South', team: 'Team B' },
    { id: 3, name: 'Project Gamma', status: 'On Hold', zone: 'East', team: 'Team C' },
];

export const roads = [
    { id: 1, name: 'Main Street', zone: 'North', issues: 3 },
    { id: 2, name: 'First Avenue', zone: 'South', issues: 0 },
    { id: 3, name: 'Oak Lane', zone: 'East', issues: 1 },
];

export const teams = [
    { id: 1, name: 'Team A', status: 'On Duty', zone: 'North', assignment: 'Project Alpha' },
    { id: 2, name: 'Team B', status: 'Off Duty', zone: 'South', assignment: 'None' },
    { id: 3, name: 'Team C', status: 'On Break', zone: 'East', assignment: 'Project Gamma' },
];
