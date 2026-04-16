const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const rateLimiter = require("./middleware/rateLimiter");

const db = require("./config/db");
const redisClient = require("./config/redis");

const urlRoutes = require("./routes/urlRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// CORS (important for cookies)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(rateLimiter);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", urlRoutes);
app.use("/api/auth", authRoutes);

// REDIRECT + ANALYTICS
app.get("/:code", async (req, res) => {
    const { code } = req.params;

    try {
        let cachedUrl = await redisClient.get(code);

        if (cachedUrl) {
            await db.execute(
                "UPDATE urls SET clicks = clicks + 1, last_accessed = NOW() WHERE short_code = ?",
                [code]
            );
            return res.redirect(cachedUrl);
        }

        const [rows] = await db.execute(
            "SELECT * FROM urls WHERE short_code = ?",
            [code]
        );

        if (rows.length === 0) {
            return res.status(404).send("URL not found");
        }

        const originalUrl = rows[0].original_url;

        await redisClient.set(code, originalUrl, { EX: 3600 });

        await db.execute(
            "UPDATE urls SET clicks = clicks + 1, last_accessed = NOW() WHERE short_code = ?",
            [code]
        );

        res.redirect(originalUrl);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Health
app.get("/", (req, res) => {
    res.send("URL Shortener API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});