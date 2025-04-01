import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";

function SavedProducts() {
  const [savedProducts, setSavedProducts] = useState([]);

  // Fetch saved products from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/saved-products")
      .then((response) => setSavedProducts(response.data))
      .catch((error) => console.error("Error fetching saved products:", error));
  }, []);

  // Function to remove a saved product
  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/saved-products/3/${productId}`); // User ID in URL
  
      // Update UI
      setSavedProducts(savedProducts.filter((product) => product.product_id !== productId));
      alert("Saved product removed!");
    } catch (error) {
      console.error("Error removing saved product:", error);
    }
  };
  
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Saved Products
      </Typography>
      <Grid container spacing={3}>
        {savedProducts.length === 0 ? (
          <Typography>No saved products yet.</Typography>
        ) : (
          savedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography>{product.description}</Typography>
                  <Typography variant="h6">${product.price}</Typography>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleRemove(product.id)} // Remove button
                  >
                    Remove
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
