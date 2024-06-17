import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubmitIssues = () => {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [locate, setLocate] = useState({ lat: null, lng: null });
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const issueProblems = [
    "Broken Street Lights",
    "Garbage Collection",
    "Road Repair",
    // Add more problems as needed
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locate.lat || !locate.lng) {
      setError("Location is required");
      return;
    }
    if (!severity) {
      setError("Severity is required");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found");
        return;
      }
      let location = {
        type: "Point",
        coordinates: [locate.lng, locate.lat],
      };

      const response = await axios.post(
        "http://localhost:5500/api/issues",
        {
          description,
          severity,
          location,
          problems,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log(response.data);
      setError("");
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
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  const handleProblemChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setProblems([...problems, value]);
    } else {
      setProblems(problems.filter((problem) => problem !== value));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="div">
          Report Issues
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
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
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="problem-select-label">Select Problem</InputLabel>
            <Select
              labelId="problem-select-label"
              id="problem-select"
              multiple
              value={problems}
              onChange={(e) => setProblems(e.target.value)}
              label="Select Problem"
              renderValue={(selected) => selected.join(", ")}
            >
              {issueProblems.map((problem) => (
                <MenuItem key={problem} value={problem}>
                  <Checkbox checked={problems.indexOf(problem) > -1} />
                  <ListItemText primary={problem} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="severity-select-label">Severity</InputLabel>
            <Select
              labelId="severity-select-label"
              id="severity-select"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              label="Severity"
            >
              <MenuItem value="">--Select Severity--</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
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

export default SubmitIssues;
