import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import moment from "moment";
import ImageIcon from "@mui/icons-material/Image"; // Import an icon for images

const TeaStatsTable = ({ week }) => {
  const [consumedTeas, setConsumedTeas] = useState([]);
  const [loading, setLoading] = useState(false); // Initialize loading state
  const [open, setOpen] = useState(false); // For modal open/close
  const [currentImage, setCurrentImage] = useState(""); // To hold current image URL

  useEffect(() => {
    setLoading(true); // Start loading before fetching data
    axios
      .get("/stats/getWeeklyInfo", { params: { week } })
      .then((response) => {
        setConsumedTeas(response.data);
      })
      .catch((error) => console.error("There was an error!", error))
      .finally(() => setLoading(false)); // Stop loading regardless of the outcome
  }, [week]);

  const formatTime = (time) => {
    return (
      getDayOfWeek(moment(time).format("DD-MM-YYY")) +
      moment(time).format(" | HH:mm")
    );
  };

  const getDayOfWeek = (day) => {
    const parts = day.split("-");
    const formattedDate = `${parts[1]}-${parts[0]}-${parts[2]}`;
    const date = new Date(formattedDate);
    const days = [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ];
    return days[date.getDay()];
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    maxWidth: "800px",
    bgcolor: "background.paper",
    p: 4,
  };

  const handleOpen = (imageId) => {
    axios
      .get("/stats/getImageById", { params: { imageId: imageId } })
      .then((response) => {
        setCurrentImage(`data:image/jpeg;base64,${response.data}`);
        setOpen(true);
      })
      .catch((error) =>
        console.error("There was an error fetching the image!", error)
      );
  };

  const handleClose = () => setOpen(false);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Take up full viewport height
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ margin: "1rem", width: "100%" }}>
      <h1 style={{ margin: "10px" }}>Tee stats Woche {week}</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
          height: "auto",
          backgroundColor: "#1c1c1c",
          borderRadius: "5px",
          padding: "25px",
          width: "90%",
          margin: "10px",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="consumed teas table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Tea Name</TableCell>
                <TableCell align="center">Time Consumed</TableCell>
                <TableCell align="center">Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consumedTeas.map((tea) => (
                <TableRow key={tea.id}>
                  <TableCell align="center">{tea.tea.name}</TableCell>
                  <TableCell align="center">{formatTime(tea.time)}</TableCell>
                  <TableCell align="center">
                    {tea.image ? (
                      <ImageIcon
                        onClick={() => handleOpen(tea.image)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      "No image"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Uploaded image
          </Typography>
          <Box
            component="img"
            sx={{
              marginTop: 2,
              maxHeight: "100%",
              maxWidth: "100%",
            }}
            src={currentImage}
            alt="Tea"
          />
        </Box>
      </Modal>
    </div>
  );
};
export default TeaStatsTable;
