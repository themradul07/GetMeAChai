'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/tea.gif" alt="logo" width={24} height={24} className="w-6" />
          <span className="text-lg font-bold">Get Me A Chai!!</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden block focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex relative">
          {session ? (
            <>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
              >
                <div className="flex items-center gap-2">
                  Welcome {session.user.name1}
                  <svg
                    className="w-2.5 h-2.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`absolute right-0 mt-10 z-20 w-44 bg-white dark:bg-gray-700 rounded-md shadow-md transition-all ${
                  showDropdown ? 'block' : 'hidden'
                }`}
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{session.user.name1}</div>
                  <div className="font-medium truncate">{session.user.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Homepage
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Explore"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Explore
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.name}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
                <div className="py-2">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link href="/login">
              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-4 space-y-2">
          {session ? (
            <>
              <Link onClick={() => setMobileMenuOpen(false)} href="/" className="block px-2 py-1 text-white rounded">
                Homepage
              </Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/dashboard" className="block px-2 py-1 text-white rounded">
                Dashboard
              </Link>
              <Link onClick={() => setMobileMenuOpen(false)} href={`/Explore`} className="block px-2 py-1 text-white rounded">
                Explore
              </Link>
              <Link onClick={() => setMobileMenuOpen(false)} href={`/${session.user.name}`} className="block px-2 py-1 text-white rounded">
                Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="block w-full text-left px-2 py-1 text-white hover:bg-gray-800 rounded"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link onClick={() => setMobileMenuOpen(false)} href="/login">
              <button className="block w-full text-left px-2 py-1 text-white hover:bg-gray-800 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
