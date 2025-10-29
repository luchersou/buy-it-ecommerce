import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import EmblaBase from "../carousel/EmblaBase";
import Autoplay from "embla-carousel-autoplay";
import colors from "../../theme/colors";

const images = [
  "/images/banner/banner1.jpg",
  "/images/banner/banner2.jpg",
  "/images/banner/banner3.jpg",
];

const Banner = () => {
  const autoplay = Autoplay({ delay: 3000, stopOnInteraction: false });
  const { emblaRef, emblaApi, scrollPrev, scrollNext, scrollTo } = EmblaBase({
    options: { loop: true },
    plugins: [autoplay],
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        aspectRatio: { xs: "16/9", sm: "21/9" },
        maxHeight: { xs: 400, sm: 500, md: 590 },
      }}
    >
      <IconButton
        onClick={scrollPrev}
        sx={{
          display: { xs: "none", sm: "flex" },
          position: "absolute",
          top: "50%",
          left: 30,
          zIndex: 10,
          color: colors["--clr-white-1"],
          backgroundColor: colors["--clr-black-overlay-40"],
          "&:hover": { backgroundColor: colors["--clr-black-overlay-60"] },
          transform: "translateY(-50%)",
        }}
      >
        <ArrowBackIos sx={{ fontSize: { sm: 20, md: 30 }, paddingLeft: 1 }} />
      </IconButton>

      <IconButton
        onClick={scrollNext}
        sx={{
          display: { xs: "none", sm: "flex" },
          position: "absolute",
          top: "50%",
          right: 30,
          zIndex: 10,
          color: colors["--clr-white-1"],
          backgroundColor: colors["--clr-black-overlay-40"],
          "&:hover": { backgroundColor: colors["--clr-black-overlay-60"] },
          transform: "translateY(-50%)",
        }}
      >
        <ArrowForwardIos sx={{ fontSize: { sm: 20, md: 30 } }} />
      </IconButton>

      <Box ref={emblaRef} sx={{ overflow: "hidden", width: "100%", height: "100%" }}>
        <Box sx={{ display: "flex", height: "100%" }}>
          {images.map((src, i) => (
            <Box key={i} sx={{ flex: "0 0 100%", height: "100%" }}>
              <Box
                component="img"
                src={src}
                alt={`Banner ${i + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", 
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Indicadores */}
      <Box
        sx={{
          position: "absolute",
          bottom: 15,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 10,
        }}
      >
        {scrollSnaps.map((_, index) => (
          <Box
            key={index}
            onClick={() => scrollTo(index)}
            sx={{
              width: { xs: 10, sm: 12, md: 15 },
              height: { xs: 10, sm: 12, md: 15 },
              borderRadius: "50%",
              cursor: "pointer",
              backgroundColor:
                index === selectedIndex
                  ? colors["--clr-white-1"]
                  : colors["--clr-white-overlay-50"],
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Banner;
