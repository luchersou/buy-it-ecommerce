import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import BenefitCard from "../cards/BenefitCard";
import { categoriesData } from "../../data/benefitsData";
import Wrapper from "../layout/Wrapper";
import Carousel from "../carousel/Carousel";
import colors from "../../theme/colors";

export default function Benefits() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Wrapper>
      <Box sx={{ textAlign: "center", mb: { xs: 3, md: 5 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: colors["--clr-black-1"],
            mb: 1,
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              display:  "inline-block" , 
              width: { xs:20, sm: 30, md: 40 },
              height: 4,
              backgroundColor: colors["--clr-yellow-1"],
              borderRadius: 2,
            }}
          />
          Why choose BuyIt?
          <Box
            component="span"
            sx={{
              display: "inline-block" , 
              width: { xs:20, sm: 30, md: 40 },
              height: 4,
              backgroundColor: colors["--clr-yellow-1"],
              borderRadius: 2,
            }}
          />
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            color: colors["--clr-gray-4"],
            maxWidth: 600,
            mx: "auto",
            mt: 2,
            fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
            px: { xs: 2, sm: 0 },
          }}
        >
          We offer the best conditions and benefits for you to shop with security and convenience
        </Typography>
      </Box>

      <Box sx={{ px: { xs: 0.4, sm: 1, md: 3 } }}> 
        <Carousel
          options={{ loop: false, speed: 4 }}
          arrowSize={isXs ? 18 : isSmallScreen ? 26 : 40} 
        >
          {categoriesData.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: { xs: 0.5, sm: 0.75, md: 0.8 },
                flex: {
                  xs: "0 0 40%",
                  sm: "0 0 28%",
                  md: "0 0 16%",
                },
              }}
            >
              <BenefitCard {...item} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Wrapper>
  );
}