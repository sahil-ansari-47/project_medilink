"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    async function fetchDoctor() {
      try {
        const res = await fetch(`/api/doctors/${id}`);
        const data = await res.json();
        setDoctor(data);
        if (data.hospital_id) {
          const resHospital = await fetch(`/api/hospitals/${data.hospital_id}`);
          const hospitalData = await resHospital.json();
          setHospital(hospitalData);
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDoctor();
  }, [id]);

  function generateTimeSlots(start, end, duration) {
    const slots = [];
    let [sh, sm] = start.split(":").map(Number);
    let [eh, em] = end.split(":").map(Number);

    let startTime = new Date(0, 0, 0, sh, sm);
    let endTime = new Date(0, 0, 0, eh, em);

    while (startTime < endTime) {
      let hh = startTime.getHours().toString().padStart(2, "0");
      let mm = startTime.getMinutes().toString().padStart(2, "0");
      slots.push(`${hh}:${mm}`);
      startTime.setMinutes(startTime.getMinutes() + duration);
    }
    return slots;
  }
  function getNextAvailableDates(availableDays, count = 3) {
    const daysMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const today = new Date();
    const availableIndexes = availableDays.map((d) => daysMap[d]);
    const result = [];
    let checkDate = new Date(today);

    while (result.length < count) {
      checkDate.setDate(checkDate.getDate() + 1);
      if (availableIndexes.includes(checkDate.getDay())) {
        result.push(new Date(checkDate));
      }
    }
    return result;
  }

  if (loading)
    return <div className="p-6 text-center">Loading doctor details...</div>;
  if (!doctor) return <div className="p-6 text-center">Doctor not found</div>;

  const nextDates = getNextAvailableDates(doctor.available_days || []);

  const slots = generateTimeSlots(
    doctor.available_start_time,
    doctor.available_end_time,
    doctor.slot_duration
  );
  const shouldTruncate = doctor.about.length > 200;
  const displayText =
    expanded || !shouldTruncate
      ? doctor.about
      : doctor.about.slice(0, 200) + "...";

  const handleBooking = async () => {
    if (!selectedSlot || !selectedDate) return;
    const [hours, minutes] = selectedSlot.split(":").map(Number);

    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hours, minutes, 0, 0);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor_id: doctor._id,
          patient_id: session.user.id,
          time: selectedSlot,
          date: appointmentDate,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Appointment booked!");

        await fetch("/api/send-mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: session.user.email,
            subject: "Appointment Confirmation",
            html: `
            <p>Hello ${session.user.first_name},</p>
            <p>Your appointment has been successfully booked with <b>Dr. ${
              doctor.name
            }</b><br/>on <b>${new Date(
              appointmentDate
            ).toDateString()}</b> at <b>${selectedSlot}</b>.</p>
            <p>Thank you,<br/>Medi-Link</p>
            `,
          }),
        });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col p-6 pb-24 md:pb-6 gap-5 bg-gradient-to-bl from-red-100 to-emerald-100">
      <nav className="text-sm text-gray-600 mb-4">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:underline text-primary">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/doctors" className="hover:underline text-primary">
              Doctors
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-gray-800">{doctor?.name}</li>
        </ol>
      </nav>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5">
        {/* Doctor Info Card */}
        <div className="max-w-3xl w-full bg-white rounded-lg p-6 flex flex-col gap-6">
          <div className="flex flex-col xs:flex-row gap-6">
            <div className="self-center">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center sm:justify-around">
              <h2 className="text-xl leading-6 font-bold text-emerald-900 xs:text-2xl">
                {doctor.name}
              </h2>
              <p className="text-primary font-medium text-lg">
                {doctor.specialization}
              </p>
              <p className="hidden sm:block text-xs text-gray-600 sm:text-sm">
                {doctor.qualification}
              </p>
              <p className="text-gray-500 text-sm">
                Experience:{" "}
                <span className="font-semibold">{doctor.experience} years</span>
              </p>
              <p className="hidden sm:block text-gray-500 text-sm">
                Available Days: {doctor.available_days?.join(", ")}
              </p>
              <p className="text-emerald-700 font-semibold text-md">
                Consultation Fees: ₹{doctor.fees}
              </p>
            </div>
          </div>
          <div className="text-gray-800">
            {displayText}
            {shouldTruncate && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-primary hover:underline cursor-pointer"
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        </div>
        {/* Slot Selection */}
        <div className="max-w-3xl w-full bg-white shadow-primary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4">
            Select Appointment Date
          </h3>
          <div className="flex gap-3 mb-6 flex-wrap">
            {nextDates.map((date, idx) => {
              const options = {
                weekday: "short",
                day: "numeric",
                month: "long",
              };
              const formatted = date.toLocaleDateString("en-US", options);
              return (
                <label
                  key={idx}
                  className={`px-4 py-2 border rounded-lg cursor-pointer ${
                    selectedDate === date.toDateString()
                      ? "bg-primary text-white"
                      : "hover:border-primary hover:text-primary"
                  }`}
                >
                  <input
                    type="radio"
                    name="date"
                    value={date.toISOString()}
                    checked={selectedDate === date.toDateString()}
                    onChange={() => setSelectedDate(date.toDateString())}
                    className="hidden"
                  />
                  {formatted}
                </label>
              );
            })}
          </div>
          <h3 className="text-lg font-semibold text-emerald-900 mb-4">
            Select Time Slot
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {slots.map((slot, idx) => (
              <label
                key={idx}
                className={`flex items-center justify-center border rounded-lg px-3 py-2 cursor-pointer transition ${
                  selectedSlot === slot
                    ? "bg-primary text-white"
                    : "hover:text-primary hover:border-primary"
                }`}
              >
                <input
                  type="radio"
                  name="slot"
                  value={slot}
                  checked={selectedSlot === slot}
                  onChange={() => setSelectedSlot(slot)}
                  className="hidden"
                />
                {slot}
              </label>
            ))}
          </div>
          {/* Book Button */}
          <button
            onClick={handleBooking}
            disabled={!selectedSlot}
            className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
              selectedSlot
                ? "bg-primary text-white hover:bg-emerald-700 cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {selectedSlot
              ? `Book Appointment at ${selectedSlot}`
              : "Select a slot to book"}
          </button>
        </div>
      </div>
      <div className="w-full rounded-lg p-6 flex flex-col gap-6 bg-white">
        <h3 className="text-lg font-semibold text-emerald-900">
          Hospital Information
        </h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Hospital:</span> {hospital.name}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {hospital.address}
          </p>
          <p>
            <span className="font-semibold">Contact:</span>{" "}
            <span
              onClick={() => {
                navigator.clipboard.writeText(hospital.phone_number);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              title="Click to copy"
              className="font-medium text-primary cursor-pointer"
            >
              {hospital.phone_number}
              {copied && (
                <sup className="ml-2 font-light text-red-400">Copied!</sup>
              )}
            </span>
          </p>
        </div>
        {hospital.location ? (
          <div className="mt-4 w-full h-64 rounded-lg overflow-hidden">
            <iframe
              src={hospital.location}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2">Location not available</p>
        )}
      </div>
    </div>
  );
}
