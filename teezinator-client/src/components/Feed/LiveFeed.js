import axiosInstance from "../../axiosInstance";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import FeedEntry from "./FeedEntry";
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  LinearProgress,
  Modal,
  Pagination,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const LiveFeed = () => {
  const [latestTeas, setLatestTeas] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    fetchLatestTeas();
  }, []);

  const fetchLatestTeas = () => {
    document.getElementById("loadingBar").style.display = "block";
    try {
      axiosInstance.get("stats/feed").then((response) => {
        setLatestTeas(response.data);
        document.getElementById("loadingBar").style.display = "none";
      });
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const handleOpenImage = (imageId) => {
    axiosInstance
      .get("/stats/getImageById", { params: { imageId: imageId } })
      .then((response) => {
        setCurrentImage(`data:image/jpeg;base64,${response.data}`);
        setShowImageModal(true);
      })
      .catch((error) =>
        console.error("There was an error fetching the image!", error)
      );
  };

  return (
    <div style={{ height: "max-content" }}>
      <Navbar />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "100px",
          gap: "20px",
          alignItems: "center",
          paddingBottom: "50px",
          paddingTop: "10px",
        }}
      >
        <Typography variant="h4" style={{ fontWeight: '600'}}>
          Latest entries
        </Typography>
        {latestTeas.map((tea) => (
          <FeedEntry
            entry={tea}
            key={tea.id}
            handleOpenImage={handleOpenImage}
          />
        ))}
      </div>
      <Dialog open={showImageModal} onClose={() => setShowImageModal(false)}>
        <DialogTitle>Uploaded image</DialogTitle>
        <IconButton
          onClick={() => setShowImageModal(false)}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
        <Box className="imageModal">
          <img src={currentImage} alt="Tea" />
        </Box>
      </Dialog>
    </div>
  );
};

export default LiveFeed;
