import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 2,
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {"© "}
        {new Date().getFullYear()} Voting Platform. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
