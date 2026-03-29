import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import levelRoutes from "./routes/levelRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import practiceQuestionRoutes from "./routes/practiceQuestionRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Bhasha Abhyasa API is running" });
});

app.use("/api/users", userRoutes);
app.use("/api/levels", levelRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api/practice-questions", practiceQuestionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});