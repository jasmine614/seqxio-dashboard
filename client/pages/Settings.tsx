import { useState } from 'react';
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { NotificationsSettings } from '@/components/settings/NotificationsSettings';
import { DisplaySettings } from '@/components/settings/DisplaySettings';
import { TeamSettings } from '@/components/settings/TeamSettings';
import { ZonesSettings } from '@/components/settings/ZonesSettings';
import { MapSettings } from '@/components/settings/MapSettings';
import { IntegrationsSettings } from '@/components/settings/IntegrationsSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';

const SettingsNav = ({ activeSection, setActiveSection }) => {
    const userRole = 'admin';

    const navItems = [
        { id: 'profile', label: 'Profile' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'display', label: 'Display & Units' },
        { id: 'team', label: 'Team & Roles', adminOnly: true },
        { id: 'zones', label: 'Zones', adminOnly: true },
        { id: 'map', label: 'Map & Tracking', adminOnly: true },
        { id: 'integrations', label: 'Data & Integrations', adminOnly: true },
        { id: 'security', label: 'Security', adminOnly: true },
    ];

    return (
        <nav className="flex flex-col gap-1">
            {navItems.map(item => {
                if (item.adminOnly && userRole !== 'admin') {
                    return null;
                }
                return (
                    <button 
                        key={item.id} 
                        onClick={() => setActiveSection(item.id)}
                        className={`px-3 py-2 text-left rounded-md text-sm font-medium transition-colors ${
                            activeSection === item.id 
                            ? 'bg-gray-200 text-gray-900' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}>
                        {item.label}
                    </button>
                )
            })}
        </nav>
    )
}

const sectionComponents = {
    profile: ProfileSettings,
    notifications: NotificationsSettings,
    display: DisplaySettings,
    team: TeamSettings,
    zones: ZonesSettings,
    map: MapSettings,
    integrations: IntegrationsSettings,
    security: SecuritySettings,
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="flex gap-4 min-h-screen bg-white p-4">
        <div className="hidden lg:block">
            <Sidebar />
        </div>
        <main className="flex-1 flex flex-col gap-4 overflow-hidden">
            <TopBar />
            <div className="flex-1 overflow-y-auto bg-[#F7F7F7] p-6 rounded-lg">
                <div className="mb-6">
                    <h1 className="text-[40px] font-medium text-black tracking-tight">Settings</h1>
                    <p className="text-xl text-[#7B9182] font-light tracking-tight">
                        Manage your preferences and organization configuration.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                       <SettingsNav activeSection={activeSection} setActiveSection={setActiveSection} />
                    </div>
                    <div className="md:col-span-3">
                        {ActiveComponent && <ActiveComponent />}
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}
