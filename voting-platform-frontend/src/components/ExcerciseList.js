import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ExperienceList = ({ filters }) => {
  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const result = await axios.post(
          "http://localhost:5500/api/filter/experiences",
          {
            rating: filters.rating,
            location: filters.location,
            radius: filters.radius,
            severity: filters.severity,
            tags: filters.tags,
          },
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        setExperiences(result.data);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExperiences();
    console.log(filters);
  }, [filters]);

  const getRatingColor = (rating) => {
    switch (rating) {
      case 1:
        return "#f44336";
      case 2:
        return "#ff9800";
      case 3:
        return "#ffeb3b";
      case 4:
        return "#8bc34a";
      case 5:
        return "#4caf50";
      default:
        return "#ffffff";
    }
  };

  const handleCardClick = (experience) => {
    setSelectedExperience(experience);
  };

  const handleClose = () => {
    setSelectedExperience(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} style={{ color: "#ffb400" }} />);
      } else {
        stars.push(<StarBorder key={i} style={{ color: "#ffb400" }} />);
      }
    }
    return stars;
  };

  const mapCenter = selectedExperience
    ? [
        selectedExperience.location.coordinates[1],
        selectedExperience.location.coordinates[0],
      ]
    : [51.505, -0.09]; // Default center

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {experiences.map((experience) => (
          <Grid item xs={12} sm={6} md={4} key={experience._id}>
            <Card
              onClick={() => handleCardClick(experience)}
              style={{
                cursor: "pointer",
                backgroundColor: getRatingColor(experience.rating),
              }}
            >
              <CardContent>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  {experience.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  {experience.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontWeight: "bold" }}
                >
                  Rating: {renderStars(experience.rating)}
                </Typography>
                {experience.tags.length > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    Tags: {experience.tags.map((tag) => `#${tag}`).join(", ")}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedExperience && (
        <Dialog
          open={Boolean(selectedExperience)}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>{selectedExperience.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              Description:
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {selectedExperience.description}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ fontWeight: "bold" }}
            >
              Rating: {renderStars(selectedExperience.rating)}
            </Typography>
            {selectedExperience.tags.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                Tags:{" "}
                {selectedExperience.tags.map((tag) => `#${tag}`).join(", ")}
              </Typography>
            )}
            <Box mt={2}>
              <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={mapCenter}>
                  <Popup>{selectedExperience.title}</Popup>
                </Marker>
              </MapContainer>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default ExperienceList;
