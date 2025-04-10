import React from "react";
import { Container, Typography, Box } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        backgroundColor: "#f1f1f1",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Container>
        <Typography variant="body2" color="textSecondary">
          © 2025 AgroMongol
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
