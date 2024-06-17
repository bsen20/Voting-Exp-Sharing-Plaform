import React, { useState } from "react";
import Rating from "@mui/lab/Rating";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";

const SubmitExperience = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [locate, setLocate] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locate.lat || !locate.lng) {
      setError("Location is required");
      return;
    }
    let location = {
      type: "Point",
      coordinates: [locate.lng, locate.lat],
    };
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        setError("Token not found");
        return;
      }
      const response = await axios.post(
        "http://localhost:5500/api/experiences",
        {
          title,
          description,
          rating,
          location,
        },
        {
          headers: {
            "x-auth-token": token, // Set x-auth-token header with the token
          },
        }
      );
      setError("");
      console.log(response.data);
      navigate("/");

      // Handle successful submission (e.g., redirect or clear form)
    } catch (err) {
      setError("Submission failed");
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocate({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError("Failed to get location");
        }
      );
      console.log(locate);
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="div">
          Submit Experience
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box display="flex" alignItems="center" mt={2}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Rating:
            </Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Location:{" "}
              {locate.lat && locate.lng
                ? `(${locate.lat}, ${locate.lng})`
                : "Not set"}
            </Typography>
            <IconButton color="primary" onClick={fetchLocation}>
              <LocationOnIcon />
            </IconButton>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SubmitExperience;
