import React, { useEffect, useState } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { Category } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProductCard from "../cards/ProductCard";
import Wrapper from "../layout/Wrapper";
import Loading from "../Loading";
import useFetch from "../../hooks/useFetch";
import { useTheme } from "@mui/material/styles";
import colors from "../../theme/colors";

export default function ProductsByCategory() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const getInitialCount = () => {
    if (isXs) return 4;
    if (isSm) return 6;
    return 10;
  };

  const getIncrementCount = () => {
    if (isXs) return 4;
    if (isSm) return 6;
    return 10;
  };

  const [visibleCount, setVisibleCount] = useState(getInitialCount());
  const [selected, setSelected] = useState("");

  const { data: categories, loading: loadingCategories } = useFetch(
    "https://fakestoreapi.com/products/categories"
  );

  const { data: products, loading: loadingProducts } = useFetch(
    selected ? `https://fakestoreapi.com/products/category/${selected}` : null
  );

  useEffect(() => {
    if (categories && categories.length > 0 && !selected) {
      setSelected(categories[0]);
    }
  }, [categories, selected]);

  useEffect(() => {
    setVisibleCount(getInitialCount());
  }, [selected, isXs, isSm, isMd]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + getIncrementCount());
  };

  const displayedProducts = products?.slice(0, visibleCount) || [];
  const loading = loadingCategories || loadingProducts;

  return (
    <Wrapper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        mb={{ xs: 2, sm: 3 }}
        px={{ xs: 2, sm: 3, md: 0 }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
          <Category
            sx={{
              color: colors["--clr-yellow-1"],
              mr: 1,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
            }}
          >
            Products by Category
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: 60, sm: 80, md: 100 },
            height: 4,
            bgcolor: colors["--clr-yellow-1"],
            borderRadius: 2,
            mb: 2,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            color: colors["--clr-gray-2"],
            mt: 1,
            fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
            px: { xs: 2, sm: 0 },
          }}
        >
          Explore products from the most popular categories
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: { xs: 0.5, sm: 1 },
          px: { xs: 2, sm: 3, md: 0 },
        }}
      >
        {categories?.map((cat) => (
          <Button
            key={cat}
            onClick={() => setSelected(cat)}
            variant={selected === cat ? "contained" : "outlined"}
            sx={{
              textTransform: "capitalize",
              borderRadius: 3,
              px: { xs: 2, sm: 2.5, md: 3 },
              py: { xs: 0.7, sm: 0.9, md: 1 },
              fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
              
            }}
          >
            {cat}
          </Button>
        ))}
      </Box>

      {loading ? (
        <Loading text="Loading products..." />
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)", 
                sm: "repeat(auto-fill, minmax(250px, 1fr))"
              },
              gap: { xs: 1.5, sm: 2, md: 2.5 },
              justifyContent: "center",
              minHeight: { xs: 300, sm: 350, md: 400 },
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {displayedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCard product={p} />
              </Link>
            ))}
          </Box>

          {products && visibleCount < products.length && (
            <Box display="flex" justifyContent="center" mt={{ xs: 3, sm: 3.5, md: 4 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleShowMore}
                sx={{
                    bgcolor: colors["--clr-white-6"],
                    color: colors["--clr-black-1"],
                    px: { xs: 3, sm: 3.5, md: 4 },
                    py: { xs: 1.2, sm: 1.3, md: 1.5 },
                    fontWeight: 600,
                    borderRadius: 15,
                    textTransform: "none",
                    fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                    "&:hover": {
                      bgcolor: colors["--clr-gray-8"],
                    },
                  }}
              >
                Show more
              </Button>
            </Box>
          )}
        </>
      )}
    </Wrapper>
  );
}