const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");
const Ticket = require("../model/ticketModel");

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user from id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json({ message: tickets });
});

// @desc    Create ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400).json({ message: "Please add a product and description" });
  }
  // Get user from id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });
  res.status(201).json({ message: ticket });
});

module.exports = {
  getTickets,
  createTicket,
};
