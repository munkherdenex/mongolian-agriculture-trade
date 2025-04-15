import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/products");
    } catch (error) {
      setError("Бүртгүүлэхэд алдаа гарлаа. Дахин оролдоно уу.");
      console.error("Signup error:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Бүртгүүлэх
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSignup}>
          <TextField
            label="Нэр"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
          <TextField
            label="Имэйл"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            helperText="Жишээ: example@mail.com"
          />
          <TextField
            label="Нууц үг"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            helperText="Хамгийн багадаа 6 тэмдэгт"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#6A994E",
              color: "white",
              mt: 3,
              py: 1.2,
              fontSize: "1rem",
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: "#588b47",
                transform: "scale(1.01)",
                transition: "0.3s",
              },
            }}
          >
            Бүртгүүлэх
          </Button>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Аль хэдийн бүртгэлтэй юу?
          </Typography>
          <Button
            variant="text"
            onClick={() => navigate("/login")}
            sx={{ color: "#6A994E", fontWeight: "bold" }}
          >
            Нэвтрэх
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
