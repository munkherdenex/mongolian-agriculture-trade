import React from "react";
import { Container, Typography } from "@mui/material";

function Footer() {
  return (
    <footer style={{ marginTop: "auto", padding: "20px", backgroundColor: "#f1f1f1" }}>
      <Container>
        <Typography variant="body1" align="center">
          © 2025 Mongolian Agricultural Trade. All Rights Reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
