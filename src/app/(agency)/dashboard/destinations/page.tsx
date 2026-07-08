"use client";

import Link from "next/link";
import destinations from "../../../../../data/destinations.json";

export default function DestinationsPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between">
        <h1 className="text-3xl font-bold">Destinations</h1>

        <Link
          href="/dashboard/destinations/new"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          + New Destination
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Title</th>
            <th className="border p-3 text-left">Region</th>
            <th className="border p-3 text-left">Difficulty</th>
            <th className="border p-3 text-left">Altitude</th>
            <th className="border p-3 text-left">Season</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {destinations.map((destination) => (
            <tr key={destination.id}>
              <td className="border p-3">{destination.title}</td>

              <td className="border p-3">{destination.region}</td>

              <td className="border p-3">{destination.difficulty}</td>

              <td className="border p-3">{destination.maxAltitude}</td>

              <td className="border p-3">{destination.bestSeason}</td>

              <td className="border p-3 text-center">
                <Link
                  href={`/dashboard/destinations/${destination.id}/edit`}
                  className="rounded bg-green-600 px-3 py-1 text-white"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
