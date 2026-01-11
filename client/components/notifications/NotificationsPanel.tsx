import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationsData, Notification } from '@/lib/notifications-data.tsx';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { NotificationListItem } from './NotificationListItem';
import { useDetailsView } from '@/lib/DetailsViewProvider';

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState(notificationsData);
  const navigate = useNavigate();
  const { open } = useDetailsView();

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const markAllAsRead = () => {
    setNotifications(currentNotifications => currentNotifications.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (clickedNotification: Notification) => {
    // 1. Mark as read immediately
    setNotifications(currentNotifications =>
      currentNotifications.map(n =>
        n.id === clickedNotification.id ? { ...n, read: true } : n
      )
    );

    // 2. Close the panel
    onClose();

    // 3. Open relevant context
    open(clickedNotification.entity, clickedNotification.id);
  };

  const handleViewAllClick = () => {
    onClose();
    navigate('/notifications');
  };

  // For the panel, we only show a limited number of recent notifications
  const recentNotifications = useMemo(() => {
    return notifications.slice(0, 7);
  }, [notifications]);

  return (
    <Card className="w-[380px] border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10 p-4 border-b">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <Button variant="link" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0} className="text-sm">
          Mark all as read
        </Button>
      </CardHeader>
      <CardContent className="p-0 max-h-[60vh] overflow-y-auto">
        <div className="divide-y">
          {recentNotifications.length > 0 ? (
            recentNotifications.map(notification => (
              <NotificationListItem
                key={notification.id}
                notification={notification}
                onClick={handleNotificationClick}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-10">You're all caught up.</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="sticky bottom-0 bg-white z-10 p-2 border-t">
        <Button className="w-full" variant="outline" onClick={handleViewAllClick}>
          View all notifications
        </Button>
      </CardFooter>
    </Card>
  );
}
