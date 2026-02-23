import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig.js";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Successfully Connected to DB");
  } catch (error) {
    console.log("Not Able To Connect MongoDB");
    console.log(error);
  }
}

export default connectDB;
