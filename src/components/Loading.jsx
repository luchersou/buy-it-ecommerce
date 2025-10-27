import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import colors from "../theme/colors";

const Loading = ({ text = "Loading..." }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        bgcolor: colors["--clr-gray-11"],
        flexDirection: "row",
        gap: 2,
      }}
    >
      <CircularProgress
        size={28}
        thickness={5}
        sx={{
          color: colors["--clr-yellow-1"],
          animationDuration: "800ms",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: colors["--clr-gray-2"],
          fontWeight: 500,
          letterSpacing: 0.5,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Loading;
