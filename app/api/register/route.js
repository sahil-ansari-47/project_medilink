import { connectToDatabase } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "@node_modules/next/server";

export async function PUT(request) {
  try {
    await connectToDatabase();
    const formData = await request.json();
    const updatedUser = await User.findOneAndUpdate(
      { email: formData.email },
      {
        $set: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: formData.phone_number,
          address: formData.address,
          state: formData.state,
          city: formData.city,
          pincode: formData.pincode,
          blood_group: formData.blood_group,
          age: formData.age,
          gender: formData.gender,
          image: formData.image,
        },
      },
      {
        new: true,
        upsert: false,
      }
    );
    if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("PUT /register error:", error);
  }
}
