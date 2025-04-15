const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Create server from app

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

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

// 🔌 Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("✅ New user connected:", socket.id);

  // Handle incoming chat messages
  socket.on("sendMessage", (data) => {
    console.log("📨 Message received:", data);
    socket.broadcast.emit("receiveMessage", data); // send to everyone except sender
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// 🚀 Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server with Socket.IO running on http://localhost:${PORT}`);
});
