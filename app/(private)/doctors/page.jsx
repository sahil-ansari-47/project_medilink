"use client";

import { useState, useEffect } from "react";
import DoctorCard from "@/components/Cards/DoctorCard";

export default function DoctorsList() {
  const [scrolled, setScrolled] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    async function fetchDoctors() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors`
      );
      const data = await res.json();
      setDoctors(data);
      setFilteredDoctors(data);
    }
    fetchDoctors();
    const handleScroll = () => {
      setScrolled(window.scrollY > 0); // change threshold as needed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    let updated = [...doctors];

    if (search) {
      updated = updated.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (specialization) {
      updated = updated.filter((doc) => doc.specialization === specialization);
    }

    if (sortBy === "experience") {
      updated.sort((a, b) => b.experience - a.experience);
    } else if (sortBy === "fees") {
      updated.sort((a, b) => a.fees - b.fees);
    }

    setFilteredDoctors(updated);
    setPage(1);
  }, [search, specialization, sortBy, doctors]);

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
            {[...new Set(doctors.map((doc) => doc.specialization))].map(
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
      { (specialization || search) && (
        <div> We found {filteredDoctors.length} {}</div>
      )}
      
      <div className="p-3 flex flex-wrap items-center justify-center gap-6 pb-10">
        {paginatedDoctors.map((doc, index) => (
          <DoctorCard key={doc._id} doctor={doc} priority={index<=3} />
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
