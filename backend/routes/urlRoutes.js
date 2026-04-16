const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    createShortUrl,
    getAnalytics
} = require("../controllers/urlController");

// Protected
router.post("/shorten", auth, createShortUrl);

// Analytics (optional protect)
router.get("/analytics", auth, getAnalytics);

module.exports = router;