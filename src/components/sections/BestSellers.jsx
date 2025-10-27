import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "../Cards/ProductCard";
import Wrapper from "../layout/Wrapper";
import Carousel from "../carousel/Carousel";
import Loading from "../Loading";
import colors from "../../theme/colors";
import useFetch from "../../hooks/useFetch"; 

export default function BestSellers() {
  const { data, loading, error } = useFetch("https://fakestoreapi.com/products");

  const products = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => b.rating.count - a.rating.count);
  }, [data]);

  return (
    <Wrapper>
      <Typography
        variant="h5"
        sx={{
          mb: { xs: 1.5, sm: 2, md: 3 },
          fontWeight: 700,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: { xs: 0.5, sm: 0.75, md: 1 },
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" },
        }}
      >
        Top Selling
      </Typography>

      <Box
        sx={{
          width: { xs: 50, sm: 70, md: 80 },
          height: 4,
          bgcolor: colors["--clr-yellow-1"],
          mx: "auto",
          borderRadius: 2,
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      />

      {loading ? (
        <Loading text="Loading..." />
      ) : error ? (
        <Typography color="error" textAlign="center">
          Error fetching products.
        </Typography>
      ) : (
        <Box
          sx={{
            px: { xs: 0.5, sm: 3, md: 5 },
            maxWidth: "100%",
          }}
        >
          <Carousel options={{ loop: false, speed: 4 }}>
            {products.map((p) => (
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
