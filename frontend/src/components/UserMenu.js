import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
  };

  const goToMyProducts = () => {
    navigate("/my-products");
    handleClose();
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        sx={{ textTransform: "none", fontWeight: 500 }}
      >
        Сайн байна уу, {user.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={goToMyProducts}>Миний бүтээгдэхүүнүүд</MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
          Гарах
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
