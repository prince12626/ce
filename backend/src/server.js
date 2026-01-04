import "dotenv/config";
import express from "express";
import path from "path";
import { ENV } from "./config/dotenv.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";

const __dirname = path.resolve();
const app = express();
const PORT = ENV.PORT || 3000;

app.use(clerkMiddleware());

app.get("/api/health", (req, res) => {
        res.json({ health: "Health is Better than you." });
});

//. Make project ready for deployment.

if (ENV.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../admin/dist")));

        app.get("/*any", (req, res) => {
                res.sendFile(
                        path.join(__dirname, "../admin", "dist", "index.html")
                );
        });
}

connectDB();

app.listen(PORT, () => {
        console.log(`Server is running ${PORT}`);
});
