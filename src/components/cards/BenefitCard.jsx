import React from "react";
import { Box, Typography } from "@mui/material";
import colors from "../../theme/colors";

const BenefitCard = ({ icon: Icon, title, description }) => (
  <Box
    sx={{
      position: "relative",
      backgroundColor: colors["--clr-white-1"],
      border: `2px solid ${colors["--clr-gray-10"]}`,
      borderRadius: 3,
      p: 3,
      minHeight: "100%",
      maxWidth: 280,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: colors["--clr-shadow-hover-1"],
        borderColor: colors["--clr-yellow-1"],
        "& .icon-container": {
          backgroundColor: colors["--clr-black-1"],
          transform: "scale(1.1) rotate(5deg)",
        },
        "& .icon": {
          color: colors["--clr-yellow-1"],
        },
      },
    }}
  >
    {Icon && (
      <Box
        className="icon-container"
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80 ,
          backgroundColor: colors["--clr-yellow-1"],
          borderRadius: "50%",
          mb: 2,
          transition: "all 0.3s ease",
          boxShadow: colors["--clr-black-1"],
        }}
      >
        <Icon
          className="icon"
          sx={{
            fontSize: 40,
            color: colors["--clr-black-1"],
            transition: "color 0.3s ease",
          }}
        />
      </Box>
    )}

    <Typography
      variant="h6"
      sx={{
        position: "relative",
        zIndex: 1,
        fontWeight: 700,
        color: colors["--clr-black-1"],
        mb: 1,
        fontSize: "1.1rem",
      }}
    >
      {title}
    </Typography>

    <Typography
      variant="body2"
      sx={{
        position: "relative",
        zIndex: 1,
        color: colors["--clr-gray-4"],
        lineHeight: 1.6,
        fontSize: "0.9rem",
      }}
    >
      {description}
    </Typography>

    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 4,
        background: colors["--clr-gradient-yellow"],
      }}
    />
  </Box>
);

export default BenefitCard;