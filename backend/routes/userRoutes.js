const express = require("express");
const { check, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const router = express.Router();

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
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("Register Route");
  })
);

// @desc    Login a user
// @route   /api/users/login
// @access  Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    res.send("Login Route");
  })
);

module.exports = router;
