import React from "react";
import { Button } from "@mui/material";
import colors from "../../theme/colors";

function AddToCartButton({
  onClick,
  children = "Add to Cart",
  fullWidth = true,
  ...props
}) {
  return (
    <Button
      fullWidth={fullWidth}
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: colors["--clr-yellow-1"],
        color: colors["--clr-black-2"],
        fontWeight: 600,
        borderRadius: 10,
        height: 40,
        textTransform: "none",
        "&:hover": { backgroundColor: colors["--clr-yellow-2"] },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default AddToCartButton;

