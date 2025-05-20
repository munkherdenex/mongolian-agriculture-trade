import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Box,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const cartKey = `cart_${user.id}`;
      const storedCart = localStorage.getItem(cartKey);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        const cartWithQuantities = parsedCart.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCartItems(cartWithQuantities);
      }
    }
  }, []);

  const updateQuantity = (id, newQty) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(newQty) || 1 } : item
    );
    setCartItems(updated);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const cartKey = `cart_${user.id}`;
      localStorage.setItem(cartKey, JSON.stringify(updated));
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const cartKey = `cart_${user.id}`;
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    }
  };

  const handleConfirmOrder = async () => {
    if (!recipientName.trim() || !phone.trim() || !address.trim()) {
      setMessage("Бүх талбарыг бөглөнө үү.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const orderResponse = await axios.post(
        "https://agromongol-backend.onrender.com/api/orders/confirm",
        {
          orders: cartItems,
          recipient_name: recipientName,
          phone,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (orderResponse.status === 200) {
        for (const item of cartItems) {
          const messageText = `Таны "${item.title}" бараанд шинэ захиалга ирлээ!\n` +
            `🔗 Холбоос: http://localhost:3000/product/${item.id}`;

          try {
            await axios.post(
              "https://agromongol-backend.onrender.com/api/chat/sendMessage",
              {
                productId: item.id,
                recipientId: item.seller_id,
                message: messageText,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
          } catch (err) {
            console.error(`Failed to send message to seller for product ${item.id}`, err);
          }
        }

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const cartKey = `cart_${user.id}`;
          localStorage.removeItem(cartKey);
        }

        setMessage("✅ Захиалга амжилттай илгээгдлээ!");
        setCartItems([]);
        setRecipientName("");
        setPhone("");
        setAddress("");
      }
    } catch (err) {
      console.error("❌ Order confirmation failed:", err);
      setMessage("Алдаа гарлаа. Дахин оролдоно уу.");
    }

    setIsSubmitting(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 3, fontWeight: "bold" }}>
        Миний сагс
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1">Сагс хоосон байна.</Typography>
      ) : (
        <Paper variant="outlined" sx={{ mb: 3 }}>
          <List>
            {cartItems.map((item) => (
              <div key={item.id}>
                <ListItem alignItems="center" sx={{ gap: 2 }}>
                  <img
                    src={item.image_url || "/placeholder.png"}
                    alt={item.title || "Бараа"}
                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.title || "Барааны нэр байхгүй"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Үнэ: {item.price ? `${item.price}₮` : "Үнэ тодорхойгүй"}
                    </Typography>
                    <TextField
                      type="number"
                      label="Тоо ширхэг"
                      size="small"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      sx={{ mt: 1, width: 120 }}
                      inputProps={{ min: 1 }}
                    />
                  </Box>

                  <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Paper>
      )}

      <Box component="form" noValidate autoComplete="off">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Захиалгын мэдээлэл
        </Typography>

        <TextField
          label="Хүлээн авагчийн нэр"
          fullWidth
          variant="outlined"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Утасны дугаар"
          fullWidth
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Хүргүүлэх хаяг"
          fullWidth
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#6A994E", '&:hover': { backgroundColor: "#588b47" } }}
          onClick={handleConfirmOrder}
          disabled={isSubmitting || cartItems.length === 0}
        >
          {isSubmitting ? "Илгээж байна..." : "Захиалгыг баталгаажуулах"}
        </Button>

        {message && (
          <Alert
            severity={message.includes("✅") ? "success" : "error"}
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default Cart;
