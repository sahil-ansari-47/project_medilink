"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DoctorCard from "@/components/Cards/DoctorCard";

export default function DoctorsList() {
  const searchParams = useSearchParams();
  const specializations=["General Physician", "Cardiologist", "Neurologist", "Gynecologist", "Oncologist", "Orthopedist"]
  const [scrolled, setScrolled] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState(
    searchParams.get("specialization") || ""
  );
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    async function fetchDoctors() {
      const params = new URLSearchParams();

      if (specialization) params.append("specialization", specialization);
      if (search) params.append("search", search);
      if (sortBy) params.append("ordering", sortBy);

      const res = await fetch(`/api/doctors?${params.toString()}`);
      const data = await res.json();
      setFilteredDoctors(data);
      setPage(1);
    }
    fetchDoctors();
    const handleScroll = () => {
      setScrolled(window.scrollY > 0); // change threshold as needed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [specialization, search, sortBy]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const totalPages = Math.ceil(filteredDoctors.length / pageSize);
  const paginatedDoctors = filteredDoctors.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="min-h-screen">
      {/* Sticky Search & Filters */}
      <div
        className={`sticky top-[10vh] z-10 p-4 flex flex-col md:flex-row gap-3 transition-colors duration-500 ${
          scrolled
            ? "bg-primary/30 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <input
          type="text"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded bg-white px-3 py-2 flex-1 w-full md:max-w-1/2"
        />
        <div className="flex gap-3 min-w-1/2">
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="border rounded px-3 py-2 flex-1 w-1/2 bg-white"
          >
            <option value="">All Specializations</option>
            {specializations.map(
              (spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              )
            )}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-3 py-2 flex-1 w-1/2 bg-white"
          >
            <option value="">Sort By</option>
            <option value="experience">Experience (High → Low)</option>
            <option value="fees">Fees (Low → High)</option>
          </select>
        </div>
      </div>

      {/* Doctor Cards */}
      {(specialization || search) && (
        <div className="py-2 md:py-5 text-center text-sm md:text-left md:pl-[15vw] text-primary md:text-xl">
          We found {filteredDoctors.length} doctors in your search...
        </div>
      )}

      <div className="p-3 flex flex-wrap items-center justify-center gap-6 pb-10">
        {paginatedDoctors.map((doc, index) => (
          <DoctorCard key={doc._id} doctor={doc} priority={index === 1} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pb-24">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:border-primary hover:text-primary"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-primary text-white"
                  : "hover:border-primary hover:text-primary"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:border-primary hover:text-primary"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
