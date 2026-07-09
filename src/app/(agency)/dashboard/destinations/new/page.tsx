"use client";

import { useState } from "react";

export default function NewDestinationPage() {
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
      <h1 className="mb-6 text-3xl font-bold">New Destination</h1>

      <div className="space-y-4">
        <input
          name="title"
          placeholder="Destination title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <input
          name="region"
          placeholder="Region"
          value={formData.region}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <input
          name="difficulty"
          placeholder="Difficulty (Easy/Medium/Hard)"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <input
          name="maxAltitude"
          placeholder="Maximum Altitude"
          value={formData.maxAltitude}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <input
          name="bestSeason"
          placeholder="Best Season"
          value={formData.bestSeason}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Save Destination
        </button>
      </div>
    </div>
  );
}
