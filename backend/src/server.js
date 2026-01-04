import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/health", (req, res) => {
        res.json({ health: "Health is Better than you." });
});

app.listen(PORT, () => {
        console.log(`Server is running ${PORT}`);
});
