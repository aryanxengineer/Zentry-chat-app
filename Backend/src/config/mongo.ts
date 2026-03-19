import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

const connectToMongoDB = async () => {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined");
    process.exit(1);
  }

  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await mongoose.connect(MONGO_URI, {
        dbName: "Zentry_db",
      });
      return;
    } catch (error) {
      retries++;

      console.error(
        `MongoDB connection failed (attempt ${retries}/${MAX_RETRIES})`,
      );

      if (retries === MAX_RETRIES) {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

export default connectToMongoDB;
