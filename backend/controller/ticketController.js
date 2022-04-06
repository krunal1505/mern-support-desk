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

// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user from id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401).json({ message: "Ticket not found" });
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401).json({ message: "Not Authorized" });
  }

  res.status(200).json({ message: ticket });
});

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user from id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401).json({ message: "Ticket not found" });
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401).json({ message: "Not Authorized" });
  }

  await ticket.remove();

  res.status(200).json({ message: "Ticket Deleted" });
});

// @desc    Update user ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user from id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401).json({ message: "Ticket not found" });
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401).json({ message: "Not Authorized" });
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: updatedTicket });
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
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
