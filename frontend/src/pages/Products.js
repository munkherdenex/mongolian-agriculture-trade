import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Function to save a product
  const handleSave = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/saved-products", { user_id: 3, product_id: productId });
      alert("Product saved successfully!");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography>{product.description}</Typography>
                <Typography variant="h6">${product.price}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleSave(product.id)} // Attach save function
                >
                  Save
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Products;
