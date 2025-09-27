import rateLimiter from "../config/upstash.js";

export const rateLimiterMiddleware = async (req, res, next) => {
    try {
        const { success, limit, reset, remaining } = await rateLimiter.limit("my-rate-limiter");
        if (!success) {
            return res.status(429).json({ message: "Too many requests. Please try again later." });
        }
        next();
    } catch (error) {
        console.log("rateLimiterMiddleware -> error :", error);
        res.status(500).json({ error: "Failed to rate limit." });
    }
}

