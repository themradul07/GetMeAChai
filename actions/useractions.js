"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import { connectdb } from "@/db/connectdb"



export const initatePayment = async (amount, toUser, paymentform, img) => {
  try {
    await connectdb();

    const user = await User.findOne({ username: toUser });

    const razorpay = new Razorpay({
      key_id: user.razorpayKey,
      key_secret: user.razorpaySecret,
    });

    let object = {
      amount: amount * 100, // Amount in smallest currency unit
      currency: "INR",
    };

    let paymentSts = await razorpay.orders.create(object);

    if (!paymentSts) {
      throw new Error("Payment initiation failed");
    }
    // Save payment details to the database
    const paymentreceipt = await new Payment({
      amount: amount * 100,
      to_user: toUser,
      message: paymentform.message,
      from_user: paymentform.name,
      orderId: paymentSts.id,
      status: "pending",
      from_user_pic: img,
    });

    await paymentreceipt.save();

    return paymentSts.id;
  }
  catch (err) {
    console.log("Error while making payment", err);
  }
}

export const getuserdetails = async (username) => {
  console.log("Fetching user details for:", username);
  try {
    await connectdb();

    const user = await User.findOne({ username }).lean();

    if (!user) {
      throw new Error("User not found");
    }

    console.log("User details fetched successfully:", user);

    return {
      name: user.name,
      email: user.email,
      username: user.username,
      profilePicture: user.profilePicture || "https://res.cloudinary.com/dqj1x8v2h/image/upload/v1735681234/Chai%20App/default-profile-picture.png",
      bio: user.bio || "No bio available",
      coverPicture: user.coverPicture || "https://res.cloudinary.com/dqj1x8v2h/image/upload/v1735681234/Chai%20App/default-cover-picture.png",
      razorpayKey: user.razorpayKey,
      razorpaySecret: user.razorpaySecret,
      Bio: user.Bio,
    };

  } catch (err) {
    console.log("Error while fetching user details", err);
    return null; // Return null or handle the error as needed
  }
}

export const fetchpayments = async (username) => {
  try {
    await connectdb();

    const payments = await Payment.find({
      to_user: username,
      status: "done"
    }).sort({ amount: -1 }).limit(5).lean();

    if (!payments || payments.length === 0) {
      throw new Error("No payments found for this user");
    }

    console.log("Payments fetched successfully:", payments);
    return payments.map(payment => ({
      amount: payment.amount / 100, // Convert back to original amount
      message: payment.message,
      from_user: payment.from_user,
      name: payment.name,

    }));
  } catch (err) {
    console.log("Error while fetching payments", err);
    return null; // Return null or handle the error as needed
  }
}

export const updateProfile = async (username, profileData) => {
  try {
    await connectdb();

    const existingUser = await User.findOne({ username }).lean();
    if (!existingUser) {
      throw new Error("User not found");
    }

    // Convert FormData to plain object (if it's FormData)
    const ndata = profileData;

    // Prevent updating protected fields
    delete ndata._id;
    delete ndata.password;

    // If username is being changed, check if new one already exists
    if (ndata.username && ndata.username !== existingUser.username) {
      const userExists = await User.findOne({ username: ndata.username }).lean();
      if (userExists) {
        throw new Error("Username already exists");
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: ndata },
      { new: true, runValidators: true }
    ).lean();

    console.log("Profile updated successfully:", updatedUser);

    return {
      ok: true,
      message: "Profile updated successfully",
      user: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (err) {
    console.error("Error while updating profile", err);
    return {
      ok: false,
      message: err.message || "Something went wrong",
    };
  }
};
