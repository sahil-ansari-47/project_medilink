"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [initialized, setInitialized] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    session?.user?.image || "/icons/avatar.svg"
  );

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone_number: "",
    state: "",
    city: "",
    pincode: "",
    blood_group: "",
    age: "",
    gender: "",
    image: "",
  });
  useEffect(() => {
    if (session?.user?.id && !initialized) {
      setFormData((prev) => ({
        ...prev,
        first_name: session?.user?.first_name ?? "",
        last_name: session?.user?.last_name ?? "",
        email: session?.user?.email ?? "",
        address: session?.user?.address ?? "",
        phone_number: session?.user?.phone_number ?? "",
        state: session?.user?.state ?? "",
        city: session?.user?.city ?? "",
        image: session?.user?.image ?? "",
        pincode: session?.user?.pincode ?? "",
        blood_group: session?.user?.blood_group ?? "",
        age: session?.user?.age ?? "",
        gender: session?.user?.gender ?? "",
      }));
      setImagePreview(session.user.image);
      setInitialized(true);
    }
  }, [session, initialized]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleImageUpload = async () => {
    if (!formData.image || typeof formData.image === "string") {
      return formData.image; // No change
    }
    const data = new FormData();
    data.append("file", formData.image);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const { url } = await res.json();
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.image;
    if (typeof imageUrl !== "string") {
      imageUrl = await handleImageUpload();
    }
    const res = await fetch("/api/register", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: session.user.id,
        ...formData,
        image: imageUrl,
      }),
    });
    if (res.ok) {
      alert("Profile updated successfully!");
      router.refresh();
    } else {
      const error = await res.json();
      console.error("Error updating profile:", error);
      alert(error.message || "Update failed");
    }
    router.push("/");
  };

  if (status === "loading") return <p className="text-center">Loading...</p>;
  return (
    <form
      className="flex flex-col md:flex-row w-full md:h-screen bg-white"
      onSubmit={handleSubmit}
    >
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-bl from-primary to-red-100 flex flex-col items-center justify-center p-8 text-center md:rounded-tr-full border-t-4 border-r-1 border-emerald-900">
        <div className="flex flex-col items-center mb-4">
          <div className="relative group">
            {/* Profile Image */}
            <Image
              className="rounded-full ring-3 ring-emerald-900 shadow-md"
              src={imagePreview}
              alt="Profile"
              width={120}
              height={120}
            />
            {/* Hover Overlay */}
            <div
              className="absolute inset-0 bg-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity cursor-pointer"
              onClick={() =>
                document.getElementById("profile-pic-input").click()
              }
            >
              <span className="text-white font-medium">Upload</span>
            </div>
          </div>
          {/* Hidden file input */}
          <input
            id="profile-pic-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-emerald-900">
          Let’s get you set up
        </h2>
        <p className="text-gray-800 text-sm md:text-base">
          It should only take a couple of minutes
        </p>
        <button
          type="button"
          className="mt-6 bg-emerald-900 rounded-full p-2 hover:bg-gray-800 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img
            src="/icons/chevron.svg"
            alt=""
            className="size-8 transform -translate-x-0.5"
          />
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-around space-y-4">
        <div className="grid grid-cols-2 gap-4 transform md:-translate-x-5/12">
          <div>
            <label className="block font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>
        </div>
        <div className="transform md:-translate-x-1/5">
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="border p-2 rounded-lg w-full bg-gray-100"
            readOnly
          />
        </div>
        <div className="transform md:-translate-x-1/12">
          <label className="block font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 transform lg:-translate-x-4">
          <div>
            <label className="block font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              placeholder="City"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              placeholder="State"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              maxLength={10}
              className="border p-2 rounded-lg w-full"
              placeholder="Pincode"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              maxLength={15}
              className="border p-2 rounded-lg w-full"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">
              Blood Group
            </label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            >
              <option value="">Select...</option>
              {[
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-",
                "Unknown",
              ].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              min="0"
              placeholder="Age"
              required
            />
          </div>
        </div>
        <fieldset className="mb-4">
          <legend className="block font-medium text-gray-700 mb-2">
            Gender
          </legend>
          <div className="flex gap-3">
            {["Male", "Female", "Non-Binary"].map((g) => (
              <label
                key={g}
                className={`cursor-pointer rounded-full border sm:px-4 p-2 transition-colors
            ${
              formData.gender === g
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary"
            }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  required
                  className="hidden"
                />
                {g}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-100 rounded-lg w-full md:w-auto cursor-pointer"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary hover:bg-emerald-900 cursor-pointer text-white rounded-lg w-full md:w-auto transition"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
