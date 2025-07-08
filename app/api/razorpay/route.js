import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectdb } from "@/db/connectdb";
import Payment from "@/models/Payment";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export const POST = async (request) => {
    try {
        await connectdb();
        const body = await request.json();
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

        // Initialize Razorpay instance
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID_KEY,
            key_secret: process.env.RAZORPAY_SECRET_KEY,
        });

        // Verify the payment razorpay_signature
        const israzorpay_SignatureValid = validatePaymentVerification({ "order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, process.env.RAZORPAY_SECRET_KEY);

        if (!israzorpay_SignatureValid) {
            return NextResponse.json({ error: "Invalid payment razorpay_signature" }, { status: 400 });
        }

        // Find and update the payment status
        const updatePayment = await Payment.findOneAndUpdate(
            { orderId: razorpay_order_id },
            { status: "done" },
            { new: true }
        );
        
        await updatePayment.save();
        
        if (!updatePayment) {
            return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
        }
        
        // Redirect or respond as needed
        return NextResponse.json({ success: true, message: "Payment verified successfully", payment: updatePayment }, { status: 200 });

    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};



