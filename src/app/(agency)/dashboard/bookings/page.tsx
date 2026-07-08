"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import bookingsData from "../../../../../data/bookings.json";
import usersData from "../../../../../data/users.json";
import packagesData from "../../../../../data/packages.json";
import guidesData from "../../../../../data/guides.json";

type AddOn = {
  name: string;
  price: number;
};

type Booking = {
  id: string;
  package_id: string;
  trekker_id: string;
  agency_id: string;
  guide_id?: string;
  departure_date: string;
  group_size: number;
  add_ons: AddOn[];
  total_price: number;
  status: string;
  created_at: string;
};

type User = {
  id: string;
  name: string;
};

type Package = {
  id: string;
  title: string;
};

type Guide = {
  id: string;
  name: string;
};

const tabs = [
  "inquiry",
  "confirmed",
  "active",
  "completed",
  "cancelled",
] as const;

type Tab = (typeof tabs)[number];

function BookingStatusBadge({ status }: { status: string }) {
  let color = "bg-gray-500";

  switch (status.toLowerCase()) {
    case "inquiry":
      color = "bg-red-500";
      break;
    case "confirmed":
      color = "bg-green-600";
      break;
    case "payment":
      color = "bg-yellow-500";
      break;
    case "active":
      color = "bg-blue-600";
      break;
    case "completed":
      color = "bg-emerald-700";
      break;
    case "cancelled":
      color = "bg-gray-700";
      break;
    case "rejected":
      color = "bg-red-700";
      break;
  }

  return (
    <span
      className={`rounded px-2 py-1 text-xs font-medium text-white ${color}`}
    >
      {status}
    </span>
  );
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("inquiry");

  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [bookings] = useState<Booking[]>(() => {
    if (typeof window === "undefined") {
      return bookingsData as Booking[];
    }

    const stored = localStorage.getItem("bookings");

    return stored
      ? (JSON.parse(stored) as Booking[])
      : (bookingsData as Booking[]);
  });

  const inquiryCount = bookings.filter(
    (booking) => booking.status.toLowerCase() === "inquiry",
  ).length;

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      if (booking.status.toLowerCase() !== activeTab) {
        return false;
      }

      const trekker = (usersData as User[]).find(
        (user) => user.id === booking.trekker_id,
      );

      const trekkerName = trekker?.name.toLowerCase() ?? "";

      if (search && !trekkerName.includes(search.toLowerCase())) {
        return false;
      }

      if (fromDate && booking.departure_date < fromDate) {
        return false;
      }

      if (toDate && booking.departure_date > toDate) {
        return false;
      }

      return true;
    });
  }, [activeTab, bookings, fromDate, search, toDate]);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bookings</h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded px-4 py-2 capitalize ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {tab}

            {tab === "inquiry" && inquiryCount > 0 && (
              <span className="ml-2 rounded-full bg-red-600 px-2 text-xs text-white">
                {inquiryCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search trekker..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded border p-2"
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="rounded border p-2"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="rounded border p-2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Trekker</th>

              <th className="border p-3 text-left">Package</th>

              <th className="border p-3 text-left">Departure</th>

              <th className="border p-3 text-center">Group</th>

              <th className="border p-3 text-right">Amount</th>

              <th className="border p-3 text-left">Guide</th>

              <th className="border p-3 text-center">Status</th>

              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="border p-5 text-center text-gray-500"
                >
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => {
                const trekker = (usersData as User[]).find(
                  (user) => user.id === booking.trekker_id,
                );

                const packageInfo = (packagesData as Package[]).find(
                  (pkg) => pkg.id === booking.package_id,
                );

                const guide = (guidesData as Guide[]).find(
                  (guide) => guide.id === booking.guide_id,
                );

                return (
                  <tr key={booking.id}>
                    <td className="border p-3">{trekker?.name ?? "Unknown"}</td>

                    <td className="border p-3">
                      {packageInfo?.title ?? "Unknown Package"}
                    </td>

                    <td className="border p-3">{booking.departure_date}</td>

                    <td className="border p-3 text-center">
                      {booking.group_size}
                    </td>

                    <td className="border p-3 text-right">
                      Rs. {booking.total_price}
                    </td>

                    <td className="border p-3">
                      {guide?.name ?? "Not Assigned"}
                    </td>

                    <td className="border p-3 text-center">
                      <BookingStatusBadge status={booking.status} />
                    </td>

                    <td className="border p-3 text-center">
                      <Link
                        href={`/dashboard/bookings/${booking.id}`}
                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
