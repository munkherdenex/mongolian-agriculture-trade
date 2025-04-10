import React from "react";
import { Typography, Container, Box, Grid, Paper } from "@mui/material";
import "../App.css";

function About() {
  return (
    <Container>
      <Box sx={{ textAlign: "center", py: 4, mb: 3 }}>
        <Typography variant="h3" gutterBottom>
          Бидний тухай
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Монголын хөдөө аж ахуйн худалдааг хөгжүүлэх эрхэм зорилготой
          платформ
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Эрхэм зорилго
        </Typography>
        <Typography variant="body1">
          Бид фермерүүд болон худалдан авагчдыг холбож, хөдөө аж ахуйн
          бүтээгдэхүүн худалдаалах илүү хялбар, найдвартай орчин бүрдүүлэхийг
          зорьж байна.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Алсын хараа
        </Typography>
        <Typography variant="body1">
          Монголын хөдөө аж ахуйн салбарыг дижиталчлан, зах зээлийн үр ашигтай
          уялдаа холбоог нэмэгдүүлэх нь бидний зорилго юм.
        </Typography>
      </Box>

      <Box className="about-section" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>Яагаад бид?</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">🚜 Хялбар борлуулалт</Typography>
              <Typography variant="body2">Фермерүүдэд бүтээгдэхүүнээ онлайнд байршуулж, борлуулах бүрэн боломж.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">📈 Зах зээлийн өргөтгөл</Typography>
              <Typography variant="body2">Шинэ харилцагчидтай танилцаж, бизнесээ хөгжүүлэх боломж.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6">🌍 Нийгэмд ээлтэй</Typography>
              <Typography variant="body2">Бид хөдөө нутгийн фермерүүдийг дэмжсэн нийгмийн сайн талтай шийдэл санал болгодог.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default About;
