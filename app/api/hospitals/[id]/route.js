import { NextResponse } from "next/server";
import Hospital from "@models/hospital";
import { connectToDatabase } from "@utils/database";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return NextResponse.json(
        { error: "Hospital not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hospital);
  } catch (error) {
    console.error("Error fetching hospital:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
