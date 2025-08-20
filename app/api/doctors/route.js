import { connectToDatabase } from "@/utils/database";
import Doctor from "@models/doctor";

export async function GET() {
  try {
    await connectToDatabase();

    const doctors = await Doctor.find({});
    return new Response(JSON.stringify(doctors), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch doctors" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
