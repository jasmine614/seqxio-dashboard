import {
    LayoutDashboard,
    ClipboardList,
    AlertTriangle,
    FileText,
    Users,
} from 'lucide-react';

export type Notification = {
    id: string;
    type: 'PROJECT_STATUS_CHANGED' | 'ISSUE_FLAGGED' | 'NOTE_ADDED' | 'PROJECT_ASSIGNED' | 'TEAM_LOCATION_STALE';
    title: string;
    meta: string;
    entity: 'Project' | 'Road' | 'Team';
    read: boolean;
    createdAt: Date;
};

export const notificationsData: Notification[] = [
    {
        id: '1',
        type: 'PROJECT_STATUS_CHANGED',
        title: 'Westside Bulk Pickup changed to At Risk',
        meta: 'Project',
        entity: 'Project',
        read: false,
        createdAt: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    },
    {
        id: '2',
        type: 'ISSUE_FLAGGED',
        title: 'Issue flagged: Overflow reported on Maple Dr',
        meta: 'Road',
        entity: 'Road',
        read: false,
        createdAt: new Date(Date.now() - 27 * 60 * 1000), // 27 minutes ago
    },
    {
        id: '3',
        type: 'NOTE_ADDED',
        title: 'Note added: Route change due to construction',
        meta: 'Team: Crew B',
        entity: 'Team',
        read: true,
        createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    },
    {
        id: '4',
        type: 'PROJECT_ASSIGNED',
        title: 'Crew B assigned to Westside Bulk Pickup',
        meta: 'Project',
        entity: 'Project',
        read: true,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
        id: '5',
        type: 'TEAM_LOCATION_STALE',
        title: 'Crew A location not updated recently',
        meta: 'Team',
        entity: 'Team',
        read: false,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    },
];

export const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
        case 'PROJECT_STATUS_CHANGED':
        case 'PROJECT_ASSIGNED':
            return <ClipboardList className="h-5 w-5" />;
        case 'ISSUE_FLAGGED':
            return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
        case 'NOTE_ADDED':
            return <FileText className="h-5 w-5" />;
        case 'TEAM_LOCATION_STALE':
            return <Users className="h-5 w-5" />;
        default:
            return <LayoutDashboard className="h-5 w-5" />;
    }
};
