const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

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
app.use("/api/chat", require("./routes/chat"));

// 404 Fallback
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

  // Join a room
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`🔗 User joined room: ${roomId}`);
  });

  // Handle message sending to a room
  socket.on("sendMessage", async (data) => {
    const { userId, username, message, roomId } = data;
  
    const newMessage = {
      userId,
      username,
      message,
      roomId,
      createdAt: new Date(),
    };
  
    try {
      await pool.query(
        "INSERT INTO messages (user_id, username, message, room_id) VALUES ($1, $2, $3, $4)",
        [userId, username, message, roomId]
      );
  
      // Emit to everyone in the room
      io.to(roomId).emit("receiveMessage", newMessage);
    } catch (err) {
      console.error("Error saving message:", err);
    }
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
