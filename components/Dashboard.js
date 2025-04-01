"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'
                                                                    
const Dashboard = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {
        if (!session) {
            router.push('/login')
            return
        } else {
            getData()
        }
    }, [session])

    const getData = async () => {
        try {
            let userData = await fetchuser(session.user.name)
            setform(userData)
        } catch (error) {
            toast.error("Failed to fetch user data", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })   
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const { _id, ...updateData } = form;

            const response = await updateProfile(updateData, session.user.name);
            if (response.success) {
                toast.success("Profile updated successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });

                // Redirect to PaymentPage after successful profile update
                router.push('/[username]', `/${form.username}`);
            } else {
                toast.error(response.error || "Failed to update profile", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
            toast.error("An error occurred while updating the profile", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="container mx-auto py-10 px-6">
                <h1 className="text-center my-5 text-4xl font-extrabold text-blue-400">
                    Welcome to Your Dashboard
                </h1>
                <p className="text-center text-gray-400 mb-10">
                    Manage your profile and update your details below.
                </p>

                <form className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="my-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            value={form.name || ""}
                            onChange={handleChange}
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full p-3 text-gray-900 border border-gray-600 rounded-lg bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="my-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            value={form.email || ""}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full p-3 text-gray-900 border border-gray-600 rounded-lg bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Username Input */}
                    <div className="my-4">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <input
                            value={form.username || ""}
                            onChange={handleChange}
                            type="text"
                            name="username"
                            id="username"
                            className="block w-full p-3 text-gray-900 border border-gray-600 rounded-lg bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    {/* Profile Picture Input */}
                    <div className="my-4">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-300">
                            Profile Picture URL
                        </label>
                        <input
                            value={form.profilepic || ""}
                            onChange={handleChange}
                            type="text"
                            name="profilepic"
                            id="profilepic"
                            className="block w-full p-3 text-gray-900 border border-gray-600 rounded-lg bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter profile picture URL"
                        />
                    </div>

                    {/* Cover Picture Input */}
                    <div className="my-4">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-300">
                            Cover Picture URL
                        </label>
                        <input
                            value={form.coverpic || ""}
                            onChange={handleChange}
                            type="text"
                            name="coverpic"
                            id="coverpic"
                            className="block w-full p-3 text-gray-900 border border-gray-600 rounded-lg bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter cover picture URL"
                        />
                    </div>

                    {/* Razorpay ID Input */}
                    <div className="my-4">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-300">
                            Razorpay ID
                        </label>
                        <input
                            value={form.razorpayid || ""}
                            onChange={handleChange}
                            type="text"
                            name="razorpayid"
                            id="razorpayid"
                            className="block w-full p-3 text-gray-900 border border-gray-600 rounded-lg bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Razorpay ID"
                        />
                    </div>

                    {/* Razorpay Secret Input */}
                    <div className="my-4">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-300">
                            Razorpay Secret
                        </label>
                        <input
                            value={form.razorpaysecret || ""}
                            onChange={handleChange}
                            type="text"
                            name="razorpaysecret"
                            id="razorpaysecret"
                            className="block w-full p-3 text-gray-900 border border-gray-600 rounded-lg bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Razorpay Secret"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="my-6">
                        <button
                            type="submit"
                            className="block w-full p-3 text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 rounded-lg shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-300 font-medium text-sm transition duration-300"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard