import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";

const socket = io("http://localhost:5000"); // Backend socket server

function ChatPage() {
  const { productId, sellerId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const roomId = `${productId}_${user.id}_${sellerId}`;

  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const chatEndRef = useRef(null);
  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // Load chat history & join room
  useEffect(() => {
    scrollToBottom();
  
    // Join specific room
    socket.emit("joinRoom", { roomId });
  
    // Load chat history for this room
    axios.get(`http://localhost:5000/api/chat/messages?roomId=${roomId}`)
      .then(res => {
        setChatLog(res.data.map(msg => ({
          text: msg.message,
          sender: msg.user_id === user.id ? "me" : "other",
          username: msg.username
        })));
      })
      .catch(err => console.error("Failed to load messages", err));
  
    // Real-time listener
    socket.on("receiveMessage", (data) => {
      setChatLog(prev => [
        ...prev,
        {
          text: data.message,
          sender: data.userId === user.id ? "me" : "other",
          username: data.username
        }
      ]);
    });
  
    return () => socket.off("receiveMessage");
  }, [roomId, user?.id]);
  

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      roomId,
      userId: user.id,
      username: user.name,
      message
    };

    socket.emit("sendMessage", newMessage);

    setChatLog(prev => [...prev, {
      text: message,
      sender: "me",
      username: user.name
    }]);
    setMessage("");
    scrollToBottom();
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>Chat</Typography>

      <Box sx={{ height: 300, overflowY: "scroll", border: "1px solid #ccc", mb: 2, p: 1 }}>
        {chatLog.map((msg, idx) => (
          <Box key={idx} sx={{ textAlign: msg.sender === "me" ? "right" : "left" }}>
            <Typography variant="body2" fontWeight={600}>{msg.username}</Typography>
            <Typography>{msg.text}</Typography>
          </Box>
        ))}
        <div ref={chatEndRef} />
      </Box>

      <TextField
        fullWidth
        label="Текст бичих..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <Button onClick={sendMessage} variant="contained" sx={{ mt: 1 }}>Send</Button>
    </Box>
  );
}

export default ChatPage;
