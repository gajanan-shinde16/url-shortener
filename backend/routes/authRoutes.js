const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);

        await db.execute(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashed]
        );

        res.json({ message: "User registered" });

    } catch (err) {
        res.status(400).json({ error: "User already exists" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const [rows] = await db.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (rows.length === 0) {
        return res.status(400).json({ error: "User not found" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.json({ message: "Login successful" });
});

// LOGOUT
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;