"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function EditDestinationPage() {
  const params = useParams();

  const [formData, setFormData] = useState({
    title: "",
    region: "",
    difficulty: "",
    maxAltitude: "",
    bestSeason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Edit Destination {params.id}</h1>

      <div className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Destination title"
          className="w-full rounded border p-2"
        />

        <input
          name="region"
          value={formData.region}
          onChange={handleChange}
          placeholder="Region"
          className="w-full rounded border p-2"
        />

        <input
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          placeholder="Difficulty"
          className="w-full rounded border p-2"
        />

        <input
          name="maxAltitude"
          value={formData.maxAltitude}
          onChange={handleChange}
          placeholder="Maximum Altitude"
          className="w-full rounded border p-2"
        />

        <input
          name="bestSeason"
          value={formData.bestSeason}
          onChange={handleChange}
          placeholder="Best Season"
          className="w-full rounded border p-2"
        />

        <button className="rounded bg-green-600 px-4 py-2 text-white">
          Update Destination
        </button>
      </div>
    </div>
  );
}
