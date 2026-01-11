import { Notification, getNotificationIcon } from '@/lib/notifications-data';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface NotificationListItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
}

export function NotificationListItem({ notification, onClick }: NotificationListItemProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-4 p-4 hover:bg-gray-50 cursor-pointer',
        !notification.read && 'bg-blue-50'
      )}
      onClick={() => onClick(notification)}
    >
      <div className="mt-1">{getNotificationIcon(notification.type)}</div>
      <div className="flex-1">
        <p className={cn('font-medium', !notification.read && 'font-bold')}>{notification.title}</p>
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(notification.createdAt, { addSuffix: true })} · {notification.meta}
        </p>
      </div>
      {!notification.read && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2" />} 
    </div>
  );
}
