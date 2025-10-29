import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "../cards/ProductCard";
import Wrapper from "../layout/Wrapper";
import Carousel from "../carousel/Carousel";
import { Star } from "@mui/icons-material";
import Loading from "../Loading";
import useFetch from "../../hooks/useFetch"; 
import colors from "../../theme/colors";

export default function TopRated() {
  const { data: products, loading, error } = useFetch("https://fakestoreapi.com/products");

  const sortedProducts = products 
    ? [...products].sort((a, b) => b.rating.rate - a.rating.rate)
    : [];

  return (
    <Wrapper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        mb={3}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
          <Star sx={{ color: colors["--clr-yellow-3"], mr: 1 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Top Rated
          </Typography>
        </Box>

        <Box
          sx={{
            width: 80,
            height: 4,
            bgcolor: colors["--clr-yellow-1"],
            borderRadius: 2,
          }}
        />

        <Typography
          variant="body2"
          sx={{ color: colors["--clr-gray-2"], mt: 1, fontSize: "0.9rem" }}
        >
          Products with the best customer reviews
        </Typography>
      </Box>

      {loading ? (
        <Loading text="Loading products..." />
      ) : error ? (
        <Typography color="error" textAlign="center">
          Error loading products: {error.message}
        </Typography>
      ) : (
        <Box
          sx={{
            px: { xs: 0.5, sm: 3, md: 5 },
            maxWidth: "100%",
          }}
        >
          <Carousel options={{ loop: false, speed: 4 }}>
            {sortedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    flex: {
                      xs: "0 0 65%", 
                      sm: "0 0 40%", 
                      md: "0 0 20%", 
                    },
                    p: { xs: 0.1, sm: 0.6, md: 1.0 },
                  }}
                >
                  <ProductCard product={p} />
                </Box>
              </Link>
            ))}
          </Carousel>
        </Box>
      )}
    </Wrapper>
  );
}