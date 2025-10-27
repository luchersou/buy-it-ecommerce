import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";
import Wrapper from "../components/layout/Wrapper";
import CartItem from "../components/cards/CartItem";
import colors from "../theme/colors";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    total,
    itemCount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const shipping = itemCount > 0 ? 25 : 0;
  const grandTotal = total + shipping;

  return (
    <Wrapper>
      <Box sx={{ maxWidth: "1300px", mx: "auto", p: { xs: 2, md: 3 } }}>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
          display="flex"
          alignItems="center"
          gap={1}
        >
          🛍️ Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="h6" textAlign="center" mt={6}>
            Your cart is empty.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            <Grid size={{ xs:12, md:8 }}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => increaseQuantity(item.id)}
                  onDecrease={() => decreaseQuantity(item.id)}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}

              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={clearCart}
                sx={{ mt: 3, fontWeight: 600, borderRadius: 2, py: 1.2 }}
              >
                Clear Cart
              </Button>
            </Grid>

            <Grid size={{ xs: 12, md:4 }} >
              <Box
                sx={{
                  position: { md: "sticky" },
                  top: { md: 80 },
                  p: 3,
                  borderRadius: 3,
                  boxShadow: colors["--clr-shadow-light"],
                  bgcolor: colors["--clr-white-1"],
                }}
              >
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Order Summary
                </Typography>

                {[
                  { label: `Items (${itemCount})`, value: total },
                  { label: "Shipping", value: shipping },
                ].map((line) => (
                  <Box
                    key={line.label}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                      color: colors["--clr-gray-3"],
                    }}
                  >
                    <Typography>{line.label}</Typography>
                    <Typography>$ {line.value.toFixed(2)}</Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h5" color={colors["--clr-gray-2"]} fontWeight={800}>
                    $ {grandTotal.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, fontSize: "1rem" }}
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Wrapper>
  );
}
