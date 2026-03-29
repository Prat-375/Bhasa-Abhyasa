import PracticeAttempt from "../models/PracticeAttempt.js";
import Progress from "../models/Progress.js";

export const submitAttempt = async (req, res) => {
  try {
    const userId = req.user._id;
    const { level, theme, type, totalQuestions, correctAnswers } = req.body;

    if (!level || !theme || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const attempt = await PracticeAttempt.create({
      userId,
      level,
      theme,
      type,
      totalQuestions,
      correctAnswers,
      score,
    });

    let progress = await Progress.findOne({ userId, theme });

    if (!progress) {
      progress = await Progress.create({
        userId,
        level,
        theme,
        completed: score >= 70,
        bestScore: score,
        attempts: 1,
      });
    } else {
      progress.attempts += 1;
      progress.bestScore = Math.max(progress.bestScore, score);

      if (score >= 70) {
        progress.completed = true;
      }

      await progress.save();
    }

    res.status(201).json({
      message: "Attempt saved",
      attempt,
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit attempt" });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const progress = await Progress.find({ userId: req.params.userId }).populate(
      "theme",
      "title level"
    );

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch progress" });
  }
};