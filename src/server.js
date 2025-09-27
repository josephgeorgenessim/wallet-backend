import express from "express"; import dotenv from "dotenv";
import cors from "cors";
import { initDB, sql } from "./config/db.js";
import mountRoutes from "./routes/index.js";
import morgan from "morgan";
import { rateLimiterMiddleware } from "./middleware/rateLimiter.js";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(rateLimiterMiddleware);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Mount Routes
mountRoutes(app);

initDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});