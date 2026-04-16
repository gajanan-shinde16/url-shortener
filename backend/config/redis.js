const { createClient } = require("redis");
require("dotenv").config();

const client = createClient({
    url: process.env.REDIS_URL
});

client.on("error", (err) => {
    console.error(" Redis Error:", err);
});

const connectRedis = async () => {
    await client.connect();
    console.log("Redis Connected");
};

connectRedis();

module.exports = client;