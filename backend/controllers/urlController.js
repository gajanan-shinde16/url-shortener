const db = require("../config/db");
const redisClient = require("../config/redis");
const { nanoid } = require("nanoid");

// CREATE SHORT URL
exports.createShortUrl = async (req, res) => {
    try {
        const { original_url } = req.body;

        if (!original_url) {
            return res.status(400).json({ message: "URL required" });
        }

        // Check if already exists
        const [row] = await db.execute(
            "SELECT * FROM urls WHERE original_url = ?",
            [original_url]
        );

        if (row.length > 0) {
            const shortCode = row[0].short_code;

            try {
                await redisClient.set(shortCode, original_url, { EX: 3600 });
            } catch (err) {
                console.log("Redis error:", err.message);
            }

            return res.json({
                short_url: `http://localhost:5000/${shortCode}`,
                message: "Already exists"
            });
        }

        // Create new
        const short_code = nanoid(6);

        await db.execute(
            "INSERT INTO urls (short_code, original_url) VALUES (?, ?)",
            [short_code, original_url]
        );

        // Cache in Redis
        try {
            await redisClient.set(short_code, original_url, { EX: 3600 });
        } catch (err) {
            console.log("Redis error:", err.message);
        }

        res.json({
            short_url: `http://localhost:5000/${short_code}`
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ANALYTICS API
exports.getAnalytics = async (req, res) => {
    try {
        const [rows] = await db.execute(
            `SELECT short_code, original_url, clicks, created_at, last_accessed 
             FROM urls 
             ORDER BY clicks DESC`
        );

        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};