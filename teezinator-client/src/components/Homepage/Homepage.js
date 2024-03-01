import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import Stats from "../Stats/Stats";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

function Homepage() {
  const [teas, setTeas] = useState([]);

  useEffect(() => {
    const fetchTeas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/tea/getall"
        );
        setTeas(response.data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchTeas();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ mt: 4, mb: 2 }}
      >
        Top Teas
      </Typography>
      <Grid container spacing={4}>
        {teas.map((tea, index) => (
          <Grid item xs={12} sm={6} md={4} key={tea.id}>
            <Card>
              {/* Adjust CardMedia height or use "sx" for specific styling */}
              <CardMedia
                component="img"
                sx={{
                  // Height adjustment to improve visibility; consider adjusting this value
                  height: 300, // Adjusted height
                  objectFit: "cover", // Adjust as needed to 'contain' for no cropping
                }}
                image={`data:image/jpeg;base64,${tea.image}`}
                alt={tea.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {index + 1}. {tea.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 4, mb: 2 }}
      >
        Stats
      </Typography>
      <Stats />
    </Container>
  );
}

export default Homepage;
