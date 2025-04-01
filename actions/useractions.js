"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    // user ka secret  jisko payment mil raha hai
    let user = await User.findOne({ username: to_username })
    const secret = user.razorpaysecret

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })



    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    // pending payment ka object create
    await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message })

    return x

}


export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchpayments = async (username) => {
    await connectDb()
    // sari payments in sorting order of amount
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDb(); // Ensure kro ki database connected he

    let ndata;
    try {
        // Ensure data  object he ya array of key-value pairs
        if (typeof data === "object" && data !== null) {
            ndata = data;
        } else if (Array.isArray(data)) {
            ndata = Object.fromEntries(data); // array ko object me convert kro if needed
        } else {
            throw new Error("Invalid data format. Expected an object or an array of key-value pairs.");
        }
    } catch (error) {
        console.error("Error parsing data:", error.message);
        return { error: "Invalid data format" };
    }

    try {
        // Check kro ki username ya email me se koi bhi update hua he ya nahi
        if (oldusername !== ndata.username) {
            // Check ki username already exist ?
            const existingUser = await User.findOne({ username: ndata.username });
            if (existingUser) {
                return { error: "Username already exists" };
            }

            // Update the user's profile
            await User.updateOne({ email: ndata.email }, ndata);

            // Update username in table
            await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username });
        } else {
            // agr username nahi badla to sirf profile update kro
            await User.updateOne({ email: ndata.email }, ndata);
        }

        return { success: true, message: "Profile updated successfully" };
    } catch (error) {
        console.error("Error updating profile:", error.message);
        return { error: "Failed to update profile. Please try again later." };
    }
};

