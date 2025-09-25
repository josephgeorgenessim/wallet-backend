import { sql } from "../config/db.js";

export const getTransactions = async (req, res) => {
    try {
        const { user_id } = req.params;
        const [rows] = await sql`SELECT * FROM Transactions WHERE user_id = ${user_id} order by created_at desc`;

        if (!rows) {
            return res.status(404).json({ error: "No transactions found." });
        }

        return res.status(200).json(rows);
    } catch (error) {
        console.log("transactionService.js -> getTransactions -> error :", error);
        res.status(500).json({ error: "Failed to get transactions." });
    }
};

export const createTransaction = async (req, res) => {
    try {

        const { user_id, title, amount, category } = req.body;

        if (!user_id || !title || !amount || !category) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const [rows] = await sql`INSERT INTO Transactions (user_id, title, amount, category) VALUES (${user_id}, ${title}, ${amount}, ${category}) RETURNING *`;
        return res.status(201).json(rows);

    } catch (error) {
        console.log("transactionService.js -> createTransaction -> error :", error);
        res.status(500).json({ error: "Failed to create transaction." });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const { transaction_id } = req.params;
        if(!transaction_id || !Number(transaction_id)){
            return res.status(400).json({ error: "Missing transaction id" });
        }
        const result = await sql`DELETE FROM Transactions WHERE id = ${transaction_id} RETURNING *`;

        if (result.length === 0) {
            return res.status(404).json({ error: "No transaction found." });
        }
        return res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.log("transactionService.js -> deleteTransaction -> error :", error);
        res.status(500).json({ error: "Failed to delete transaction." });
    }
};