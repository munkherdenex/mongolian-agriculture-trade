import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

function UserMenu({ user, menuItems }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        onClick={handleMenuOpen}
      >
        <AccountCircle />
        <Typography sx={{ ml: 1, fontWeight: 500 }}>
          Сайн байна уу, {user.name}
        </Typography>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {menuItems.map((item) => (
         <MenuItem
           key={item.text}
           component={item.link ? Link : "button"}
           to={item.link}
           onClick={() => {
             handleMenuClose();
             item.onClick && item.onClick();
           }}
           sx={{
             ...(item.danger
               ? {
                   color: "error.main",
                   fontWeight: 600,
                   "&:hover": {
                     backgroundColor: "rgba(244, 67, 54, 0.08)", 
                   },
                 }
               : {})
           }}
         >
           {item.text}
         </MenuItem>
       ))}

      </Menu>
    </>
  );
}

export default UserMenu;
