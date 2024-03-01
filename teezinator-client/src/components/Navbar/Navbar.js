import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/"; // For responsive menu icon

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          // onClick={handleMenu} // Uncomment and implement if adding a responsive menu
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            <img
              src="images/TeezinatorLogo.png"
              alt="Logo"
              style={{
                height: "40px",
                marginRight: "10px",
                verticalAlign: "middle",
              }}
            />
            Teezinator 🍵
          </a>
        </Typography>
        <Button color="inherit" href="#stats">
          Stats
        </Button>
        <Button color="inherit" href="#favorites">
          Favorites
        </Button>
        <Button color="inherit" href="#history">
          History
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
