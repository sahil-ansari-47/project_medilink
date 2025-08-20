"use client";

import Image from "next/image";
import Link from "next/link";

export default function DoctorCard({ doctor, priority }) {
  function formatTime(time) {
    if (!time) return "";
    let [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert to 12-hour format
    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }

  function formatDays(days) {
    if (!days || days.length === 0) return "";
    const lowerDays = days.map((d) => d.toLowerCase());
    const allSets = {
      "Monday – Friday": [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
      ],
      "Monday – Saturday": [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      "Monday – Sunday": [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
    };

    for (const [label, dayList] of Object.entries(allSets)) {
      if (
        lowerDays.length === dayList.length &&
        lowerDays.every((d) => dayList.includes(d))
      ) {
        return label.replace("–", "–"); // keep en dash
      }
    }
    return days.join(", ");
  }

  return (
    <div className="doctor-card">
      <div className="flex flex-row">
        {/* Doctor Image */}
        <div className="w-25 h-25 sm:w-40 sm:h-40 rounded-full overflow-hidden border border-gray-300 flex-shrink-0 mr-4">
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
            priority={priority}
          />
        </div>
        <div className="flex flex-col justify-center">
          <Link
            href={`/doctors/${doctor._id}`}
            className="text-md xs:text-lg font-semibold text-emerald-900 hover:underline cursor-pointer"
          >
            {doctor.name}
          </Link>
          <p className="text-xs xs:text-sm text-primary font-medium">
            {doctor.specialization}
          </p>
          <p className="text-xs xs:text-sm text-gray-600">
            {doctor.qualification}
          </p>
          <p className="text-xs xs:text-sm text-gray-500">
            Experience: {doctor.experience} years
          </p>
          <p className="text-sm text-gray-500">Fees: ₹{doctor.fees}</p>
        </div>
      </div>
      {/* Availability */}
      <div className="flex flex-col xs:flex-row xs:items-start w-full justify-between">
        <div className="text-xs text-gray-500 text-center xs:text-left xs:w-1/2">
          <p>Available Days: {formatDays(doctor.available_days)}</p>
          <p>
            Time: {formatTime(doctor.available_start_time)} -{" "}
            {formatTime(doctor.available_end_time)}
          </p>
          <p>Slot Duration: {doctor.slot_duration} mins</p>
        </div>
        {/* CTA */}
        <Link
          href={`/doctors/${doctor._id}`}
          className="mt-2 bg-primary cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-900 transition-colors self-center"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
