import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("🛡 Token being sent:", token);

      const response = await axios.get("http://localhost:5000/api/my-products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching your products:", err);
      setError("Таны бүтээгдэхүүнийг дуудахад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Та энэ бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted product from state
      setProducts(products.filter(p => p.id !== productId));
      alert("Бүтээгдэхүүн амжилттай устгагдлаа!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Устгал амжилтгүй боллоо. Та дахин оролдоно уу.");
    }
  };

  if (loading) {
    return (
      <Container style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ textAlign: "center", marginTop: "20px" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Миний бүтээгдэхүүнүүд
      </Typography>

      {products.length === 0 ? (
        <Typography>Та бүтээгдэхүүн оруулаагүй байна.</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                {product.image_url ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image_url}
                    alt={product.title}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    image="/no_pic.png"
                    alt={product.title}
                    style={{ objectFit: "cover" }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="h6" color="primary">₮{product.price}</Typography>
                  <Typography variant="body1"><strong>Байршил:</strong> {product.location}</Typography>
                  <Typography variant="body1"><strong>Холбоо барих:</strong> {product.contact || "Байхгүй"}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Нийтэлсэн огноо: {new Date(product.created_at).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(product.id)}
                    sx={{ mt: 1 }}
                  >
                    Устгах
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyProducts;
