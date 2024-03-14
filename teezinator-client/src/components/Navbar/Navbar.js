import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  // State to manage navbar visibility
  const [showNavbar, setShowNavbar] = useState(true);
  // State to store the last scroll position
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show navbar if scrolling up, hide if scrolling down
      if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      }
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AppBar
      position="fixed"
      style={{ top: showNavbar ? 0 : "-100px", transition: "top 0.3s" }}
    >
      <Toolbar sx={{ minHeight: "80px" }}>
        {" "}
        {/* Increase toolbar height */}
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
