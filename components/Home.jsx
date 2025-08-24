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
    <>
      <div className="pb-10 bg-yellow-50">
        <div className="bg-primary z-10 shadow-md flex justify-center md:justify-start gap-10 pb-8">
          <Image
            className="hidden md:block my-2 ml-[20vw] lg:ml-[8vw]"
            src="/assets/Logo.png"
            alt=""
            width={100}
            height={100}
          />
          <div className="text-center md:text-left my-2 mt-4 flex flex-col justify-center">
            <h1 className="text-xl font-bold text-emerald-800">
              Hi, {session?.user.first_name}!
            </h1>
            <p className="text-lg text-emerald-800 mt-2 animate-bounce hover:text-red-400">
              How may we help you today?
            </p>
          </div>
        </div>
        <div className="flex justify-center transform -translate-y-6 sticky top-[15vh] z-20">
          <input
            type="text"
            placeholder="Search for doctors, hospitals, etc..."
            className="w-11/12 max-w-lg max-h-10 px-4 py-2 border bg-white border-gray-300 rounded-full focus:outline-none ring-4 focus:ring-8 ring-primary"
          />
        </div>
        {/* For md+ screens */}
        <div className="hidden bg-primary md:flex relative w-full h-[70vh] -translate-y-10 overflow-x-clip">
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <h1 className="text-5xl text-right font-bold text-white leading-normal max-w-md fade-in-up">
              Engage in a new era of medical assistance
            </h1>
            <h2 className="text-white text-2xl mt-5 text-right max-w-md fade-in-up">
              Find trusted doctors, nurses and emergency services all in one place.
            </h2>
          </div>
          <div className="flex-1 perspective-midrange">
            <Image
              className="object-cover w-full h-full emphasis"
              src="/assets/home1.png"
              alt="Medical assistance"
              width={1000}
              height={1000}
              priority
            />
          </div>
        </div>

        {/* For small screens */}
        <div className="flex flex-col md:hidden relative w-screen h-[70vh] -translate-y-10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-black overflow-clip">
            <Image
              className="object-cover w-screen h-full blur-xs fade-in-up"
              src="/assets/home1.png"
              alt="Medical assistance"
              width={1000}
              height={1000}
              priority
            />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
            <h1 className="text-5xl leading-16 font-bold text-center text-white drop-shadow-md px-[10vw] fade-in-up">
              Engage in a new era of medical assistance
            </h1>
          </div>
        </div>

        {/* Card Grid */}
        <div className="flex flex-wrap items-center justify-center p-10 gap-6 md:gap-y-10 overflow-x-clip">
          <Link href="/doctors" className="trigger">
            <DoctorHomeCard />
          </Link>
          <Link href="/ambulance" className="trigger">
            <AmbulanceHomeCard />
          </Link>
          <Link href="/pharmacy" className="trigger">
            <PharmacyHomeCard />
          </Link>
          <Link href="/appointments" className="trigger">
            <AppointmentHomeCard />
          </Link>
          <Link href={"/nursing"} className="trigger">
            <NurseHomeCard />
          </Link>
        </div>
      </div>
      <div className="min-h-100 p-8 pb-30 md:pb-15 bg-pink-200">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 py-6 px-2 overflow-x-clip">
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "General Physician" },
            }}
            className="specialization trigger"
          >
            <img
              src="/icons/generalr.svg"
              alt="General Medicine"
              className="size-30 mb-4"
            />
            <h3 className="text-lg text-red-900 font-semibold">General</h3>
          </Link>
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "Cardiologist" },
            }}
            className="specialization trigger"
          >
            <img
              src="/icons/heartr.svg"
              alt="Cardiology"
              className="size-30 mb-4"
            />
            <h3 className="text-lg text-red-900 font-semibold">Cardiology</h3>
          </Link>
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "Neurologist" },
            }}
            className="specialization trigger"
          >
            <img
              src="/icons/brainr.svg"
              alt="Neurology"
              className="size-30 mb-4"
            />
            <h3 className="text-lg text-red-900 font-semibold">Neurology</h3>
          </Link>
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "Gynecologist" },
            }}
            className="specialization trigger"
          >
            <img
              src="/icons/gynor.svg"
              alt="Gynecology"
              className="size-30 mb-4"
            />
            <h3 className="text-lg text-red-900 font-semibold">Gynecology</h3>
          </Link>
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "Oncologist" },
            }}
            className="specialization trigger"
          >
            <img
              src="/icons/cancerr.svg"
              alt="Oncology"
              className="size-30 mb-4"
            />
            <h3 className="text-lg text-red-900 font-semibold">Oncology</h3>
          </Link>
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "Orthopedist" },
            }}
            className="specialization trigger"
          >
            <img
              src="/icons/boner.svg"
              alt="Osteopathy"
              className="size-30 mb-4"
            />
            <h3 className="text-lg text-red-900 font-semibold">Osteopathy</h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
