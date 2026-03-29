import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const signupUser = async (req, res) => {
  try {
    const { name, email, password, currentLevel } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      currentLevel: currentLevel || "A1",
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        currentLevel: user.currentLevel,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to sign up user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        currentLevel: user.currentLevel,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to log in user" });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      currentLevel: req.user.currentLevel,
    },
  });
};