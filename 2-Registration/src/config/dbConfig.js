import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig.js";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Not Able to connect to DB");
    console.log(error);
  }
}

export default connectDB;
