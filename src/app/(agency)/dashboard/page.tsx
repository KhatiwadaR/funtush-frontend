'use client';

import { useEffect, useState } from 'react';

import ActiveGuides from '@/components/agency/dashboard/ActiveGuides';
import BookingStatus from '@/components/agency/dashboard/BookingStatus';
import DashboardHeader from '@/components/agency/dashboard/DashboardHeader';
import QuickState from '@/components/agency/dashboard/QuickState';
import RecentActivity from '@/components/agency/dashboard/RecentActivity';
import RecentBookings from '@/components/agency/dashboard/RecentBookings';
import RevenueOverview from '@/components/agency/dashboard/RevenueOverview';
import StatCards from '@/components/agency/dashboard/StatCards';
import TopDestinations from '@/components/agency/dashboard/TopDestinations';
import UpcomingTreks from '@/components/agency/dashboard/UpcomingTreks';
import ActiveSos from '@/components/agency/dashboard/ActiveSos';

const agencyId = 'ag-001';

export default function AgencyDashboardPage() {
  return (
    <div className="space-y-4 text-neutral-900">
      <LargeScreenOnly />
      <ActiveSos />

      <div>
        <StatCards agencyId={agencyId} />
      </div>

      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-[1.55fr_1fr_1fr]">
        <RevenueOverview agencyId={agencyId} />
        <BookingStatus agencyId={agencyId} />
        <UpcomingTreks agencyId={agencyId} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.55fr_1fr_1fr_1fr]">
        <RecentBookings agencyId={agencyId} />
        <ActiveGuides />
        <TopDestinations /> {/* Placeholder */}
        <QuickState /> {/* Placeholder */}
      </div>
      <div>
        <RecentActivity /> {/* Placeholder */}
      </div>
    </div>
  );
}

function LargeScreenOnly() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    (() => setIsLarge(mediaQuery.matches))();

    const handleChange = (event: MediaQueryListEvent) => {
      setIsLarge(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (!isLarge) return null;

  return (
    <div className="mb-8">
      <DashboardHeader />
    </div>
  );
}
