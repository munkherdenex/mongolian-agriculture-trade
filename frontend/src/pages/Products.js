import React, { useState } from "react";
import { Card, CardContent, CardMedia, Button, Typography, Grid, Select, MenuItem, TextField } from "@mui/material";

const productList = [
  { id: 1, name: "Organic Wheat", price: "$15", image: "https://via.placeholder.com/150", category: "Grains" },
  { id: 2, name: "Fresh Apples", price: "$10", image: "https://via.placeholder.com/150", category: "Fruits" },
  { id: 3, name: "Dairy Milk", price: "$8", image: "https://via.placeholder.com/150", category: "Dairy" },
  { id: 4, name: "Potatoes", price: "$5", image: "https://via.placeholder.com/150", category: "Vegetables" },
];

function Products({ handleSave }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredProducts = productList
    .filter((p) => (category === "All" ? true : p.category === category))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ margin: 20 }}>
      <Typography variant="h5" gutterBottom>Browse Products</Typography>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Grains">Grains</MenuItem>
          <MenuItem value="Fruits">Fruits</MenuItem>
          <MenuItem value="Dairy">Dairy</MenuItem>
          <MenuItem value="Vegetables">Vegetables</MenuItem>
        </Select>
        <TextField
          label="Search Products"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Grid container spacing={3}>
        {filteredProducts.length === 0 ? (
          <Typography>No matching products found.</Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia component="img" height="140" image={product.image} alt={product.name} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{product.price}</Typography>
                  <Button variant="contained" color="primary" onClick={() => handleSave(product)} style={{ marginTop: 10 }}>
                    Save
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}

export default Products;
