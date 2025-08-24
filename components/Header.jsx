"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const icons = [
  "/icons/doctor.svg",
  "/icons/hospital.svg",
  "/icons/contact.svg",
  "/icons/ambulance.svg",
];
const labels = ["Doctors", "Hospitals", "Contact Us", "Book An Ambulance"];
const paths = ["/doctors", "/hospitals", "/contact", "/ambulance"];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const { data: session } = useSession();

  // Disable scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "auto";
  }, [drawerOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Header Bar */}
      <header className="sticky top-0 flex justify-between items-center px-4 bg-primary shadow-md z-30 w-full h-[10vh] md:shadow-none">
        {/* Hamburger / Back icon */}

        <div className="flex items-center gap-6">
          <img
            className="size-10 hover:scale-105 cursor-pointer"
            src="/icons/hamburger.svg"
            alt="menu"
            onClick={() => setDrawerOpen(true)}
          />
          {pathname !== "/" && (
            <p
              className="hidden md:block text-lg text-emerald-900 font-semibold cursor-pointer hover:text"
              onClick={() => router.push("/")}
            >
              Back to Home
            </p>
          )}
        </div>
        {/* Title */}
        <h1
          className="text-2xl font-bold md:hidden text-emerald-900 drop-shadow-zinc-800 cursor-pointer hover:drop-shadow-md active:scale-[1.05]"
          onClick={() => router.push("/")}
        >
          medi-link <sup>&copy;</sup>
        </h1>
        <div className="flex justify-end items-center h-full">
          <nav className="hidden md:flex h-full">
            {labels.map((label, index) => {
              const isActive = pathname === paths[index];
              return (
                <React.Fragment key={index}>
                  <div
                    onClick={() => router.push(paths[index])}
                    className={`flex items-center cursor-pointer group px-4 ${
                      isActive && index !== 3 && "bg-white"
                    } ${index === 3 && "hidden lg:flex bg-red-950"}`}
                  >
                    <Image
                      src={icons[index]}
                      alt={`tab-${index}`}
                      width={30}
                      height={30}
                      className={`transition-transform duration-200 transform ${
                        !isActive && "group-hover:scale-105"
                      }`}
                    />

                    <p
                      className={`font-bold text-emerald-900 ${
                        index >= 2 && "ml-1"
                      } ${index === 3 && "text-red-400"}`}
                    >
                      {label}
                    </p>
                  </div>
                  {/* Divider - only show if not last item */}
                  {index < labels.length - 2 && (
                    <div className="self-center h-8 w-[2px] rounded-full bg-emerald-900 opacity-30"></div>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
          {/* Profile Picture + Dropdown */}
          <div className="relative profile-dropdown" ref={dropdownRef}>
            <div className="w-10 aspect-square rounded-full overflow-hidden shadow-sm shadow-zinc-800 hover:shadow-lg cursor-pointer hover:scale-105 ml-4 transition-transform">
              <Image
                src={session?.user.image || "/icons/avatar.svg"}
                alt="Profile"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
            </div>
            {dropdownOpen &&
              createPortal(
                <div
                  className="absolute right-4 mt-2 w-48 bg-white border rounded shadow"
                  style={{
                    zIndex: 9999,
                    top: "60px",
                    position: "fixed",
                  }}
                >
                  <ul className="text-sm">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Settings
                    </li>
                    <li
                      className="px-4 py-2 text-red-400 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        signOut({redirect:false});
                        setDropdownOpen(false);
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>,
                document.body
              )}
          </div>
        </div>
      </header>

      {/* Drawer & Backdrop */}
      <div
        className={`fixed top-0 left-0 h-full w-64 sm:w-100 bg-white shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto custom-scrollbar`}
      >
        <img
          className="fixed top-5 left-5 size-10 hover:scale-105 cursor-pointer"
          src="/icons/back.svg"
          alt="close"
          onClick={() => setDrawerOpen(false)}
        />
        <div className="p-4 bg-primary font-bold flex flex-col items-center">
          <div
            className="w-25 sm:w-30 aspect-square rounded-full overflow-hidden ring-3 ring-emerald-900 cursor-pointer hover:ring-emerald-950 active:translate-y-1"
            onClick={() => {
              setDrawerOpen(false);
              router.push("/profile");
            }}
          >
            <Image
              src={session?.user.image || "/icons/avatar.svg"}
              alt="Profile"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <img
            className="absolute size-5 transform translate-x-9 sm:translate-x-14 translate-y-20 cursor-pointer"
            src="/icons/edit.svg"
            alt=""
          />
          <h2 className="text-lg font-semibold mt-2">
            {session?.user?.first_name} {session?.user?.last_name}
          </h2>
          {session?.user?.phone_number != null ? (
            <>
              <h2 className="text-md font-normal">
                {session?.user?.gender}, {session?.user.age}
              </h2>
              <h2 className="text-md font-normal">
                +91 {session?.user?.phone_number}
              </h2>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-sm text-center font-semibold text-red-900">
                It appears that you have not yet registered your account
              </h2>
              <button
                className="bg-emerald-200 rounded-lg p-2 m-4 text-emerald-800 cursor-pointer hover:bg-emerald-50 focus:ring-emerald-200 focus:outline-white active:translate-y-0.5"
                onClick={() => {
                  setDrawerOpen(false);
                  router.push("/profile");
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
        <div>
          {/* Your drawer content here */}
          <h1 className="my-2 text-2xl text-emerald-900 font-bold pl-2">
            Our Services
          </h1>
          <Link
            href="/doctors"
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-12" src="/icons/stethos.svg" alt="" />
            <p className="menu-p text-emerald-900">Consult a Doctor</p>
          </Link>
          <Link
            href="/nurse"
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-12" src="/icons/nurse.svg" alt="" />
            <p className="menu-p text-emerald-900">Book a Nurse</p>
          </Link>
          <Link
            href="/ambulance"
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-12" src="/icons/ambulance.svg" alt="" />
            <p className="menu-p text-red-400">Book an Ambulance</p>
          </Link>
          <Link
            href="/pharmacy"
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-10" src="/icons/pharmacy.svg" alt="" />
            <p className="menu-p text-emerald-900">Pharmacy</p>
          </Link>
          <h1 className="my-2 text-2xl text-emerald-900 font-bold pl-2">
            Specializations
          </h1>
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "General Physician" },
            }}
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-10" src="/icons/general.svg" alt="" />
            <p className="menu-p text-emerald-900">General Medicine</p>
          </Link>
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "Cardiologist" },
            }}
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-10" src="/icons/heart.svg" alt="" />
            <p className="menu-p text-emerald-900">Cardiology</p>
          </Link>
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "Neurologist" },
            }}
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-10" src="/icons/brain.svg" alt="" />
            <p className="menu-p text-emerald-900">Neurology</p>
          </Link>
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "Gynecologist" },
            }}
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-10" src="/icons/gyno.svg" alt="" />
            <p className="menu-p text-emerald-900">Gynecology</p>
          </Link>
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "Oncologist" },
            }}
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-10" src="/icons/cancer.svg" alt="" />
            <p className="menu-p text-emerald-900">Oncology</p>
          </Link>
          <Link
            href={{
              pathname: "/doctors",
              query: { specialization: "Orthopedist" },
            }}
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-10" src="/icons/bone.svg" alt="" />
            <p className="menu-p text-emerald-900">Osteopathy</p>
          </Link>
          <h1 className="my-2 text-2xl text-emerald-900 font-bold pl-2">
            Profile
          </h1>
          <Link
            href="/profile"
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-10" src="/icons/avatar.svg" alt="" />
            <p className="menu-p text-emerald-900">Visit My Profile</p>
          </Link>
          <Link
            href="/appointments"
            onClick={() => setDrawerOpen(false)}
            className="menu-div"
          >
            <img className="size-10" src="/icons/clipboard.svg" alt="" />
            <p className="menu-p text-emerald-900">View Appointments</p>
          </Link>
          <div
            onClick={() => {
              setDrawerOpen(false);
              signOut({redirect: false});
            }}
            className="menu-div"
          >
            <img className="size-10" src="/icons/logout.svg" alt="" />
            <p className="menu-p text-red-400">Logout</p>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-30"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
