//src/components/navigation/sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { useTheme } from '@/context/theme';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material/SvgIcon';
import {
  AnalyticsOutlined,
  BadgeOutlined,
  CalendarMonthOutlined,
  ChevronRight,
  ChevronLeft,
  CompassCalibrationOutlined,
  DashboardCustomizeOutlined,
  
  Inventory2Outlined,
  ManageAccountsOutlined,
  PersonOutlineOutlined,
  PublicOutlined,
  SecurityOutlined,
  SettingsOutlined,
  SupportAgentOutlined,
  WalletOutlined,
} from '@mui/icons-material';
import { cn } from '@/lib/utils/cn';

type NavChild = {
  label: string;
  href: string;
  icon?: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
};

type NavItem = {
  label: string;
  href?: string;
  icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  children?: NavChild[];
  badge?: string;
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { isDark } = useTheme();
  const [openSection, setOpenSection] = useState<string | null>('operations');

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const navigationGroups: Array<{ label: string; items: NavItem[] }> = [
    {
      label: 'Main',
      items: [
        { label: 'Dashboard', href: '/dashboard', icon: DashboardCustomizeOutlined },
        { label: 'Packages', href: '/dashboard/packages', icon: Inventory2Outlined },
        {
          label: 'Booking Approval',
          icon: BadgeOutlined,
          badge: '5',
          children: [
            { label: 'All Bookings', href: '/dashboard/bookings', icon: CalendarMonthOutlined },
            { label: 'Pending', href: '/dashboard/bookings/pending', icon: CalendarMonthOutlined },
          ],
        },
        { label: 'Customers', href: '/dashboard/customers', icon: PersonOutlineOutlined },
      ],
    },
    {
      label: 'Operations',
      items: [
        { label: 'Guides', href: '/dashboard/guides', icon: CompassCalibrationOutlined },
        { label: 'Finance', href: '/dashboard/finance', icon: WalletOutlined },
        { label: 'Analytics', href: '/dashboard/analytics', icon: AnalyticsOutlined },
        { label: 'Staff & Roles', href: '/dashboard/staff', icon: ManageAccountsOutlined },
        { label: 'Safety', href: '/dashboard/safety', icon: SecurityOutlined },
        { label: 'Destinations', href: '/dashboard/destinations', icon: PublicOutlined },
      ],
    },
    {
      label: 'Account',
      items: [
        { label: 'Profile', href: '/dashboard/profile', icon: PersonOutlineOutlined },
        { label: 'Settings', href: '/dashboard/settings', icon: SettingsOutlined },
        { label: 'Support', href: '/dashboard/support', icon: SupportAgentOutlined },
      ],
    },
  ];

  if (!isOpen) return null;

  const asideClass = isDark
    ? 'fixed left-0 top-16 bottom-0 z-40 w-72 overflow-y-auto border-r border-slate-800 bg-slate-950 text-slate-200 shadow-xl'
    : 'fixed left-0 top-16 bottom-0 z-40 w-72 overflow-y-auto border-r border-neutral-200 bg-white text-neutral-900 shadow-sm';

  const headerClass = isDark ? 'flex items-start justify-between border-b border-slate-800 px-4 py-4' : 'flex items-start justify-between border-b border-neutral-200 px-4 py-4';

  const cardClass = isDark ? 'flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900 px-4 py-4' : 'flex items-center gap-3 rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-4';

  const closeBtnClass = isDark
    ? 'inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-300 transition hover:bg-slate-800 focus:outline-none'
    : 'inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-50 focus:outline-none';

  return (
    <aside className={asideClass}>
      <div className={headerClass}>
        <div className={cardClass}>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <CompassCalibrationOutlined className="h-5 w-5" />
          </div>
          <div>
            <p className={isDark ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-neutral-900'}>FUNTUSh</p>
            <p className={isDark ? 'text-xs text-slate-400' : 'text-xs text-neutral-500'}>Digital Marketing</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className={closeBtnClass}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {navigationGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className={`mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.25em] ${isDark ? 'text-slate-500' : 'text-neutral-500'}`}>
              {group.label}
            </p>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const hasChildren = Boolean(item.children?.length);
                const isGroupActive = hasChildren
                  ? item.children!.some((child) => isActive(child.href))
                  : Boolean(item.href && isActive(item.href));
                const showChildren = openSection === group.label && hasChildren && isGroupActive;

                return (
                  <div key={item.label}>
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() => setOpenSection((prev) => (prev === group.label ? null : group.label))}
                        className={cn(
                          'flex w-full items-center justify-between rounded-3xl px-3 py-3 text-sm font-medium transition-colors',
                          isGroupActive
                            ? (isDark ? 'bg-cyan-500/10 text-white' : 'bg-cyan-50 text-neutral-900')
                            : (isDark ? 'text-slate-300 hover:bg-slate-900 hover:text-white' : 'text-neutral-700 hover:bg-neutral-50')
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className={cn('h-4 w-4', isGroupActive ? (isDark ? 'text-indigo-600' : 'text-indigo-600') : (isDark ? 'text-neutral-500' : 'text-neutral-400'))} />
                          {item.label}
                        </span>
                        <span className="flex items-center gap-2">
                          {item.badge ? (
                            <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                              {item.badge}
                            </span>
                          ) : null}
                          {showChildren ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={item.href!}
                        className={cn(
                          'flex items-center justify-between rounded-3xl px-3 py-3 text-sm font-medium transition-colors',
                          isGroupActive
                            ? (isDark ? 'bg-cyan-500/10 text-white' : 'bg-cyan-50 text-neutral-900')
                            : (isDark ? 'text-slate-300 hover:bg-slate-900 hover:text-white' : 'text-neutral-700 hover:bg-neutral-50')
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className={cn('h-5 w-5', isGroupActive ? (isDark ? 'text-cyan-300' : 'text-cyan-600') : (isDark ? 'text-slate-400' : 'text-neutral-500'))} />
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    )}

                    {hasChildren && showChildren ? (
                      <div className={`mt-2 space-y-2 rounded-3xl px-3 py-3 ${isDark ? 'border border-slate-800 bg-slate-900' : 'border border-neutral-200 bg-neutral-50'}`}>
                        {item.children!.map((child) => {
                          const ChildIcon = child.icon;
                          const childActive = isActive(child.href);

                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              className={cn(
                                'flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition-colors',
                                childActive
                                  ? (isDark ? 'bg-slate-800 text-white' : 'bg-cyan-50 text-neutral-900')
                                  : (isDark ? 'text-slate-400 hover:bg-slate-900 hover:text-white' : 'text-neutral-600 hover:bg-neutral-50')
                              )}
                            >
                              {ChildIcon ? <ChildIcon className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-neutral-300" />}
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className={isDark ? 'border-t border-slate-800 px-4 py-4' : 'border-t border-neutral-200 px-4 py-4'}>
        <div className={isDark ? 'rounded-3xl border border-slate-800 bg-slate-900 px-4 py-4 text-sm text-slate-300' : 'rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm text-neutral-700'}>
          <p className={isDark ? 'font-semibold text-white' : 'font-semibold text-neutral-900'}>Daily Summary</p>
          <p className={isDark ? 'mt-2 text-xs text-slate-500' : 'mt-2 text-xs text-neutral-500'}>You have 5 pending approvals and 2 new messages.</p>
          <div className="mt-4 grid gap-2 text-xs">
            <span className={isDark ? 'rounded-2xl bg-slate-950 px-3 py-2' : 'rounded-2xl bg-neutral-100 px-3 py-2'}>Bookings: 24</span>
            <span className={isDark ? 'rounded-2xl bg-slate-950 px-3 py-2' : 'rounded-2xl bg-neutral-100 px-3 py-2'}>Revenue: $12,400</span>
          </div>
        </div>
      </div>
    </aside>
  );
};