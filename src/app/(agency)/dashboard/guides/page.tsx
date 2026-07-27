"use client";

import { useState, useMemo } from "react";
import { Plus, AlertTriangle, Search } from "lucide-react";
import { DeleteOutlined, EditOutlined, VisibilityOutlined } from "@mui/icons-material";
import guidesData from "../../../../../data/guides.json";

const isExpiringSoon = (expiry: string) => {
  const now = new Date();
  const exp = new Date(expiry);
  const diff = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff > 0 && diff <= 30;
};

const statusMap: Record<string, { label: string; pill: string }> = {
  available: { label: "Available", pill: "bg-emerald-100 text-emerald-800" },
  on_trek: { label: "On Trek", pill: "bg-sky-100 text-sky-800" },
  unavailable: { label: "Unavailable", pill: "bg-rose-100 text-rose-800" },
};

const gpsLabel = (status: string) => {
  switch (status) {
    case "available":
      return "Online";
    case "on_trek":
      return "Tracking";
    default:
      return "Offline";
  }
};

const guideRows = guidesData.map((guide, index) => ({
  ...guide,
  treksDone: 16 + index * 3,
  gps: gpsLabel(guide.status),
  email: `${guide.name.toLowerCase().replace(/\s+/g, ".")}@funtush.com`,
}));

export default function GuidesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");

  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    guidesData.forEach((guide) => guide.languages.forEach((lang) => langs.add(lang)));
    return Array.from(langs);
  }, []);

  const stats = useMemo(() => {
    const total = guidesData.length;
    const available = guidesData.filter((guide) => guide.status === "available").length;
    const onTrek = guidesData.filter((guide) => guide.status === "on_trek").length;
    const expiring = guidesData.filter((guide) => guide.certifications.some((cert) => isExpiringSoon(cert.expiry))).length;
    return { total, available, onTrek, expiring };
  }, []);

  const filteredGuides = useMemo(() => {
    return guideRows.filter((guide) => {
      const matchesSearch = guide.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || guide.status === statusFilter;
      const matchesLanguage = languageFilter === "all" || guide.languages.includes(languageFilter);
      return matchesSearch && matchesStatus && matchesLanguage;
    });
  }, [search, statusFilter, languageFilter]);

  const nextExpiry = guidesData
    .flatMap((guide) => guide.certifications.map((cert) => ({ guide: guide.name, ...cert })))
    .filter((cert) => isExpiringSoon(cert.expiry))
    .sort((a, b) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime())[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">Guides</p>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-neutral-900">Agency Guides</h1>
            <p className="text-sm leading-6 text-neutral-600">Manage guide profiles, certifications, and availability in one place.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 shadow-sm">
            <Plus className="h-4 w-4" />
            Add Guide
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-amber-950">Upcoming renewal alert</p>
              <p className="text-sm text-amber-800">
                {nextExpiry ? `${nextExpiry.guide}'s certification expires on ${new Date(nextExpiry.expiry).toLocaleDateString()}.` : "No certifications expiring soon."}
              </p>
            </div>
          </div>
          <button className="rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900 shadow-sm transition hover:bg-amber-100">
            View renewals
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <SummaryCard title="Total Guides" value={stats.total} accent="text-violet-700" />
        <SummaryCard title="On Trek" value={stats.onTrek} accent="text-sky-700" />
        <SummaryCard title="Available" value={stats.available} accent="text-emerald-700" />
        <SummaryCard title="Certs Expiring" value={stats.expiring} accent="text-rose-700" />
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(240px,1fr)_180px_180px]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            className="w-full rounded-2xl border border-neutral-200 bg-white py-2.5 pl-10 pr-3 text-sm text-neutral-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            placeholder="Search guides"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <select
          className="rounded-2xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All status</option>
          <option value="available">Available</option>
          <option value="on_trek">On Trek</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <select
          className="rounded-2xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
        >
          <option value="all">All languages</option>
          {allLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto border-t border-neutral-200 bg-white/90">
          <table className="min-w-full text-left text-sm text-neutral-700">
            <thead>
              <tr className="border-b border-neutral-200 text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                <th className="px-4 py-4">S.NO</th>
                <th className="px-4 py-4">Guide</th>
                <th className="px-4 py-4">Languages</th>
                <th className="px-4 py-4">Certifications</th>
                <th className="px-4 py-4">Rating</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuides.map((guide, index) => {
                const statusInfo = statusMap[guide.status] || statusMap.unavailable;
                const expiringCert = guide.certifications.find((cert) => isExpiringSoon(cert.expiry));
                return (
                  <tr key={guide.id} className="border-b border-neutral-200 transition hover:bg-slate-50">
                    <td className="px-4 py-4 font-semibold text-neutral-900">{String(index + 1).padStart(2, "0")}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-sm font-bold text-white">
                          {guide.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-900">{guide.name}</div>
                          <div className="text-xs text-neutral-500">{guide.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-neutral-600">{guide.languages.join(", ")}</td>
                    <td className="px-4 py-4 text-xs leading-5 text-neutral-600">
                      {guide.certifications.length > 0 ? (
                        guide.certifications.map((cert) => (
                          <div key={cert.number} className="mb-2 rounded-2xl bg-slate-50 px-3 py-2">
                            <div className="font-semibold text-neutral-900">{cert.name}</div>
                            <div className="text-[11px] text-neutral-500">{cert.number}</div>
                          </div>
                        ))
                      ) : (
                        <span className="text-neutral-400">No certs</span>
                      )}
                      {expiringCert && (
                        <div className="mt-1 text-[11px] text-rose-600">Expires {new Date(expiringCert.expiry).toLocaleDateString()}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-amber-600">{guide.rating.toFixed(1)}★</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.pill}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition hover:bg-neutral-200">
                          <span className="sr-only">View</span>
                          <VisibilityOutlined className="h-4 w-4" />
                        </button>
                        <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition hover:bg-neutral-200">
                          <span className="sr-only">Edit</span>
                          <EditOutlined className="h-4 w-4" />
                        </button>
                        <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition hover:bg-neutral-200">
                          <span className="sr-only">Delete</span>
                          <DeleteOutlined className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </div>
  );
}

function SummaryCard({ title, value, accent }: { title: string; value: number; accent: string }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className={`text-3xl font-bold ${accent}`}>{value}</div>
      <div className="mt-2 text-sm text-neutral-500">{title}</div>
    </div>
  );
}
