import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  LinearProgress,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  IconButton,
  Button,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Teezinator
        </a>
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} onClick={() => nav("/")}>
            <ListItemText primary="Feed" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => nav("/addTea")}
          >
            <ListItemText primary="Add Tea" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => nav("/stats")}
          >
            <ListItemText primary="Stats" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => nav("/leaderboard")}
          >
            <ListItemText primary="Leaderboard" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" id="navbar">
        <Toolbar disableGutters className="toolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="menuButton"
          >
            <Menu style={{ fontSize: "inherit" }} />
          </IconButton>
          <Box className="logoBox">
            <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
              <img src="images/TeezinatorLogo.png" alt="Logo" />
              <Typography variant="h4" component="span">
                Teezinator
              </Typography>
            </a>
          </Box>

          <Box className="buttonsBox">
            <Button onClick={() => nav("/")} sx={{
                    color: isActive('/') ? '#9eb8ff' : '#fff',
                }}>
              Feed
            </Button>
            <Button onClick={() => nav("/addTea")} sx={{
                    color: isActive('/addTea') ? '#9eb8ff' : '#fff',
                }}>
              Add tea
            </Button>
            <Button onClick={() => nav("/stats")} sx={{
                    color: isActive('/stats') ? '#9eb8ff' : '#fff',
                }}>
              Stats
            </Button>
            <Button onClick={() => nav("/leaderboard")} sx={{
                    color: isActive('/leaderboard') ? '#9eb8ff' : '#fff',
                }}>
              Leaderboard
            </Button>
          </Box>
        </Toolbar>
        <LinearProgress
          id="loadingBar"
          color="primary"
          style={{ display: "none" }}
        />
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;

/*

<AppBar
      position="fixed"
      style={{ top: showNavbar ? 0 : "-100px", transition: "top 0.3s" }}
    >
      <Toolbar sx={{ minHeight: "80px" }}>

      </Toolbar>
      <LinearProgress id="loadingBar" color="inherit" style={{ display: 'none' }} />
    </AppBar>


        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            <img
              src="images/TeezinatorLogo.png"
              alt="Logo"
              style={{
                height: "100px", // Adjust logo size if necessary
                marginRight: "10px",
                verticalAlign: "middle",
                padding: "10px",
              }}
            />
            Teezinator
          </a>
        </Typography>
        <Button
          color="inherit"
          href="/feed"
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
            margin: "0 25px",
            padding: "10px 20px",
            boxShadow: "0 2px 2px -1px rgba(0,0,0,0.2)",
          }}
        >
          Feed
        </Button>
        <Button
          color="inherit"
          href="/stats"
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
            margin: "0 25px",
            padding: "10px 20px",
            boxShadow: "0 2px 2px -1px rgba(0,0,0,0.2)",
          }}
        >
          Stats
        </Button>
        <Button
          color="inherit"
          href="/addTea"
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
            margin: "0 25px",
            padding: "10px 20px",
            boxShadow: "0 2px 2px -1px rgba(0,0,0,0.2)",
          }}
        >
          Add tea
        </Button>
        <Button
          color="inherit"
          href="/leaderboard"
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
            margin: "0 25px",
            padding: "10px 20px",
            boxShadow: "0 2px 2px -1px rgba(0,0,0,0.2)",
          }}
        >
          Leaderboard
        </Button>


*/
