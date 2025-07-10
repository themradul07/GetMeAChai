import mongoose from "mongoose";
const { Schema , model} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
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
        default: "/banner.jpg",
    },
    razorpayKey: {
        type: String,
        default: "rzp_test_soPPly6mzC4i9K",
    },
    razorpaySecret: {
        type: String,
        default: "IGBMHDdd7k3aJOo7J1pPVq5P",        
    },
    Bio:{
        type:String,
        default: " Buy Me A Chai "
    },
    category:{
        type: String,
        default: "Null"
    },
    thumbnail:{
        type: String,
        default: "/Thumbnail.png"
    }
   
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

