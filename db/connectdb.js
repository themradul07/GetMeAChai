import mongoose from "mongoose";

export async function connectdb(){
  try {
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new Error("MongoDB connection failed");
  }
}