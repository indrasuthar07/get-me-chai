"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import Image from 'next/image'
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

        if (username) {
            router.push(`/${username}?paymentdone=true`);
        } else {
            console.error("Username is undefined. Cannot redirect.");
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-black text-white">
                <div className="cover w-full h-full relative flex justify-center mt-10">
                    <div className="absolute bg-gradient-to-br from-blue-500 to-black blur-3xl rounded-full w-96 h-96"></div>
                    <Image className="rounded-full object-center w-32 h-32 border-4 border-black relative shadow-lg" src="/pfp.gif" width={128} height={128} alt="Profile" />
                </div>

                <div className="info flex justify-center items-center mt-10 mb-16 flex-col gap-4 bg-opacity-70 bg-gray-900 text-white py-8 px-10 rounded-lg shadow-2xl w-[95%] md:w-[80%] lg:w-[70%]">
                    <div className="font-extrabold text-4xl text-white">@{username}</div>
                    <div className="text-lg text-slate-300 italic">"Fuel my creativity with a chai!"</div>
                    <div className="text-lg text-slate-300">{payments.length} Supporters · ₹{payments.reduce((a, b) => a + b.amount, 0)} raised</div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
