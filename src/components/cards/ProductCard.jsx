import { Rating, Typography, Button, Box } from "@mui/material";
import BaseCard from "./BaseCard";
import { useCart } from "../../contexts/CartContext";
import QuantitySelector from "../buttons/QuantitySelector";
import colors from "../../theme/colors";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  
  const cartItem = cartItems?.find(item => item.id === product.id); 
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    if (quantity === 0) {
      addToCart(product);
    } else {
      increaseQuantity(product.id);
    }
  };
  
  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (quantity > 0) {
      decreaseQuantity(product.id);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "auto" },
        maxWidth: { xs: "320px", sm: "none" },
      }}
    >
      <BaseCard
        image={product.image}
        title={product.title}
      >
        <Typography 
          variant="caption" 
          color={colors["--clr-gray-3"]}
          sx={{ display: 'block', mt: 0.5, mb: 0.5, textTransform: 'capitalize' }}
        >
          {product.category}
        </Typography>
        
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={2}
          sx={{ mt: 0.5 }}
        >
          <Rating value={product.rating?.rate ?? 4} precision={0.5} readOnly size="big" />
          <Typography variant="body2" sx={{ ml: 1, color: colors["--clr-gray-3"] }}>
            {product.rating?.count ?? 100}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ color: colors["--clr-black-2"], mb: 1 }}>
          ${product.price.toFixed(2)}
        </Typography>

        {quantity === 0 ? (
          <Button
            fullWidth
            variant="contained"
            onClick={handleAdd}
            sx={{
              backgroundColor: colors["--clr-yellow-1"],
              color: colors["--clr-black-2"],
              fontWeight: 600,
              borderRadius: 8,
              height: 40,
              "&:hover": { backgroundColor: colors["--clr-yellow-2"] },
            }}
          >
            Add to Cart
          </Button>
        ) : (
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleAdd}
            onDecrease={handleRemove}
          />
        )}
      </BaseCard>
    </Box>
  );
};

export default ProductCard;