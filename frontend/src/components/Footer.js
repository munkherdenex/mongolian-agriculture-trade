import React from "react";
import { Container, Typography, Box, Grid, Link, Divider } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 4,
        backgroundColor: "#f1f1f1",
        borderTop: "1px solid #ddd",
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
<Grid item xs={12} sm={4}>
  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
    <img
      src="/AgroMongol.png"
      alt="AgroMongol Logo"
      style={{ width: 50, height: 50, marginRight: 10 }}
    />
    <Typography variant="h6" fontWeight={600}>
      AgroMongol
    </Typography>
  </Box>
  <Typography variant="body2" color="textSecondary">
    Хөдөө аж ахуйн бүтээгдэхүүний худалдаа, солилцооны платформ. 
    Хэрэглэгчдийг шууд холбох зорилготой.
  </Typography>
</Grid>


          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" gutterBottom>
              Холбоосууд
            </Typography>
            <Box>
              <Link href="/about" underline="hover" color="textSecondary" display="block">Бидний тухай</Link>
              <Link href="/contact" underline="hover" color="textSecondary" display="block">Холбогдох</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" gutterBottom>
              Холбоо барих
            </Typography>
            <Typography variant="body2" color="textSecondary">
              📞 9119-6159  
              <br />
              ✉️ munkherdenex@gmail.com
              <br />
              🏢 Улаанбаатар, Монгол улс
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} AgroMongol. 
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
