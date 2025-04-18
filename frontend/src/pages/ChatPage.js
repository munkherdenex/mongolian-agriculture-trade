import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
  Paper,
} from "@mui/material";

const ChatPage = () => {
  const { productId, sellerId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Load all conversations
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/chat/conversations/${user.id}`)
      .then((res) => setConversations(res.data))
      .catch((err) => console.error("Error fetching conversations:", err));
  }, [user.id]);

  useEffect(() => {
    if (productId && sellerId) {
      axios
        .post("http://localhost:5000/api/chat/start", {
          product_id: productId,
          buyer_id: user.id,
          seller_id: sellerId,
        })
        .then((res) => {
          setSelectedConv(res.data);
        })
        .catch((err) => {
          console.error("Error starting conversation:", err);
        });
    }
  }, [productId, sellerId, user.id]);

  useEffect(() => {
    if (!selectedConv) return;
    axios
      .get(`http://localhost:5000/api/chat/messages/${selectedConv.id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, [selectedConv]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      conversation_id: selectedConv.id,
      sender_id: user.id,
      message: newMessage,
    };

    socket.emit("send_message", messageData);
    axios.post("http://localhost:5000/api/chat/send", messageData);

    setMessages((prev) => [
      ...prev,
      {
        ...messageData,
        sender_name: user.username,
        created_at: new Date().toISOString(),
      },
    ]);
    setNewMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.conversation_id === selectedConv?.id) {
        setMessages((prev) => [...prev, data]);
      }
    });
    return () => socket.off("receive_message");
  }, [selectedConv]);

  return (
    <Box sx={{ display: "flex", height: "90vh", bgcolor: "#f5f5f5" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: "25%",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
          p: 2,
          bgcolor: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Чат хэрэглэгчид
        </Typography>
        <List>
          {conversations.map((conv) => (
            <React.Fragment key={conv.id}>
              <ListItem
                button
                onClick={() => setSelectedConv(conv)}
                selected={selectedConv?.id === conv.id}
              >
                <ListItemText
                  primary={conv.product_title}
                  secondary={conv.other_user_name}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Chat Window */}
      <Box sx={{ width: "75%", p: 3, display: "flex", flexDirection: "column" }}>
        {selectedConv ? (
          <>
            <Typography variant="h6" gutterBottom>
              {selectedConv.product_title}
            </Typography>

            <Paper
              elevation={1}
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                p: 2,
                mb: 2,
                border: "1px solid #ddd",
                borderRadius: 1,
                backgroundColor: "#fff",
              }}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 1,
                    textAlign: msg.sender_id === user.id ? "right" : "left",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: msg.sender_id === user.id ? "#4CAF50" : "#1976D2",
                    }}
                  >
                    {msg.sender_name}
                  </Typography>
                  <Typography variant="body2">{msg.message}</Typography>
                </Box>
              ))}
            </Paper>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Мессеж бичих..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button variant="contained" color="primary" onClick={sendMessage}>
                Илгээх
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1">Чатыг сонгоно уу...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;
