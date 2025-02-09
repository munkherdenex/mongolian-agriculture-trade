import React from "react";
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button } from "@mui/material";

function Products() {
  const products = [
    {
      id: 1,
      name: "Fresh Mongolian Wheat",
      price: "₮15,000",
      description: "High-quality organic wheat grown in Mongolia.",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 2,
      name: "Mongolian Barley",
      price: "₮12,000",
      description: "Premium barley for your farming needs.",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 3,
      name: "Mongolian Oats",
      price: "₮10,000",
      description: "Nutrient-rich oats, perfect for livestock feed.",
      image: "https://via.placeholder.com/200"
    }
  ];

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product.image}
                title={product.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {product.description}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  {product.price}
                </Typography>
                <Button variant="contained" color="primary">
                  Buy Now
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
