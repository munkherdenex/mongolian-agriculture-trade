// src/pages/SavedProducts.js
import React from "react";
import { Typography, Card, CardContent } from "@mui/material";

function SavedProducts({ savedProducts }) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Saved Products
      </Typography>
      {savedProducts.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {savedProducts.map((product, index) => (
            <Card key={index} style={{ margin: 10, width: 200 }}>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">{product.price}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Typography>No saved products yet.</Typography>
      )}
    </div>
  );
}

export default SavedProducts;
