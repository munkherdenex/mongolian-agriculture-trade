import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, CircularProgress, Box, Alert } from "@mui/material";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            Үнэ: <Typography component="span">{product.price ? `${product.price}₮` : "Мэдээлэл байхгүй"}</Typography>
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Байршил: <Typography component="span">{product.location || "Мэдээлэл байхгүй"}</Typography>
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Холбоо барих: <Typography component="span">{product.contact || "Байхгүй"}</Typography>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Нийтэлсэн: {product.poster_name}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
