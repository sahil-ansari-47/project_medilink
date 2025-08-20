"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HospitalCard = ({ hospital }) => {
  const [copiedId, setCopiedId] = useState(null);
  return (
    <div className="flex flex-col lg:max-h-40 md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Image
        src={hospital.image}
        alt={hospital.name}
        width={192}
        height={160}
        className="w-full md:w-48 h-40 object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <Link
            href={`/hospitals/${hospital._id}`}
            className="text-lg font-semibold text-emerald-900 hover:underline cursor-pointer"
          >
            {hospital.name}
          </Link>
          <p className="text-sm text-gray-600">{hospital.address}</p>
          <p className="text-sm text-gray-500">
            {hospital.city}, {hospital.state} - {hospital.pincode}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <a
            href={`tel:${hospital.phone_number}`}
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(hospital.phone_number);
              setCopiedId(hospital.id);
              setTimeout(() => setCopiedId(null), 1500);
            }}
            className="flex items-center gap-2"
            title="Click to copy"
          >
            📞
            <div className="text-sm font-medium text-primary cursor-pointer hover:underline">
              {hospital.phone_number}
            </div>
            {copiedId === hospital.id && (
              <sup className="ml-2 font-light text-red-400 text-2xs">
                Copied!
              </sup>
            )}
          </a>
          <span className="text-yellow-500 font-semibold">
            ⭐ {hospital.rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
