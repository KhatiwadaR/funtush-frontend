'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Menu,
  MessageCircle,
  Moon,
  Search,
  SunMedium,
  X,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import { useTheme } from '@/context/theme';
import { cn } from '@/lib/utils/cn';
import { NotificationsDropdown } from './notification-dropdown';

type NavbarProps = {
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
  isDarkMode?: boolean;
  onDarkModeToggle?: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({
  sidebarOpen = false,
  onSidebarToggle,
  isDarkMode,
  onDarkModeToggle,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const canToggleSidebar = typeof onSidebarToggle === 'function';

  const theme = useTheme();
  const effectiveIsDark = typeof isDarkMode === 'boolean' ? isDarkMode : theme.isDark;
  const effectiveToggle = onDarkModeToggle ?? theme.toggle;

  const searchBgClass = effectiveIsDark
    ? 'border-slate-800 bg-slate-900/90 text-slate-200 placeholder:text-slate-500 shadow-sm'
    : 'border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 shadow-sm';

  const searchFocusClass = 'focus:border-[#6C72FF] focus:ring-2 focus:ring-[#6C72FF]/20';

  const iconBtnClass = cn(
    'relative flex h-10 w-10 items-center justify-center rounded-xl transition focus:outline-none focus:ring-2 focus:ring-[#6C72FF]',
    effectiveIsDark
      ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
  );

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Packages', href: '/dashboard/packages' },
    { label: 'Bookings', href: '/dashboard/bookings' },
  ];

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-16 border-b backdrop-blur-xl transition-colors select-none',
        effectiveIsDark
          ? 'border-slate-800 bg-slate-950/95 text-slate-200'
          : 'border-neutral-200 bg-white/95 text-neutral-900'
      )}
    >
      <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section: Sidebar Toggle & Branding */}
        <div className="flex items-center gap-3">
          {canToggleSidebar && (
            <button
              type="button"
              onClick={onSidebarToggle}
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              className={iconBtnClass}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}

          <div className="flex flex-col">
            <span
              className="inline-flex w-fit items-center rounded-full border border-[#1c3762] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#0077ff]"
              style={{ fontFamily: 'VAG Round Next Shine, Arial, Helvetica, sans-serif' }}
            >
              FUNTUSh
            </span>
            <span
              className={cn(
                'text-xs font-bold tracking-tight',
                effectiveIsDark ? 'text-slate-200' : 'text-neutral-800'
              )}
            >
              Digital Marketing Dashboard
            </span>
          </div>
        </div>

        {/* Center Section: Global Search Bar */}
        <div className="hidden md:flex flex-1 items-center justify-center px-8">
          <label className="relative w-full max-w-lg">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search for anything..."
              className={cn(
                'w-full rounded-xl py-2 pl-10 pr-4 text-xs font-medium outline-none transition',
                searchBgClass,
                searchFocusClass
              )}
            />
          </label>
        </div>

        {/* Right Section: Notification, Messaging, Theme Toggle & User Dropdown */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Notifications Trigger & Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsNotificationsOpen((prev) => !prev);
                setIsUserDropdownOpen(false);
              }}
              aria-label="Notifications"
              className={iconBtnClass}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                2
              </span>
            </button>

            <NotificationsDropdown
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
            />
          </div>

          {/* Messages Button */}
          <button type="button" aria-label="Messages" className={iconBtnClass}>
            <MessageCircle className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
              2
            </span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={effectiveToggle}
            aria-label="Toggle theme"
            className={iconBtnClass}
          >
            {effectiveIsDark ? <Moon className="h-5 w-5" /> : <SunMedium className="h-5 w-5" />}
          </button>

          {/* Vertical Separator */}
          <div
            className={cn(
              'h-6 w-px mx-1 hidden sm:block',
              effectiveIsDark ? 'bg-slate-800' : 'bg-neutral-200'
            )}
          />

          {/* User Avatar & Dropdown Popover */}
          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => {
                setIsUserDropdownOpen((prev) => !prev);
                setIsNotificationsOpen(false);
              }}
              aria-label="User menu"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6C72FF] text-white font-bold text-xs shadow-sm shadow-[#6C72FF]/20 transition hover:bg-[#5a60e0] focus:outline-none focus:ring-2 focus:ring-[#6C72FF]"
            >
              MR
            </button>

            {isUserDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsUserDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div
                  className={cn(
                    'absolute right-0 top-full z-20 mt-2 w-60 rounded-2xl border p-2.5 shadow-2xl transition-all',
                    effectiveIsDark
                      ? 'border-slate-800 bg-slate-950 text-slate-200'
                      : 'border-neutral-200 bg-white text-neutral-900'
                  )}
                >
                  <div
                    className={cn(
                      'rounded-xl border p-3',
                      effectiveIsDark
                        ? 'border-slate-800 bg-slate-900/60'
                        : 'border-neutral-100 bg-neutral-50'
                    )}
                  >
                    <p
                      className={cn(
                        'text-xs font-bold',
                        effectiveIsDark ? 'text-white' : 'text-neutral-900'
                      )}
                    >
                      Manisha Rai
                    </p>
                    <p
                      className={cn(
                        'text-[11px] font-medium',
                        effectiveIsDark ? 'text-slate-400' : 'text-neutral-500'
                      )}
                    >
                      Agency Admin
                    </p>
                  </div>

                  <div className="mt-2 space-y-1">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition',
                        effectiveIsDark
                          ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                          : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                      )}
                    >
                      <User className="h-4 w-4" />
                      Profile Settings
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition',
                        effectiveIsDark
                          ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                          : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                      )}
                    >
                      <Settings className="h-4 w-4" />
                      Account Settings
                    </Link>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-500 transition hover:bg-rose-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Navigation Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            className={cn(iconBtnClass, 'md:hidden')}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            'md:hidden border-t px-4 py-3 space-y-2',
            effectiveIsDark
              ? 'border-slate-800 bg-slate-950'
              : 'border-neutral-200 bg-white'
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'block rounded-xl px-3.5 py-2.5 text-xs font-semibold transition',
                effectiveIsDark
                  ? 'bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white'
                  : 'bg-neutral-50 text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;