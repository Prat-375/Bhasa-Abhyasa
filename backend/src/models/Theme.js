import mongoose from "mongoose";

const themeSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
      enum: ["A1", "A2", "B1", "B2", "C1"],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
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

const Theme = mongoose.model("Theme", themeSchema);

export default Theme;