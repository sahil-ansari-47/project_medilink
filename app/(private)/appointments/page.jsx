"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";

export default function AppointmentsList() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [holdId, setHoldId] = useState(null);
  const timeoutRef = useRef(null);

  // Fetch Appointments
  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch("/api/appointments");
        const data = await res.json();
        // Show only logged-in user's appointments
        const filtered = data.filter(
          (appt) =>
            appt.user?._id === session?.user?.id ||
            appt.user?.email === session?.user?.email
        );
        setAppointments(filtered);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    }
    if (session?.user) fetchAppointments();
  }, [session]);

  // Delete appointment
  const deleteAppointment = async (id) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAppointments((prev) => prev.filter((appt) => appt._id !== id));
      }
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  // Hold logic
  const handleHoldStart = (id) => {
    setHoldId(id);
    timeoutRef.current = setTimeout(() => {
      deleteAppointment(id);
      setHoldId(null);
    }, 2000);
  };

  const handleHoldEnd = () => {
    clearTimeout(timeoutRef.current);
    setHoldId(null);
  };

  if (loading) return <p className="text-center mt-10 min-h-screen">Loading...</p>;
  if (!appointments.length)
    return <p className="text-center mt-10 min-h-screen">No appointments found.</p>;

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-6 text-primary">
        You have {appointments.length} appointments...
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="relative bg-white/70 backdrop-blur-md inset-shadow-sm shadow-lg rounded-xl p-4 flex flex-col gap-2 justify-between hover:shadow-xl transition-all"
          >
            <p>
              <span className="font-semibold">Doctor:</span>{" "}
              {appt.doctor?.name || appt.doctor}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(appt.date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {appt.time}
            </p>

            {/* Delete button */}
            <button
              onMouseDown={() => handleHoldStart(appt._id)}
              onMouseUp={handleHoldEnd}
              onMouseLeave={handleHoldEnd}
              className="mt-4 self-end px-5 py-3 rounded-2xl bg-red-900 inset-shadow-sm inset-shadow-red-600  border border-red-300/30 shadow-lg relative overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-300 active:scale-95"
            >
              {/* Progress fill */}
              {holdId === appt._id && (
                <span className="absolute left-0 top-0 h-full w-full bg-red-600 origin-left animate-fill" />
              )}
              <span className="relative z-10 text-white font-bold">
                Hold to cancel
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fill {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        .animate-fill {
          animation: fill 2s linear forwards;
          transform: scaleX(0);
        }
      `}</style>
    </div>
  );
}
