import express from "express";
import { createTransaction, getTransactions, deleteTransaction, sumTransactions } from "../services/transactionService.js";
const router = express.Router();

router.post("/", createTransaction);
router.get("/:user_id", getTransactions);
router.delete("/:transaction_id", deleteTransaction);
router.get("/summary/:user_id", sumTransactions);
export default router;
