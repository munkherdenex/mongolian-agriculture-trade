import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Box,
  Divider,
  Avatar,
} from "@mui/material";

function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (err) {
        console.error("⚠️ Failed to fetch user info", err);
      }
    };

    fetchUserInfo();
  }, []);

  if (!user) return <p>Түр хүлээнэ үү...</p>;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 3, bgcolor: "#fdfdfd" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <Avatar
            alt={user.name}
            src={user.profile_image_url || ""}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h4" fontWeight="bold" color="primary">
            Тавтай морилно уу, {user.name}!
          </Typography>
          <Typography variant="subtitle1">
            Таны үндсэн мэдээллүүд
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          📋 Хэрэглэгчийн мэдээлэл:
        </Typography>
        <Typography variant="body1"><strong>Нэр:</strong> {user.name}</Typography>
        <Typography variant="body1"><strong>И-мэйл:</strong> {user.email}</Typography>
        <Typography variant="body1"><strong>Бүртгүүлсэн огноо:</strong> {new Date(user.created_at).toLocaleDateString()}</Typography>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            onClick={() => navigate("/account/edit")}
            sx={{
              backgroundColor: "#4E944F",
              color: "white",
              "&:hover": { backgroundColor: "#3a783f" }
            }}
            fullWidth
          >
            Хувийн мэдээлэл шинэчлэх
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/my-products")}
            sx={{
              backgroundColor: "#4E944F",
              color: "white",
              "&:hover": { backgroundColor: "#3a783f" }
            }}
            fullWidth
          >
            Миний бүтээгдэхүүнүүд
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/seller-orders")}
            sx={{
              backgroundColor: "#4E944F",
              color: "white",
              "&:hover": { backgroundColor: "#3a783f" }
            }}
            fullWidth
          >
            Миний захиалгууд
          </Button>

        </Box>
      </Box>
    </Container>
  );
}

export default Account;
