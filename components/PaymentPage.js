"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Image from 'next/image';

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const getData = async () => {
            let u = await fetchuser(username)
            setcurrentUser(u)
            let dbpayments = await fetchpayments(username)
            setPayments(dbpayments)
        }
        getData()
    }, [username])

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Thanks for your donation!', {
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
    }, [searchParams])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform);
        let orderId = a.id;
        var options = {
            "key": currentUser.razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": "Get Me A Chai",
            "description": "Support your favorite creator",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": paymentform.name,
                "email": "example@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();

        // Redirect to the correct route after payment
        if (username) {
            router.push(`/${username}?paymentdone=true`);
        } else {
            console.error("Username is undefined. Cannot redirect.");
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}

                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-blue-900 to-gray-900 text-white relative">
                {/* Blur Effect for background, matching Home */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-black to-gray-900 blur-2xl opacity-30"></div>
                <div className="cover w-full h-full relative flex justify-center mt-10 z-10">
                    <Image
                        className="rounded-full object-center w-32 h-32 border-4 border-blue-400 relative shadow-lg"
                        src="/pfp.gif"
                        alt="Profile"
                        width={128}
                        height={128}
                    />
                </div>
                <div className="info flex justify-center items-center mt-10 mb-16 flex-col gap-4 bg-gradient-to-r from-blue-800 to-blue-600 py-8 px-10 rounded-lg shadow-lg w-[95%] md:w-[80%] lg:w-[70%] z-10 border border-blue-500/20">
                    <div className="font-extrabold text-4xl text-blue-400 mb-2">@{username}</div>
                    <div className="text-lg text-gray-300 italic mb-2">&quot;Fuel my creativity with a chai!&quot;</div>
                    <div className="text-lg text-gray-200 flex flex-col md:flex-row md:items-center gap-2 w-full">
                        <span>{payments.length} Supporters · ₹{payments.reduce((a, b) => a + b.amount, 0)} raised</span>
                        {/* Progress Bar */}
                        <div className="w-full md:w-1/2 h-2 bg-blue-900 rounded-full overflow-hidden mt-2 md:mt-0">
                            <div className="h-full bg-blue-400" style={{ width: `${Math.min(100, payments.reduce((a, b) => a + b.amount, 0) / 1000 * 100)}%` }}></div>
                        </div>
                    </div>
                    <div className="payment flex gap-6 w-[90%] mt-8 flex-col md:flex-row">
                        {/* Supporters Card */}
                        <div className="supporters w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-500/10">
                            <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center gap-2"><Image src='/group.gif' width={32} height={32} className='w-8 h-8 inline-block' alt='group'/>Top Supporters</h2>
                            <ul className="space-y-4">
                                {payments.length === 0 && <li className="text-gray-400">No supporters yet. Be the first!</li>}
                                {payments.map((p, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-4 border-b border-blue-900 pb-2 hover:bg-blue-900/30 rounded-lg transition"
                                    >
                                        <Image
                                            width={40}
                                            height={40}
                                            className="rounded-full border-2 border-blue-400 shadow bg-slate-800 p-1"
                                            src="/avatar.gif"
                                            alt="user avatar"
                                        />
                                        <span className="text-gray-200">
                                            {p.name} donated <span className="font-bold text-blue-400">₹{p.amount}</span> with a message &quot;{p.message}&quot;
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Payment Form Card */}
                        <div className="makePayment w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-500/10">
                            <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center gap-2"><Image src='/tea.gif' width={32} height={32} className='w-8 h-8 inline-block animate-bounce' alt='chai'/>Contribute Now</h2>
                            <div className="flex flex-col gap-4">
                                <input
                                    onChange={handleChange}
                                    value={paymentform.name}
                                    name="name"
                                    type="text"
                                    className="w-full p-3 rounded-lg bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="Your Name"
                                />
                                <input
                                    onChange={handleChange}
                                    value={paymentform.message}
                                    name="message"
                                    type="text"
                                    className="w-full p-3 rounded-lg bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="Your Message"
                                />
                                <input
                                    onChange={handleChange}
                                    value={paymentform.amount}
                                    name="amount"
                                    type="number"
                                    min="1"
                                    className="w-full p-3 rounded-lg bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="Amount (₹)"
                                />
                                <button
                                    onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                                    type="button"
                                    className="flex items-center gap-2 text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-lg px-5 py-3 text-center transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={
                                        paymentform.name?.length < 3 ||
                                        paymentform.message?.length < 4 ||
                                        paymentform.amount?.length < 1
                                    }
                                >
                                    <span className="animate-bounce">☕</span>
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage

