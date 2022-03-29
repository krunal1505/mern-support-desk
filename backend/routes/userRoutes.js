const express = require("express");
const { check, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/userModel");

// @desc    Register a new user
// @route   /api/users
// @access  Public
router.post(
  "/",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name should be at least 3 characters"),
    check("email").isEmail().withMessage("Please enter valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters"),
  ],
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    // Find if user already exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400).json({ message: "User already registered" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        message: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  })
);

// @desc    Login a user
// @route   /api/users/login
// @access  Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        message: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }
  })
);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = router;
