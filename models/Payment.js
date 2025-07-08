import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
    from_user: {
        type: String,
        // required: true, 
    },
    to_user:{
        type: String,
        // required: true, 
    },
    from_user_pic:{
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        default: "",
    },
    
    orderId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "PENDING", // PENDING, COMPLETED, FAILED
    }
}, { timestamps: true });
const Payment = mongoose.models.Payment || model("Payment", paymentSchema);
export default Payment;
