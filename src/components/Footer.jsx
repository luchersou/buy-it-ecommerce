import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube, ShoppingCart } from "@mui/icons-material";
import colors from "../theme/colors";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 4, sm: 5, md: 6 },
        bgcolor: colors["--clr-black-4"],
        color: colors["--clr-white-1"],
        pt: { xs: 4, sm: 5, md: 6 },
        pb: { xs: 2, sm: 2.5, md: 3 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Grid container spacing={{ xs: 3, sm: 3.5, md: 4 }} justifyContent="center">
        <Grid size={{ xs: 12, sm: 12, md: 3 }}>
          <Box display="flex" alignItems="center" mb={{ xs: 1, sm: 1.5, md: 2 }}>
            <ShoppingCart 
              sx={{ 
                color: colors["--clr-yellow-3"], 
                mr: 1,
                fontSize: { xs: "1.3rem", sm: "1.4rem", md: "1.5rem" }
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.25rem" }
              }}
            >
              BuyIt
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: colors["--clr-gray-7"],
              fontSize: { xs: "0.85rem", sm: "0.875rem", md: "0.9rem" },
              lineHeight: 1.6,
            }}
          >
            The best online shopping experience, with quality products and exclusive offers.
          </Typography>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: { xs: 1, sm: 1.5, md: 2 }, 
              color: colors["--clr-yellow-3"],
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }
            }}
          >
            Shop
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 0.5, sm: 0.7, md: 0.8 },
            }}
          >
            <Typography
              color={colors["--clr-white-1"]}
              sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem", md: "0.9rem" } }}
            >
              Products
            </Typography>
            <Typography
              color={colors["--clr-white-1"]}
              sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem", md: "0.9rem" } }}
            >
              Categories
            </Typography>
            <Typography
              color={colors["--clr-white-1"]}
              sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem", md: "0.9rem" } }}
            >
              Cart
            </Typography>
            <Typography
              color={colors["--clr-white-1"]}
              sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem", md: "0.9rem" } }}
            >
              My Account
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: { xs: 1, sm: 1.5, md: 2 }, 
              color: colors["--clr-yellow-3"],
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }
            }}
          >
            Support
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 0.5, sm: 0.7, md: 0.8 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 0.5, sm: 0.7, md: 0.8 },
              }}
            >
              <Typography
                color={colors["--clr-white-1"]}
                sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem", md: "0.9rem" } }}
              >
                About us
              </Typography>
              <Typography
                color={colors["--clr-white-1"]}
                sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem", md: "0.9rem" } }}
              >
                Contact
              </Typography>
              <Typography
                color={colors["--clr-white-1"]}
                sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem", md: "0.9rem" } }}
              >
                Frequently Asked Questions (FAQ)
              </Typography>
              <Typography
                color={colors["--clr-white-1"]}
                sx={{ fontSize: { xs: "0.85rem", sm: "0.875rem", md: "0.9rem" } }}
              >
                Privacy Policy
              </Typography>
            </Box>

          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: { xs: 1, sm: 1.5, md: 2 }, 
              color: colors["--clr-yellow-3"],
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }
            }}
          >
            Follow us
          </Typography>
          <Box display="flex" gap={{ xs: 0.8, sm: 1, md: 1.2 }}>
            <IconButton 
              color="inherit" 
              sx={{ 
                "&:hover": { color: colors["--clr-yellow-3"] },
                fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" }
              }}
            >
              <Facebook fontSize="inherit" />
            </IconButton>
            <IconButton 
              color="inherit" 
              sx={{ 
                "&:hover": { color: colors["--clr-yellow-3"] },
                fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" }
              }}
            >
              <Instagram fontSize="inherit" />
            </IconButton>
            <IconButton 
              color="inherit" 
              sx={{ 
                "&:hover": { color: colors["--clr-yellow-3"] },
                fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" }
              }}
            >
              <Twitter fontSize="inherit" />
            </IconButton>
            <IconButton 
              color="inherit" 
              sx={{ 
                "&:hover": { color: colors["--clr-yellow-3"] },
                fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" }
              }}
            >
              <YouTube fontSize="inherit" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          borderTop: `1px solid ${colors["--clr-gray-3"]}`,
          mt: { xs: 3, sm: 3.5, md: 4 },
          pt: { xs: 1.5, sm: 2, md: 2.5 },
          textAlign: "center",
          color: colors["--clr-gray-5"],
        }}
      >
        <Typography 
          variant="body2"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" } }}
        >
          © {new Date().getFullYear()} BuyIt. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}