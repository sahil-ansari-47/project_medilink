import { connectToDatabase } from "@/utils/database";
import Doctor from "@models/doctor";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const specialization = searchParams.get("specialization") || "";
    const search = searchParams.get("search") || "";
    const ordering = searchParams.get("ordering") || "";

    // Build query object
    const query = {};
    if (specialization) {
      query.specialization = specialization;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" }; 
    }

    let sort = {};
    if (ordering === "experience") {
      sort = { experience: -1 };
    } else if (ordering === "fees") {
      sort = { fees: 1 }; 
    }

    const doctors = await Doctor.find(query).sort(sort);

    return new Response(JSON.stringify(doctors), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch doctors" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
