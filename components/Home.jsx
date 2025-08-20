"use client";

import Link from "next/link";
import DoctorHomeCard from "./Cards/DoctorHomeCard";
import AmbulanceHomeCard from "./Cards/AmbulanceHomeCard";
import PharmacyHomeCard from "./Cards/PharmacyHomeCard";
import AppointmentHomeCard from "./Cards/AppointmentHomeCard";
import NurseHomeCard from "./Cards/NurseHomeCard";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Home = () => {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen pb-24 sm:pb-10 bg-gradient-to-tr from-white to-orange-200">
      <div className="bg-primary z-10 shadow-md flex justify-center md:justify-start gap-10 pb-8">
        <Image className="hidden md:block my-2 ml-[20vw] lg:ml-[8vw]" src="/assets/Logo.png" alt="" width={100} height={100} />
        <div className="text-center md:text-left my-2 mt-4 flex flex-col justify-center">
          <h1 className="text-xl font-bold text-emerald-800">Hi, {session?.user.first_name}!</h1>
          <p className="text-lg text-emerald-800 mt-2 animate-bounce hover:text-red-400">
            How may we help you today?
          </p>
        </div>
      </div>
      <div className="flex justify-center transform -translate-y-6 sticky top-[15vh] z-20">
        <input
          type="text"
          placeholder="Search for doctors, hospitals, etc..."
          className="w-11/12 max-w-lg max-h-10 px-4 py-2 border bg-white border-gray-300 rounded-full focus:outline-none ring-2 focus:ring-4 ring-primary"
        />
      </div>
      {/* Optionally render search results */}
      {/* {results.length > 0 && (
        <div className="p-4 max-w-6xl mx-auto">
          <h3 className="font-bold text-emerald-900">Search Results:</h3>
          <ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
            {results.map((r, i) => (
              <li key={i}>{r.name}</li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Card Grid */}
      <div className="flex flex-wrap items-center justify-center gap-y-6">
        <>
          <Link href="/doctors">
            <DoctorHomeCard />
          </Link>
          <Link href="/ambulance">
            <AmbulanceHomeCard />
          </Link>
          <Link href="/pharmacy">
            <PharmacyHomeCard />
          </Link>
          <Link href="/appointments">
            <AppointmentHomeCard />
          </Link>
          <Link href={"/nursing"}>
            <NurseHomeCard />
          </Link>
        </>
      </div>
    </div>
  );
};

const SkeletonCards = () => (
  <>
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"
      ></div>
    ))}
  </>
);

export default Home;
