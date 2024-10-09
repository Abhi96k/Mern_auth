import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateTokenAndSetCookie(res, user._id);

    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Token generation failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const logout = (req, res) => {
  res.send("logout route");
};
