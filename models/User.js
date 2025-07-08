import mongoose from "mongoose";
const { Schema , model} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: "cat.jpeg",
    },
    coverPicture: {
        type: String,
        default: "banner.gif",
    },
    razorpayKey: {
        type: String,
        default: "rzp_test_1DP5mmOlF5G5ag",
    },
    razorpaySecret: {
        type: String,
        default: "6b1c2f0d3e4f5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z",
        
    },
    Bio:{
        type:String,
        default: " Buy Me A Chai "
    }
   
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

