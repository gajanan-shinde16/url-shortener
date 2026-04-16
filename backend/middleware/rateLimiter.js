const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis"); // ✅ FIX
const redisClient = require("../config/redis");

const limiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    windowMs: 60 * 1000,
    max: 20,
    message: "Too many requests, please try again later",
});

module.exports = limiter;