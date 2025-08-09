"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Header = () => {
  const user = {};
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Header Bar */}
      <header className="sticky top-0 flex justify-between items-center p-4 bg-primary shadow-md z-20 w-full">
        {/* Hamburger / Back icon */}
        {!drawerOpen && (
          <img
            className="size-10 hover:scale-105 cursor-pointer"
            src="/icons/hamburger.svg"
            alt="menu"
            onClick={() => setDrawerOpen(true)}
          />
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold text-emerald-900 drop-shadow-md cursor-pointer hover:scale-105">
          medi-link <sup>&copy;</sup>
        </h1>

        {/* Profile Picture + Dropdown */}
        <div className="relative profile-dropdown" ref={dropdownRef}>
          <img
            src={user.picture}
            alt="Profile"
            className="w-10 h-10 rounded-full border mr-2 border-gray-400 cursor-pointer hover:scale-105"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

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
                  <li className="px-4 py-2 hover:bg-gray-100 hover:text-red-400 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>,
              document.body
            )}
        </div>
      </header>

      {/* Drawer & Backdrop */}
      <div
        className={`fixed top-0 left-0 h-full w-64 lg:w-100 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
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
          <img src={user.picture} alt="Profile" className="rounded-full h-25" />
          <h2 className="text-lg font-semibold mt-2">
            {user.first_name} {user.last_name}
          </h2>
          {user.phone_number != null ? (
            <>
              <h2 className="text-md font-semibold">
                {user.gender}, {user.age}
              </h2>
              <h2 className="text-md font-semibold">+91 {user.phone_number}</h2>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-sm text-center font-semibold text-amber-800">
                It appears that you have not yet registered your account
              </h2>
              <button
                className="bg-emerald-200 rounded-lg p-2 m-4 text-emerald-800 cursor-pointer hover:bg-emerald-50"
                onClick={() => {
                  toggleMenu();
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
        <div className="p-4">
          {/* Your drawer content here */}

          <h1>Our Services</h1>
          <p className="m-4">Consult a Doctor</p>
          <p className="m-4">Book a Nurse</p>
          <p className="m-4">Book an Ambulance</p>
          <p className="m-4">Pharmacy</p>
          <h1>Specializations</h1>
          <p className="m-4">General Medicine</p>
          <p className="m-4">Cardiology</p>
          <p className="m-4">Neurology</p>
          <p className="m-4">Gynecology</p>
          <p className="m-4">Oncology</p>
          <p className="m-4">Neurology</p>
          <p className="m-4">Osteopathy</p>
          <h1>Profile</h1>
          <p className="m-4">Visit My Profile</p>
          <p className="m-4">View Appointments</p>
          <p className="m-4">Logout</p>
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
