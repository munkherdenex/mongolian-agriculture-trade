import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, CardMedia } from "@mui/material";
import axios from "axios";
import "../App.css"; 

function SavedProducts() {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    const fetchSavedProducts = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // 👈 Get current user
      if (!user) return;
  
      try {
        const response = await axios.get(`http://localhost:5000/api/saved-products/${user.id}`);
        setSavedProducts(response.data);
      } catch (error) {
        console.error("Error fetching saved products:", error);
      }
    };
  
    fetchSavedProducts();
  }, []);
  

  const handleRemove = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/saved-products/${user.id}/${productId}`);
      setSavedProducts(savedProducts.filter((product) => product.id !== productId));
      alert("Хадгалсан бүтээгдэхүүнийг устгасан");
    } catch (error) {
      console.error("Error removing saved product:", error);
    }
  };
  

  return (
    <Container className="saved-products-container">
      <Typography variant="h4" gutterBottom>
      Хадгалсан бүтээгдэхүүн
      </Typography>
      <Grid container spacing={3}>
        {savedProducts.length === 0 ? (
          <Typography style={{ marginTop: "30px" }}>Одоогоор хадгалсан бүтээгдэхүүн алга.</Typography>
        ) : (
          savedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card className="saved-products-card">
                <CardMedia
                  component="img"
                  image={product.image_url || "/no_pic.png"}
                  alt={product.title}
                  className="saved-products-card img"
                />
                <CardContent className="saved-products-content">
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography color="textSecondary">{product.description}</Typography>
                  <Typography variant="h6">${product.price}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Нийтэлсэн: {product.poster_name}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleRemove(product.id)} 
                    className="remove-button"
                  >
                    Устгах
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default SavedProducts;
