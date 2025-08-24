// /app/api/appointments/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/database";
import Appointment from "@models/appointment";

// CREATE appointment
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { patient_id, doctor_id, date, time } = body;

    if (!patient_id || !doctor_id || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointment = await Appointment.create({
      user: patient_id,
      doctor: doctor_id,
      date: new Date(date),
      time: time,
      _status: "Confirmed",
      created_at: new Date(),
    });

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  await connectToDatabase();

  try {
    const appointments = await Appointment.find({})
      .populate("user", "name email")
      .populate("doctor", "name specialization");

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { message: "Error fetching appointments" },
      { status: 500 }
    );
  }
}
