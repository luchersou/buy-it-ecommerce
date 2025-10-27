import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import colors from "../../theme/colors";

function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        backgroundColor: colors["--clr-gray-10"],
        borderRadius: 10,
        height: 40,
        width: "100%",
        px: 2,
      }}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        sx={{ p: 0.5 }}
      >
        <Remove fontSize="small" />
      </IconButton>

      <Typography
        sx={{
          fontWeight: 600,
          minWidth: 30,
          textAlign: "center",
        }}
      >
        {quantity}
      </Typography>

      <IconButton size="small" onClick={onIncrease} sx={{ p: 0.5 }}>
        <Add fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default QuantitySelector;
