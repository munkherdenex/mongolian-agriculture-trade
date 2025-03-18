import React, { useState } from "react";
import { Card, CardContent, CardMedia, Button, Typography, Grid, Select, MenuItem, TextField } from "@mui/material";

const productList = [
  { id: 1, name: "Органик улаан буудай", price: "5,000 MNT", image: "https://via.placeholder.com/150", category: "Grains" },
  { id: 2, name: "Шинэ алим", price: "6,000 MNT", image: "https://via.placeholder.com/150", category: "Fruits" },
  { id: 3, name: "Сүү", price: "4,500 MNT", image: "https://via.placeholder.com/150", category: "Dairy" },
  { id: 4, name: "Төмс", price: "2,000 MNT", image: "https://via.placeholder.com/150", category: "Vegetables" },
];

function Products({ handleSave }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredProducts = productList
    .filter((p) => (category === "All" ? true : p.category === category))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ margin: 20 }}>
      <Typography variant="h5" gutterBottom>Бүтээгдэхүүн үзэх</Typography>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="All">Бүх ангилал</MenuItem>
          <MenuItem value="Grains">Үр тариа</MenuItem>
          <MenuItem value="Fruits">Жимс</MenuItem>
          <MenuItem value="Dairy">Сүүн бүтээгдэхүүн</MenuItem>
          <MenuItem value="Vegetables">Хүнсний ногоо</MenuItem>
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
          <Typography>Тохирох бүтээгдэхүүн олдсонгүй.</Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia component="img" height="140" image={product.image} alt={product.name} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{product.price}</Typography>
                  <Button variant="contained" color="primary" onClick={() => handleSave(product)} style={{ marginTop: 10 }}>
                  Хадгалах
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
