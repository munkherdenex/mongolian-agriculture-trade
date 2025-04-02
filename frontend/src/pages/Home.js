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
        <Button variant="contained" color="primary" size="large" component={Link} to="/products">
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
    </Container>
  );
}

export default Home;
