import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Already connected to MongoDB. Skipping new connection.");
    return;
  }

  if (mongoose.connections[0].readyState) {
    isConnected = true;
    console.log("✅ Already connected. Using existing connection.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI)
    isConnected = true;
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};
