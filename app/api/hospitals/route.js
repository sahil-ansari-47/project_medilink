import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";
import Hospital from "@models/hospital";

export async function GET() {
  try {
    await connectToDatabase();
    const hospitals = await Hospital.find({});
    return NextResponse.json(hospitals, { status: 200 });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return NextResponse.json(
      { error: "Failed to fetch hospitals" },
      { status: 500 }
    );
  }
}
