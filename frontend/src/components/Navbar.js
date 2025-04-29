import React, { useState, useContext } from "react"; 
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserMenu from "./UserMenu";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = [
    { text: "Нүүр", link: "/" },
    { text: "Бидний тухай", link: "/about" },
    { text: "Холбогдох", link: "/contact" },
    { text: "Бүтээгдэхүүн", link: "/products" },
    { text: "Чат", link: "/chat" }
  ];

  const userMenuItems = user ? [
    { text: "💾 Хадгалсан", link: "/saved-products" },
    { text: "📦 Миний бүтээгдэхүүн", link: "/my-products" },
    { text: "➕ Нэмэх", link: "/add-product" },
    { text: "🛒 Сагс", link: "/cart" },
    { text: "Гарах", onClick: logout, danger: true }
  ] : [];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#4E944F" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: 72 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setMobileOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <img
              src="/AgroMongol.png"
              alt="AgroMongol Logo"
              style={{ width: 55, height: 55, marginRight: 12 }}
            />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "white", fontWeight: 600 }}
            >
              AgroMongol
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  to={item.link}
                  sx={{ fontWeight: 500 }}
                >
                  {item.text}
                </Button>
              ))}
              {user ? (
                <UserMenu user={user} menuItems={userMenuItems} />
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">Нэвтрэх</Button>
                  <Button color="inherit" component={Link} to="/signup">Бүртгүүлэх</Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setMobileOpen(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem button component={Link} to={item.link} key={item.text}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            {user ? (
              userMenuItems.map((item) => (
                <ListItem
                  button
                  component={item.link ? Link : "div"}
                  to={item.link || undefined}
                  key={item.text}
                  onClick={item.onClick}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
              ))
            ) : (
              <>
                <ListItem button component={Link} to="/login">
                  <ListItemText primary="Нэвтрэх" />
                </ListItem>
                <ListItem button component={Link} to="/signup">
                  <ListItemText primary="Бүртгүүлэх" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
