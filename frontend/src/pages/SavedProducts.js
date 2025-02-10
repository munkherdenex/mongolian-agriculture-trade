// src/pages/SavedProducts.js
import React from "react";
import { Card, CardContent, CardMedia, Button, Typography, Grid } from "@mui/material";

function SavedProducts({ savedProducts, setSavedProducts }) {
  const handleRemove = (id) => {
    setSavedProducts(savedProducts.filter((product) => product.id !== id));
  };

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      {savedProducts.length === 0 ? (
        <Typography variant="h6" style={{ margin: "20px auto" }}>No saved products yet.</Typography>
      ) : (
        savedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia component="img" height="140" image={product.image} alt={product.name} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">{product.price}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemove(product.id)}
                  style={{ marginTop: 10 }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default SavedProducts;
