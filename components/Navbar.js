"use client"
import React from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white shadow-lg backdrop-blur-md bg-opacity-70">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          className="text-2xl font-bold text-blue-400 hover:text-blue-500 transition duration-300 flex items-center"
          href="/"
        >
          <img className="invertImg inline-block mr-2" src="tea.gif" width={44} alt="Logo" />
          Get Me a Chai!
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <Link
            href="/"
            className="text-gray-300 hover:text-blue-400 font-medium transition duration-300 hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-blue-400 font-medium transition duration-300 hover:underline underline-offset-4"
          >
            About
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-300 hover:text-blue-400 font-medium transition duration-300 hover:underline underline-offset-4"
          >
            Dashboard
          </Link>

          {/* Buttons */}
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar