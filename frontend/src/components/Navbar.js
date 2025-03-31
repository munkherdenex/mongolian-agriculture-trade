import React, { useState, useContext } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // ✅ Import AuthContext

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // ✅ Access user & logout function

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Mongolian Agricultural Trade</Typography>

          <Button color="inherit" component={Link} to="/">Нүүр</Button>
          <Button color="inherit" component={Link} to="/products">Бүтээгдэхүүн</Button>
          <Button color="inherit" component={Link} to="/saved-products">Хадгалсан</Button>
          <Button color="inherit" component={Link} to="/about">Бидний тухай</Button> 
          <Button color="inherit" component={Link} to="/contact">Холбогдох</Button>
          <Button color="inherit" component={Link} to="/add-product">Нэмэх</Button> 
 

          {user ? (
            <>
              <Typography variant="body1" style={{ margin: "0 10px" }}>
                Hi, {user.name}
              </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button> 
              <Button color="inherit" component={Link} to="/signup">Sign up</Button> 
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <List>
          <ListItem button component={Link} to="/" onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Нүүр" />
          </ListItem>
          <ListItem button component={Link} to="/products" onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Бүтээгдэхүүн" />
          </ListItem>
          <ListItem button component={Link} to="/saved-products" onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Хадгалсан" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Бидний тухай" />
          </ListItem>
          <ListItem button component={Link} to="/contact" onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Холбогдох" />
          </ListItem>
          {user ? (
            <>
              <ListItem>
                <ListItemText primary={`Hi, ${user.name}`} />
              </ListItem>
              <ListItem button onClick={logout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/login" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={Link} to="/signup" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
