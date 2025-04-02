import React from "react";
import { Typography, Container, Box, TextField, Button } from "@mui/material";

function Contact() {
  return (
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
        <form>
          <TextField
            fullWidth
            label="Таны нэр"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Имэйл хаяг"
            type="email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Санал хүсэлт"
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
          />
          <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
            Илгээх
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Contact;
