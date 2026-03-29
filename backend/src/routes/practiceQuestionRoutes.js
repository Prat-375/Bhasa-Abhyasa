import express from "express";
import {
  getPracticeQuestions,
  getPracticeQuestionById,
  createPracticeQuestion,
} from "../controllers/practiceQuestionController.js";

const router = express.Router();

router.get("/", getPracticeQuestions);
router.get("/:id", getPracticeQuestionById);
router.post("/", createPracticeQuestion);

export default router;