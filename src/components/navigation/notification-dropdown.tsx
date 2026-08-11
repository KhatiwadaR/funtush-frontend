'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Calendar,
  MessageSquare,
  AlertCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { useTheme } from '@/context/theme';
import { cn } from '@/lib/utils/cn';

export type NotificationType = 'booking' | 'message' | 'alert';

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: NotificationType;
  link?: string;
};

type NotificationsDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New Booking Approval',
    description: 'Manisha requested approval for Pokhara Tour Package.',
    time: '5m ago',
    unread: true,
    type: 'booking',
    link: '/dashboard/bookings/pending',
  },
  {
    id: '2',
    title: 'New Client Message',
    description: 'Received a message regarding itinerary changes.',
    time: '1h ago',
    unread: true,
    type: 'message',
    link: '/dashboard/support',
  },
  {
    id: '3',
    title: 'System Alert',
    description: 'Monthly analytics report is ready for review.',
    time: '3h ago',
    unread: false,
    type: 'alert',
    link: '/dashboard/analytics',
  },
];

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDark } = useTheme();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const handleDismiss = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-4 w-4 text-[#6C72FF]" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-emerald-500" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return <Bell className="h-4 w-4 text-[#6C72FF]" />;
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div className="fixed inset-0 z-10" onClick={onClose} aria-hidden="true" />

      {/* Dropdown Container */}
      <div
        className={cn(
          'absolute right-0 top-full z-20 mt-2 w-80 sm:w-96 rounded-2xl border p-3 shadow-2xl transition-all select-none',
          isDark
            ? 'border-slate-800 bg-slate-950 text-slate-200'
            : 'border-neutral-200 bg-white text-neutral-900'
        )}
      >
        {/* Dropdown Header */}
        <div
          className={cn(
            'flex items-center justify-between border-b pb-2.5 px-1',
            isDark ? 'border-slate-800' : 'border-neutral-100'
          )}
        >
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-[#6C72FF]" />
            <h3 className="text-xs font-bold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-[#6C72FF]/10 text-[#6C72FF] px-2 py-0.5 text-[10px] font-bold">
                {unreadCount} New
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="flex items-center gap-1 text-[11px] font-semibold text-[#6C72FF] hover:underline"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="mt-2 max-h-80 overflow-y-auto space-y-1.5 pr-1">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400 dark:text-slate-500">
              No notifications at the moment.
            </div>
          ) : (
            notifications.map((item) => {
              const content = (
                <div
                  className={cn(
                    'group relative flex gap-3 rounded-xl p-2.5 text-xs transition-all duration-150',
                    item.unread
                      ? isDark
                        ? 'bg-slate-900/80 border border-slate-800'
                        : 'bg-neutral-50 border border-neutral-100'
                      : 'hover:bg-neutral-50 dark:hover:bg-slate-900/40 border border-transparent'
                  )}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {getNotificationIcon(item.type)}
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <p
                        className={cn(
                          'text-xs font-bold truncate',
                          item.unread
                            ? isDark
                              ? 'text-white'
                              : 'text-neutral-900'
                            : isDark
                            ? 'text-slate-300'
                            : 'text-neutral-700'
                        )}
                      >
                        {item.title}
                      </p>
                      <span className="text-[10px] text-neutral-400 dark:text-slate-500 flex-shrink-0">
                        {item.time}
                      </span>
                    </div>

                    <p
                      className={cn(
                        'text-[11px] line-clamp-2',
                        isDark ? 'text-slate-400' : 'text-neutral-500'
                      )}
                    >
                      {item.description}
                    </p>

                    {/* Action buttons on hover */}
                    <div className="mt-1.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => handleToggleRead(item.id, e)}
                        className="text-[10px] font-semibold text-neutral-500 hover:text-[#6C72FF] flex items-center gap-1"
                      >
                        <Check className="h-3 w-3" />
                        {item.unread ? 'Mark read' : 'Mark unread'}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDismiss(item.id, e)}
                        className="text-[10px] font-semibold text-neutral-500 hover:text-rose-500 flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Dismiss
                      </button>
                    </div>
                  </div>

                  {item.unread && (
                    <span className="h-2 w-2 rounded-full bg-[#6C72FF] self-center flex-shrink-0" />
                  )}
                </div>
              );

              return item.link ? (
                <Link key={item.id} href={item.link} onClick={onClose} className="block">
                  {content}
                </Link>
              ) : (
                <div key={item.id}>{content}</div>
              );
            })
          )}
        </div>

        {/* Dropdown Footer */}
        <div
          className={cn(
            'mt-2 border-t pt-2 text-center',
            isDark ? 'border-slate-800' : 'border-neutral-100'
          )}
        >
          <Link
            href="/dashboard/notifications"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C72FF] hover:underline"
          >
            View all notifications
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </>
  );
};