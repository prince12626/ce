import mongoose from "mongoose";
import { ENV } from "./dotenv.js";

export const connectDB = async () => {
        try {
                await mongoose.connect(ENV.DB_URL);
                console.log("MongoDB connected");
        } catch (error) {
                console.log(error);
                process.exit(1);
        }
};
