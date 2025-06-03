import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function EditAccount() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData({ name: res.data.name, email: res.data.email });
        setPreviewUrl(res.data.profile_image || "");
      } catch (err) {
        console.error("⚠️ Failed to fetch user info", err);
        setError("Хэрэглэгчийн мэдээллийг ачааллахад алдаа гарлаа.");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/update-profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("Мэдээлэл амжилттай шинэчлэгдлээ. Та дахин нэвтэрнэ үү.");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("❌ Error updating user:", err);
      setError("Шинэчлэхэд алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#f9f9f9" }}>
        <Typography variant="h4" gutterBottom>
          Хувийн мэдээлэл шинэчлэх
        </Typography>

        {previewUrl && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Avatar
              src={previewUrl}
              alt="Profile"
              sx={{ width: 100, height: 100 }}
            />
          </Box>
        )}

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            fullWidth
            label="Нэр"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Имэйл"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "16px" }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#6A994E",
              color: "white",
              "&:hover": {
                backgroundColor: "#588b47",
              },
            }}
          >
            Шинэчлэх
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default EditAccount;
