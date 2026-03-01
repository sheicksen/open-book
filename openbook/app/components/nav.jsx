"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

  let navLinks = [
  { label: "Profile", href: `/profile` },
  { label: "Network", href: "/network" },
  { label: "Communities", href: "/findCommunity" },
  ];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();


  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Site Title */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              OpenBook
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
              <Link
                key={"Communities"}
                href={"/findCommunities"}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-150"
              >
                {"Communities"}
              </Link>
              {status=="authenticated"&&
                <Link
                key={"Profile"}
                href={`/profile/${session.user.username}`}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-150"
              >
                {"Profile"}
              </Link>
              }
          </div>

          {/* Desktop CTA */}
          {!status == "authenticated" &&
          <div className="hidden md:flex items-center gap-3">
            <Link href={"/login"} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sign in
            </Link>
            <Link href={"/signup"} className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150">
              Get Started
            </Link>
          </div>
          }

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 text-left">
              Sign in
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}