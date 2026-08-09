import AgencySidebar from "@/components/agency/AgencySidebar";
import DashboardTopbar from "@/components/agency/DashboardTopbar";

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <AgencySidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex min-h-screen flex-col overflow-hidden">
        {/* Topbar */}
        <DashboardTopbar />
        
        {/* Page Content */}
        <main className="flex-1 min-h-0 overflow-y-auto p-6 bg-neutral-50">
          {children}
        </main>
      </div>
    </div>
  );
}