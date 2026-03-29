import Theme from "../models/Theme.js";

export const getThemes = async (req, res) => {
  try {
    const { level } = req.query;

    const filter = {};

    if (level) {
      filter.level = level;
    }

    filter.isPublished = true;

    const themes = await Theme.find(filter).sort({ order: 1, createdAt: 1 });

    res.status(200).json(themes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch themes" });
  }
};

export const getThemeById = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);

    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }

    res.status(200).json(theme);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch theme" });
  }
};

export const createTheme = async (req, res) => {
  try {
    const { level, title, description, category, order, isPublished } = req.body;

    if (!level || !title || !description) {
      return res
        .status(400)
        .json({ message: "Level, title, and description are required" });
    }

    const theme = await Theme.create({
      level,
      title,
      description,
      category,
      order,
      isPublished,
    });

    res.status(201).json(theme);
  } catch (error) {
    res.status(500).json({ message: "Failed to create theme" });
  }
};