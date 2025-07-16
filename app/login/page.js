"use client"
import React, { useEffect } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    document.title = "Login - Get Me A Chai"
    if (session) {
      const username = session.user?.name 
      if (username) {
        router.push('dashboard') 
      } else {
        console.error("Username is not available in the session.")
      }
    }
  }, [session, router])

  return (
    <div className="text-white py-14 container mx-auto flex flex-col items-center min-h-screen">
      {/* Title */}
      <h1 className="text-center font-extrabold text-4xl mb-8 text-blue-400">
        Login to Get Started
      </h1>
      <p className="text-center text-gray-400 mb-10">
        Choose your preferred login method below.
      </p>

      {/* Login Buttons */}
      <div className="flex flex-col gap-4 items-center">
        {/* Google Login */}
        <button
          onClick={() => signIn("google")}
          className="flex items-center w-64 bg-gradient-to-r from-red-500 to-yellow-500 text-white border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium hover:from-red-600 hover:to-yellow-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300"
        >
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48">
            <g fill="none" fillRule="evenodd">
              <path fill="#FBBC05" d="M9.827 24c0-1.524.253-2.986.705-4.356L2.623 13.604C1.082 16.734.214 20.26.214 24c0 3.737.868 7.261 2.407 10.388l7.904-6.051c-.447-1.365-.697-2.821-.697-4.337z" />
              <path fill="#EB4335" d="M23.714 10.133c3.311 0 6.302 1.173 8.652 3.093l6.836-6.827C35.036 2.773 29.695.533 23.714.533 14.427.533 6.445 5.844 2.623 13.604l7.909 6.04c1.822-5.532 7.017-9.511 13.182-9.511z" />
              <path fill="#34A853" d="M23.714 37.867c-6.165 0-11.36-3.979-13.182-9.511l-7.909 6.04c3.822 7.76 11.804 13.071 21.091 13.071 5.732 0 11.204-2.035 15.311-5.848l-7.507-5.804c-2.118 1.334-4.785 2.052-7.804 2.052z" />
              <path fill="#4285F4" d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714v9.067h12.604c-.63 3.091-2.345 5.467-4.8 7.014l7.507 5.804c4.314-4.004 7.12-9.969 7.12-17.614z" />
            </g>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* LinkedIn Login */}
        <button
          onClick={() => signIn("linkedin")}
          className="flex items-center w-64 bg-gradient-to-r from-blue-600 to-blue-400 text-white border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
        >
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#007EBB" d="M46 42c0 2.2-1.8 4-4 4H6c-2.2 0-4-1.8-4-4V6c0-2.2 1.8-4 4-4h36c2.2 0 4 1.8 4 4v36z" />
            <path fill="#FFF" d="M14 19h6v18h-6zM17 13c2 0 3 1.5 3 3s-1 3-3 3-3-1.5-3-3 1-3 3-3zm8 6h6v2h.1c.8-1.5 2.8-3 5.9-3 6.3 0 7.5 4.2 7.5 9.6V37h-6v-8.3c0-2-1-3.7-3-3.7-2 0-3 1.7-3 3.7V37h-6V19z" />
          </svg>
          <span>Continue with LinkedIn</span>
        </button>

        {/* GitHub Login */}
        <button
          onClick={() => signIn("github")}
          className="flex items-center w-64 bg-gradient-to-r from-gray-800 to-gray-600 text-white border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium hover:from-gray-900 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 transition duration-300"
        >
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="#FFF" d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.55-3.87-1.55-.52-1.3-1.27-1.65-1.27-1.65-1.04-.7.08-.7.08-.7 1.15.08 1.75 1.2 1.75 1.2 1.02 1.75 2.67 1.25 3.32.95.1-.75.4-1.25.72-1.55-2.55-.3-5.23-1.27-5.23-5.65 0-1.25.45-2.3 1.2-3.1-.12-.3-.52-1.5.12-3.1 0 0 .97-.3 3.2 1.2.92-.25 1.92-.37 2.92-.37s2 .12 2.92.37c2.23-1.5 3.2-1.2 3.2-1.2.64 1.6.24 2.8.12 3.1.75.8 1.2 1.85 1.2 3.1 0 4.4-2.7 5.35-5.25 5.65.4.35.75 1 .75 2v2.95c0 .3.2.65.8.55C20.7 21.4 24 17.1 24 12c0-6.27-5.23-11.5-12-11.5z" />
          </svg>
          <span>Continue with GitHub</span>
        </button>
      </div>
    </div>
  )
}

export default Login
