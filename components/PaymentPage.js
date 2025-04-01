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

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Thanks for your donation!', {
                position: "top-right",

                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true, // Add default value
                pauseOnHover: true, // Add default value
                draggable: true, // Add default value
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

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-black text-white">

                <div className="cover w-full h-full relative flex justify-center mt-10">
                    <div className="absolute bg-gradient-to-br from-blue-500 to-black blur-3xl rounded-full w-96 h-96"></div>
                    <img
                        className="rounded-full object-center w-32 h-32 border-4 border-black relative shadow-lg"
                        src="/pfp.gif"
                        alt="Profile"
                    />
                </div>


                <div className="info flex justify-center items-center mt-10 mb-16 flex-col gap-4 bg-opacity-70 bg-gray-900 text-white py-8 px-10 rounded-lg shadow-2xl w-[95%] md:w-[80%] lg:w-[70%]">
                    <div className="font-extrabold text-4xl text-white">@{username}</div>
                    <div className="text-lg text-slate-300 italic">"Fuel my creativity with a chai!"</div>
                    <div className="text-lg text-slate-300">
                        {payments.length} Supporters · ₹
                        {payments.reduce((a, b) => a + b.amount, 0)} raised
                    </div>


                    <div className="payment flex gap-6 w-[90%] mt-8 flex-col md:flex-row">

                        <div className="supporters w-full md:w-1/2 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg text-white px-6 md:p-10 shadow-xl">
                            <h2 className="text-2xl font-bold mb-6 text-blue-700">
                                Top Supporters
                            </h2>
                            <ul className="space-y-4">
                                {payments.length === 0 && <li className="text-slate-400">No supporters yet. Be the first!</li>}
                                {payments.map((p, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-4 border-b border-slate-700 pb-2"
                                    >
                                        <img
                                            width={40}
                                            className="rounded-full border-2 border-black"
                                            src="/avatar.gif"
                                            alt="user avatar"
                                        />
                                        <span className="text-slate-300">
                                            {p.name} donated{" "}
                                            <span className="font-bold text-white">₹{p.amount}</span>{" "}
                                            with a message &quot;{p.message}&quot;
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <div className="makePayment w-full md:w-1/2 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg text-white px-6 md:p-10 shadow-xl">
                            <h2 className="text-2xl font-bold mb-6 text-blue-700">Contribute Now</h2>
                            <div className="flex flex-col gap-4">

                                <input
                                    onChange={handleChange}
                                    value={paymentform.name}
                                    name="name"
                                    type="text"
                                    className="w-full p-3 rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2"
                                    placeholder="Your Name"
                                />


                                <input
                                    onChange={handleChange}
                                    value={paymentform.message}
                                    name="message"
                                    type="text"
                                    className="w-full p-3 rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2"
                                    placeholder="Your Message"
                                />


                                <input
                                    onChange={handleChange}
                                    value={paymentform.amount}
                                    name="amount"
                                    type="text"
                                    className="w-full p-3 rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2"
                                    placeholder="Amount (₹)"
                                />


                                <button
                                    onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                                    type="button"
                                    className="text-white bg-green-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-300"
                                    disabled={
                                        paymentform.name?.length < 3 ||
                                        paymentform.message?.length < 4 ||
                                        paymentform.amount?.length < 1
                                    }
                                >
                                    Donate Now
                                </button>
                            </div>


                            <div className="flex flex-col md:flex-row gap-4 mt-6">
                                <button
                                    className="bg-blue-700 hover:bg-slate-800 text-white p-3 rounded-lg transition duration-300"
                                    onClick={() => pay(1000)}
                                >
                                    ₹10 Chai
                                </button>
                                <button
                                    className="bg-blue-700 hover:bg-slate-800 text-white p-3 rounded-lg transition duration-300"
                                    onClick={() => pay(2000)}
                                >
                                    ₹20 Chai
                                </button>
                                <button
                                    className="bg-blue-700 hover:bg-slate-800 text-white p-3 rounded-lg transition duration-300"
                                    onClick={() => pay(3000)}
                                >
                                    ₹30 Chai
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

