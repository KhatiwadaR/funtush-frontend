"use client";

import Link from "next/link";
import destinations from "../../../../../data/destinations.json";
import { AnalyticsSummaryCard } from '@/components/shared/AnalyticsSummaryCard';
import { Compass, Mountain, Star } from 'lucide-react';

export default function DestinationsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3"><div><div className="flex items-center gap-2 text-sm text-neutral-500"><Link href="/dashboard">Dashboard</Link><span>/</span><span className="font-semibold text-neutral-900">Destinations</span></div><h1 className="mt-2 text-2xl font-semibold text-neutral-900">Destinations</h1><p className="mt-1 text-sm text-neutral-600">Manage trekking destinations and seasonal information.</p></div>

        <Link
          href="/dashboard/destinations/new"
          className="rounded-2xl bg-primary-900 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
        >
          + New Destination
        </Link></div>

      <div className="grid gap-3 sm:grid-cols-3"><AnalyticsSummaryCard label="Total Destinations" value={destinations.length} tone="primary" icon={Compass} /><AnalyticsSummaryCard label="Featured" value={destinations.filter((destination) => destination.featured).length} tone="success" icon={Star} /><AnalyticsSummaryCard label="Regions" value={new Set(destinations.map((destination) => destination.region)).size} tone="warning" icon={Mountain} /></div>

      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm"><table className="min-w-full text-left text-sm">
        <thead className="bg-neutral-50">
          <tr>
            <th className="border-b border-neutral-200 p-3 text-left">Title</th>
            <th className="border-b border-neutral-200 p-3 text-left">Region</th>
            <th className="border-b border-neutral-200 p-3 text-left">Difficulty</th>
            <th className="border-b border-neutral-200 p-3 text-left">Altitude</th>
            <th className="border-b border-neutral-200 p-3 text-left">Season</th>
            <th className="border-b border-neutral-200 p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {destinations.map((destination) => (
            <tr key={destination.id} className="hover:bg-neutral-50">
              <td className="border-b border-neutral-200 p-3 font-semibold text-neutral-900">{destination.title}</td>

              <td className="border-b border-neutral-200 p-3 text-neutral-700">{destination.region}</td>

              <td className="border-b border-neutral-200 p-3 text-neutral-700">{destination.difficulty}</td>

              <td className="border-b border-neutral-200 p-3 text-neutral-700">{destination.maxAltitude}</td>

              <td className="border-b border-neutral-200 p-3 text-neutral-700">{destination.bestSeason}</td>

              <td className="border-b border-neutral-200 p-3 text-center">
                <Link
                  href={`/dashboard/destinations/${destination.id}/edit`}
                  className="rounded-xl bg-warning-50 px-3 py-1 text-xs font-semibold text-warning-700 hover:bg-warning-100"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  );
}
