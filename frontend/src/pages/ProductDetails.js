import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  Alert,
  Button,
} from "@mui/material";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        console.log("Product fetched:", response.data);
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Барааны мэдээллийг ачааллахад алдаа гарлаа.");
        setLoading(false);
      });
  }, [id]);

  const handleChatClick = async () => {
    if (!user) {
      alert("Та нэвтэрч орно уу.");
      return;
    }
  
    if (!product?.id || !product?.seller_id) {
      alert("Барааны мэдээлэл бүрэн биш байна.");
      return;
    }
  
    try {
      // Step 1: Start a chat by sending a POST request
      const res = await axios.post("http://localhost:5000/api/chat/start", {
        product_id: product.id,
        buyer_id: user.id,
        seller_id: product.seller_id,
      });
  
      console.log("Chat started or already exists:", res.data);
  
      // Step 2: Navigate to chat page (general or specific route as needed)
      navigate("/chat");
    } catch (error) {
      console.error("Чат эхлүүлэхэд алдаа гарлаа:", error);
      alert("Чат эхлүүлэхэд алдаа гарлаа.");
    }
  };

  const handleSaveClick = async () => {
    if (!user) {
      alert("Та нэвтэрч орно уу.");
      return;
    }
  
    if (!product?.id) {
      alert("Барааны мэдээлэл бүрэн биш байна.");
      return;
    }
  
    try {
      await axios.post("http://localhost:5000/api/saved-products", {
        user_id: user.id,
        product_id: product.id,
      });
  
      alert("Бараа амжилттай хадгалагдлаа.");
    } catch (error) {
      console.error("Хадгалах үед алдаа гарлаа:", error);
      alert("Бараа хадгалах үед алдаа гарлаа.");
    }
  };
  

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={product.image_url?.trim() || "/no_pic.png"}
          alt={product.title || "Барааны зураг"}
          sx={{ objectFit: "cover", backgroundColor: "#f5f5f5" }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {product.title || "Нэргүй бараа"}
          </Typography>
          <Typography paragraph color="text.secondary">
            {product.description || "Тайлбар байхгүй"}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Үнэ:{" "}
            <Typography component="span">
              {product.price ? `${product.price}₮` : "Мэдээлэл байхгүй"}
            </Typography>
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Байршил:{" "}
            <Typography component="span">
              {product.location || "Мэдээлэл байхгүй"}
            </Typography>
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Холбоо барих:{" "}
            <Typography component="span">
              {product.contact || "Байхгүй"}
            </Typography>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Нийтэлсэн: {product.poster_name || "Тодорхойгүй"}
          </Typography>

          {/* 💬 Chat with Seller Button */}
          {user && product?.seller_id !== user.id && (
            <Box mt={2}>
              <Button variant="outlined" color="primary" onClick={handleChatClick}>
                💬 Худалдагчтай чатлах
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleSaveClick}>
                💾 Хадгалах
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
