const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const exchangeRoutes = require("./routes/exchangeRoutes");

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/exchanges", exchangeRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("📚 Peer-to-Peer Book Exchange API is running...");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
