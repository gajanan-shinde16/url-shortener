const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 20, 
    message: {
        error: "Too many requests, please try again later"
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = limiter;