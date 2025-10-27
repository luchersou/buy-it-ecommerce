import React, { useRef } from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import EmblaBase from "./EmblaBase";
import colors from "../../theme/colors";

function Carousel({ children, options = {}, plugins = [], arrowSize }) {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const theme = useTheme();

  const isSmallScreen  = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { emblaRef, scrollPrev, scrollNext } = EmblaBase({
    options: {
      align: "start",
      dragFree: true,
      speed: 8,
      containScroll: "false",
      ...options,
    },
    plugins,
  });


  const resolvedArrowSize =
    arrowSize ?? (isSmallScreen  ? 18 : isMediumScreen ? 26 : 40); 

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        ref={prevButtonRef}
        onClick={scrollPrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: "-12px", sm: "-20px", md: "-28px" },
          transform: "translateY(-50%)",
          zIndex: 3,
          backgroundColor: colors["--clr-gray-10"],
          boxShadow: 1,
          width: resolvedArrowSize + 10,
          height: resolvedArrowSize + 10,
          "&:hover": { backgroundColor: colors["--clr-gray-11"] },
        }}
      >
        <ArrowBackIos sx={{ fontSize: resolvedArrowSize, pl: 1 }} />
      </IconButton>

      <Box ref={emblaRef} sx={{ overflow: "hidden", px: { xs: "20px", sm: "40px", md: "50px" } }}>
        <Box sx={{ display: "flex", gap: 1 }}>{children}</Box>
      </Box>

      <IconButton
        ref={nextButtonRef}
        onClick={scrollNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: "-12px", sm: "-20px", md: "-28px" },
          transform: "translateY(-50%)",
          zIndex: 3,
          backgroundColor: colors["--clr-gray-10"],
          boxShadow: 1,
          width: resolvedArrowSize + 10,
          height: resolvedArrowSize + 10,
          "&:hover": { backgroundColor: colors["--clr-gray-11"] },
        }}
      >
        <ArrowForwardIos sx={{ fontSize: resolvedArrowSize }} />
      </IconButton>
    </Box>
  );
}

export default Carousel;
