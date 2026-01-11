import { useState } from 'react';
import { SearchCommand } from "@/components/search/SearchCommand";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NotificationsPanel } from "@/components/notifications/NotificationsPanel";
import { notificationsData } from '@/lib/notifications-data.tsx';

export default function TopBar() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex justify-between items-center px-6 py-5 bg-[#F7F7F7] rounded-[25px]">
      {/* Search Bar */}
      <SearchCommand />
      {/* Notifications and User Profile */}
      <div className="flex items-center gap-4">

        {/* Notification Bell */}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button className="relative w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </div>
              )}
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.60051 19.5313C9.56942 19.308 9.7448 19.1327 9.96482 19.1327H15.5452C15.7652 19.1327 15.9406 19.308 15.9095 19.5313C15.7891 20.3843 15.2407 22.3214 12.755 22.3214C10.2694 22.3214 9.72088 20.3843 9.60051 19.5313Z" stroke="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M4.27532 19.1327C3.5706 19.1327 3.18157 18.2557 3.61444 17.7057C4.6795 16.3425 6.05386 14.2379 6.05386 12.4601C6.05386 9.56633 6.50348 6.04274 10.7621 5.07016C11.3377 4.93464 10.3635 3.18878 12.7551 3.18878C15.2567 3.18878 14.1725 4.93464 14.7481 5.07016C19.0067 6.04274 20.2535 9.56633 20.2535 12.4601C20.2535 14.2777 21.3823 16.4381 22.2225 17.8013C22.5685 18.3594 22.1723 19.1327 21.513 19.1327H4.27532Z" stroke="black"/>
              </svg>
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <NotificationsPanel onClose={() => setPopoverOpen(false)} />
          </PopoverContent>
        </Popover>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div className="relative w-[50px] h-[50px] bg-[#DBA6A9] rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/ca5bf68d1ef14e4e6447c83be84e7cf96bc3ccc3?width=66"
              alt="User avatar"
              className="w-8 h-10 object-cover mt-1"
            />
          </div>
          <div className="hidden md:block">
            <p className="text-base font-semibold text-black tracking-tight">Ciara Thomas</p>
            <p className="text-base font-light text-[#444] tracking-tight">cthomas@mail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
