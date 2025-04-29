import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
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
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const cartKey = `cart_${user.id}`;
      const storedCart = localStorage.getItem(cartKey);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, []);

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
        "http://localhost:5000/api/orders/confirm",
        {
          orders: cartItems,
          recipient_name: recipientName,
          phone,
          address,
          quantity,
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
          const messageText = `Таны "${item.name}" бараанд шинэ захиалга ирлээ!\n` +
            `🔗 Холбоос: http://localhost:3000/product/${item.id}`;

          try {
            await axios.post(
              "http://localhost:5000/api/chat/sendMessage",
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
        setQuantity("");
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
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                        <div>{item.price}₮</div>
                      </>
                    }
                  />
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
        <TextField
          label="Захиалах хэмжээ"
          fullWidth
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
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
