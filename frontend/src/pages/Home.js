import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import Footer from "../components/Footer";

function Home() {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          py: 8,
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Монголын Хөдөө Аж Ахуй Худалдааны Платформ
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Хөдөө аж ахуйн бүтээгдэхүүнээ сурталчилж, худалдан авагчтай холбогдох
          боломжтой үнэгүй платформ.
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#6A994E",
            color: "white",
            mt: 2,
            '&:hover': {
              backgroundColor: "#588b47",
            },
          }}
        >
          Бүтээгдэхүүнүүдийг үзэх
        </Button>
      </Box>

      {/* About Section */}
      <Box sx={{ px: { xs: 2, md: 10 }, py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Бидний тухай
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Бид Монголын хөдөө аж ахуйн худалдааг хялбарчилж, фермерүүд болон
              худалдан авагчдыг шууд холбох зорилготой. Манай платформ дээр та
              бүтээгдэхүүнээ бүртгүүлж, сонирхсон худалдан авагчидтай харилцаж
              чадна.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="/agriculture.png"
              alt="Signup"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: "#f9f9f9", py: 6, px: { xs: 2, md: 10 } }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Давуу талууд
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4} textAlign="center">
            <LocalGroceryStoreIcon sx={{ fontSize: 60, color: "#6A994E" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Шинэ, чанартай бүтээгдэхүүн
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Үйлдвэрлэгчээс хэрэглэгч рүү шууд хүргэнэ.
            </Typography>
          </Grid>
      
          <Grid item xs={12} md={4} textAlign="center">
            <ChatBubbleOutlineIcon sx={{ fontSize: 60, color: "#6A994E" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Шууд харилцаа
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Худалдан авагчтай шууд холбогдож, илүү итгэлтэй худалдаа хийнэ.
            </Typography>
          </Grid>
      
          <Grid item xs={12} md={4} textAlign="center">
            <MoneyOffIcon sx={{ fontSize: 60, color: "#6A994E" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Дундын зуучлагчгүй
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Зуучлалын шимтгэлгүй, ашгаа бүрэн хүртэх боломж.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ px: { xs: 2, md: 10 }, py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Хөдөө аж ахуйн бизнесээ хялбархан хөгжүүлээрэй
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
              Манай платформд үнэ төлбөргүй нэгдэж, бүтээгдэхүүнээ байршуулж,
              зах зээлийн хүрээгээ хялбархан өргөжүүлээрэй.
            </Typography>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              sx={{
                backgroundColor: "#6A994E",
                color: "white",
                '&:hover': { backgroundColor: "#588b47" },
              }}
              size="large"
            >
              Бүртгүүлэх
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="/abt_us.png"
              alt="Aboutus"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* How It Works */}
      <Box sx={{ bgcolor: "#f9f9f9", py: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Хэрхэн ажилладаг вэ?
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="textSecondary"
          sx={{ mb: 6 }}
        >
          Та гурван хялбар алхмаар бүтээгдэхүүнээ борлуулах боломжтой.
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ px: { xs: 2, md: 10 } }}
        >
          <Grid item xs={12} md={4} textAlign="center">
            <HowToRegIcon sx={{ fontSize: 60, color: "#6A994E" }} />
            <Typography variant="h6">1. Бүртгүүлэх</Typography>
            <Typography variant="body2">
              Ферм эсвэл компанийн мэдээллээ оруулна.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} textAlign="center">
            <AddShoppingCartIcon sx={{ fontSize: 60, color: "#6A994E" }} />
            <Typography variant="h6">2. Бүтээгдэхүүн нэмэх</Typography>
            <Typography variant="body2">
              Зураг, үнэ, тайлбартайгаар нэмнэ.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} textAlign="center">
            <ConnectWithoutContactIcon sx={{ fontSize: 60, color: "#6A994E" }} />
            <Typography variant="h6">3. Худалдан авагчтай холбогдох</Typography>
            <Typography variant="body2">
              Хэрэглэгч таныг сонирхож холбогдоно.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}

export default Home;
