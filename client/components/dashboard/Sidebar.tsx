
import { Link, useLocation } from 'react-router-dom';
import { MapPinIcon } from './MapPinIcon'; // Assuming you saved the icon here

export default function Sidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.8889 6.94444V1.38889C13.8889 0.99537 14.0222 0.665278 14.2889 0.398611C14.5546 0.13287 14.8843 0 15.2778 0H23.6111C24.0046 0 24.3343 0.13287 24.6 0.398611C24.8667 0.665278 25 0.99537 25 1.38889V6.94444C25 7.33796 24.8667 7.66759 24.6 7.93333C24.3343 8.2 24.0046 8.33333 23.6111 8.33333H15.2778C14.8843 8.33333 14.5546 8.2 14.2889 7.93333C14.0222 7.66759 13.8889 7.33796 13.8889 6.94444ZM0 12.5V1.38889C0 0.99537 0.133333 0.665278 0.4 0.398611C0.665741 0.13287 0.99537 0 1.38889 0H9.72222C10.1157 0 10.4458 0.13287 10.7125 0.398611C10.9782 0.665278 11.1111 0.99537 11.1111 1.38889V12.5C11.1111 12.8935 10.9782 13.2231 10.7125 13.4889C10.4458 13.7556 10.1157 13.8889 9.72222 13.8889H1.38889C0.99537 13.8889 0.665741 13.7556 0.4 13.4889C0.133333 13.2231 0 12.8935 0 12.5ZM13.8889 23.6111V12.5C13.8889 12.1065 14.0222 11.7764 14.2889 11.5097C14.5546 11.244 14.8843 11.1111 15.2778 11.1111H23.6111C24.0046 11.1111 24.3343 11.244 24.6 11.5097C24.8667 11.7764 25 12.1065 25 12.5V23.6111C25 24.0046 24.8667 24.3343 24.6 24.6C24.3343 24.8667 24.0046 25 23.6111 25H15.2778C14.8843 25 14.5546 24.8667 14.2889 24.6C14.0222 24.3343 13.8889 24.0046 13.8889 23.6111ZM0 23.6111V18.0556C0 17.662 0.133333 17.3319 0.4 17.0653C0.665741 16.7995 0.99537 16.6667 1.38889 16.6667H9.72222C10.1157 16.6667 10.4458 16.7995 10.7125 17.0653C10.9782 17.3319 11.1111 17.662 11.1111 18.0556V23.6111C11.1111 24.0046 10.9782 24.3343 10.7125 24.6C10.4458 24.8667 10.1157 25 9.72222 25H1.38889C0.99537 25 0.665741 24.8667 0.4 24.6C0.133333 24.3343 0 24.0046 0 23.6111Z" fill="url(#paint0_linear_dashboard)"/>
          <defs>
            <linearGradient id="paint0_linear_dashboard" x1="12.5" y1="0" x2="12.5" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#155234"/>
              <stop offset="1" stopColor="#227D53"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      badge: null,
    },
    {
      name: 'Map',
      path: '/map',
      icon: <MapPinIcon />,
      badge: null,
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_projects)">
            <path d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H13.353C14.988 2 15.8055 2 16.5405 2.30448C17.2756 2.60896 17.8537 3.18702 19.0098 4.34315L21.6569 6.99019C22.813 8.14631 23.391 8.72437 23.6955 9.45945C24 10.1945 24 11.012 24 12.647V16C24 19.7712 24 21.6569 22.8284 22.8284C21.6569 24 19.7712 24 16 24H10C6.22876 24 4.34315 24 3.17157 22.8284C2 21.6569 2 19.7712 2 16V10Z" stroke="#7B9182" strokeWidth="2" strokeLinecap="round"/>
            <path d="M15.4445 2.61108V8.55553C15.4445 9.6601 16.3399 10.5555 17.4445 10.5555H23.3889" stroke="#7B9182" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9.33337 19.1111H16.6667" stroke="#7B9182" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9.33337 14.2222H16.6667" stroke="#7B9182" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9.33337 9.33331H10.5556" stroke="#7B9182" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <defs>
            <clipPath id="clip0_projects">
              <rect width="25" height="25" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      ),
      badge: '12+',
    },
    {
      name: 'Calendar',
      path: '/calendar',
      icon: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3.17645" width="21.1765" height="18.8235" rx="4" stroke="#7B9182" strokeWidth="2"/>
          <path d="M2 9.05884H23.1765" stroke="#7B9182" strokeWidth="2"/>
          <path d="M7.88232 2V4.35294" stroke="#7B9182" strokeWidth="2" strokeLinecap="round"/>
          <path d="M17.2941 2V4.35294" stroke="#7B9182" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="17.8824" cy="14.353" r="1.76471" fill="#7B9182"/>
        </svg>
      ),
      badge: null,
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 16.5L14.5 9.75" stroke="#7B9182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.5 16.5L20.5 3" stroke="#7B9182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 16.5V7.5" stroke="#7B9182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.5 16.5V13.5" stroke="#7B9182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 21H1" stroke="#7B9182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      badge: null,
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_reports)">
            <path d="M8.57143 17.3333V15M12 17.3333V12.6667M15.4286 17.3333V10.3333M17.7143 22H6.28571C5.67951 22 5.09812 21.7542 4.66947 21.3166C4.24082 20.879 4 20.2855 4 19.6667V3.33333C4 2.71449 4.24082 2.121 4.66947 1.68342C5.09812 1.24583 5.67951 1 6.28571 1H12.6697C12.9728 1.00007 13.2634 1.12303 13.4777 1.34183L19.6651 7.65817C19.8795 7.87691 19.9999 8.17361 20 8.483V19.6667C20 20.2855 19.7592 20.879 19.3305 21.3166C18.9019 21.7542 18.3205 22 17.7143 22Z" stroke="#7B9182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_reports">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      ),
      badge: null,
    },
    {
      name: 'Team',
      path: '/teams',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="#7B9182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      badge: null,
    },
  ];

  const generalItems = [
    {
      name: 'Settings',
      path: '/settings',
      icon: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.9 4.69029C11.3567 2.43657 14.5776 2.43657 15.0343 4.69029C15.4121 6.5546 17.3378 7.66642 19.1413 7.06145C21.3214 6.33012 22.9319 9.11953 21.2085 10.6419C19.7828 11.9013 19.7828 14.1249 21.2085 15.3842C22.9319 16.9066 21.3214 19.696 19.1413 18.9647C17.3378 18.3597 15.4121 19.4716 15.0343 21.3359C14.5776 23.5896 11.3567 23.5896 10.9 21.3359C10.5221 19.4716 8.59642 18.3597 6.79298 18.9647C4.61285 19.696 3.00238 16.9066 4.7258 15.3842C6.15144 14.1249 6.15144 11.9013 4.7258 10.6419C3.00238 9.11953 4.61285 6.33012 6.79298 7.06145C8.59642 7.66642 10.5221 6.5546 10.9 4.69029Z" stroke="#7B9182" strokeWidth="2.39013" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="13" cy="12.9999" r="3" stroke="#7B9182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'Help',
      path: '/help',
      icon: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.46882 9.37506C9.71372 8.67888 10.1971 8.09184 10.8334 7.71791C11.4696 7.34398 12.2177 7.20729 12.945 7.33205C13.6724 7.45682 14.3322 7.83498 14.8074 8.39957C15.2827 8.96416 15.5428 9.67873 15.5417 10.4167C15.5417 12.5001 12.4167 13.5417 12.4167 13.5417M12.5 17.7084H12.5105M22.9167 12.5C22.9167 18.253 18.253 22.9167 12.5 22.9167C6.74707 22.9167 2.08337 18.253 2.08337 12.5C2.08337 6.74707 6.74707 2.08337 12.5 2.08337C18.253 2.08337 22.9167 6.74707 22.9167 12.5Z" stroke="#7B9182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    
  ];

  return (
    <aside className="w-64 lg:w-72 bg-[#F7F7F7] rounded-[25px] sticky top-0 h-screen">
      <div className="flex flex-col justify-between h-full p-6 overflow-y-auto">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 py-4 mb-8">
            <img
              src="/Charlotte_NC_city_logo.svg.png"
              alt="Charlotte NC City Logo"
              className="w-[180px] h-auto"
            />
          </div>

          {/* Menu Section */}
          <nav className="flex-1">
            <div className="mb-6">
              <h3 className="text-[#969696] text-base font-medium mb-4 tracking-tight">MENU</h3>
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 relative ${
                        isActive(item.path)
                          ? 'text-black font-medium'
                          : 'text-[#7B9182] hover:text-black transition-colors'
                      }`}
                    >
                      {isActive(item.path) && <div className="absolute -left-6 w-1 h-full bg-gradient-primary rounded-r-md"></div>}
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="text-xl tracking-tight">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 text-[10px] font-medium text-white bg-[#155234] rounded-[5px]">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* General Section */}
            <div>
              <h3 className="text-[#969696] text-base font-medium mb-4 tracking-tight">GENERAL</h3>
              <ul className="space-y-4">
                {generalItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 relative ${
                        isActive(item.path)
                          ? 'text-black font-medium'
                          : 'text-[#7B9182] hover:text-black transition-colors'
                      }`}
                    >
                      {isActive(item.path) && <div className="absolute -left-6 w-1 h-full bg-gradient-primary rounded-r-md"></div>}
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="text-xl tracking-tight">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Mobile App Banner */}
        <div className="mt-6 p-4 rounded-[15px] bg-gradient-to-br from-[#155234] to-[#227D53] text-white relative overflow-hidden"
          style={{
            backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/91726b346faf46be49ba1c27a3286f039812019e?width=432')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10">
            <svg className="w-6 h-6 mb-2" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="25" height="25" rx="12.5" fill="white"/>
              <path d="M12.5 20.8333L10.0295 18.3997H6.60025V14.9705L4.16663 12.5L6.60025 10.0295V6.60025H10.0295L12.5 4.16663L14.9705 6.60025H18.3997V10.0295L20.8333 12.5L18.3997 14.9705V18.3997H14.3436L12.5 18.7684ZM12.5 18.7684L14.3436 16.9247H16.9247V14.3436L18.7684 12.5L16.9247 10.6563V8.07518H14.3436L12.5 6.23152L10.6563 8.07518H8.07518V10.6563L6.23152 12.5L8.07518 14.3436V16.9247H10.6563L12.5 18.7684ZM10.3429 15.6342L12.5 14.3252L14.657 15.6342L14.0855 13.1821L16.0029 11.5228L13.4771 11.32L12.5 8.99701L11.5228 11.32L8.99701 11.5228L10.9144 13.1821L10.3429 15.6342Z" fill="#155234"/>
            </svg>
            <h4 className="text-xl font-semibold mb-1 tracking-tight">
              <span className="font-semibold">Download</span> our Mobile App
            </h4>
            <p className="text-[13px] mb-4 tracking-tight">Stay on track.</p>
            <button className="w-full px-8 py-2 bg-[#155234] rounded-[25px] text-sm font-medium tracking-tight hover:bg-[#1a6642] transition-colors">
              Download
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
