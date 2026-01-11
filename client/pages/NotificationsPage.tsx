import { useState, useMemo } from 'react';
import { notificationsData, Notification } from '@/lib/notifications-data.tsx';
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { NotificationListItem } from '@/components/notifications/NotificationListItem';
import { useDetailsView } from '@/lib/DetailsViewProvider';

const filterTypes = ['All', 'Projects', 'Teams', 'Roads', 'Notes', 'Reports'];

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [filter, setFilter] = useState<'All' | 'Unread'>('Unread');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { open } = useDetailsView();

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

    // 2. Open relevant context
    open(clickedNotification.entity, clickedNotification.id);
  };

  const filteredNotifications = useMemo(() => {
    return notifications
      .filter(n => filter === 'All' || !n.read)
      .filter(n => {
        if (typeFilter === 'All') return true;
        const singularType = typeFilter.slice(0, -1).toLowerCase();
        return n.entity.toLowerCase() === singularType;
      });
  }, [notifications, filter, typeFilter]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const renderEmptyState = () => {
    if (filter === 'Unread') {
      return <div className="text-center py-20 text-muted-foreground">You’re all caught up.</div>;
    }
    return <div className="text-center py-20 text-muted-foreground">No notifications yet.</div>;
  };
  
  const retryFetch = () => {
      setLoading(true);
      setError(null);
      setTimeout(() => {
          setNotifications(notificationsData);
          setLoading(false);
      }, 1000);
  }

  return (
    <div className="flex gap-4 min-h-screen bg-white p-4">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg">
          <header className="flex items-center justify-between pb-4 border-b">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Button variant="link" onClick={markAllAsRead} disabled={unreadCount === 0}>
              Mark all as read
            </Button>
          </header>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-4">
            <Tabs value={filter} onValueChange={(value) => setFilter(value as 'All' | 'Unread')}>
              <TabsList>
                <TabsTrigger value="Unread">Unread</TabsTrigger>
                <TabsTrigger value="All">All</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2">
              {filterTypes.map(type => (
                <Badge
                  key={type}
                  variant={typeFilter === type ? 'default' : 'outline'}
                  onClick={() => setTypeFilter(type)}
                  className="cursor-pointer whitespace-nowrap px-3 py-1"
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-lg shadow-sm">
            {loading ? (
              <div className="divide-y">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 p-4">
                    <div className="mt-1 bg-gray-200 rounded-full h-5 w-5 animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">Unable to load notifications.</p>
                <Button onClick={retryFetch}>Retry</Button>
              </div>
            ) : (
              <div className="divide-y">
                {filteredNotifications.length > 0
                  ? filteredNotifications.map(notification => (
                      <NotificationListItem
                        key={notification.id}
                        notification={notification}
                        onClick={handleNotificationClick}
                      />
                    ))
                  : renderEmptyState()}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
