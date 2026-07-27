/**
 * Agency Dashboard Layout
 * Sidebar + topbar layout for authenticated agency users
 */

import { DashboardLayout } from '@/components/layouts/dashboardlayout';

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
