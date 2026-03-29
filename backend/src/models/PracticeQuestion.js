import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const practiceQuestionSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
      enum: ["A1", "A2", "B1", "B2", "C1"],
    },
    theme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theme",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["multiple-choice", "fill-in-the-blank", "writing"],
    },
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    instructions: {
      type: String,
      trim: true,
      default: "",
    },
    options: {
      type: [optionSchema],
      default: [],
    },
    correctAnswer: {
      type: String,
      trim: true,
      default: "",
    },
    sampleAnswer: {
      type: String,
      trim: true,
      default: "",
    },
    explanation: {
      type: String,
      trim: true,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const PracticeQuestion = mongoose.model(
  "PracticeQuestion",
  practiceQuestionSchema
);

export default PracticeQuestion;