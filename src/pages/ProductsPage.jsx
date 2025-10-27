import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Link,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProductCard from "../components/cards/ProductCard";
import useFetch from "../hooks/useFetch";
import Newsletter from "../components/sections/Newsletter";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import Wrapper from "../components/layout/Wrapper";
import Loading from "../components/Loading";
import colors from "../theme/colors";

const ProductsPage = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));

  const getItemsPerPage = () => {
    if (isXs) return 6;
    if (isSm) return 10;
    return 15;
  };

  const { category: categoryParam } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryQuery = searchParams.get("category") || "";

  const category = categoryParam || categoryQuery || "";

  const breadcrumbItems = category
    ? [{ label: "Products", to: "/products" }, { label: category }]
    : query
    ? [{ label: "Search" }, { label: `"${query}"` }]
    : [{ label: "Products" }];

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(getItemsPerPage());
  const [loading, setLoading] = useState(true);

  const apiUrl = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : "https://fakestoreapi.com/products";

  const { data: products, loading: fetchLoading, error } = useFetch(apiUrl);

  useEffect(() => {
    if (!fetchLoading && products) {
      let filtered = products;

      if (query) {
        filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
      setVisibleCount(getItemsPerPage()); 
      setLoading(false);
    }
  }, [products, query, fetchLoading, isXs, isSm]);

  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, visibleCount));
  }, [filteredProducts, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + getItemsPerPage());
  };

  const hasMore = visibleCount < filteredProducts.length;

  const pageTitle = query
    ? category
      ? `Results for "${query}" in ${category}`
      : `Results for "${query}"`
    : category
    ? `Category: ${category}`
    : "All Products";

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, minHeight: "80vh" }}>
      <Wrapper>
        <BreadcrumbsNav items={breadcrumbItems} />
        <Typography
          variant="h5"
          sx={{ 
            mb: { xs: 2, sm: 2.5, md: 3 }, 
            textTransform: "capitalize", 
            fontWeight: 600,
            fontSize: { xs: "1.2rem", sm: "1.35rem", md: "1.5rem" }
          }}
        >
          {pageTitle}
        </Typography>

        {!loading && !fetchLoading && filteredProducts.length > 0 && (
          <Typography 
            variant="body2" 
            sx={{ 
              mb: { xs: 1.5, sm: 2, md: 2.5 }, 
              color: "text.secondary",
              fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.875rem" }
            }}
          >
            Showing {displayedProducts.length} of {filteredProducts.length} products
          </Typography>
        )}

        {loading || fetchLoading ? (
          <Loading text="Loading..." />
        ) : error ? (
          <Typography 
            color="error"
            sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" } }}
          >
            Error loading products.
          </Typography>
        ) : filteredProducts.length === 0 ? (
          <Typography 
            variant="body1"
            sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" } }}
          >
            No products found.
          </Typography>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(auto-fill, minmax(250px, 1fr))",
                },
                gap: { xs: 1.5 },
                mb: { xs: 3, sm: 3.5, md: 4 },
              }}
            >
              {displayedProducts.map((product) => (
                <Link
                  key={product.id}
                  component={RouterLink}
                  to={`/product/${product.id}`}
                  underline="none"
                  sx={{ textDecoration: "none" }}
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </Box>

            {hasMore && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 3, sm: 3.5, md: 4 } }}>
                <Button
                  variant="contained"
                  onClick={handleLoadMore}
                  sx={{
                    bgcolor: colors["--clr-white-7"],
                    color: colors["--clr-black-1"],
                    px: { xs: 3, sm: 3.5, md: 4 },
                    py: { xs: 1.2, sm: 1.3, md: 1.5 },
                    fontWeight: 600,
                    borderRadius: 15,
                    textTransform: "none",
                    fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                    "&:hover": {
                      bgcolor: colors["--clr-white-8"],
                    },
                  }}
                >
                  View more ({filteredProducts.length - visibleCount} remaining)
                </Button>
              </Box>
            )}
          </>
        )}
        <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}>
          <Newsletter />
        </Box>
      </Wrapper>
    </Box>
  );
};

export default ProductsPage;