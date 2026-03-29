import mongoose from "mongoose";

const practiceAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    theme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theme",
      required: true,
    },
    type: {
      type: String,
      enum: ["multiple-choice", "fill-in-the-blank", "writing"],
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number, // percentage
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const PracticeAttempt = mongoose.model(
  "PracticeAttempt",
  practiceAttemptSchema
);

export default PracticeAttempt;