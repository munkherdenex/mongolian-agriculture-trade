import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    unit: "",
    location: "",
    contact: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const formattedPrice = parseFloat(formData.price);
    const user = JSON.parse(localStorage.getItem("user"));

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, key === "price" ? formattedPrice : formData[key]);
    });
    if (image) data.append("image", image);

    if (user && user.id) {
      data.append("user_id", user.id);
    } else {
      alert("Нэвтэрсэн хэрэглэгч олдсонгүй. Та дахин нэвтэрнэ үү.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Product added:", response.data);
      alert("Бараа амжилттай нэмэгдлээ!");
      setFormData({ title: "", description: "", price: "", quantity: "", unit: "", contact: "", location: "" });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Алдаа гарлаа. Та дахин оролдоно уу!");
    } finally {
      setLoading(false); 
    }
  };

  const locations = [
    "Улаанбаатар", "Архангай", "Баян-Өлгий", "Баянхонгор", "Булган", "Говь-Алтай", "Говьсүмбэр", "Дархан-Уул",
    "Дорноговь", "Дорнод", "Дундговь", "Завхан", "Орхон", "Өвөрхангай", "Өмнөговь", "Сүхбаатар", "Сэлэнгэ",
    "Төв", "Увс", "Ховд", "Хөвсгөл", "Хэнтий"
  ];

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Бараа нэмэх
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Барааны нэр"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Тайлбар"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="Үнэ"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            fullWidth
            label="Тоо хэмжээ"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Нэгж"
            name="unit"
            value={formData.unit || ''}
            onChange={handleChange}
            required
            margin="normal"
          >
            <MenuItem value="" disabled>
              Сонгох
            </MenuItem>
            <MenuItem value="kg">Кг</MenuItem>
            <MenuItem value="gr">Гр</MenuItem>
            <MenuItem value="l">Литр</MenuItem>
            <MenuItem value="piece">Ширхэг</MenuItem>
          </TextField>
        </Box>

        <TextField
          fullWidth
          label="Холбоо барих"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          select
          fullWidth
          label="Байршил"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          margin="normal"
        >
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#6A994E",
            color: "white",
            '&:hover': { backgroundColor: "#588b47" },
          }}
        >
          Зураг оруулах
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>

        {preview && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body1">Сонгосон зураг:</Typography>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: 200,
                objectFit: "cover",
                marginTop: 8,
                borderRadius: 8,
              }}
            />
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading} 
          sx={{
            mt: 2,
            backgroundColor: "#6A994E",
            color: "white",
            '&:hover': { backgroundColor: "#588b47" },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Нэмэх"
          )}
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
