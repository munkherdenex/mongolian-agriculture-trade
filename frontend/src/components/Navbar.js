// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link to="/products" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit">Products</Button>
        </Link>
        <Link to="/about" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit">About</Button>
        </Link>
        <Link to="/contact" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit">Contact</Button>
        </Link>
        <Link to="/saved-products" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit">Saved Products</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
