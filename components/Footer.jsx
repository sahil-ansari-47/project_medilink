"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hidden md:block bg-gray-200 border-t border-gray-300 py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-gray-700 text-sm">
        
        {/* Links */}
        <div className="flex divide-x divide-gray-400">
          <div
            className="px-4 hover:underline cursor-pointer transition duration-200"
          >
            Terms & Conditions
          </div>
          <div
            className="px-4 hover:underline cursor-pointer transition duration-200"
          >
            Privacy Policy
          </div>
          <Link
            href="/contact"
            className="px-4 hover:underline transition duration-200"
          >
            Contact Us
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-4 md:mt-0">
          <p className="text-gray-600 text-sm">
            © 2025 Medi-Link. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
