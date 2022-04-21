const asyncHandler = require("express-async-handler");

const Note = require("../model/noteModel");
const User = require("../model/userModel");
const Ticket = require("../model/ticketModel");

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user from id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401).json("User not authorized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

// @desc    Add note for a ticket
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  // Get user from id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401).json("User not authorized");
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });
  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
