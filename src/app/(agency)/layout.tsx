'use client';

import { useState } from 'react';
import '../globals.css';
import AgencySidebar from '@/components/agency/AgencySidebar';
import DashboardTopbar from '@/components/agency/DashboardTopbar';

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const sidebarLeft = isSidebarCollapsed ? '4rem' : '16rem';

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <AgencySidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Content */}
      <div className="flex-1 flex min-h-screen flex-col overflow-hidden">
        {/* Fixed Topbar */}
        <div
          className="fixed top-0 right-0 z-20 transition-all duration-300"
          style={{ left: sidebarLeft }}
        >
          <DashboardTopbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 min-h-0 overflow-y-auto pt-24 p-6 bg-[#F2F2F7]">{children}</main>
      </div>
    </div>
  );
}
