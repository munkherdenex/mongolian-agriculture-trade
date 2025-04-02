import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, CircularProgress } from "@mui/material";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Container><CircularProgress /></Container>;
  }

  if (error) {
    return <Container><Typography color="error">{error}</Typography></Container>;
  }

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={product.image_url || "/placeholder.jpg"} // Product image fallback
          alt={product.title || "Product Image"}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{product.title}</Typography>
          <Typography paragraph>{product.description}</Typography>
          <Typography variant="h6">Үнэ: {product.price}₮</Typography>
          <Typography variant="h6">Байршил: {product.location}</Typography>
          <Typography variant="h6">Холбоо барих: {product.contact || "Байхгүй"}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetails;