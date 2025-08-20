import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/database";
import Doctor from "@/models/doctor";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(doctor, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
