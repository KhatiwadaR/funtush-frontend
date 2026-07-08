"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import bookingsData from "../../../../../../data/bookings.json";
import guidesData from "../../../../../../data/guides.json";
import packagesData from "../../../../../../data/packages.json";
import usersData from "../../../../../../data/users.json";

type AddOn = {
  name: string;
  price: number;
};

type Booking = {
  id: string;
  package_id: string;
  trekker_id: string;
  agency_id: string;
  guide_id: string;
  departure_date: string;
  group_size: number;
  add_ons: AddOn[];
  total_price: number;
  status: string;
  created_at: string;
  proposed_date?: string;
  reject_reason?: string;
};

type Guide = {
  id: string;
  name: string;
  status: string;
  rating: number;
};

type Package = {
  id: string;
  title?: string;
  name?: string;
  destination?: string;
};

type User = {
  id: string;
  name: string;
  email?: string;
};

const statusSteps = ["inquiry", "confirmed", "payment", "active", "completed"];

export default function BookingDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const stored = localStorage.getItem("bookings");

    const allBookings: Booking[] = stored
      ? (JSON.parse(stored) as Booking[])
      : (bookingsData as Booking[]);

    return allBookings.find((item) => item.id === id) ?? null;
  });

  const [showReject, setShowReject] = useState(false);

  const [showDate, setShowDate] = useState(false);

  const [rejectReason, setRejectReason] = useState("");

  const [alternativeDate, setAlternativeDate] = useState("");

  const updateBooking = (data: Partial<Booking>) => {
    const stored = localStorage.getItem("bookings");

    const allBookings: Booking[] = stored ? JSON.parse(stored) : bookingsData;

    const updated = allBookings.map((item) =>
      item.id === id
        ? {
            ...item,
            ...data,
          }
        : item,
    );

    localStorage.setItem("bookings", JSON.stringify(updated));

    setBooking((previous) =>
      previous
        ? {
            ...previous,
            ...data,
          }
        : null,
    );
  };

  if (!booking) {
    return <div className="p-6">Loading...</div>;
  }

  const packageDetails = (packagesData as Package[]).find(
    (item) => item.id === booking.package_id,
  );

  const trekker = (usersData as User[]).find(
    (item) => item.id === booking.trekker_id,
  );

  const assignedGuide = (guidesData as Guide[]).find(
    (item) => item.id === booking.guide_id,
  );

  const availableGuides = (guidesData as Guide[]).filter(
    (guide) => guide.status === "available",
  );

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Booking Details</h1>

      {/* Trekker */}

      <section className="border rounded p-5">
        <h2 className="text-xl font-semibold">Trekker Information</h2>

        <p>Name: {trekker?.name ?? booking.trekker_id}</p>

        <p>Email: {trekker?.email ?? "-"}</p>
      </section>

      {/* Package */}

      <section className="border rounded p-5">
        <h2 className="text-xl font-semibold">Package Details</h2>

        <p>
          Package:{" "}
          {packageDetails?.title ?? packageDetails?.name ?? booking.package_id}
        </p>

        <p>Destination: {packageDetails?.destination ?? "-"}</p>
      </section>

      {/* Booking Info */}

      <section className="border rounded p-5">
        <h2 className="text-xl font-semibold">Booking Information</h2>

        <p>Departure: {booking.departure_date}</p>

        <p>Group Size: {booking.group_size}</p>

        <p>Total Price: ${booking.total_price}</p>

        <h3 className="font-semibold mt-3">Add-ons</h3>

        {booking.add_ons.map((addon) => (
          <p key={addon.name}>
            {addon.name} - ${addon.price}
          </p>
        ))}
      </section>

      {/* Timeline */}

      <section className="border rounded p-5">
        <h2 className="text-xl font-semibold">Status Timeline</h2>

        <div className="flex gap-3 flex-wrap mt-4">
          {statusSteps.map((step) => (
            <div
              key={step}
              className={`border px-3 py-2 rounded ${
                booking.status === step ? "bg-green-600 text-white" : ""
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </section>

      {/* Actions */}

      {booking.status === "inquiry" && (
        <div className="space-x-3">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() =>
              updateBooking({
                status: "confirmed",
              })
            }
          >
            Accept
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => setShowReject(true)}
          >
            Reject
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowDate(true)}
          >
            Propose Alternative Date
          </button>
        </div>
      )}

      {/* Assign Guide */}

      <section className="border rounded p-5">
        <h2 className="font-semibold">Assign Guide</h2>

        <p>Current: {assignedGuide?.name ?? "Not assigned"}</p>

        <select
          className="border p-2 mt-3"
          value={booking.guide_id}
          onChange={(e) =>
            updateBooking({
              guide_id: e.target.value,
            })
          }
        >
          <option value="">Select Guide</option>

          {availableGuides.map((guide) => (
            <option key={guide.id} value={guide.id}>
              {guide.name} {guide.rating}
            </option>
          ))}
        </select>
      </section>

      {/* Reject Modal */}

      {showReject && (
        <section className="border p-5">
          <h3>Reject Reason</h3>

          <input
            className="border p-2"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />

          <button
            className="bg-red-600 text-white px-3 py-2 ml-3"
            onClick={() => {
              updateBooking({
                status: "cancelled",

                reject_reason: rejectReason,
              });

              setShowReject(false);
            }}
          >
            Save
          </button>
        </section>
      )}

      {/* Date Modal */}

      {showDate && (
        <section className="border p-5">
          <h3>Alternative Date</h3>

          <input
            type="date"
            className="border p-2"
            value={alternativeDate}
            onChange={(e) => setAlternativeDate(e.target.value)}
          />

          <button
            className="bg-blue-600 text-white px-3 py-2 ml-3"
            onClick={() => {
              updateBooking({
                proposed_date: alternativeDate,
              });

              setShowDate(false);
            }}
          >
            Save
          </button>
        </section>
      )}
    </div>
  );
}
