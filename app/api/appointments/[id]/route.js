import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/database";
import Appointment from "@models/appointment";

// DELETE appointment by ID
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const deleted = await Appointment.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Appointment deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting appointment:", err);
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}
