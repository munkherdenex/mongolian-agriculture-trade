import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const locations = [
    "Улаанбаатар", "Архангай", "Баян-Өлгий", "Баянхонгор", "Булган", "Говь-Алтай",
    "Говьсүмбэр", "Дархан-Уул", "Дорноговь", "Дорнод", "Дундговь", "Завхан",
    "Орхон", "Өвөрхангай", "Өмнөговь", "Сүхбаатар", "Сэлэнгэ", "Төв", "Увс",
    "Ховд", "Хөвсгөл", "Хэнтий"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (location === "" || product.location === location)
    );
    setFilteredProducts(filtered);
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>Бүтээгдэхүүн</Typography>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <TextField
            label="Хайх"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TextField
            select
            label="Байршил сонгох"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <MenuItem value="">Бүх байршил</MenuItem>
            {locations.map(loc => (
              <MenuItem key={loc} value={loc}>{loc}</MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ backgroundColor: "#6A994E", color: "white", '&:hover': { backgroundColor: "#588b47" } }}
          >
            Хайх
          </Button>
        </div>

        <Grid container spacing={3}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card onClick={() => handleProductClick(product.id)} sx={{ cursor: "pointer" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image_url || "/no_pic.png"}
                    alt={product.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                    <Typography variant="h6" color="primary">₮{product.price}</Typography>
                    <Typography variant="body1"><strong>Байршил:</strong> {product.location || "Байршил байхгүй"}</Typography>
                    <Typography variant="body1">
                      <strong>Холбоо барих:</strong> {product.contact || "Дугаар байхгүй"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Нийтэлсэн: {product.poster_name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
              Бүтээгдэхүүн байхгүй.
            </Typography>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Products;
