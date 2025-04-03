import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, CardMedia, CircularProgress, Alert, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const locations = [
    "Улаанбаатар", "Архангай", "Баян-Өлгий", "Баянхонгор", "Булган", "Говь-Алтай", "Говьсүмбэр", "Дархан-Уул", "Дорноговь", "Дорнод", "Дундговь", "Завхан", "Орхон", "Өвөрхангай", "Өмнөговь", "Сүхбаатар", "Сэлэнгэ", "Төв", "Увс", "Ховд", "Хөвсгөл", "Хэнтий"
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
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

  const handleSave = async (productId, e) => {
    e.stopPropagation();
    try {
      await axios.post("http://localhost:5000/api/saved-products", { user_id: 3, product_id: productId });
      alert("Бүтээгдэхүүнийг амжилттай хадгаллаа!");
    } catch (error) {
      console.error("Error saving product:", error);
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
      <Typography variant="h4" gutterBottom>
        Бүтээгдэхүүн
      </Typography>

      {/* Search & Filter Section */}
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
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>{loc}</MenuItem>
          ))}
        </TextField>

        <Button variant="contained" color="primary" onClick={handleSearch}>
          Хайх
        </Button>
      </div>

      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card onClick={() => handleProductClick(product.id)} style={{ cursor: "pointer" }}>
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
                  <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                  <Typography variant="h6" color="primary">₮{product.price}</Typography>
                  <Typography variant="body1"><strong>Байршил:</strong> {product.location || "Байршил байхгүй"}</Typography>
                  {product.contact ? (
                    <Typography variant="body1"><strong>Холбоо барих:</strong> {product.contact}</Typography>
                  ) : (
                    <Typography variant="body2" color="textSecondary">Холбоо барих дугаар байхгүй</Typography>
                  )}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={(e) => handleSave(product.id, e)}
                    style={{ marginTop: "10px" }}
                  >
                    Хадгалах
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" style={{ textAlign: "center", width: "100%" }}>
            Бүтээгдэхүүн байхгүй.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Products;
