import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

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
      <Box sx={{ display: "flex", alignItems: "center", py: 5, bgcolor: "#e0f7fa", borderRadius: 2, mb: 4 }}>
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

    </Container>
  );
}

export default Home;
