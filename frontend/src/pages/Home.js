import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Footer from "../components/Footer"; 


function Home() {
  return (
    <Container>
      <Box
        sx={{
          textAlign: "center",
          py: 5,
          bgcolor: "#f5f5f5",
          borderRadius: 2,
          mb: 4,
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
          variant="contained"
          sx={{
            backgroundColor: "#6A994E", // Custom button color
            color: "white", // Text color
            '&:hover': {
              backgroundColor: "#588b47", // Darker shade on hover
            },
          }}
          size="large"
          component={Link}
          to="/products"
        >
          Бүтээгдэхүүнүүдийг үзэх
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Бидний тухай
        </Typography>
        <Typography variant="body1">
          Бид Монголын хөдөө аж ахуйн худалдааг хялбарчилж, фермерүүд болон
          худалдан авагчдыг шууд холбох зорилготой. Манай платформ дээр та
          бүтээгдэхүүнээ бүртгүүлж, сонирхсон худалдан авагчидтай харилцаж
          чадна.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Давуу талууд
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              🌿 Шинэ, чанартай хөдөө аж ахуйн бүтээгдэхүүн
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              🤝 Худалдан авагч, борлуулагчдын шууд холболт
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              💰 Дундын зуучлагчгүй, хэмнэлттэй худалдаа
            </Typography>
          </li>
        </ul>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", py: 5, bgcolor: "#f9f9f9", borderRadius: 2, mb: 4 }}>
  <Container sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h4" gutterBottom>
      Хөдөө аж ахуйн бизнесээ хялбархан хөгжүүлээрэй
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
      Манай платформд үнэ төлбөргүй нэгдэж, бүтээгдэхүүнээ байршуулж, худалдан авагчидтай холбогдож, зах зээлийн хүрээгээ хялбархан өргөжүүлээрэй.
      </Typography>
      <Button
      component={Link} to="/signup"
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
    </Box>
    <Box sx={{ flex: 1 }}>
      <img src="/agriculture.png" alt="Agriculture" style={{ width: "100%", borderRadius: "8px" }} />
    </Box>
  </Container>
</Box>
<Box sx={{ py: 6, textAlign: "center", bgcolor: "#f9f9f9", borderRadius: 2 }}>
  <Typography variant="h4" gutterBottom>Хэрхэн ажилладаг вэ?</Typography>
  <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
    Та гурван хялбар алхмаар бүтээгдэхүүнээ борлуулах боломжтой.
  </Typography>

  <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-around", gap: 4, px: 2 }}>
    <Box sx={{ flex: 1, maxWidth: 300, mx: "auto" }}>
      <HowToRegIcon sx={{ fontSize: 60, color: "#6A994E" }} />
      <Typography variant="h6" gutterBottom>1. Бүртгүүлэх</Typography>
      <Typography variant="body2">Хялбар бүртгэл хийж, өөрийн ферм эсвэл компанийн мэдээллийг оруулна.</Typography>
    </Box>

    <Box sx={{ flex: 1, maxWidth: 300, mx: "auto" }}>
      <AddShoppingCartIcon sx={{ fontSize: 60, color: "#6A994E" }} />
      <Typography variant="h6" gutterBottom>2. Бүтээгдэхүүн нэмэх</Typography>
      <Typography variant="body2">Борлуулах бүтээгдэхүүнээ зураг, үнэ, тайлбартайгаар нэмнэ.</Typography>
    </Box>

    <Box sx={{ flex: 1, maxWidth: 300, mx: "auto" }}>
      <ConnectWithoutContactIcon sx={{ fontSize: 60, color: "#6A994E" }} />
      <Typography variant="h6" gutterBottom>3. Худалдан авагчтай холбогдох</Typography>
      <Typography variant="body2">Худалдан авагч таны бүтээгдэхүүнийг сонирхож, шууд холбогдоно.</Typography>
    </Box>
  </Box>
</Box>

<Footer />
    </Container>
    
  );
}

export default Home;
