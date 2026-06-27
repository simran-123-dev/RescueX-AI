const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, bloodGroup, location } = req.body;

    console.log("Signup Request:", req.body);

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashed,
      phone,
      bloodGroup,
      location,
    });

    const token = createToken(user._id);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("========== LOGIN ==========");
    console.log("Email:", email);

    const user = await User.findOne({ email });

    console.log("User:", user);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const matched = await bcrypt.compare(password, user.password);

    console.log("Password Match:", matched);

    if (!matched) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = createToken(user._id);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (err) {
    console.error("Login Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { email, name } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: await bcrypt.hash(Math.random().toString(36), 12),
      });
    }

    const token = createToken(user._id);

    res.json({
      user,
      token,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Password reset link sent to your email (demo)",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};