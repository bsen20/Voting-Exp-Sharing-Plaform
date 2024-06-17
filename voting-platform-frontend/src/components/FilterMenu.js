import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Slider,
  IconButton,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

const FilterButton = ({ onApplyFilters }) => {
  const [locate, setLocate] = useState({ lat: null, lng: null });
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    rating: "",
    tags: [],
    severity: "",
    location: "",
    radius: 10,
  });
  const fetchLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFilters({
            ...filters,
            location: {
              type: "Point",
              coordinates: [
                position.coords.longitude,
                position.coords.latitude,
              ],
            },
          });
          setLocate({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.og("Failed to get location");
        }
      );

      console.log(filters.location);
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleRadiusChange = (e, value) => {
    setFilters({
      ...filters,
      radius: value,
    });
  };

  const handleApplyFilters = () => {
    // fetchLocation();
    onApplyFilters(filters);
    setOpen(false);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="filter"
        onClick={() => setOpen(true)}
        style={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <FilterListIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Filter Options
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Severity</InputLabel>
              <Select
                name="severity"
                value={filters.severity}
                onChange={handleFilterChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="tags"
              label="Tags"
              value={filters.tags}
              onChange={handleFilterChange}
            />
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
            <Box>
              <Typography>Radius: {filters.radius} km</Typography>
              <Slider
                value={filters.radius}
                onChange={handleRadiusChange}
                aria-labelledby="radius-slider"
                min={0}
                max={100}
                step={5}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleApplyFilters}
            color="primary"
            variant="contained"
          >
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterButton;
