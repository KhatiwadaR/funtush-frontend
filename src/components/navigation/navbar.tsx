import React, { useState } from 'react';
import { Bell, Menu, MessageCircle, Moon, Search, SunMedium, User, X } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/theme';

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
  const canToggleSidebar = typeof onSidebarToggle === 'function';
  const theme = useTheme();
  const effectiveIsDark = typeof isDarkMode === 'boolean' ? isDarkMode : theme.isDark;
  const effectiveToggle = onDarkModeToggle ?? theme.toggle;

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Packages', href: '/dashboard/packages' },
    { label: 'Bookings', href: '/dashboard/bookings' },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {canToggleSidebar && (
            <button
              type="button"
              onClick={onSidebarToggle}
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-200 transition hover:bg-slate-800 focus:outline-none"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}

          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300">Green Agency</span>
            <span className="text-sm font-semibold text-slate-100">Digital Marketing Dashboard</span>
          </div>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center px-4">
          <label className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              placeholder="Search for anything..."
              className="w-full rounded-full border border-slate-800 bg-slate-900/95 py-3 pl-12 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-200 transition hover:bg-slate-800"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white">
              3
            </span>
          </button>

          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-200 transition hover:bg-slate-800"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[10px] font-semibold text-white">
              2
            </span>
          </button>

          <button
            type="button"
            onClick={onDarkModeToggle}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-200 transition hover:bg-slate-800"
          >
            {effectiveIsDark ? <Moon className="h-5 w-5" /> : <SunMedium className="h-5 w-5" />}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserDropdownOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 transition hover:bg-cyan-400 focus:outline-none"
            >
              <span className="text-sm font-bold">GA</span>
            </button>

            {isUserDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsUserDropdownOpen(false)} />
                <div className="absolute right-0 top-full z-20 mt-3 w-64 rounded-3xl border border-slate-800 bg-slate-950 p-3 shadow-xl shadow-black/20">
                  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-sm font-semibold text-slate-100">Manisha Rai</p>
                    <p className="mt-1 text-xs text-slate-500">Agency Admin</p>
                  </div>
                  <div className="mt-3 space-y-2">
                    <button className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-slate-800">
                      Profile Settings
                    </button>
                    <button className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-left text-sm text-rose-300 transition hover:bg-rose-950/80">
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-400">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Online
          </div>
        </div>
      </div>

      {/* Notification summary removed per UX request */}

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pb-4 pt-3">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* mobile notification summary removed */}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
