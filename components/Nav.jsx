"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const icons = [
    "/assets/Logo.png",
    "/icons/doctor.svg",
    "/icons/hospital.svg",
  ];
  const labels = ["", "Doctors", "Hospitals"];
  const paths = ["/", "/doctors", "/hospitals"];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-screen bg-primary rounded-t-3xl shadow-lg z-20">
      <div className="flex justify-around items-center h-20">
        {icons.map((icon, index) => {
          const isActive = pathname === paths[index];

          return (
            <div
              key={index}
              onClick={() => router.push(paths[index])}
              className="relative flex flex-col justify-center items-center w-1/4 h-full cursor-pointer group"
            >
              {/* Active background highlight */}
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  isActive
                    ? "bg-white opacity-20"
                    : "opacity-0 group-hover:opacity-20 bg-black"
                }`}
              />

              {/* Icon */}
              <div className="relative z-10">
                <Image
                  src={icon}
                  alt={`tab-${index}`}
                  width={index === 0 ? 64 : 40}
                  height={index === 0 ? 64 : 40}
                  className={`transition-transform duration-200 transform ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  }`}
                  priority={index === 0} // Logo loads first
                />
              </div>

              {/* Label */}
              <p
                className={`text-sm font-bold z-10 ${
                  isActive ? "text-emerald-950" : "text-emerald-900"
                }`}
              >
                {labels[index]}
              </p>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
{
  /* <nav className="hidden sm:flex fixed top-15 left-0 w-full bg-primary shadow-md z-20 px-8 h-16 items-center justify-between">
        
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src={icons[0]} alt="logo" width={48} height={48} />
          <span className="text-lg font-bold text-emerald-900">medi-link <sup>&copy;</sup></span>
        </div>
        <div className="flex gap-8">
          {paths.slice(1).map((path, index) => {
            const isActive = pathname === path;
            return (
              <div
                key={index + 1}
                className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? "text-emerald-950 font-semibold"
                    : "text-emerald-900 hover:text-emerald-950"
                }`}
                onClick={() => router.push(path)}
              >
                <Image
                  src={icons[index + 1]}
                  alt={labels[index + 1]}
                  width={24}
                  height={24}
                />
                <span>{labels[index + 1]}</span>
              </div>
            );
          })}
        </div>
      </nav> */
}
