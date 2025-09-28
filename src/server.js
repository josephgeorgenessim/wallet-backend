import express from "express"; import dotenv from "dotenv";
import cors from "cors";
import { initDB, sql } from "./config/db.js";
import mountRoutes from "./routes/index.js";
import morgan from "morgan";
import { rateLimiterMiddleware } from "./middleware/rateLimiter.js";

dotenv.config();
const port = process.env.PORT || 3000;
const host = "0.0.0.0";
const localIP = "192.168.1.4";

const app = express();
app.use(rateLimiterMiddleware);
app.use(morgan('dev'));
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"], }));
app.use(express.json());
app.get("/ping", (req, res) => res.json({ message: "pong" }));
// Mount Routes
mountRoutes(app);

initDB().then(() => {
    app.listen(port, host, () => {
        console.log(`🚀 Server running on:`);
        console.log(` Local: http://localhost:${port}`);
        console.log(` Network: http://${localIP}:${port}`);
    });
});