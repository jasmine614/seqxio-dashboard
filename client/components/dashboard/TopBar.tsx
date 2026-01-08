export default function TopBar() {
  return (
    <div className="flex justify-between items-center px-6 py-5 bg-[#F7F7F7] rounded-[25px]">
      {/* Search Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-[25px] w-full max-w-sm">
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.875 21.875L17.3438 17.3438M19.7917 11.4583C19.7917 16.0607 16.0607 19.7917 11.4583 19.7917C6.85596 19.7917 3.125 16.0607 3.125 11.4583C3.125 6.85596 6.85596 3.125 11.4583 3.125C16.0607 3.125 19.7917 6.85596 19.7917 11.4583Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search task"
          className="flex-1 bg-transparent outline-none text-[#444] text-base tracking-tight placeholder:text-[#444]"
        />
        <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#E9E9E9] rounded-[5px]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.52778 15C3.82963 15 3.2338 14.7532 2.74028 14.2597C2.24676 13.7662 2 13.1704 2 12.4722C2 11.7741 2.24676 11.1782 2.74028 10.6847C3.2338 10.1912 3.82963 9.94444 4.52778 9.94444H5.61111V7.05556H4.52778C3.82963 7.05556 3.2338 6.8088 2.74028 6.31528C2.24676 5.82176 2 5.22593 2 4.52778C2 3.82963 2.24676 3.2338 2.74028 2.74028C3.2338 2.24676 3.82963 2 4.52778 2C5.22593 2 5.82176 2.24676 6.31528 2.74028C6.8088 3.2338 7.05556 3.82963 7.05556 4.52778V5.61111H9.94444V4.52778C9.94444 3.82963 10.1912 3.2338 10.6847 2.74028C11.1782 2.24676 11.7741 2 12.4722 2C13.1704 2 13.7662 2.24676 14.2597 2.74028C14.7532 3.2338 15 3.82963 15 4.52778C15 5.22593 14.7532 5.82176 14.2597 6.31528C13.7662 6.8088 13.1704 7.05556 12.4722 7.05556H11.3889V9.94444H12.4722C13.1704 9.94444 13.7662 10.1912 14.2597 10.6847C14.7532 11.1782 15 11.7741 15 12.4722C15 13.1704 14.7532 13.7662 14.2597 14.2597C13.7662 14.7532 13.1704 15 12.4722 15C11.7741 15 11.1782 14.7532 10.6847 14.2597C10.1912 13.7662 9.94444 13.1704 9.94444 12.4722V11.3889H7.05556V12.4722C7.05556 13.1704 6.8088 13.7662 6.31528 14.2597C5.82176 14.7532 5.22593 15 4.52778 15ZM4.52778 13.5556C4.8287 13.5556 5.08437 13.4501 5.29478 13.2392C5.50567 13.0288 5.61111 12.7731 5.61111 12.4722V11.3889H4.52778C4.22685 11.3889 3.97119 11.4943 3.76078 11.7052C3.54989 11.9156 3.44444 12.1713 3.44444 12.4722C3.44444 12.7731 3.54989 13.0288 3.76078 13.2392C3.97119 13.4501 4.22685 13.5556 4.52778 13.5556ZM12.4722 13.5556C12.7731 13.5556 13.0288 13.4501 13.2392 13.2392C13.4501 13.0288 13.5556 12.7731 13.5556 12.4722C13.5556 12.1713 13.4501 11.9156 13.2392 11.7052C13.0288 11.4943 12.7731 11.3889 12.4722 11.3889H11.3889V12.4722C11.3889 12.7731 11.4943 13.0288 11.7052 13.2392C11.9156 13.4501 12.1713 13.5556 12.4722 13.5556ZM7.05556 9.94444H9.94444V7.05556H7.05556V9.94444ZM4.52778 5.61111H5.61111V4.52778C5.61111 4.22685 5.50567 3.97119 5.29478 3.76078C5.08437 3.54989 4.8287 3.44444 4.52778 3.44444C4.22685 3.44444 3.97119 3.54989 3.76078 3.76078C3.54989 3.97119 3.44444 4.22685 3.44444 4.52778C3.44444 4.8287 3.54989 5.08437 3.76078 5.29478C3.97119 5.50567 4.22685 5.61111 4.52778 5.61111ZM11.3889 5.61111H12.4722C12.7731 5.61111 13.0288 5.50567 13.2392 5.29478C13.4501 5.08437 13.5556 4.8287 13.5556 4.52778C13.5556 4.22685 13.4501 3.97119 13.2392 3.76078C13.0288 3.54989 12.7731 3.44444 12.4722 3.44444C12.1713 3.44444 11.9156 3.54989 11.7052 3.76078C11.4943 3.97119 11.3889 4.22685 11.3889 4.52778V5.61111Z" fill="black"/>
          </svg>
          <span className="text-base text-black tracking-tight">F</span>
        </div>
      </div>

      {/* Notifications and User Profile */}
      <div className="flex items-center gap-4">
        {/* Mail */}
        <button className="relative w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.3916 7.97192L11.9994 13.1457C12.4713 13.4008 13.0389 13.4008 13.5109 13.1457L23.1186 7.97192" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M2.3916 7.97195C2.3916 6.21015 3.71739 4.78317 5.35261 4.78317H20.1576C21.7929 4.78317 23.1186 6.21015 23.1186 7.97195V17.5383C23.1186 19.3001 21.7929 20.727 20.1576 20.727H5.35261C3.71739 20.727 2.3916 19.3001 2.3916 17.5383V7.97195Z" stroke="black"/>
          </svg>
        </button>

        {/* Notification Bell */}
        <button className="relative w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.60051 19.5313C9.56942 19.308 9.7448 19.1327 9.96482 19.1327H15.5452C15.7652 19.1327 15.9406 19.308 15.9095 19.5313C15.7891 20.3843 15.2407 22.3214 12.755 22.3214C10.2694 22.3214 9.72088 20.3843 9.60051 19.5313Z" stroke="black"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.27532 19.1327C3.5706 19.1327 3.18157 18.2557 3.61444 17.7057C4.6795 16.3425 6.05386 14.2379 6.05386 12.4601C6.05386 9.56633 6.50348 6.04274 10.7621 5.07016C11.3377 4.93464 10.3635 3.18878 12.7551 3.18878C15.2567 3.18878 14.1725 4.93464 14.7481 5.07016C19.0067 6.04274 20.2535 9.56633 20.2535 12.4601C20.2535 14.2777 21.3823 16.4381 22.2225 17.8013C22.5685 18.3594 22.1723 19.1327 21.513 19.1327H4.27532Z" stroke="black"/>
          </svg>
        </button>

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
