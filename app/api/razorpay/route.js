import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDb();
    let body = await req.formData();
    body = Object.fromEntries(body);

    // Check ki razorpay se payment aaya he ya nahi
    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
        return NextResponse.json({ success: false, message: "Order Id not found" });
    }

    // secret nikalo
    let user = await User.findOne({ username: p.to_user });
    const secret = user.razorpaysecret;

    // Verify payment
    let xx = validatePaymentVerification(
        { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
        body.razorpay_signature,
        secret
    );

    if (xx) {
        // Update payment status
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: "true" },
            { new: true }
        );

        // Validate the redirection URL
        if (process.env.NEXT_PUBLIC_URL && updatedPayment.to_user) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
            );
        } else {
            console.error("Invalid redirection URL");
            return NextResponse.json({ success: false, message: "Invalid redirection URL" });
        }
    } else {
        return NextResponse.json({ success: false, message: "Payment Verification Failed" });
    }
};