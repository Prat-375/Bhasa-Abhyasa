import express from "express";
import {
  submitAttempt,
  getUserProgress,
} from "../controllers/progressController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit", protect, submitAttempt);
router.get("/:userId", protect, getUserProgress);

export default router;