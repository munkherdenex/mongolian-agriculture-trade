const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // your frontend port
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); // Parses incoming JSON requests

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/saved-products", require("./routes/savedProducts"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/my-products", require("./routes/myProducts"));


// 404 Fallback for Unknown Routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
