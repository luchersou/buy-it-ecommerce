import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Typography, Rating } from "@mui/material";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/cards/ProductCard";
import Wrapper from "../components/layout/Wrapper";
import Carousel from "../components/carousel/Carousel";
import TopRated from "../components/sections/TopRated";
import Newsletter from "../components/sections/Newsletter";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import AddToCartButton from "../components/buttons/AddToCartButton";
import QuantitySelector from "../components/buttons/QuantitySelector";
import Loading from "../components/Loading";
import { useCart } from "../contexts/CartContext"; 
import colors from "../theme/colors";

const MAX_LENGTH_DESCRIPTION = 200;

function ProductDetails() {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const { data: product, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);
  const { data: related, loading: loadingRelated } = useFetch(
    product?.category ? `https://fakestoreapi.com/products/category/${product.category}` : null
  );

  const cartItem = cartItems?.find((item) => item.id === product?.id);
  const quantity = cartItem?.quantity || 0;

  useEffect(() => {
    setExpanded(false);
  }, [product?.id]);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    quantity === 0 ? addToCart(product) : increaseQuantity(product.id);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    decreaseQuantity(product.id);
  };

  if (loading) return <Loading text="Loading..." />;
  if (error) return (
    <Typography variant="h6" textAlign="center" color="error" mt={4}>
      Error loading product: {error}
    </Typography>
  );
  if (!product) return (
    <Typography variant="h6" textAlign="center" mt={4}>
      Product not found.
    </Typography>
  );

  const shouldTruncate = product.description?.length > MAX_LENGTH_DESCRIPTION;
  const filtered = related?.filter((p) => p.id !== product.id) || [];

  return (
    <Wrapper>
      <Box sx={{ maxWidth: "1400px", mx: "auto", p: 2 }}>
        <BreadcrumbsNav
          items={[
            { label: "Products", to: "/products" },
            { label: product.category, to: `/products/category/${product.category}` },
            { label: product.title }
          ]}
        />

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", bgcolor: "#ffffff", borderRadius: 1, p: 2 }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", maxWidth: "400px", objectFit: "contain" }}
            />
          </Box>

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5" fontWeight={600}>
              {product.title}
            </Typography>

            <Typography variant="subtitle1" color={colors["--clr-gray-3"]}>
              Category: {product.category}
            </Typography>

            <Typography variant="h4" fontWeight={700} color={colors["--clr-gray-4"]}>
              $ {product.price?.toFixed(2)}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating value={product.rating?.rate || 0} precision={0.1} readOnly />
              <Typography variant="body2" color={colors["--clr-gray-3"]}>
                ({product.rating?.count || 0} reviews)
              </Typography>
            </Box>

            <Typography variant="body1" color={colors["--clr-gray-3"]}>
              {expanded || !shouldTruncate 
                ? product.description 
                : `${product.description.substring(0, MAX_LENGTH_DESCRIPTION)}...`}
              {shouldTruncate && (
                <Typography
                  component="span"
                  onClick={() => setExpanded(!expanded)}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: colors["--clr-blue-gray-1"],
                    ml: 0.2,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {expanded ? '▲ See less' : '▼ See more'}
                </Typography>
              )}
            </Typography>
            
            <Box sx={{ mt: 3, maxWidth: 300 }}>
              {quantity === 0 ? (
                <AddToCartButton onClick={handleAdd}>Add to Cart</AddToCartButton>
              ) : (
                <QuantitySelector quantity={quantity} onIncrease={handleAdd} onDecrease={handleRemove} />
              )}
            </Box>
          </Box>
        </Box>

        {filtered.length > 0 && (
          <Box sx={{ mt: 10 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Related Products
            </Typography>

            {loadingRelated ? (
              <Loading text="Loading..." />
            ) : (
              <Carousel options={{ loop: false, dragFree: true }}>
                {filtered.slice(0, 10).map((p) => (
                  <Box key={p.id}>
                    <Link to={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                      <ProductCard product={p} />
                    </Link>
                  </Box>
                ))}
              </Carousel>
            )}
          </Box>
        )}
      </Box>
      
      <TopRated />
      <Box sx={{ mt: { xs: 6, md: 10 } }}>
        <Newsletter />
      </Box>
    </Wrapper>
  );
}

export default ProductDetails;