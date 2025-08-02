// db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your_mongo_uri_here";

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected"); // Debug log
};

export default dbConnect;
