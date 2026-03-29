import mongoose from "mongoose";
import PracticeQuestion from "../models/PracticeQuestion.js";
import Theme from "../models/Theme.js";

export const getPracticeQuestions = async (req, res) => {
  try {
    const { level, theme, type } = req.query;

    const filter = { isPublished: true };

    if (level) {
      filter.level = level;
    }

    if (theme) {
      filter.theme = theme;
    }

    if (type) {
      filter.type = type;
    }

    const questions = await PracticeQuestion.find(filter)
      .populate("theme", "title level category")
      .sort({ order: 1, createdAt: 1 });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch practice questions" });
  }
};

export const getPracticeQuestionById = async (req, res) => {
  try {
    const question = await PracticeQuestion.findById(req.params.id).populate(
      "theme",
      "title level category"
    );

    if (!question) {
      return res.status(404).json({ message: "Practice question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch practice question" });
  }
};

export const createPracticeQuestion = async (req, res) => {
  try {
    const {
      level,
      theme,
      type,
      questionText,
      instructions,
      options,
      correctAnswer,
      sampleAnswer,
      explanation,
      order,
      isPublished,
    } = req.body;

    if (!level || !theme || !type || !questionText) {
      return res.status(400).json({
        message: "Level, theme, type, and questionText are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(theme)) {
      return res.status(400).json({ message: "Invalid theme id" });
    }

    const themeExists = await Theme.findById(theme);

    if (!themeExists) {
      return res.status(404).json({ message: "Theme not found" });
    }

    if (themeExists.level !== level) {
      return res
        .status(400)
        .json({ message: "Theme level does not match question level" });
    }

    if (type === "multiple-choice") {
      if (!options || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({
          message: "Multiple-choice questions need at least 2 options",
        });
      }

      const correctOptions = options.filter((option) => option.isCorrect);

      if (correctOptions.length !== 1) {
        return res.status(400).json({
          message: "Multiple-choice questions need exactly 1 correct option",
        });
      }
    }

    if (type === "fill-in-the-blank" && !correctAnswer) {
      return res.status(400).json({
        message: "Fill-in-the-blank questions require correctAnswer",
      });
    }

    if (type === "writing" && !sampleAnswer) {
      return res.status(400).json({
        message: "Writing questions require sampleAnswer",
      });
    }

    const question = await PracticeQuestion.create({
      level,
      theme,
      type,
      questionText,
      instructions,
      options,
      correctAnswer,
      sampleAnswer,
      explanation,
      order,
      isPublished,
    });

    const populatedQuestion = await PracticeQuestion.findById(question._id).populate(
      "theme",
      "title level category"
    );

    res.status(201).json(populatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Failed to create practice question" });
  }
};