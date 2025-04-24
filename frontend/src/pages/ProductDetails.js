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
  Grid,
  Stack,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SaveIcon from "@mui/icons-material/Save";
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
    if (!user) return alert("Та нэвтэрч орно уу.");
    if (!product?.id || !product?.seller_id) return alert("Барааны мэдээлэл бүрэн биш байна.");

    try {
      await axios.post("http://localhost:5000/api/chat/start", {
        product_id: product.id,
        buyer_id: user.id,
        seller_id: product.seller_id,
      });
      navigate("/chat");
    } catch (error) {
      console.error("Чат эхлүүлэхэд алдаа гарлаа:", error);
      alert("Чат эхлүүлэхэд алдаа гарлаа.");
    }
  };

  const handleSaveClick = async () => {
    if (!user) return alert("Та нэвтэрч орно уу.");
    if (!product?.id) return alert("Барааны мэдээлэл бүрэн биш байна.");

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

  const handleAddToCart = () => {
    if (!user) return alert("Та нэвтэрч орно уу.");
    if (!product?.id) return alert("Барааны мэдээлэл бүрэн биш байна.");
  
    // Create a unique cart key per user
    const cartKey = `cart_${user.id}`;
  
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const alreadyInCart = existingCart.find((item) => item.id === product.id);
  
    if (alreadyInCart) {
      alert("Энэ бараа таны сагсанд аль хэдийн нэмэгдсэн байна.");
      return;
    }
  
    const updatedCart = [...existingCart, product];
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    alert("Бараа сагсанд нэмэгдлээ!");
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
        <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Card elevation={3}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={product.image_url?.trim() || "/no_pic.png"}
              alt={product.title || "Барааны зураг"}
              sx={{
                height: { xs: 250, md: 400 },
                objectFit: "cover",
                backgroundColor: "#f2f2f2",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {product.title || "Нэргүй бараа"}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {product.description || "Тайлбар байхгүй"}
              </Typography>

              <Stack spacing={1} sx={{ mb: 2 }}>
                <Typography variant="h6">
                  💰 Үнэ: <strong>{product.price ? `${product.price}₮` : "Мэдээлэл байхгүй"}</strong>
                </Typography>
                <Typography variant="h6">
                  📍 Байршил: <strong>{product.location || "Мэдээлэл байхгүй"}</strong>
                </Typography>
                <Typography variant="h6">
                  ☎️ Холбоо барих: <strong>{product.contact || "Байхгүй"}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Нийтэлсэн: {product.poster_name || "Тодорхойгүй"}
                </Typography>
              </Stack>

              {user && product?.seller_id !== user.id && (
                <Stack direction="row" spacing={2} mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ChatIcon />}
                  onClick={handleChatClick}
                >
                  Худалдагчтай чатлах
                </Button>
              
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveClick}
                >
                  Хадгалах
                </Button>
              
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleAddToCart}
                >
                  Сагсанд нэмэх
                </Button>
              </Stack>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProductDetails;
