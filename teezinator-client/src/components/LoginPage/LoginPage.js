import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { isTokenValid } from "../../RequireAuth"; // Import isTokenValid
import { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Footer from "../Footer/Footer"; // Assuming Footer is your custom component

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem("TeezinatorToken");
    if (token && isTokenValid(token)) {
      navigate("/"); // Redirect to homepage if token is valid
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/authenticate",
        {
          username,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("TeezinatorToken", token); // Store the token

      navigate("/"); // Redirect to the homepage
    } catch (err) {
      setError("Failed to login");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Teezinator 🍵
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {error && <FormHelperText error>{error}</FormHelperText>}
        </Box>
      </Box>
      <Footer />
    </Container>
  );
};

export default LoginPage;
