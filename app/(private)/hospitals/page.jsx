"use client";

import HospitalCard from "@components/Cards/HospitalCard";
import { useState, useEffect } from "react";

export default function HospitalsList() {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    // Fetch hospital data
    async function fetchHospitals() {
      const res = await fetch(`/api/hospitals`);
      const data = await res.json();
      setHospitals(data);
      setFilteredHospitals(data);
    }
    fetchHospitals();
  }, []);

  useEffect(() => {
    let updated = [...hospitals];

    // Search by name
    if (search) {
      updated = updated.filter((h) =>
        h.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by location (address contains)
    if (selectedLocation) {
      updated = updated.filter((h) =>
        h.address.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Filter by rating
    if (sortBy === "high-low") {
      updated.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "3plus") {
      updated = updated.filter((h) => h.rating >= 3);
    } else if (sortBy === "4plus") {
      updated = updated.filter((h) => h.rating >= 4);
    }

    setFilteredHospitals(updated);
  }, [search, selectedLocation, sortBy, hospitals]);

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters / Search Panel */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6 bg-white p-4 rounded lg:sticky lg:top-20 h-fit">
          {/* Search */}
          <input
            type="text"
            placeholder="Search hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />

          {/* Location Filter */}
          <div className="hidden lg:block">
            <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
            <div className="flex flex-col gap-2">
              {[
                "Anandapur",
                "Chingrighata",
                "Mukundapur",
                "Salt Lake",
                "Minto Park",
              ].map((loc) => (
                <label
                  key={loc}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="location"
                    value={loc}
                    checked={selectedLocation === loc}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="accent-emerald-600"
                  />
                  <span>{loc}</span>
                </label>
              ))}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value=""
                  checked={selectedLocation === ""}
                  onChange={() => setSelectedLocation("")}
                  className="accent-emerald-600"
                />
                <span>All Locations</span>
              </label>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Rating</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value="high-low"
                  checked={sortBy === "high-low"}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="accent-emerald-600"
                />
                <span>High to Low</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value="4plus"
                  checked={sortBy === "4plus"}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="accent-emerald-600"
                />
                <span>4★ & Above</span>
              </label>
              <label className="hidden lg:flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value="3plus"
                  checked={sortBy === "3plus"}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="accent-emerald-600"
                />
                <span>3★ & Above</span>
              </label>
            </div>
          </div>
        </div>

        {/* Hospital Cards */}
        <div className="flex-1 grid grid-cols-1 gap-4 mb-20 md:mb-0">
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital._id} hospital={hospital}/>
          ))}
        </div>
      </div>
    </div>
  );
}
