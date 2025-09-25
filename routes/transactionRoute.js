import express from "express";
import { createTransaction, getTransactions, deleteTransaction } from "../services/transactionService.js";
const router = express.Router();

router.post("/", createTransaction);
router.get("/:user_id", getTransactions);
router.delete("/:transaction_id", deleteTransaction);

export default router;
