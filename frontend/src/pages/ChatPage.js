// src/pages/ChatPage.js
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { TextField, Button, Box, Typography } from "@mui/material";

const socket = io("http://localhost:5000"); // Your backend

function ChatPage() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChatLog((prev) => [...prev, { text: data.text, sender: "other" }]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { text: message });
      setChatLog((prev) => [...prev, { text: message, sender: "me" }]);
      setMessage("");
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>Chat</Typography>
      <Box sx={{ height: 300, overflowY: "scroll", border: "1px solid #ccc", mb: 2, p: 1 }}>
        {chatLog.map((msg, idx) => (
          <Box key={idx} sx={{ textAlign: msg.sender === "me" ? "right" : "left" }}>
            <Typography>{msg.text}</Typography>
          </Box>
        ))}
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
