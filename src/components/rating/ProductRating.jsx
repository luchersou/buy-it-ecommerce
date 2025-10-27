import React from "react";
import { Box, Rating, Typography } from "@mui/material";
import colors from "../../theme/colors";

const ProductRating = ({ rate = 4, count = 100, size = "medium", sx = {} }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mb={2}
      sx={{ mt: 0.5, ...sx }}
    >
      <Rating value={rate} precision={0.5} readOnly size={size} />
      <Typography variant="body2" sx={{ ml: 1, color: colors["--clr-gray-3"] }}>
        {count}
      </Typography>
    </Box>
  );
};

export default ProductRating;
