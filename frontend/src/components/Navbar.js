import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Button color="inherit" component={Link} to="/about">Бидний тухай</Button>  {/* Added About */}
          <Button color="inherit" component={Link} to="/contact">Холбогдох</Button>  {/* Added Contact */}
        </Toolbar>
      </AppBar>

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
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
