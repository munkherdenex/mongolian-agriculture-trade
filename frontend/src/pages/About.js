import React from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Divider
} from "@mui/material";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Container sx={{ py: 6 }}>
        {/* Title Section */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Бидний тухай
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
            Монголын хөдөө аж ахуйн худалдааг хөгжүүлэх эрхэм зорилготой платформ
          </Typography>
        </Box>

        <Divider sx={{ my: 6 }} />


        {/* Image and Text Section */}
        <Grid container spacing={4} alignItems="center">
          {/* Left: Image */}
          <Grid item xs={12} md={6}>
  <Box sx={{ textAlign: "center" }}>
    <img
      src="/aboutus.png"
      alt="About us"
      style={{
        width: "100%",
        maxWidth: "400px",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
      }}
    />
  </Box>
</Grid>

          {/* Right: Text */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                🎯 Эрхэм зорилго
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Бид фермерүүд болон худалдан авагчдыг холбож, хөдөө аж ахуйн
                бүтээгдэхүүн худалдаалах илүү хялбар, найдвартай орчин бүрдүүлэхийг
                зорьж байна.
              </Typography>

              <Typography variant="h5" fontWeight={600} gutterBottom>
                🔭 Алсын хараа
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Монголын хөдөө аж ахуйн салбарыг дижиталчлан, зах зээлийн үр ашигтай
                уялдаа холбоог нэмэгдүүлэх нь бидний зорилго юм.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        {/* Why Us Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Яагаад бид?
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth={700} mx="auto">
            Бид фермерүүд болон худалдан авагчдад бодитой үнэ цэнэ, хялбар хэрэглээ,
            өргөн зах зээлийн боломжуудыг санал болгодог.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: "🚜",
              title: "Хялбар борлуулалт",
              description: "Фермерүүдэд бүтээгдэхүүнээ онлайнд байршуулж, борлуулах бүрэн боломж."
            },
            {
              icon: "📈",
              title: "Зах зээлийн өргөтгөл",
              description: "Шинэ харилцагчидтай танилцаж, бизнесээ хөгжүүлэх боломж."
            },
            {
              icon: "🌍",
              title: "Нийгэмд ээлтэй",
              description: "Хөдөө нутгийн фермерүүдийг дэмжсэн нийгмийн сайн талтай шийдэл."
            }
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)"
                  }
                }}
              >
                <Typography variant="h3" mb={1}>
                  {item.icon}
                </Typography>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default About;
