import React, { useState, useEffect, useRef } from "react";
import axios from "../../axiosInstance";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";

const AddTea = () => {
  const [timeOfConsumption, setTimeOfConsumption] = useState(new Date());
  const [role, setRole] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [inputValue, setInputValue] = useState(
    moment().format("MMMM D, YYYY h:mm a")
  );
  const [selectedUser, setSelectedUser] = useState("");
  const [teaType, setTeaType] = useState("");
  const [teas, setTeas] = useState([]);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const datePickerRef = useRef(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("/tea/getUserRole");
        setRole(response.data);
      } catch (error) {
        console.error("Failed to fetch user role", error);
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    if (role === "ADMIN") {
      const fetchUsernames = async () => {
        try {
          const response = await axios.get("/tea/getAllUsernames");
          setUsernames(response.data);
        } catch (error) {
          console.error("Failed to fetch usernames", error);
        }
      };
      fetchUsernames();
    }
  }, [role]);

  useEffect(() => {
    const fetchTeas = async () => {
      const response = await axios.get("/tea/getall");
      setTeas(response.data);
    };
    fetchTeas();
  }, []);

  const handleDateChange = (date) => {
    setTimeOfConsumption(date);
    setInputValue(moment(date).format("MMMM D, YYYY h:mm a"));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    const parsedDate = moment(event.target.value, "MMMM D, YYYY h:mm a", true);
    if (parsedDate.isValid()) {
      setTimeOfConsumption(parsedDate.toDate());
    }
  };

  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > 800 || height > 800) {
          const scalingFactor = Math.min(800 / width, 800 / height);
          width = width * scalingFactor;
          height = height * scalingFactor;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, {
            type: "image/png",
            lastModified: Date.now(),
          });
          setImage(resizedFile);
          setFileName(resizedFile.name);
        }, "image/png");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const removeUploadedImage = () => {
    setImage(null);
    setFileName("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("teaId", teaType);
    formData.append(
      "timeOfConsumption",
      moment(timeOfConsumption).format("YYYY-MM-DDTHH:mm:ss")
    );
    if (role === "ADMIN" && selectedUser) {
      formData.append("username", selectedUser);
    }
    if (image) formData.append("image", image);
    try {
      const response = await axios
        .post("/tea/addTea", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Successfully added tea!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
          });
        });
      setTeaType("");
      setImage(null);
      removeUploadedImage();
    } catch (error) {
      console.error("There was an error adding the tea:", error);
      toast.error("Failed to add tea", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <div style={{ width: "50%" }}>
          <form onSubmit={handleSubmit}>
            <h1>Add a tea</h1>
            <FormControl fullWidth margin="normal">
              <InputLabel id="tea-type-label">Tea Type</InputLabel>
              <Select
                labelId="tea-type-label"
                id="tea-type"
                value={teaType}
                label="Tea Type"
                onChange={(e) => setTeaType(e.target.value)}
              >
                {teas.map((tea) => (
                  <MenuItem key={tea.id} value={tea.id}>
                    {tea.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {role === "ADMIN" && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="user-select-label">Select User</InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  value={selectedUser}
                  label="Select User"
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  {usernames.map((username, index) => (
                    <MenuItem key={index} value={username}>
                      {username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <div className="form-group">
              <TextField
                label="Time of Consumption"
                value={inputValue}
                onChange={handleInputChange}
                sx={{ width: "100%", marginTop: "16px", marginBottom: "8px" }}
                InputProps={{
                  readOnly: false,
                  endAdornment: (
                    <InputAdornment position="end" style={{ height: "100%" }}>
                      <IconButton
                        onClick={openDatePicker}
                        style={{ height: "100%" }}
                      >
                        <CalendarTodayIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <DatePicker
                ref={datePickerRef}
                selected={timeOfConsumption}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm a"
                withPortal
                hidden
                customInput={<div style={{ display: "none" }} />}
              />
            </div>
            <div className="form-group">
              {/* Conditionally render the TextField for the uploaded image filename above the Upload Image button */}
              {fileName && (
                <TextField
                  label="Uploaded Image"
                  value={fileName}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={removeUploadedImage}>
                          <CloseIcon />{" "}
                          {/* Make sure CloseIcon is imported from @mui/icons-material */}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  margin="normal"
                />
              )}
              {/* Hidden file input for image upload */}
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{
                    margin: "20px 0",
                    color: "inherit",
                    backgroundColor: "#333333",
                  }}
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
                  Upload Image
                </Button>
              </label>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", width: "100%" }}
            >
              Add Tea
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddTea;
