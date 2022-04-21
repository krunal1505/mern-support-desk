const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

const app = express();

// Add Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Defining Routes
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const noteRoutes = require("./routes/noteRoutes");

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Support-Desk API" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/tickets/:ticketId/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server started on Port :${PORT}`);
});
