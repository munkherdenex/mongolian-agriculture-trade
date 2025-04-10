import React, { useState } from "react";
import { Typography, Container, Box, TextField, Button, Alert } from "@mui/material";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [response, setResponse] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setResponse({ success: true, message: res.data.message });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setResponse({ success: false, message: "Алдаа гарлаа. Дахин оролдоно уу." });
    }
  };

  return (
    <>
      <Container>
        <Box sx={{ textAlign: "center", py: 4, mb: 3 }}>
          <Typography variant="h3" gutterBottom>
            Бидэнтэй холбогдох
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Санал хүсэлтээ илгээх эсвэл шууд холбогдоорой
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Холбоо барих мэдээлэл
          </Typography>
          <Typography variant="body1">📞 Утас: +976 9119-6159</Typography>
          <Typography variant="body1">📧 Имэйл: munkherdenex@gmail.com</Typography>
          <Typography variant="body1">📍 Хаяг: Улаанбаатар, Монгол</Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Санал хүсэлт илгээх
          </Typography>
          {response.message && (
            <Alert severity={response.success ? "success" : "error"} sx={{ mb: 2 }}>
              {response.message}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Таны нэр"
              variant="outlined"
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Имэйл хаяг"
              type="email"
              variant="outlined"
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Санал хүсэлт"
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                backgroundColor: "#6A994E",
                color: "white",
                '&:hover': {
                  backgroundColor: "#588b47",
                },
              }}
            >
              Илгээх
            </Button>
          </form>
        </Box>
      </Container>

    </>
  );
}

export default Contact;
