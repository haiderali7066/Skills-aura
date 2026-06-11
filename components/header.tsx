"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition hover:opacity-90"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 shadow-lg shadow-purple-500/30">
              <GraduationCap size={22} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white">
                Skills Aura
              </h1>
              <p className="text-xs text-gray-400">
                Learn. Grow. Succeed.
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 transition hover:text-purple-400"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-300 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/sign-up"
              className="rounded-full bg-gradient-to-r from-purple-600 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="text-white" size={26} />
            ) : (
              <Menu className="text-white" size={26} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 py-6 lg:hidden">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 transition hover:text-purple-400"
                >
                  {link.name}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/sign-in"
                  className="rounded-xl border border-white/10 px-4 py-3 text-center text-white"
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 px-4 py-3 text-center font-semibold text-white"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}