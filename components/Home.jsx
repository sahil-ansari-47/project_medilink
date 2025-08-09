import Link from "next/link";
import DoctorHomeCard from "./HomeCards/DoctorHomeCard";
import AmbulanceHomeCard from "./HomeCards/AmbulanceHomeCard";
import PharmacyHomeCard from "./HomeCards/PharmacyHomeCard";
import AppointmentHomeCard from "./HomeCards/AppointmentHomeCard";

const Home = () => {
  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Sticky Search Header */}
      <div className="bg-primary z-10 shadow-md flex flex-col justify-between pb-8">
        <div className="text-center my-2 flex flex-col justify-around">
          <h1 className="text-xl font-bold text-emerald-800">Hi, Sahil!</h1>
          <p className="text-lg text-emerald-800 mt-2 animate-bounce hover:text-red-400">
            How may we help you today?
          </p>
        </div>
      </div>
      <div className="flex justify-center transform -translate-y-6 sticky top-20 z-20">
        <input
          type="text"
          placeholder="Search for doctors, hospitals, etc..."
          className="w-11/12 max-w-lg max-h-10 px-4 py-2 border bg-white border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
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
