// src/pages/SavedItems.js
import React from "react";
import { Typography } from "@mui/material";

function SavedItems({ savedProducts }) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Saved Products
      </Typography>
      {savedProducts.length > 0 ? (
        <div>
          {savedProducts.map((product, index) => (
            <Typography key={index}>{product.name}</Typography>
          ))}
        </div>
      ) : (
        <Typography>No saved products yet.</Typography>
      )}
    </div>
  );
}

export default SavedItems;
