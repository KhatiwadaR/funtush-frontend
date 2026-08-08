"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Activity, AlertTriangle, CalendarDays, CheckCircle2, FileText, MapPin, Package as PackageIcon, Plus, ShieldAlert, TrendingUp, Users } from "lucide-react";
import bookingsData from "../../../../data/bookings.json";
import guidesData from "../../../../data/guides.json";
import packagesData from "../../../../data/packages.json";
import usersData from "../../../../data/users.json";
import blogsData from "../../../../data/blogs.json";
import financeData from "../../../../data/finance.json";
import { AnalyticsSummaryCard } from "@/components/shared/AnalyticsSummaryCard";

const agencyId = "ag-001";
const agencyBookings = (bookingsData as Array<{ id: string; agency_id: string; trekker_id: string; package_id: string; guide_id?: string | null; status: string; departure_date: string; group_size: number; total_price: number }>).filter((booking) => booking.agency_id === agencyId);
const agencyPackages = (packagesData as Array<{ id: string; agency_id: string; title: string }>).filter((pkg) => pkg.agency_id === agencyId);
const agencyGuides = guidesData as Array<{ id: string; name: string; status: string; rating: number }>;
const trekkers = usersData as Array<{ id: string; name: string }>;

export default function AgencyDashboardPage() {
  const pending = agencyBookings.filter((booking) => booking.status === "inquiry");
  const confirmed = agencyBookings.filter((booking) => booking.status === "confirmed");
  const active = agencyBookings.filter((booking) => booking.status === "active");
  const completed = agencyBookings.filter((booking) => booking.status === "completed");
  const onTrekGuides = agencyGuides.filter((guide) => guide.status === "on_trek");
  const revenue = agencyBookings.reduce((sum, booking) => sum + booking.total_price, 0);
  const publishedBlogs = blogsData.blogs.filter((blog) => blog.status === "Published").length;
  const activeSos = active.length > 0;

  const bookingSeries = useMemo(() => [
    Math.max(2, pending.length + 2),
    Math.max(4, confirmed.length + 4),
    Math.max(3, agencyBookings.length + 2),
    Math.max(5, completed.length + 5),
    Math.max(4, active.length + 4),
    Math.max(6, agencyBookings.length + 6),
    Math.max(5, confirmed.length + 5),
    Math.max(7, agencyBookings.length + 7),
    Math.max(6, completed.length + 6),
    Math.max(8, agencyBookings.length + 8),
    Math.max(7, confirmed.length + 7),
    Math.max(9, agencyBookings.length + 9),
  ], [active.length, agencyBookings.length, completed.length, confirmed.length, pending.length]);
  const maxBookings = Math.max(...bookingSeries);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-neutral-500"><span className="font-semibold text-neutral-900">Dashboard</span></div>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-900">Agency Overview</h1>
          <p className="mt-1 text-sm text-neutral-600">Keep today&apos;s bookings, treks, and team activity in view.</p>
        </div>
        <div className="hidden items-center gap-2 sm:flex"><Link href="/dashboard/packages/new" className="inline-flex items-center gap-2 rounded-2xl bg-primary-900 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-800"><Plus className="h-4 w-4" /> New package</Link></div>
      </div>

      {activeSos && <div className="rounded-2xl border border-danger-300 bg-danger-50 px-4 py-3 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger-600 text-white"><ShieldAlert className="h-5 w-5" /></div><div><p className="text-sm font-semibold text-danger-900">Active safety attention required</p><p className="text-xs text-danger-700">An active trek is currently in progress. Review the safety dashboard for live status.</p></div></div><Link href="/dashboard/safety" className="text-xs font-semibold text-danger-800 hover:underline">View safety →</Link></div></div>}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsSummaryCard label="Inquiries" value={pending.length} tone="warning" icon={AlertTriangle} />
        <AnalyticsSummaryCard label="Confirmed Bookings" value={confirmed.length} tone="primary" icon={CheckCircle2} />
        <AnalyticsSummaryCard label="Revenue" value={`Rs. ${revenue.toLocaleString("en-IN")}`} tone="accent" icon={TrendingUp} />
        <AnalyticsSummaryCard label="Active Treks" value={active.length} tone="success" icon={MapPin} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
        <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3"><div><h2 className="text-sm font-semibold text-neutral-900">Analytics — Daily Bookings</h2><p className="mt-1 text-xs text-neutral-500">Monthly overview</p></div><select className="rounded-lg border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-700"><option>2026</option></select></div>
          <div className="px-4 pb-4 pt-5"><div className="flex h-44 items-end gap-2 border-b border-neutral-200 pb-2">{bookingSeries.map((value, index) => <div key={index} className="flex flex-1 items-end justify-center gap-1"><div className="w-full rounded-t-md bg-primary-200" style={{ height: `${(value / maxBookings) * 100}%` }} /><div className="w-1 rounded-full bg-primary-700" style={{ height: `${Math.max(8, (value / maxBookings) * 100)}%` }} /></div>)}</div><div className="mt-2 grid grid-cols-6 text-[10px] text-neutral-400"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span className="text-right">Jun</span></div><div className="mt-4 grid gap-2 sm:grid-cols-3"><QuickLink href="/dashboard/packages/new" icon={PackageIcon} label="New package" detail="Add trek" /><QuickLink href="/dashboard/bookings" icon={CalendarDays} label="Bookings" detail="Review requests" /><QuickLink href="/dashboard/blog/new" icon={FileText} label="Add blog" detail="Publish story" /></div></div>
        </section>

        <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3"><div><h2 className="text-sm font-semibold text-neutral-900">Booking Distribution</h2><p className="mt-1 text-xs text-neutral-500">Current status mix</p></div><Activity className="h-4 w-4 text-primary-700" /></div><div className="flex items-center gap-5 p-5"><div className="relative h-32 w-32 shrink-0 rounded-full" style={{ background: "conic-gradient(var(--color-primary-700) 0 42%, var(--color-success-500) 42% 68%, var(--color-warning-500) 68% 84%, var(--color-danger-400) 84% 100%)" }}><div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white"><span className="text-xl font-semibold text-neutral-900">{agencyBookings.length}</span><span className="text-[10px] text-neutral-500">Total</span></div></div><div className="flex-1 space-y-2 text-xs text-neutral-600"><Legend color="bg-primary-700" label="Confirmed" value={confirmed.length} /><Legend color="bg-success-500" label="Completed" value={completed.length} /><Legend color="bg-warning-500" label="Pending" value={pending.length} /><Legend color="bg-danger-400" label="Active" value={active.length} /></div></div></section>
      </div>

      <div><h2 className="mb-3 text-sm font-semibold text-neutral-900">Statistics</h2><div className="grid gap-4 lg:grid-cols-2"><ProgressCard label="Weekly Target" value="25% achieved" progress={25} tone="primary" /><ProgressCard label="Monthly Target" value="50% achieved" progress={50} tone="accent" /></div></div>

      <div className="grid gap-4 lg:grid-cols-2"><section className="rounded-2xl border border-neutral-200 bg-white shadow-sm"><PanelHeader title="Pending Inquiries" count={pending.length} href="/dashboard/bookings" />{pending.slice(0, 4).map((booking) => <BookingRow key={booking.id} booking={booking} />)}{pending.length === 0 && <p className="px-4 py-6 text-sm text-neutral-500">No pending inquiries.</p>}</section><section className="rounded-2xl border border-neutral-200 bg-white shadow-sm"><PanelHeader title="Active Guides on Trek" count={onTrekGuides.length} href="/dashboard/guides" />{onTrekGuides.slice(0, 4).map((guide) => <div key={guide.id} className="flex items-center justify-between border-b border-neutral-100 px-4 py-3"><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-900">{guide.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div><div><p className="text-sm font-semibold text-neutral-900">{guide.name}</p><p className="text-xs text-neutral-500">Rating {guide.rating.toFixed(1)} · On trek</p></div></div><span className="text-xs font-semibold text-success-700">● LIVE</span></div>)}{onTrekGuides.length === 0 && <p className="px-4 py-6 text-sm text-neutral-500">No guides currently on trek.</p>}</section></div>

      <div className="grid gap-3 sm:grid-cols-3"><MiniMetric icon={Users} label="Customers" value={trekkers.length} /><MiniMetric icon={PackageIcon} label="Packages" value={agencyPackages.length} /><MiniMetric icon={FileText} label="Published blogs" value={publishedBlogs} /></div>
    </div>
  );
}

function QuickLink({ href, icon: Icon, label, detail }: { href: string; icon: typeof PackageIcon; label: string; detail: string }) { return <Link href={href} className="flex items-center gap-2 rounded-xl bg-neutral-50 px-3 py-2 hover:bg-primary-50"><Icon className="h-4 w-4 text-primary-700" /><span><span className="block text-xs font-semibold text-neutral-900">{label}</span><span className="block text-[10px] text-neutral-500">{detail}</span></span></Link>; }
function Legend({ color, label, value }: { color: string; label: string; value: number }) { return <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${color}`} />{label}</span><strong className="text-neutral-900">{value}</strong></div>; }
function ProgressCard({ label, value, progress, tone }: { label: string; value: string; progress: number; tone: "primary" | "accent" }) { return <div className={`rounded-2xl border p-4 shadow-sm ${tone === "accent" ? "border-accent-700 bg-accent-600 text-white" : "border-neutral-200 bg-white"}`}><div className="flex items-center justify-between"><div><p className={`text-xs ${tone === "accent" ? "text-white/80" : "text-neutral-500"}`}>{label}</p><p className={`mt-1 text-sm font-semibold ${tone === "accent" ? "text-white" : "text-neutral-700"}`}>{value}</p></div><span className={`flex h-10 w-10 items-center justify-center rounded-full border-4 text-xs font-semibold ${tone === "accent" ? "border-white text-white" : "border-primary-200 text-primary-900"}`}>{progress}%</span></div><div className={`mt-4 h-1.5 rounded-full ${tone === "accent" ? "bg-white/30" : "bg-primary-100"}`}><div className={`h-full rounded-full ${tone === "accent" ? "bg-white" : "bg-primary-700"}`} style={{ width: `${progress}%` }} /></div></div>; }
function PanelHeader({ title, count, href }: { title: string; count: number; href: string }) { return <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3"><h2 className="text-sm font-semibold text-neutral-900">{title} <span className="ml-1 rounded-full bg-danger-50 px-2 py-0.5 text-[10px] text-danger-700">{count}</span></h2><Link href={href} className="text-xs font-semibold text-primary-900 hover:underline">View all</Link></div>; }
function BookingRow({ booking }: { booking: (typeof agencyBookings)[number] }) { const trekker = trekkers.find((user) => user.id === booking.trekker_id); return <Link href={`/dashboard/bookings/${booking.id}`} className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 hover:bg-neutral-50"><div><p className="text-sm font-semibold text-neutral-900">{trekker?.name ?? booking.trekker_id}</p><p className="text-xs text-neutral-500">{booking.id} · {booking.group_size} pax</p></div><span className="rounded-full bg-warning-50 px-2 py-1 text-[10px] font-semibold text-warning-700">Pending</span></Link>; }
function MiniMetric({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: number }) { return <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><Icon className="h-4 w-4" /></div><div><p className="text-xs text-neutral-500">{label}</p><p className="text-lg font-semibold text-neutral-900">{value}</p></div></div>; }
