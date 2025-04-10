import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
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
      setError("Signup failed. Try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Бүртгүүлэх</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSignup}>
        <TextField label="Нэр" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField label="Имэйл" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Нууц үг" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#6A994E",
            color: "white",
            '&:hover': {
              backgroundColor: "#588b47",
            },
          }}
        >
          Бүртгүүлэх
        </Button>
      </form>
    </Container>
  );
}

export default Signup;
