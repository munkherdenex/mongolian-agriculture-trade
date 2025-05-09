import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { DateTime } from "luxon";

const ChatPage = () => {
  const { productId, sellerId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      socket.emit("registerUser", storedUser.id);
    }
  }, [navigate]);

  useEffect(() => {
    if (!user?.id) return;
    axios
      .get(`http://localhost:5000/api/chat/conversations/${user.id}`)
      .then((res) => setConversations(res.data))
      .catch((err) => console.error("Error fetching conversations:", err));
  }, [user?.id]);

  useEffect(() => {
    if (productId && sellerId && user?.id) {
      axios
        .post("http://localhost:5000/api/chat/start", {
          product_id: productId,
          buyer_id: user.id,
          seller_id: sellerId,
        })
        .then((res) => setSelectedConv(res.data))
        .catch((err) => console.error("Error starting conversation:", err));
    }
  }, [productId, sellerId, user?.id]);

  const fetchMessages = useCallback(async (convId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/messages/${convId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  }, []);

  useEffect(() => {
    if (!selectedConv?.id) return;

    fetchMessages(selectedConv.id);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      fetchMessages(selectedConv.id);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [selectedConv, fetchMessages]);

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
    const handleReceiveMessage = (data) => {
      const isCurrentConversation = selectedConv?.id === data.conversation_id;
      const isCurrentUser = data.sender_id === user?.id;

      if (isCurrentConversation) {
        setMessages((prev) => [...prev, data]);
      }

      setConversations((prevConversations) =>
        prevConversations.map((conv) => {
          if (conv.id === data.conversation_id) {
            return {
              ...conv,
              unread_count: isCurrentConversation || isCurrentUser
                ? conv.unread_count
                : (conv.unread_count || 0) + 1,
              last_message: data.message,
            };
          }
          return conv;
        })
      );
    };

    socket.on("receive_message", handleReceiveMessage);
    return () => socket.off("receive_message", handleReceiveMessage);
  }, [user?.id, selectedConv?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectConversation = async (conv) => {
    setSelectedConv(conv);

    try {
      await axios.patch("http://localhost:5000/api/chat/read", {
        conversation_id: conv.id,
        user_id: user.id,
      });

      setConversations((prevConversations) =>
        prevConversations.map((c) =>
          c.id === conv.id ? { ...c, unread_count: 0 } : c
        )
      );

      fetchMessages(conv.id);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  if (!user) {
    return null; 
  }

  return (
    <Box sx={{ display: "flex", height: "90vh", bgcolor: "#f5f5f5" }}>
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
                onClick={() => handleSelectConversation(conv)}
                selected={selectedConv?.id === conv.id}
              >
                <ListItemText
                  primary={
                    <span style={{ fontWeight: conv.unread_count > 0 ? "bold" : "normal" }}>
                      {conv.product_title}
                      {conv.unread_count > 0 && (
                        <span
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "50%",
                            padding: "2px 6px",
                            fontSize: "12px",
                            marginLeft: "8px",
                          }}
                        >
                          {conv.unread_count}
                        </span>
                      )}
                    </span>
                  }
                  secondary={conv.other_user_name}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

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
              {messages.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  Мессеж байхгүй байна.
                </Typography>
              ) : (
                messages.map((msg, index) => {
                  const isCurrentUser = msg.sender_id === user.id;
                  const timeAgo = DateTime.fromISO(msg.created_at)
                    .toLocal()
                    .toRelative({ locale: "mn" });

                  const senderName =
                    msg.sender_name || (isCurrentUser ? user.username : selectedConv.other_user_name);

                  return (
                    <Box
                      key={index}
                      sx={{
                        mb: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: isCurrentUser ? "flex-end" : "flex-start",
                      }}
                    >
                      <Box sx={{ textAlign: isCurrentUser ? "right" : "left" }}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: "bold",
                            display: "block",
                            color: isCurrentUser ? "#4CAF50" : "#1976D2",
                          }}
                        >
                          {senderName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "gray",
                            mb: 0.5,
                            fontSize: "0.75rem",
                          }}
                        >
                          {timeAgo}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          px: 1.5,
                          py: 1,
                          backgroundColor: isCurrentUser ? "#d1fce6" : "#e0e7ff",
                          borderRadius: isCurrentUser
                            ? "12px 12px 0 12px"
                            : "12px 12px 12px 0",
                          maxWidth: "70%",
                          wordBreak: "break-word",
                        }}
                      >
                        {msg.message}
                      </Typography>
                    </Box>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </Paper>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Мессеж бичих..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
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
