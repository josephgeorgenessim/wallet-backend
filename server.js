// Correct content for: /server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sql } from "./config/db.js"; 
import mountRoutes from "./routes/index.js";
import morgan from "morgan";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS Transactions (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

        console.log("Database initialized successfully ✅");
    } catch (error) {
        console.log("Database initialization failed ❌", error);
        process.exit(1);
    }
}


app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Mount Routes
mountRoutes(app);

initDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});