const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const { getTickets, createTicket } = require("../controller/ticketController");

router.route("/").get(protect, getTickets).post(protect, createTicket);

module.exports = router;
