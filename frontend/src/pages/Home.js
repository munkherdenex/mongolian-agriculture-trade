import React from "react";
import { Typography, Container } from "@mui/material";

function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1">
      Энд бид Монголын хөдөө аж ахуйн худалдааг харуулах болно.
      </Typography>
    </Container>
  );
}

export default Home;
