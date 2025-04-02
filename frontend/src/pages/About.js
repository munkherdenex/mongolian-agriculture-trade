import React from "react";
import { Typography, Container, Box } from "@mui/material";

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

      <Box>
        <Typography variant="h5" gutterBottom>
          Яагаад бид?
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              🚜 Фермерүүдэд бүтээгдэхүүнээ хялбар борлуулах боломж
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              🤝 Шударга, найдвартай арилжааны орчин
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              🌍 Хөдөө аж ахуйн салбарын өсөлтийг дэмжих дижитал шийдэл
            </Typography>
          </li>
        </ul>
      </Box>
    </Container>
  );
}

export default About;
