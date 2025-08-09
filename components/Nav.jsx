"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const icons = ["/assets/Logo.png", "/icons/doctor.svg", "/icons/hospital.svg"];
  const labels = ["", "Doctors", "Hospitals"];
  const paths = ["/", "/doctors", "/hospitals"];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-primary rounded-t-3xl shadow-lg z-20">
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
