import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import EmblaBase from "./EmblaBase";
import colors from "../../theme/colors";

function Carousel({ children, options = {}, plugins = [], arrowSize }) {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const { emblaRef, emblaApi, scrollPrev, scrollNext } = EmblaBase({
    options: {
      align: "start",
      dragFree: true,
      speed: 8,
      containScroll: "trimSnaps",
      ...options,
    },
    plugins,
  });

  const resolvedArrowSize =
    arrowSize ?? (isSmallScreen ? 28 : isMediumScreen ? 36 : 50);

  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    updateButtons(); 
  }, [emblaApi]);

  return (
    <Box sx={{ position: "relative" }}>
      {canScrollPrev && (
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
            width: resolvedArrowSize + 5,
            height: resolvedArrowSize + 5,
            "&:hover": { backgroundColor: colors["--clr-gray-10"] },
          }}
        >
          <ArrowBackIos sx={{ fontSize: resolvedArrowSize, pl: 1 }} />
        </IconButton>
      )}

      <Box
        ref={emblaRef}
        sx={{ overflow: "hidden", px: { xs: "20px", sm: "40px", md: "50px" } }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>{children}</Box>
      </Box>

      {canScrollNext && (
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
            width: resolvedArrowSize + 5,
            height: resolvedArrowSize + 5,
            "&:hover": { backgroundColor: colors["--clr-gray-10"] },
          }}
        >
          <ArrowForwardIos sx={{ fontSize: resolvedArrowSize }} />
        </IconButton>
      )}
    </Box>
  );
}

export default Carousel;
