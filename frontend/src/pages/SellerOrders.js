import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/my-seller-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Error fetching seller orders:", err);
        setError("Захиалгуудыг дуудахад алдаа гарлаа.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const chartData = Object.values(
    orders.reduce((acc, order) => {
      const title = order.product_title;
      if (!acc[title]) {
        acc[title] = { name: title, quantity: 0 };
      }
      acc[title].quantity += order.quantity || 1;
      return acc;
    }, {})
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Бүтээгдэхүүн дээрх захиалгууд
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : orders.length === 0 ? (
        <Typography>Танд одоогоор захиалга байхгүй байна.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Бүтээгдэхүүн</TableCell>
                  <TableCell>Хүлээн авагч</TableCell>
                  <TableCell>Утас</TableCell>
                  <TableCell>Хаяг</TableCell>
                  <TableCell>Тоо ширхэг</TableCell>
                  <TableCell>Захиалсан огноо</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.product_title}</TableCell>
                    <TableCell>{order.recipient_name}</TableCell>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" sx={{ mt: 5 }}>
            Бүтээгдэхүүн тус бүрийн захиалгын тоо
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="quantity" fill="#4E944F" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </Container>
  );
};

export default SellerOrders;
