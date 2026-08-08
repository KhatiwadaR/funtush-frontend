'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Bell, Building2, CheckCircle2, ChevronRight, CreditCard, Globe2, KeyRound, LayoutGrid, LockKeyhole, Mail, Palette, Search, SearchCode, Share2, Shield, Sparkles, Users, Wallet } from 'lucide-react';

type SettingItem = { label: string; description: string; href: string; icon: typeof Palette; tone: 'primary' | 'success' | 'warning' | 'accent' };

const groups: Array<{ title: string; description: string; items: SettingItem[] }> = [
  { title: 'Agency & website', description: 'Manage how your agency appears to trekkers.', items: [
    { label: 'Agency Info', description: 'Business name, contact details, and address.', href: '/dashboard/settings/agency-info', icon: Building2, tone: 'primary' },
    { label: 'Branding', description: 'Logo, colors, fonts, and visual identity.', href: '/dashboard/settings/branding', icon: Palette, tone: 'accent' },
    { label: 'Domain', description: 'Connect and manage your custom domain.', href: '/dashboard/settings/domain', icon: Globe2, tone: 'success' },
    { label: 'Navigation', description: 'Organize the menus on your public site.', href: '/dashboard/settings/navigation', icon: LayoutGrid, tone: 'warning' },
    { label: 'SEO', description: 'Improve search visibility and page metadata.', href: '/dashboard/settings/seo', icon: SearchCode, tone: 'primary' },
    { label: 'Social', description: 'Connect your social media profiles.', href: '/dashboard/settings/social', icon: Share2, tone: 'accent' },
  ] },
  { title: 'Operations & billing', description: 'Configure payments, plans, and operational tools.', items: [
    { label: 'Payments', description: 'Payment methods and collection preferences.', href: '/dashboard/settings/payments', icon: Wallet, tone: 'success' },
    { label: 'Subscription', description: 'Review your plan and available features.', href: '/dashboard/settings/subscription', icon: Sparkles, tone: 'warning' },
    { label: 'Billing', description: 'Invoices, receipts, and billing history.', href: '/dashboard/settings/billing', icon: CreditCard, tone: 'primary' },
    { label: 'Widgets', description: 'Choose the tools shown across your site.', href: '/dashboard/settings/widgets', icon: LayoutGrid, tone: 'accent' },
  ] },
  { title: 'Team & security', description: 'Control access, alerts, and account protection.', items: [
    { label: 'Team', description: 'Manage staff members and roles.', href: '/dashboard/settings/team', icon: Users, tone: 'primary' },
    { label: 'Security', description: 'Account security and access controls.', href: '/dashboard/settings/security', icon: Shield, tone: 'warning' },
    { label: 'Notifications', description: 'Choose which updates you receive.', href: '/dashboard/settings/notifications', icon: Bell, tone: 'warning' },
    { label: 'Email', description: 'Configure sender and email preferences.', href: '/dashboard/settings/email', icon: Mail, tone: 'success' },
    { label: 'Password', description: 'Change your account password.', href: '/dashboard/settings/password', icon: LockKeyhole, tone: 'accent' },
    { label: 'API Keys', description: 'Manage integrations and API access.', href: '/dashboard/settings/api-keys', icon: KeyRound, tone: 'primary' },
  ] },
];

const toneStyles = { primary: 'bg-primary-50 text-primary-700', success: 'bg-success-50 text-success-700', warning: 'bg-warning-50 text-warning-700', accent: 'bg-accent-50 text-accent-700' };

export default function SettingsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const filteredGroups = useMemo(() => groups.map((group) => ({ ...group, items: group.items.filter((item) => `${item.label} ${item.description}`.toLowerCase().includes(search.toLowerCase())) })).filter((group) => group.items.length > 0), [search]);

  return <div className="space-y-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-2 text-sm text-neutral-500"><button type="button" onClick={() => router.push('/dashboard')} className="hover:text-neutral-900">Dashboard</button><span>/</span><span className="font-semibold text-neutral-900">Settings</span></div><h1 className="mt-2 text-2xl font-semibold text-neutral-900">Settings</h1><p className="mt-1 text-sm text-neutral-600">Configure your agency workspace, website, and account preferences.</p></div><div className="flex items-center gap-2 rounded-xl border border-success-200 bg-success-50 px-3 py-2 text-xs font-semibold text-success-800"><CheckCircle2 className="h-4 w-4" /> All systems operational</div></div>
    <div className="relative max-w-xl"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search settings" className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm text-neutral-900 outline-none shadow-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]"><section className="rounded-2xl border border-primary-200 bg-primary-900 p-5 text-white shadow-sm"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">Workspace setup</p><h2 className="mt-2 text-lg font-semibold">Make your agency feel like yours</h2><p className="mt-2 max-w-lg text-sm leading-6 text-primary-100">Complete your branding, agency information, and domain settings to create a polished public presence.</p></div><Palette className="h-6 w-6 text-primary-200" /></div><button type="button" onClick={() => router.push('/dashboard/settings/branding')} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-primary-900 hover:bg-primary-50">Open branding <ArrowRight className="h-4 w-4" /></button></section><section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><div className="rounded-xl bg-warning-50 p-2 text-warning-700"><Shield className="h-5 w-5" /></div><div><h2 className="text-sm font-semibold text-neutral-900">Account protection</h2><p className="mt-1 text-xs text-neutral-500">Keep access secure and controlled.</p></div></div><div className="mt-5 space-y-3"><LinkRow label="Security" href="/dashboard/settings/security" /><LinkRow label="Password" href="/dashboard/settings/password" /><LinkRow label="API Keys" href="/dashboard/settings/api-keys" /></div></section></div>
    {filteredGroups.length ? filteredGroups.map((group) => <section key={group.title}><div className="mb-3"><h2 className="text-base font-semibold text-neutral-900">{group.title}</h2><p className="mt-1 text-sm text-neutral-500">{group.description}</p></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{group.items.map((item) => <button key={item.href} type="button" onClick={() => router.push(item.href)} className="group flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md"><div className={`rounded-xl p-2.5 ${toneStyles[item.tone]}`}><item.icon className="h-5 w-5" /></div><div className="min-w-0 flex-1"><h3 className="text-sm font-semibold text-neutral-900">{item.label}</h3><p className="mt-1 text-xs leading-5 text-neutral-500">{item.description}</p></div><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-neutral-300 transition group-hover:text-primary-700" /></button>)}</div></section>) : <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-5 py-10 text-center text-sm text-neutral-500">No settings match “{search}”.</div>}
  </div>;
}

function LinkRow({ label, href }: { label: string; href: string }) { return <Link href={href} className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-900"><span>{label}</span><ChevronRight className="h-4 w-4 text-neutral-400" /></Link>; }
