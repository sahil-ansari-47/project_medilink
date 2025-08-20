"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const Stars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1 text-yellow-500">
      {Array(fullStars)
        .fill("⭐")
        .map((s, i) => (
          <span key={`full-${i}`}>⭐</span>
        ))}
      {halfStar && <span>✨</span>}
      {Array(emptyStars)
        .fill("☆")
        .map((s, i) => (
          <span key={`empty-${i}`}>☆</span>
        ))}
      <span className="ml-2 text-gray-600 text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function HospitalDetailPage() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // fetch hospital data
    async function fetchHospital() {
      try {
        const res = await fetch(`/api/hospitals/${id}`);
        const data = await res.json();
        setHospital(data);
      } catch (err) {
        console.error("Error fetching hospital:", err);
      }
    }
    if (id) fetchHospital();

    // detect mobile
    if (typeof window !== "undefined") {
      setIsMobile(/Mobi|Android/i.test(window.navigator.userAgent));
    }
  }, [id]);

  if (!hospital) return <p className="p-4">Loading...</p>;

  return (
    <div className="">
        <div className="p-6 max-w-5xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-600 mb-4">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:underline text-primary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/hospitals" className="hover:underline text-primary">
                  Hospitals
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-gray-800">{hospital.name}</li>
            </ol>
          </nav>
          {/* Card layout */}
          <div className="bg-white shadow-md rounded-2xl overflow-hidden">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">{hospital.name}</h1>
              {/* Rating */}
              <Stars rating={hospital.rating} />
              {/* Address */}
              <p className="text-gray-700">
                {hospital.address}, {hospital.city}, {hospital.state} -{" "}
                {hospital.pincode}
              </p>
              {/* Phone */}
              <div className="flex items-center space-x-2">
                {isMobile ? (
                  <a
                    href={`tel:${hospital.phone_number}`}
                    className="text-primary font-medium hover:underline"
                  >
                    📞 {hospital.phone_number}
                  </a>
                ) : (
                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(hospital.phone_number);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    title="Click to copy"
                    className="text-primary font-medium cursor-pointer"
                  >
                    📞<span className="hover:underline">{hospital.phone_number}</span>
                    {copied && (
                      <sup className="ml-2 text-xs text-red-400">Copied!</sup>
                    )}
                  </span>
                )}
              </div>
              {/* Google Maps */}
              <div className="mt-4">
                <iframe
                  src={hospital.location}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl shadow"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
