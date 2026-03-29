import express from "express";
import {
  getThemes,
  getThemeById,
  createTheme,
} from "../controllers/themeController.js";

const router = express.Router();

router.get("/", getThemes);
router.get("/:id", getThemeById);
router.post("/", createTheme);

export default router;