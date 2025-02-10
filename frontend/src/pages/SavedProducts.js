// src/pages/SavedProducts.js
import React from "react";
import { Card, CardContent, CardMedia, Button, Typography, Grid } from "@mui/material";

function SavedProducts({ savedProducts, setSavedProducts }) {
  const handleRemove = (id) => {
    const updatedList = savedProducts.filter((product) => product.id !== id);
    setSavedProducts(updatedList);
  };

  return (
    <div style={{ margin: 20 }}>
      <Typography variant="h5" gutterBottom>Saved Products</Typography>
      {savedProducts.length === 0 ? (
        <Typography>No products saved.</Typography>
      ) : (
        <Grid container spacing={3}>
          {savedProducts.map((product) => (
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
          ))}
        </Grid>
      )}
    </div>
  );
}

export default SavedProducts;
