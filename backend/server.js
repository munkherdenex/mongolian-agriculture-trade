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

const connectedUsers = new Map(); // Track userId <-> socket.id

io.on("connection", (socket) => {
  console.log("✅ New user connected:", socket.id);

  // Listen when user registers their ID after login
  socket.on("registerUser", (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`📍 Registered user ${userId} to socket ${socket.id}`);
  });

  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`🔗 User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", async (data) => {
    const { userId, username, message, roomId, recipientId } = data;

    const newMessage = {
      userId,
      username,
      message,
      roomId,
      recipientId,
      createdAt: new Date(),
    };

    try {
      await pool.query(
        "INSERT INTO messages (user_id, username, message, room_id, recipient_id, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
        [userId, username, message, roomId, recipientId, new Date()]
      );      

      io.to(roomId).emit("receive_message", newMessage);

      // 🎯 Notify recipient (if online)
      const recipientSocketId = connectedUsers.get(recipientId);
      if (recipientSocketId && !Array.from(socket.rooms).includes(roomId)) {
        // Recipient is online but not in the room (i.e., not currently chatting)
        io.to(recipientSocketId).emit("newMessageNotification", {
          fromUserId: userId,
          fromUsername: username,
          message,
          roomId
        });
        console.log(`🔔 Notified user ${recipientId} (socket: ${recipientSocketId}) about new message`);
      }
    } catch (err) {
      console.error("❌ Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    // Remove from map
    for (let [userId, sockId] of connectedUsers.entries()) {
      if (sockId === socket.id) {
        connectedUsers.delete(userId);
        console.log(`❌ User ${userId} disconnected and removed from map`);
        break;
      }
    }
  });
});



// 🚀 Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server with Socket.IO running on http://localhost:${PORT}`);
});
