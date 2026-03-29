import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
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
    completed: {
      type: Boolean,
      default: false,
    },
    bestScore: {
      type: Number,
      default: 0,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;